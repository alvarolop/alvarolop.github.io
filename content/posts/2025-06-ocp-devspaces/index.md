---
title: "OCP DevSpaces: The GitOps Way"
date: 2025-07-10
draft: false
params:
  author: Álvaro López
tags: ["openshift", "developers", "tools"]
categories: ["OpenShift Basics"]

description: "A comprehensive guide to OpenShift Dev Spaces, its upstream project, and how to deploy it using GitOps"
summary: "A comprehensive guide to OpenShift Dev Spaces, its upstream project, and how to deploy it using GitOps"

# https://github.com/wowchemy/wowchemy-hugo-themes/issues/978

resources:
- name: "featured-image"
  src: "featured-image.png"
---

OpenShift Dev Spaces is a powerful developer workspace platform that provides consistent, secure, and zero-configuration development environments. In this post, we'll explore what Dev Spaces is, its benefits, and how to deploy it using GitOps.

{{< admonition type=tip title="Tip" open=true >}}
All the code and configurations mentioned in this post are available in my GitHub repository: [alvarolop/ocp-devspaces](https://github.com/alvarolop/ocp-devspaces).
{{< /admonition >}}


## What is OpenShift Dev Spaces?

OpenShift Dev Spaces is the enterprise version of Eclipse Che, an open-source developer workspace server and cloud IDE. It enables developers to create pre-configured development environments that run directly in OpenShift clusters, making it easier to maintain consistency across development teams and reduce the time spent on environment setup.



## Why Should You Care?

There are several compelling reasons to consider OpenShift Dev Spaces for your organization:

1. **Consistency**: Dev Spaces ensures that all developers work in identical environments, eliminating the "it works on my machine" problem.

2. **Security**: All development environments are contained within your OpenShift cluster, providing better control over source code and dependencies.

3. **Zero Configuration**: Developers can start coding immediately without spending time setting up their local development environment.

4. **Resource Efficiency**: Development environments can be started and stopped as needed, optimizing cluster resource usage.

5. **Built-in IDE**: Dev Spaces comes with a browser-based VS Code-like IDE, making it accessible from any device with a web browser.



## OpenShift Deployment


### What will be installed?

In my GitHub repository, I maintain an ArgoCD application that simplifies the deployment of Dev Spaces. The application uses Kustomize for configuration management and creates several key components:

1. **Namespace**: Creates the `openshift-devspaces` namespace where all Dev Spaces components will be deployed.

2. **Operator Subscription**: Instals the operator using OLM.

3. **CheCluster Custom Resource**: Defines the Dev Spaces cluster configuration, including:
   - Server components configuration
   - Dashboard settings
   - Devfile registry setup
   - Image puller configuration for pre-pulling container images
   - Metrics enablement

4. **Kubernetes Image Puller** operator:
   - This optional operator automatically pre-pulls container images used by Dev Spaces (or any other application).
   - Improves workspace startup time by having images readily available on nodes.
   - Configured through `k8s-image-puller/kip-image-puller.yaml`.
   - Currently, only the `che-server` image is pre-pulled, but you can add more images as needed.

5. **Monitoring Setup**:
   - **ServiceMonitor** for the DevWorkspace controller. 
   - Custom **Grafana Dashboard** for Dev Spaces metrics.
  
6. **Custom Dev File**:
   - A custom workspace to deploy an environment ready to run. You can find it [here](https://raw.githubusercontent.com/rht-labs/enablement-framework/main/codereadyworkspaces/tl500-devfile-v2.yaml?che-editor=che-incubator/che-code/latest).
   - Adding custom Dev Files is as simple as creating a ConfigMap with certain labels in the `openshift-devspaces` namespace.




### How to Deploy?

To use my GitOps configuration, you just need to create a new ArgoCD application pointing to my repository:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: ocp-devspaces
  namespace: openshift-gitops
spec:
  destination:
    server: 'https://kubernetes.default.svc'
  project: default
  source:
    path: gitops
    repoURL: https://github.com/alvarolop/ocp-devspaces.git
    targetRevision: main
  syncPolicy:
    automated:
      prune: false
      selfHeal: false
```

With this GitOps-based setup, you can easily deploy and manage Dev Spaces across your OpenShift clusters, providing your development teams with a powerful, consistent, and secure development environment.


{{< admonition type=success title="Success" open=true >}}
That's it! You now have a fully functional OpenShift Dev Spaces environment deployed using GitOps. You can start creating workspaces, managing projects, and collaborating with your team seamlessly.
{{< /admonition >}}


## Using Dev Spaces

WIP


## Conclusion

OpenShift Dev Spaces is a game-changer for development teams, providing a consistent, secure, and efficient way to manage development environments. By leveraging GitOps for deployment, you can ensure that your Dev Spaces setup is reproducible, manageable, and scalable.
