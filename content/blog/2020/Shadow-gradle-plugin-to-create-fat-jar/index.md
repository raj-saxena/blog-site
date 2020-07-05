---
title: SpringBoot fat-jar fails, Shadow 🕵🏽‍♂️ to the rescue.
date: "2020-07-05T12:00:00.000Z"
description: "Using Shadow gradle plugin to create a fat jar as an alternative to SpringBoot."
featured: "./shadow.png"
---

(I was originally planning to publish this in April but then the Corona lockdown happened and the world just went sideways. Nonetheless, sharing my learnings now).

### Problem
I faced a peculiar problem that I hadn't seen before which I described in my last post - [Dataflow + SpringBoot app fails to run when Dockerized](https://suspendfun.com/2020/Dataflow-Springboot-app-fails-to-run-when-dockerised/).

To unblock myself and deliver on time, I managed to hack a solution. In the build pipeline, instead of compiling the source to create a jar and containerize that, I packaged the source repository and used the gradle wrapper to run that code when the container starts. It worked but it had a few problems:
1. ❗️The images were almost 1 GB. Our typical service is around 350 MB out of which 195 MB is the Distroless Java 11 itself.
1. ❗️The startup was slow as gradle was starting first and then booting the app.
1. ❗️The image wasn't self-sufficient and I had to inject Artifactory credentials at runtime to start the container so that gradle can authenticate and validate dependencies.

All of these made the solution less than ideal. 

In the following days, when I had more time, I kept looking into the issue and found the following issues on Github and Apache BEAM project
* [Files from classpath are not properly resolved when classpath JAR contains META-INF with references to other dependencies](https://github.com/GoogleCloudPlatform/DataflowJavaSDK/issues/538)
* [DataflowRunner support for Class-Path jars](https://issues.apache.org/jira/browse/BEAM-1325)

The above seemed related but still focused on different problems and not related specifically to SpringBoot so I also created a 🐞[BUG ticket](https://issues.apache.org/jira/browse/BEAM-9669) with details.


### Solution
Reading through different comments, I saw a a suggestion to use `maven-shade-plugin` and because we were using gradle, I learnt that there is something similar called [Shadow Gradle plugin](https://imperceptiblethoughts.com/shadow/)

Sharing what it is from their page:
> Shadow is a Gradle plugin for combining a project's dependency classes and resources into a single output Jar. The combined Jar is often referred to a fat-jar or uber-jar. Shadow utilizes JarInputStream and JarOutputStream to efficiently process dependent libraries into the output jar without incurring the I/O overhead of expanding the jars to disk.
> 
> Shadowing a project output has 2 major use cases:
> 1. Creating an executable JAR distribution.
> 2. Bundling and relocating common dependencies in libraries to avoid classpath conflicts

👨🏻‍💻I gave it a try and it worked. ✨

### Configuration
This is my `build.gradle.kts` configuration:
```kotlin
// shadow config
tasks.withType<ShadowJar> {
    isZip64 = true
    // Required for Spring
    mergeServiceFiles()
    append("META-INF/spring.handlers")
    append("META-INF/spring.schemas")
    append("META-INF/spring.tooling")
    transform(PropertiesFileTransformer().apply {
        paths = listOf("META-INF/spring.factories")
        mergeStrategy = "append"
    })
}
```

Shadow compiles the file to a jar with `-all.jar` suffix. This is the final Dockerfile:
```
FROM gcr.io/distroless/java:11
VOLUME /tmp
COPY build/libs/dataExtractor-0.0.1-all.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-Dspring.profiles.active=${ENV_SPRING_PROFILE}", "-jar", "/app.jar"]
```

This solved the problems:
* ✅ The image is 340 MB and that is close to expected.
* ✅ Startup times are similar to expected.
* ✅ No more injected Artifactory credentials. I rotated the credentials that were used for the hack.
