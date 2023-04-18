import { ReadStream } from "fs"
import * as Minio from "minio"
import config from "../../config.json"

const fileUpload = async (fileName: string, stream: ReadStream) => {
  const minioClient = new Minio.Client({
    endPoint: config.OSSConfig.endPoint,
    port: config.OSSConfig.port,
    accessKey: config.OSSConfig.accessKey,
    useSSL: false,
    secretKey: config.OSSConfig.secretKey,
  })
  const { bucket } = config.OSSConfig
  await minioClient.putObject(bucket, fileName, stream)
  return getFullUploadPath(bucket, fileName)
}
const getFullUploadPath = (bucket: string, fileName: string) => {
  const endPoint = "https://sgpvm172.apac.bosch.com/minio"
  return `${endPoint}/${bucket}/${fileName}`
}

export { fileUpload, getFullUploadPath }
