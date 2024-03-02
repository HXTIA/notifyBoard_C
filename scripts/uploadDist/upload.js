const path = require('path')
const ci = require('miniprogram-ci')

const cwd = process.cwd()
const { version } = require(path.resolve(cwd + '/package.json'))
const now = new Date().toLocaleDateString();

const upload = async () => {
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
    desc: now + ' 提交版本 v： ' + version,
    setting: {
      es6: true,
    },
    onProgressUpdate: console.log,
  })
  console.log(uploadResult)
}
upload()
