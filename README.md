# Goaty-finance app for DeepFactor demo

An example application in a Kuberentes CI setting to demonstrate the capabilities of DeepFactor for a developer

## Table of Contents

- [Prerequisites](#Prerequisites)
- [Usage](#usage)
- [Support](#support)

---

## Prerequisites

- A Linux distribution with the following applications:
  - [Docker engine](https://docs.docker.com/engine/install/)
  - [kubectl binary](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
  - [skaffold binary](https://skaffold.dev/docs/install/)
- A container registry with ability to push images from referenced Linux machine above
- Access to a kubernetes cluster (local or remote)

To deploy the application with DeepFactor instrumentation you will also need:

- Registred account with [Deepfactor](https://my.deepfactor.io/register)
- Deployed a DeepFactor portal in [VMware](https://docs.deepfactor.io/hc/en-us/articles/360052676033-How-to-Install-DeepFactor-on-VMware-ESXi) or [AWS](https://docs.deepfactor.io/hc/en-us/articles/360052479194--Installing-DeepFactor-Using-an-AWS-CloudFormation-Template)

---

## Usage

### To deploy without DeepFactor instrumentation:

- `cd` into the cloned repository (e.g. `cd goaty-finance`)
- `skaffold run -d <repository>`

This will build, push images and deploy the goaty-finance application to the Kubnerntes cluster.

### To deploy with DeepFactor instumenation

- Extract and export the DF_ENV_TOKEN found in your DeepFactor portal instance
  (e.g. `Step 2 Set your auth token` from ADD APPLICTION USING TERMINAL for DEB based distrubtions)
- `skaffold run -p df -d <repository>`

## Support

Please [Submit a request](https://docs.deepfactor.io/hc/en-us/requests/new) for support.
