#!/bin/bash

# Skip the build when the commit message ends with [skip-ci]
# 
# https://vercel.com/docs/platform/projects#ignored-build-step
# https://vercel.com/support/articles/how-do-i-use-the-ignored-build-step-field-on-vercel

echo $PWD
ls

if git diff --quiet HEAD^ HEAD ./$1; then 
  echo "🛑 - No changes in subfolder"
  exit 1
fi

if [[ "$VERCEL_GIT_COMMIT_MESSAGE" == "Merge pull request"* ]] ; then
  echo "🛑 - Build skipped, commits starts with 'Merge pull request'"
  exit 0;
else
  exit 1;
fi
