import { configure, getLogger } from "log4js"

const date = new Date()
const logName = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}.log`
configure({
  appenders: {
    fileout: { type: "file", filename: `./log/${logName}` },
    consoleout: { type: "console" },
  },
  categories: {
    default: { appenders: ["fileout", "consoleout"], level: "debug" },
    // anything: { appenders: ["consoleout"], level: "debug" },
    // error: { appenders: ["fileout", "consoleout"], level: "debug" },
  },
})
const logger = getLogger()
export default logger
