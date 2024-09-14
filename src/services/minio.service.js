const Minio = require('minio')
const config = require('../config/config')

const minioClient = new Minio.Client({
    endPoint: config.minio.endPoint,
    port: config.minio.port,
    useSSL: config.minio.useSSL,
    accessKey: config.minio.access_key,
    secretKey: config.minio.secret_key,
})

const bucket_name = config.minio.bucket_name

const listBucket = async () => {
    try {
        const buckets = await minioClient.listBuckets()
        console.log('Success', buckets)
    } catch (err) {
        console.log(err.message)
    }
}

const listObject = async () => {
    const data = []
    const stream = minioClient.listObjects(bucket_name, '', true)
    stream.on('data', function (obj) {
        data.push(obj)
    })
    stream.on('end', function (obj) {
        console.log(data)
    })
    stream.on('error', function (err) {
        console.log(err)
    })
}

const putObject = async (object_name, file_stream) => {
    try {
        minioClient.putObject(bucket_name, object_name, file_stream)
    } catch (err) {
        console.log(err)
    }
}

const removeObject = async (object_name) => {
    try {
        minioClient.removeObject(bucket_name, object_name)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    listBucket,
    listObject,
    removeObject,
    putObject,
}