const path = require('path')
const { countVersion, fileUtils, multiProcessCommandExec } = require('./utils')
const { logUtils } = require('./constant')

async function release() {
    const currentBranch = multiProcessCommandExec('git branch --show-current')
    logUtils.warn(`⌛️：当前分支：${currentBranch}，exec包版本更新....\n`)

    let baseRootFilePath = '../package.json'
    baseRootFilePath = path.resolve(__dirname, baseRootFilePath)
    const pkg = fileUtils({
        rootFile: baseRootFilePath
    });

    pkg.version = countVersion(pkg.version, currentBranch)
    logUtils.warn('⌛️：即将写入包信息... \n')
    fileUtils({
        action: 'write',
        content: JSON.stringify(pkg, null, 2),
        rootFile: baseRootFilePath
    })
    logUtils.success('✅：写入成功，版本更新生效！')
}

release();
