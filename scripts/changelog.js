const exec = require('exec-sh')
const { multiProcessCommandExec } = require('./utils')
const { logUtils } = require('./constant')

async function changelog() {
    const currentBranch = multiProcessCommandExec('git branch --show-current')
    logUtils.warn(`⌛️：当前分支：${currentBranch}，changelog生成中....\n`)

    if (currentBranch === 'dev') return

    logUtils.warn(`⌛️：此次版本更新为根目录基建，即将更新根目录CHANGELOG..\n`)
    await exec.promise('conventional-changelog -p angular -i CHANGELOG.md -s')
    logUtils.success('✅：CHANGELOG输出成功！\n')
}

changelog()
