#!/bin/bash

# Leverage oc to deploy the PPR API to an openshift environment

: ${NAME_PLATE:?"NAME_PLATE environment variable is required"}
: ${ENVIRONMENT:?"ENVIRONMENT environment variable is required"}
: ${SOURCE_TAG:?"SOURCE_TAG environment variable is required"}
: ${AUTH_API_URL:?"AUTH_API_URL environment variable is required"}
: ${PAY_API_URL:?"PAY_API_URL environment variable is required"}
: ${ROUTE_URL:?"ROUTE_URL environment variable is required"}

env_namespace=${NAME_PLATE}-$ENVIRONMENT
tools_namespace=${NAME_PLATE}-tools
source_tag=$SOURCE_TAG
target_tag=$ENVIRONMENT

# the subpath to the PPR ui
APP_PATH=/cooperatives/ppr
# APP_PATH=/cooperatives/ppr-bg
# To revert to a root context (say when PPR has it's own domain
# APP_PATH=/
# To revert to a PPR specific context (say when PPR can be hosted at bcregistry.ca/ppr
# APP_PATH=/ppr

echo "PPR_GROUP=$PPR_GROUP
APP_NAME=$APP_UI_NAME
APP_PATH=$APP_PATH
CADDY_CONFIG=$CADDY_CONFIG
APP_CONFIG=$APP_CONFIG
IMAGE_TAG=$IMAGE_TAG
ROUTE_HOST=$HOST
API_URL=$API_URL
AUTH_URL=$AUTH_URL
LAUNCH_DARKLY_CLIENT_KEY=$LAUNCH_DARKLY_CLIENT_KEY
SENTRY_DSN=$SENTRY_DSN
SENTRY_ENVIRONMENT=$SENTRY_ENVIRONMENT
" > .env.dc

echo ".env.dc"
cat .env.dc


# Process and apply the deployment config
echo "oc process -f ppr-ui-dc.yaml --param-file=.env.dc | oc -n $DEPLOY_TARGET apply -f -"
oc process -f ppr-ui-dc.yaml --param-file=.env.dc | oc -n $DEPLOY_TARGET apply -f -



oc process here

oc tag ppr-ui:$source_tag ppr-ui:$target_tag -n $tools_namespace

# Wait for rollout to finish
oc rollout status dc/ppr-ui -w --timeout=10m -n $env_namespace
