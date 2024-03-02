const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process');
const { UPDATE_VERSION_TACTICS } = require('./constant')

// 获得详细版本
function getVersion(versionStr) {
    const [major, middle, patch] = versionStr.split('.').map(v => Number(v))
    return {
        major,
        middle,
        patch
    }
}

/**
 * 更新版本的计算策略
 * @param {String} versionStr 字符串版本
 * @param {String} branch 当前分支
 * @returns {String} 更新后版本值
 */
function countVersion(versionStr, branch) {
    const { major, middle, patch } = getVersion(versionStr)
    return UPDATE_VERSION_TACTICS[branch](major, middle, patch).join('.')
}

/**
 * 文件读写操作
 * @param {Object} {
 *     action = 'read',
 *     rootFile = '../package.json',
 *     content
 * }
 * @return {String | Boolean}
 */
function fileUtils({
    action = 'read',
    rootFile = '../package.json',
    content
} = {
        action: 'read',
        rootFile: '../package.json',
        content: ''
    }) {
    if (action === 'read') {
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, rootFile)));
    } else {
        fs.writeFileSync(path.resolve(__dirname, rootFile), `${content}\n`);
        return true
    }
}

/**
 * 利用子进程执行命令
 * @param {String} command
 * @returns
 */
function multiProcessCommandExec(command) {
    return execSync(command).toString().trim();
}

/**
 * 获取到根目录下的配置文件
 * @returns {{
 *  monorepo: {
 *      needMonorepo: Boolean
 *      name: String
 *  }
 *  git: {
 *      branch: String
 *      email: String
 *      name: String
 *  }
 * }}
 */
function getCLIConfig() {
    const p = path.resolve(__dirname, '../release-config.js')
    return fs.existsSync(p) && require(p)
}

// 获取cli基本配置
const CLI_COMMON_CONFIG = () => getCLIConfig()

module.exports = {
    countVersion,
    fileUtils,
    multiProcessCommandExec,
    CLI_COMMON_CONFIG
}
