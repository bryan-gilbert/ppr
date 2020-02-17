#!/usr/bin/env bash

# Control settings:
apply=true    # if dry run is true then forgo actual push to openshift
intermediateImage=false   # if true then oc apply the ui intermediate on tools
caddyImage=false        # if true then oc apply the ui image on tools
dobuild=false   # if true then oc build the above
deploy=true     # if true then oc apply the deploy config to target

target=dev      # dev or test or later prod
#target=test
#target=prod

# Parameter setup

# Git repo values as used in the yaml config files:
REPO=https://github.com/bcgov/ppr
BRANCH=master

# sample how to build from a repo and/or branch
#REPO=https://github.com/bryan-gilbert/ppr
#BRANCH=caddyExper

# common prefix for labels applied to openshift resources
APP_BASE=ppr-ui
#APP_BASE=ppr-oct

# Optinally add something to the base name to indentify special situations such as a exploratory or a PR deployment
APP_TAG=
#APP_TAG=-bg

# the subpath to the PPR ui
APP_PATH=/cooperatives/ppr
# APP_PATH=/cooperatives/ppr-bg
# To revert to a root context (say when PPR has it's own domain
# APP_PATH=/
# To revert to a PPR specific context (say when PPR can be hosted at bcregistry.ca/ppr
# APP_PATH=/ppr


# Parameter setup based on above parameters and settings
 
APP_NAME=$APP_BASE$APP_TAG
APP_UI_NAME=$APP_BASE$APP_TAG
APP_INTER_NAME=$APP_BASE-inter$APP_TAG

# PPR_GROUP
# This label is applied to all resources (buildconfigs, deployconfigs, images, routes, services, etc
# created by these openshift configuration files.  Usage includes get, describe and delete all
# of these resources.  See the echo at the end of this file.
PPR_GROUP=$APP_NAME

APP_CONFIG=ppr-web-ui-config$APP_TAG
CADDY_CONFIG=$APP_NAME-caddy-config$APP_TAG

if [ $target == dev ]
then
    IMAGE_TAG=dev
    HOST=dev.bcregistry.ca
    DEPLOY_TARGET=1rdehl-dev
    API_URL=https://ppr-api-dev.pathfinder.gov.bc.ca/
    AUTH_API_URL=https://dev.bcregistry.ca/cooperatives/auth/
    LAUNCH_DARKLY_CLIENT_KEY=5ddc05785933410824ecf5ab
    SENTRY_DSN=https://c0eaad46fd3c490882ef1402713c7e6a@sentry.io/1834187
    SENTRY_ENVIRONMENT=Dev
fi
if [ $target == test ]
then
    IMAGE_TAG=test
    HOST=test.bcregistry.ca
    DEPLOY_TARGET=1rdehl-test
    API_URL=https://ppr-api-test.pathfinder.gov.bc.ca/
    AUTH_URL=https://test.bcregistry.ca/cooperatives/auth/
    LAUNCH_DARKLY_CLIENT_KEY=5ddc05785933410824ecf5ab
    SENTRY_DSN=https://c0eaad46fd3c490882ef1402713c7e6a@sentry.io/1834187
    SENTRY_ENVIRONMENT=Test
fi
# TODO prod


# Build and run:

# Intermediate build -- makes the Web UI image
if [ $intermediateImage == true ]
then
    # For the intermediate buildconfig
    echo "PPR_GROUP=$PPR_GROUP
APP_NAME=$APP_INTER_NAME
APP_PATH=$APP_PATH
GIT_URI=$REPO
GIT_REF=$BRANCH
" > .env.inter
    # Process and apply the build configs
    echo ".env.inter"
    cat .env.inter
    if [ $apply == true ] 
    then
        echo "will run oc process"
        echo "oc process -f ppr-ui-inter-bc.yaml --param-file=.env.inter | oc -n zwmtib-tools apply -f -"
        oc process -f ppr-ui-inter-bc.yaml --param-file=.env.inter | oc -n zwmtib-tools apply -f -
    fi
fi

# Build - combine the intermediate iamge with caddy image
if [ $caddyImage == true ]
then
    # For buildconfig
    echo "PPR_GROUP=$PPR_GROUP
APP_NAME=$APP_UI_NAME
APP_INTER_NAME=$APP_INTER_NAME
APP_INTER_TAG=latest
APP_PATH=$APP_PATH
" > .env.bc
    echo ".env.bc"
    cat .env.bc
    if [ $apply == true ] 
    then
        echo "will run oc process"
        echo "oc process -f ppr-ui-bc.yaml --param-file=.env.bc | oc -n zwmtib-tools apply -f -"
        oc process -f ppr-ui-bc.yaml --param-file=.env.bc | oc -n zwmtib-tools apply -f -
    fi
fi

if [ $dobuild == true ]
then
    echo "Kick off the intermediate build from the command line and see our logs (because it takes up to 12 minutes)"
    echo "and then kick off the caddy image build"
    if [ $dryrun == false ] 
    then
        echo "oc start-build $APP_INTER_NAME --follow --wait  &&  oc start-build $APP_UI_NAME"
        oc start-build $APP_INTER_NAME --follow --wait  &&  oc start-build $APP_UI_NAME
    fi
fi

if [ $deploy == true ]
then
    echo "Deploy to $DEPLOY_TARGET"
    # For deploy
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
    if [ $apply == true ] 
    then
        # Process and apply the deployment config
        echo "oc process -f ppr-ui-dc.yaml --param-file=.env.dc | oc -n $DEPLOY_TARGET apply -f -"
        oc process -f ppr-ui-dc.yaml --param-file=.env.dc | oc -n $DEPLOY_TARGET apply -f -
    fi
fi

echo "

# To retag an image
    oc tag per-ui:latest per-ui:dev
    oc tag $APP_UI_NAME:latest $APP_UI_NAME:dev
    oc tag $APP_UI_NAME:dev $APP_UI_NAME:test
# To list all related resources
    oc -n zwmtib-tools get all -l pprgroup=$PPR_GROUP
    oc -n 1rdehl-dev get all,configmap -l pprgroup=$PPR_GROUP
# To clean up all related resources
    oc -n zwmtib-tools delete all -l pprgroup=$PPR_GROUP
    oc -n 1rdehl-dev delete all,configmap -l pprgroup=$PPR_GROUP
"
