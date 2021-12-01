#!/bin/bash

# .proto ファイルが入っている GitHub 上のフォルダ
sourceDir="https://github.com/hackathon-21winter-05/oauth_ws_practice/tree/main/schema/pb"
# .proto ファイルたちのダウンロード先 (後で削除されます)
tempDir="./pb"
# 生成したいコードのフォルダ
distDir="./src/pb"

dlDir="${sourceDir/"tree/main"/"trunk"}"
svn export ${dlDir} ${tempDir} --force

mapfile -t folders < <(find "${tempDir}" -type d -printf "%P\\n")
mapfile -t schemes < <(find "${tempDir}" -type f -name "*.proto" -printf "%P\\n")

for folder in "${folders[@]}"; do
  if [ "${folder}" != "" ]; then
    mkdir -p "${distDir}/${folder}"
  fi
done

for scheme in "${schemes[@]}"; do
  parsedScheme=$(echo "${scheme}" | cut -f 1 -d ".")
  npx pbjs -t static-module -w es6 -o "${distDir}/${parsedScheme}".js "${tempDir}/${parsedScheme}".proto
  npx pbts -o "${distDir}/${parsedScheme}".d.ts "${distDir}/${parsedScheme}".js
done

rm -rf "${tempDir}"
