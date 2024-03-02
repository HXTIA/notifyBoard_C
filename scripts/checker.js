const fs = require('fs')
const path = require('path')
const { multiProcessCommandExec } = require('./utils')
const { logUtils } = require('./constant')

const NEED_CHECK_PENDING_QUEUE = [checkCurrentFolderTreeLocation, checkConfigExist]
const pathUtil = p => path.resolve(__dirname, p)

async function Checker() {
    NEED_CHECK_PENDING_QUEUE.every(v => v()) || process.exit(1)
}

async function checkConfigExist() {
    const filePath = pathUtil('../release-config.js')
    const isExist = fs.existsSync(filePath)
    if (isExist) {
        logUtils.success('✅：配置文件校验通过\n')
        return true
    } else {
        return false
    }
}

function checkCurrentFolderTreeLocation() {
    const dictList = multiProcessCommandExec('ls').split('\n')
    const ROOT_FOLDER_CHECK_WHITE_MEMBER = ['package.json']
    const isPackageExist = dictList.findIndex(v => v === ROOT_FOLDER_CHECK_WHITE_MEMBER[0])
    if (isPackageExist < 0) {
        logUtils.error('❌：您当前没有处于项目根目录，请切换至multi-repo或mono-repo的项目基建根目录！')
        return false
    }
    logUtils.success('✅：根目录校验通过\n')
    return true
}

Checker();
