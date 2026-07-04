#!/bin/bash

# 设置默认备案号
BEIAN_CODE=${BEIAN_CODE:-}

# 替换 index.html 中的备案号
sed -i "s|window.BEIAN_CODE = '苏ICP备19059864号-2';|window.BEIAN_CODE = '$BEIAN_CODE';|g" /app/dist/index.html

# 启动服务
npm run server
