#!/bin/bash

# 获取当前Shell脚本的绝对路径
SCRIPT=$(readlink -f "$0")
# 获取当前Shell脚本所在目录
SCRIPT_DIR=$(dirname "$SCRIPT")

# 预检测
checker() {
    node $SCRIPT_DIR/checker.js
    local exit_code=$?
    if [ $exit_code -ne 0 ]; then
        exit $exit_code
    fi
}

# release信息
gitHelper() {
    node $SCRIPT_DIR/gitHelper.js
}

# changelog生成器
logGenertor() {
    # npm run changelog
    node $SCRIPT_DIR/changelog.js
}

# 更新版本信息
updateVersion() {
    node $SCRIPT_DIR/updateVersion.js
}

# 发包
publisher() {
    echo "do some npm package things\n"
}

# 主逻辑
main() {
    echo "release前预检～\n"
    checker

    updateVersion

    logGenertor

    gitHelper

    # echo "4. npm publish\n"
    # publisher

    echo "\n✅：release success🏅！！"
}

main
