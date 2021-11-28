#!/bin/bash

sourceDir="../schema/pb"
distDir="./src/pb"

mapfile -t folders < <(find "${sourceDir}" -type d -printf "%P\\n")
mapfile -t schemes < <(find "${sourceDir}" -type f -name "*.proto" -printf "%P\\n")

for folder in "${folders[@]}"; do
  if [ "${folder}" != "" ]; then
    mkdir -p "${distDir}/${folder}"
  fi
done

for scheme in "${schemes[@]}"; do
  parsedScheme=$(echo "${scheme}" | cut -f 1 -d ".")
  npx pbjs -t static-module -w es6 -o "${distDir}/${parsedScheme}".js "${sourceDir}/${parsedScheme}".proto
  npx pbts -o "${distDir}/${parsedScheme}".d.ts "${distDir}/${parsedScheme}".js
done
