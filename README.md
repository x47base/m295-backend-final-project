# m295-backend-final-project
Project: Modul 295 Final Project
Author: Samuel Spink

## How to Use
1. Start a Folder in the cloned repository path.
2. Install all packages (`npm install`)
3. Run the api (`node .\src\main.js`)

## API Dokumentation
Swagger-HTML-File: `.\src\docs\Swagger-Documentation.html`

Swagger-JSON-File: `.\src\docs\swagger.json`

Api: [API-Endpoint-Link](http://localhost:3000/api-docs)

## Testing
Tool: `Insomnia`

Request-Collection-File: `.\src\docs\Insomnia_2024-04-19.json`

Error-Request-Collection-File: `.\src\docs\Insomnia_2024-04-19-error-cases.json`

## Docker Image
```BASH
docker build -t ghcr.io/x47base/taskapp:v2 .
docker push ghcr.io/x47base/taskapp:v2
```

## Kubernetes Setup
```BASH
kubectl apply -f k8s/webapp-deployment.yaml
kubectl apply -f k8s/webapp-route.yaml
kubectl get routes
```
### Output:
```BASH
deployment.apps/taskapp-deployment created
service/taskapp-service configured
horizontalpodautoscaler.autoscaling/taskapp configured
route.route.openshift.io/taskapp configured
NAME        HOST/PORT                                                       PATH   SERVICES          PORT        TERMINATION     WILDCARD
taskapp     taskapp-243635-samspi.apps.exoscale-ch-gva-2-0.appuio.cloud            taskapp-service   8080        edge/Redirect   None
```

## Tech-Stack:
### Container
- Docker
- Kubernetes

### API-Endpoints
- ExpressJS
- JsonWebToken
- Swagger-UI-Express
- Swagger-Autogen
