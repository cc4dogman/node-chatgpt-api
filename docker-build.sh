docker build -t node-chatgpt-api .
IMAGE_ID=$(docker images -q node-chatgpt-api)
echo ${IMAGE_ID}
docker tag ${IMAGE_ID} registry.cn-shanghai.aliyuncs.com/dbb/node-chatgpt-api:1.0.3
docker push registry.cn-shanghai.aliyuncs.com/dbb/node-chatgpt-api:1.0.3