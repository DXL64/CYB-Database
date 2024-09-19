const Minio = require('minio');
const config = require('../config/config');

const minioClient = new Minio.Client({
  endPoint: config.minio.endPoint,
  port: config.minio.port,
  useSSL: config.minio.useSSL,
  accessKey: config.minio.access_key,
  secretKey: config.minio.secret_key,
});

const bucketName = config.minio.bucket_name;

const listBucket = async () => {
  console.log({
    endPoint: config.minio.endPoint,
    port: config.minio.port,
    useSSL: config.minio.useSSL,
    accessKey: config.minio.access_key,
    secretKey: config.minio.secret_key,
  })
  const buckets = await minioClient.listBuckets();
  return buckets;
};

const listObject = async () => {
  const data = [];
  const stream = minioClient.listObjects(bucketName, '', true);
  stream.on('data', function (obj) {
    data.push(obj);
  });
  stream.on('end', function () {
    // console.log(data);
  });
  stream.on('error', function () {
    // console.log(err);
  });
};

const putObject = async (objectName, fileStream) => {
  return minioClient.putObject(bucketName, objectName, fileStream);
};

const removeObject = async (objectName) => {
  minioClient.removeObject(bucketName, objectName);
};

const createBucket = async () => {
  const isExist = await minioClient.bucketExists(bucketName)
  if (!isExist) {
    await minioClient.makeBucket(bucketName)
  }
}

module.exports = {
  listBucket,
  listObject,
  removeObject,
  putObject,
  createBucket
};
