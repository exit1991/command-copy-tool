#!/bin/bash

# パス・ファイル名指定 (ディレクトリの最後にスラッシュはつけない)
SOURCE_HTML_FILE_NAME='index.html'
SOURCE_CSS_FILE_NAME='style.css'
SOURCE_JS_FILE_NAME='main.js'
OUTPUT_FILE_NAME='手順書コピーツール.html'
REPOS_TOP_DIR='../../..'
SOURCE_HTML_PATH="${REPOS_TOP_DIR}/develop/${SOURCE_HTML_FILE_NAME}"
SOURCE_CSS_PATH="${REPOS_TOP_DIR}/develop/assets/css/${SOURCE_CSS_FILE_NAME}"
SOURCE_JS_PATH="${REPOS_TOP_DIR}/develop/assets/js/${SOURCE_JS_FILE_NAME}"
OUTPUT_DIR='.'
OUTPUT_HTML_PATH=${OUTPUT_DIR}/${OUTPUT_FILE_NAME}
TMP_CSS_FILE_NAME='.joincss.tmp'
TMP_JS_FILE_NAME='.joinjs.tmp'

# 出力ファイルコピー
cp ${SOURCE_HTML_PATH} ${OUTPUT_HTML_PATH}

# CSS 一時ファイル作成
cat ${SOURCE_CSS_PATH} | sed -e 's/^.*\/\*.*\*\/.*$//g' -e '/^ *$/d' -e 's/^/        /' | awk '
    BEGIN {print "    <style>"}
          {print $0}
    END   {print "    </style>"}
' > ${OUTPUT_DIR}/${TMP_CSS_FILE_NAME}

# JS 一時ファイル作成
cat ${SOURCE_JS_PATH} | sed -e 's/^ *\/\/.*$//g' -e '/^ *$/d' -e 's/^/            /' | awk '
    BEGIN {
        print "    <script>"
        print "        document.addEventListener('\''DOMContentLoaded'\'', () => {"
    }
    {
        print $0
    }
    END {
        print "        });"
        print "    </script>"
    }
' > ${OUTPUT_DIR}/${TMP_JS_FILE_NAME}

# CSS・JS 置換 (Mac版)
sed -i "" -e "/<link.*${SOURCE_CSS_FILE_NAME}/r ${TMP_CSS_FILE_NAME}" -e "/<link.*${SOURCE_CSS_FILE_NAME}/d" ${OUTPUT_HTML_PATH}
sed -i "" -e "/<script.*${SOURCE_JS_FILE_NAME}/r ${TMP_JS_FILE_NAME}" -e "/<script.*${SOURCE_JS_FILE_NAME}/d" ${OUTPUT_HTML_PATH}

# CSS・JS 置換 (Linux版)
# sed -i -e "/<link.*${SOURCE_CSS_FILE_NAME}/r ${TMP_CSS_FILE_NAME}" -e "/<link.*${SOURCE_CSS_FILE_NAME}/d" ${OUTPUT_HTML_PATH}
# sed -i -e "/<script.*${SOURCE_JS_FILE_NAME}/r ${TMP_JS_FILE_NAME}" -e "/<script.*${SOURCE_JS_FILE_NAME}/d" ${OUTPUT_HTML_PATH}

exit 0
