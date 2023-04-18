import fs, { ReadStream } from "fs"
import logger from "./logger"

const uploadPath = `${__dirname}/./temp`
const outputPath = process.env.workspace || `${__dirname}/./output`

const koaBodyConfig = {
  multipart: true,
  formidable: {
    uploadDir: uploadPath,
    maxFileSize: 1024 * 1024 * 1024,
  },

}

const getOutputPath = (fileName: string) => `${outputPath}/${fileName}`

const initFolder = () => {
  try {
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath)
    }
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath)
    }
  } catch (err) {
    logger.error(err)
  }
}

const saveTempFile = async (stream: ReadStream, name: string) => new Promise((resolve, reject) => {
  const ws = fs.createWriteStream(getOutputPath(name))
  stream.pipe(ws)
    .on("close", resolve)
    .on("error", reject)
})

const genUID = () => Date.now().toString(36) + Math.floor(10 ** 12 + Math.random() * 9 * 10 ** 12).toString(36)

const getExtensionName = (originalName:string | null) => {
  if (originalName == null) {
    return null
  }
  const spiltName = originalName.split(".")
  let ext = ""
  if (spiltName.length > 1) {
    ext = spiltName.pop() as string
  }
  return ext
}

export {
  uploadPath,
  outputPath,
  koaBodyConfig,
  getOutputPath,
  initFolder,
  saveTempFile,
  genUID,
  getExtensionName,
}
