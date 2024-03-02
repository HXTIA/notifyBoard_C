const chalk = require('chalk')

// 彩色日志
const logUtils = {
    error: msg => console.log(chalk.red.bold(msg)),
    warn: msg => console.log(chalk.yellow.bold(msg)),
    success: msg => console.log(chalk.green.bold(msg))
}

// 根据branch更新版本策略
const UPDATE_VERSION_TACTICS = {
    'dev': (major, middle, patch) => [major, middle, patch + 1],
    'pre': (major, middle) => [major, middle + 1, 0],
    'main': major => [major + 1, 0, 0],
}

// 远程地址
const REGISTRY_URL = 'https://github.com/HXTIA/notifyBoard_C.git'

module.exports = {
    logUtils,
    UPDATE_VERSION_TACTICS,
    REGISTRY_URL
}
