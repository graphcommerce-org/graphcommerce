#!/bin/bash

# Skip the build when the commit message ends with [skip-ci]
# 
# https://vercel.com/docs/platform/projects#ignored-build-step
# https://vercel.com/support/articles/how-do-i-use-the-ignored-build-step-field-on-vercel

echo "VERCEL_GIT_COMMIT_MESSAGE: $VERCEL_GIT_COMMIT_MESSAGE"

git diff --quiet HEAD^ HEAD ./$1 && echo "🛑 - No changes in subfolder" && exit 1

if [[ "$VERCEL_GIT_COMMIT_MESSAGE" == "Merge pull request"* ]] ; then
  echo "🛑 - Build skipped, commits starts with 'Merge pull request'"
  exit 0;
else
  exit 1;
fi
