# Domo

This repository contains the Kubernetes configuration for running the Next.js dashboard application with hot reloading.

## Project Structure

- `dashboard/` - The Next.js application ([details here](dashboard/README.md))
- `helm/` - Helm chart for Kubernetes deployment
- `Dockerfile` - Multi-stage Docker configuration
- `Tiltfile` - Tilt configuration for development workflow with hot reloading

## Quick Start

1. Start your Kubernetes cluster (minikube, kind, or Docker Desktop)
2. Run `tilt up` in the root directory
3. Access the dashboard at http://localhost:3000

For detailed instructions on development with hot reloading, see the [dashboard README](dashboard/README.md). 