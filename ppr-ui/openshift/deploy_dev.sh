#!/bin/bash

# Deploy PPR UI to the development environment

export NAME_PLATE=1rdehl
export ENVIRONMENT=dev
export SOURCE_TAG=latest

export PAY_API_URL=https://pay-api-dev.pathfinder.gov.bc.ca/api/v1
export ROUTE_URL=ppr-api-dev.pathfinder.gov.bc.ca

export IMAGE_TAG=dev
export HOST=dev.bcregistry.ca
export DEPLOY_TARGET=1rdehl-dev
export API_URL=https://ppr-api-dev.pathfinder.gov.bc.ca/
export AUTH_URL=https://dev.bcregistry.ca/cooperatives/auth/
export LAUNCH_DARKLY_CLIENT_KEY=5ddc05785933410824ecf5ab
export SENTRY_DSN=https://c0eaad46fd3c490882ef1402713c7e6a@sentry.io/1834187
export SENTRY_ENVIRONMENT=Dev


./deploy_ppr_ui.sh


 
