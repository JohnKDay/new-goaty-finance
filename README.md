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
- A [Quandl API key](https://docs.quandl.com/docs#section-authentication) for stock ticker lookup.

To deploy the application with DeepFactor instrumentation you will also need:

- Registred account with [DeepFactor](https://my.deepfactor.io/register)
- Deployed a DeepFactor portal in [VMware](https://docs.deepfactor.io/hc/en-us/articles/360052676033-How-to-Install-DeepFactor-on-VMware-ESXi) or [AWS](https://docs.deepfactor.io/hc/en-us/articles/360052479194--Installing-DeepFactor-Using-an-AWS-CloudFormation-Template)

---

## Usage

### Instrument and deploy existing goaty-apps containers 
- `cd` into the cloned repository (e.g. `cd goaty-finance`)  
- Login into the DeepFactor Portal, download and replace `Dockerfile.alpine.df` and `Dockerfile.glibc.df`. 
- Run the `DFinstrument.sh [source] [destination]` command to instrument the container images.
- If the destination registry server was different than `localhost:32000` edit the `K8s-goaty-finance-instrumented.yaml` file and edit the "image:" locations.
- Deploy the goaty-apps appliction by running `kubectl apply -f K8s-goaty-finance-instrumented.yaml` command.
- Instrumented results will begin to show up in the DeepFactor Portal
 

### To deploy without DeepFactor instrumentation:

- `cd` into the cloned repository (e.g. `cd goaty-finance`)
- Export the QUANDL API key you obtained as REACT_APP_QUANDL_KEY

  `export REACT_APP_QUANDL_KEY="B0GUSK3Y1NF0"`

- Build and deploy the Goaty-finance appliction

  `skaffold run -d <repository>`

This will build, push images and deploy the goaty-finance application to the Kubnerntes cluster.


### OLD METHOD
### To deploy with DeepFactor instumenation

- Extract and export the DF_ENV_TOKEN found in your DeepFactor portal instance
  (e.g. `Step 2 Set your auth token` from ADD APPLICTION USING TERMINAL for DEB based distrubtions)
- Modify the Dockerfile.df found in each appliction directory using the `Dockerfile.alpine.df` and `Dockerfile.glibc.df` as a guide.
- `skaffold run -p df -d <repository>`

## Support

Please [Submit a request](https://docs.deepfactor.io/hc/en-us/requests/new) for support.
