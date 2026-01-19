#!/bin/bash

# 构建项目
npm run build

# 进入构建目录
cd dist

# 初始化 git 仓库
git init
git add -A
git commit -m 'deploy'

# 推送到 Gitee 的 gh-pages 分支
# 请将 <USERNAME> 替换为你的 Gitee 用户名
# git push -f git@gitee.com:<USERNAME>/office-space.git main:gh-pages

cd -
