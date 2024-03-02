const exec = require('exec-sh')
const { fileUtils, multiProcessCommandExec, CLI_COMMON_CONFIG } = require('./utils')
const { logUtils, REGISTRY_URL } = require('./constant')

const git = CLI_COMMON_CONFIG().git
const gitHelper = async () => {
    const currentBranch = multiProcessCommandExec('git branch --show-current')
    logUtils.warn(`⌛️：当前分支：${currentBranch}，git release 发版运行中....\n`)

    if (currentBranch === 'dev') return

    const isNeedTag = true
    const pkg = fileUtils()

    await exec.promise(`git remote add origin ${REGISTRY_URL}`)
    await exec.promise(`git config user.name "${git.name}"`);
    await exec.promise(`git config user.email "${git.email}"`);

    await exec.promise('git add .');
    await exec.promise(`git commit -m "chore(release): ${pkg.version} feature release"`)
    await exec.promise('git pull')
    await exec.promise(`git push --set-upstream origin ${currentBranch}`)
    if (isNeedTag) {
        logUtils.warn('⌛️：需要tag，推送远程标签中.....');
        await exec.promise(`git tag v${pkg.version}`);
        await exec.promise(`git push origin --tags`);
        logUtils.success('✅：推送远程成功🏅');
    }
}

gitHelper()
