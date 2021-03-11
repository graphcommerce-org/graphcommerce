#!/bin/bash

# Skip the build when the commit message ends with [skip-ci]
# 
# https://vercel.com/docs/platform/projects#ignored-build-step
# https://vercel.com/support/articles/how-do-i-use-the-ignored-build-step-field-on-vercel

echo "VERCEL_GIT_COMMIT_MESSAGE: $VERCEL_GIT_COMMIT_MESSAGE"

if [[ "$VERCEL_GIT_COMMIT_MESSAGE" == *"[skip-ci]" ]] ; then
  # Don't build
  echo "🛑 - Build cancelled, commit message ends with [skip-ci]"
  exit 0;
else
  exit 1;
fi
