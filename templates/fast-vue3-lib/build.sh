# 清理缓存（dist、node_modules）
# pnpm clear

echo "升级容器的pnpm版本 勿删,其他版本安装依赖有问题"
npm install -g pnpm@9.1.1

echo "开始安装依赖"
# 下载依赖
pnpm install
echo "依赖安装完成"

echo "开始构建包"
# 构建包：utils + components
pnpm build
echo "构建包完成"

echo "开始构建文档包"
# 构建文档包

pnpm docs:build
echo "构建文档包完成"
