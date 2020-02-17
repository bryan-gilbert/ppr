#!/bin/bash

# Leverage oc to deploy the PPR UI to an openshift environment

: ${API_URL:?"API_URL environment variable is required"}
: ${AUTH_API_URL:?"AUTH_API_URL environment variable is required"}
: ${ENVIRONMENT:?"ENVIRONMENT environment variable is required"}
: ${OC_DEPLOY_PROJECT:?"OC_DEPLOY_PROJECT environment variable is required"}
: ${OC_TOOLS_PROJECT:?"OC_TOOLS_PROJECT environment variable is required"}
: ${PAY_API_URL:?"PAY_API_URL environment variable is required"}
: ${ROUTE_HOST:?"ROUTE_HOST environment variable is required"}
: ${SOURCE_TAG:?"SOURCE_TAG environment variable is required"}

_


deploy_namespace=${OC_DEPLOY_PROJECT}
tools_namespace=${OC_TOOLS_PROJECT}
source_tag=$SOURCE_TAG
target_tag=$ENVIRONMENT

# the subpath to the PPR ui
APP_PATH=/cooperatives/ppr
# APP_PATH=/cooperatives/ppr-bg
# To revert to a root context (say when PPR has it's own domain
# APP_PATH=/
# To revert to a PPR specific context (say when PPR can be hosted at bcregistry.ca/ppr
# APP_PATH=/ppr

APP_BASE=ppr-ui
# Optinally add something to the base name to indentify special situations such as a exploratory or a PR deployment
APP_TAG=
#APP_TAG=bg
APP_NAME=$APP_BASE$APP_TAG
PPR_GROUP=$APP_NAME
APP_CONFIG=ppr-web-ui-config$APP_TAG
CADDY_CONFIG=$APP_NAME-caddy-config$APP_TAG

echo "API_URL=$API_URL
APP_NAME=$APP_NAME
APP_PATH=$APP_PATH
APP_CONFIG=$APP_CONFIG
AUTH_API_URL=$AUTH_API_URL
CADDY_CONFIG=$CADDY_CONFIG
IMAGE_TAG=$IMAGE_TAG
LAUNCH_DARKLY_CLIENT_KEY=$LAUNCH_DARKLY_CLIENT_KEY
PAY_API_URL=$PAY_API_URL
PPR_GROUP=$PPR_GROUP
ROUTE_HOST=$ROUTE_HOST
SENTRY_DSN=$SENTRY_DSN
SENTRY_ENVIRONMENT=$ENVIRONMENT
" > .env.dc

echo ".env.dc"
cat .env.dc

oc process -f ppr-ui-dc.yaml --param-file=.env.dc | oc -n $deploy_namespace apply -f -

oc tag ppr-ui:$source_tag ppr-ui:$target_tag -n $tools_namespace

# Wait for rollout to finish
oc rollout status dc/ppr-ui -w --timeout=10m -n $deploy_namespace
