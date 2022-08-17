#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

## Do not automatically trigger build when pull-requesting into `deploy` branch.
if [[ "$VERCEL_GIT_COMMIT_REF" == "candidate/"* ]] ; then
  # Proceed with the build.
    echo "✅ - Preview build can proceed"
  exit 1;

else
  # Don't build.
  echo "🛑 - Preview build cancelled"
  exit 0;
fi
