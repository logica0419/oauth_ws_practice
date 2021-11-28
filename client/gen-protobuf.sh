#!/bin/bash

schemeFolders=(rest ws)
schemes=(rest/me rest/code rest/redirect ws/message)

for schemeFolder in "${schemeFolders[@]}"; do
  mkdir -p src/pb/"$schemeFolder"
done

for scheme in "${schemes[@]}"; do
  npx pbjs -t static-module -w es6 -o./src/pb/"$scheme".js ../schema/pb/"$scheme".proto
  npx pbts -o ./src/pb/"$scheme".d.ts ./src/pb/"$scheme".js
done
