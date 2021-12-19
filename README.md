# Micro Services

#### Challenges

- Data Management between Services
  - Each service might have a separate database.(Database-per-service).
  - Each service should never reach to other service DB directly.
  - Two strategies to communicate
    - Sync Communication - Services communicate with each other directly using direct request, which could be http request or json exchange or anything to exchange data. lots of deps and the response is as fast as the slowest request.
    - Async Communication - Services communicate with each other using Events.

#### Deployment for microservices

- We will use Docker and create containers for each service.
- Docker wraps everything that is needed for a program and how to start and run it.
- Kubernetes is a tool to run bunch of containers.
- Kubernetes will run the container and manage the communication between these containers.

##### Kubernetes

- If windows has issue

  - minikube start --vm=true
  - minikube start --driver=hyperv
  - minikube start --driver=virtualbox

- Docker container runs inside a Pod, and a Pod can run multiple containers inside it.
- Kubernetes Cluster - collections of node + a master to manage them
- Node - VM that will run containers.
- Deployment - Monitors a set of pods, make sure they are running and restart them if they crash.
- Service - Provides an easy to remember URL to access a running container

- Config file -

  - Tells Kubs about the different Objects(pods, services, etc) we want to create

- To use a yaml file in kubectl

  - `kubectl apply -f <yaml-file>`

- To see all pods running `kubectl get pods`

- To know about deployment `kubectl describe deployment <deploymentName>`

- To restart kubectl deployment `kubectl rollout restart deployment <deploymentName>`

- Types of Services:

  - Cluster IP - Sets up easy to remember URL to access a pod. `Only exposes pods in the cluster`.
  - Node Port - Makes pods `accessible from outside cluster`. Usually only used for dev purposes.
  - Load Balancer - Makes a pod `accessible from outside the cluster`. This is the right way to expose pod to the outside world.
  - External Name - Redirects an in cluster request to a CNAME url.

- Load balancer service

  - Tells kubernetes to reach out to its provider and provision a load balancer, Gets traffic in to a single pod.

- Ingress or Ingress Controller

  - A pod with a set of config of routing rules to distribute traffic to other services. (https://kubernetes.github.io/ingress-nginx/deploy/#quick-start)
  - `kubectl get pods --namespace=ingress-nginx`

- Ingress Controller will scan all the config file and look for one that has a annotations like

```js
  annotations:
  kubernetes.io/ingress.class: nginx

```

- To find what is running on certain port, for example 80 in windows machine `netstat -aon | findstr :80` on mac `sudo lsof -i tcp:80`
