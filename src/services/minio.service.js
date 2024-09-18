const Minio = require('minio');
const config = require('../config/config');

const minioClient = new Minio.Client({
  endPoint: config.minio.endPoint,
  port: config.minio.port,
  useSSL: config.minio.useSSL,
  accessKey: config.minio.access_key,
  secretKey: config.minio.secret_key,
});

const { bucketName } = config.minio;

const listBucket = async () => {
  console.log({
    endPoint: config.minio.endPoint,
    port: config.minio.port,
    useSSL: config.minio.useSSL,
    accessKey: config.minio.access_key,
    secretKey: config.minio.secret_key,
  })
  try {
    const buckets = await minioClient.listBuckets();
    return buckets;
    // console.log('Success', buckets);
  } catch (err) {
    return err
    // console.log(err.message);
  }
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
  try {
    minioClient.putObject(bucketName, objectName, fileStream);
  } catch (err) {
    // console.log(err);
  }
};

const removeObject = async (objectName) => {
  try {
    minioClient.removeObject(bucketName, objectName);
  } catch (err) {
    // console.log(err);
  }
};

module.exports = {
  listBucket,
  listObject,
  removeObject,
  putObject,
};
