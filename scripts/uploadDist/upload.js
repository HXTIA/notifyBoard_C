const path = require('path')
const ci = require('miniprogram-ci')
const { execSync } = require('child_process')

const cwd = process.cwd()
const { version } = require(path.resolve(cwd + '/package.json'))

const ROBOT_MAP = {
  'dev': 1,
  'pre': 2,
  'main': 3
}

const getCurrentBranch = () => execSync('git branch --show-current').toString().trim()
const getLatestCommitAuthor = () => execSync('git log -1 --pretty=format:"%an <%ae>"').toString().trim();
const getTargetRobotId = () => ROBOT_MAP[getCurrentBranch()]


const upload = async () => {
  const robot = getTargetRobotId()
  console.log('当前分支：' + getCurrentBranch() + ' 机器人编号为：' + robot);
  if (!robot) {
    console.log('您当前不在能够上传产物的白名单分支，请切换到指定分支并重新构建产物');
    return
  }

  const desc = `
    【时间】：${new Date().toLocaleDateString()}
    【分支】：${getCurrentBranch()}
    【操作人】：${getLatestCommitAuthor()}
    【version】：v${version}
  `

  const project = new ci.Project({
    appid: 'wx6836fb3c447f8868',
    type: 'miniProgram',
    projectPath: process.cwd() + '/dist',
    privateKeyPath: process.cwd() + '/private.key',
    ignores: ['node_modules/**/*'],
  })

  const uploadResult = await ci.upload({
    project,
    version,
    desc,
    setting: {
      es6: true,
      minify: true,
      autoPrefixWXSS: true
    },
    robot,
    onProgressUpdate: console.log,
  })
  console.log(uploadResult)
}
upload()

