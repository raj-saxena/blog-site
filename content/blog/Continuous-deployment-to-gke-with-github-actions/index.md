---
title: Continuous Deployment to GKE with Github Actions.
date: "2020-08-11T12:00:00.000Z"
description: "Continuously (and securely) deploying to private kubernetes cluster with Github Actions"
# featured: './data-extractor.png'
---

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
