---
title: Continuous Deployment to GKE with Github Actions.
date: "2020-08-11T12:00:00.000Z"
description: "Continuously (and securely) deploying to private kubernetes cluster with Github Actions"
featured: './data-extractor.png'
---

### An argument for Continuous Deployment

Let's do a quick refresher of the differences between **Continuous Delivery & Continuous Deployment**

**Continuous Delivery** is when you integrate your code often, run the automated test suite and if they pass, run the build step to create artifacts with each merge to master. Examples of this includes compiling Java code into JARs, building JS bundles, packaging them into docker containers or creating golden machine images. The main purpose is to be able to deploy easily, at any time to any of the environments.

**Continuous Deployment** takes it one step further and means taking each change all the way through the deployment pipeline and releasing it in all the environments automatically. The key principle is to release things in smaller chunks so that there are less chances of things breaking at a bigger level when doing a big bang release.

Although it is not a novel idea, people inexperienced with it are apprehensive about it. Can't blame them as we all have fear of the unknown or the unfamiliar.
It's a shift in thinking and actually improves stability by increasing responsibility because developers are more conscious of what they are merging to master and making sure that the change is working as expected and if not, they are already in the context to fix what might be broken. It also helps to avoid chasing and reminding people to keep deploying the latest versions.

Let's take an example to contrast with the alternative of not deploying immediately - A dev works on a task and merges the code to master. But, it's 5 PM and they don't want to risk pushing the changes to prod now. They promise to do it first thing in the morning. Now, there are a lot of things that can happen between the time that code got merged to when it is actually deployed. 
* Some other dev working on a different task could have merged to master and in wanting to check their change have unknowingly deployed the untested change of the previous task.
* The original dev could have fallen sick.
* The original dev could have moved on to a high priority bug fix.

If something breaks now, it will take more time for the dev to get back into the context and resolve compared to when they were already working on it and the knowledge was fresh.

I understand that there cases where you actually want to be able to change a risky change in a non-prod environment. For this, we first built a mechanism to 🔒 lock deployments from proceeding beyond a certain stage.

Continuous Deployment requires having sufficient automated tests (which you should be doing anyway, right?) to have enough confidence and investment in automated tooling to enable pipelines.

### How we approached it

One of the biggest pain points of the SRE/DevOps/Platform team at my previous employer was managing the Jenkins cluster responsible for CI/CD. A typical self-managed installation has the following problems:
* Auto-scaling with the needs of the day. You need increased capacity to run jobs immediately during the core business hours and reduced capacity otherwise.
* Jobs running on the same shared worker node would sometimes interfere with each other or compete for resources causing an increase in build times or sometimes even timeouts causing flakiness the pipeline.
* Constant software maintenance of the main server and the worker nodes.

In my current organisation, when we were discussing the architecture of the platform, everyone involved has had (painful) experience with some CD server in the past and we all agreed that we didn't want to have a CD server cluster for our own. 
To solve all of the above problems, we decided to go with [Github Actions](https://github.com/features/actions)

Another key piece in our architecture is our **Kubernetes** cluster where services are deployed. We are proudly using [Google Kuberntes Engine](https://cloud.google.com/kubernetes-engine) and so far our experience has been positive as it is easy to manage and scale and eliminates the operation overhead. 
Google Cloud uses Service-Accounts to manage IAM permissions and the offers a `gcloud` cli tool to authorise and configure credentials in the [kubeconfig](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/).

Our applications are packaged as [Helm](https://helm.sh/) charts and configured as per the environment needs. It's important to mention this because `helm` utilises `kubeconfig` to interact with the cluster.

### The challenge
The GKE hardening guide suggests restricting the network access to the kubernetes control plane APIs and selectively enable traffic from trusted IPs. So far, we were using dedicated VPN to connect to the appropriate VPC



### References:
* https://martinfowler.com/bliki/ContinuousDelivery.html
* Google service accounts - https://cloud.google.com/iam/docs/service-accounts
* Hardening GKE cluster - https://cloud.google.com/kubernetes-engine/docs/how-to/hardening-your-cluster
