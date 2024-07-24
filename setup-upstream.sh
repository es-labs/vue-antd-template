#!/bin/bash
# setting up template

# set upstream
UPSTREAM_REPO_URL=https://github.com/es-labs/vue-antd-template.git

## template clone or fork
echo
echo "NOTE: add chmod +x flag for this script to work"
echo "setup-upstream.sh running..."
echo
echo "You must clone new project from template or fork"
echo

git remote add upstream $UPSTREAM_REPO_URL
git remote set-url --push upstream no_push
git remote -v
