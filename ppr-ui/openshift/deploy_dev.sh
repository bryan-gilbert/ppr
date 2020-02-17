#!/bin/bash

# common prefix for labels applied to openshift resources
APP_BASE=ppr-ui
# Optinally add something to the base name to indentify special situations such as a exploratory or a PR deployment
APP_TAG=
#APP_TAG=-bg

# Deploy PPR UI to the development environment

export API_URL=https://ppr-api-dev.pathfinder.gov.bc.ca/
export APP_NAME=$APP_BASE$APP_TAG
export AUTH_API_URL=https://dev.bcregistry.ca/cooperatives/auth/
export OC_DEPLOY_PROJECT=1rdehl-dev
export OC_TOOLS_PROJECT=zwmtib-tools
export ENVIRONMENT=dev
export IMAGE_TAG=dev
export LAUNCH_DARKLY_CLIENT_KEY=5ddc05785933410824ecf5ab
export PAY_API_URL=https://pay-api-dev.pathfinder.gov.bc.ca/api/v1
export ROUTE_HOST=dev.bcregistry.ca
export SENTRY_DSN=https://c0eaad46fd3c490882ef1402713c7e6a@sentry.io/1834187
export SENTRY_ENVIRONMENT=Dev
export SOURCE_TAG=latest


./deploy_ppr_ui.sh


 
