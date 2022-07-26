'use strict';
const semver = require('semver')
const colors = require('colors/safe')
const log = require('@hxfy-cli/log')
const {isObject} = require('@hxfy-cli/utils')

const LOWEST_NODE_VERSION = '12.0.0'

class Command {
    constructor(argv) {
        // log.verbose('command constructor',argv)
        if (!argv) {
            throw new Error('参数不能为空!')
        }
        if (!Array.isArray(argv)) {
            throw new Error('参数必须为对象！')
        }
        if (argv.length < 1) {
            throw new Error('参数列表为空！')
        }
        this._argv = argv;
        let runner = new Promise((resolve, regect) => {
            let chain = Promise.resolve()
            // 教研node 版本
            chain = chain.then(() => this.checkNodeVersion())
            // 设置初始化参数
            chain =  chain.then(() => this.initArgs())
            chain =  chain.then(() => this.init())
            chain =  chain.then(() => this.exec())
            chain = chain.catch(err => {
                log.error(err.message)
            })
        })
    }
    initArgs() {
        this._cmd = this._argv[this._argv.length - 1]
        this._argv = this._argv.slice(0, this._argv.length - 1)
    }

    checkNodeVersion() {
        // 第一步，获取当前Node版本号
        const currentVersion = process.version
        // 第二步，比对最低版本号
        const lowestVersion = LOWEST_NODE_VERSION
        if (!semver.gte(currentVersion, lowestVersion)) {
            throw new Error(colors.red(`hxfy-cli 需要安装 v${lowestVersion} 以上版本的 Node.js`))
        }
    }
    init() {
        throw new Error('init必须实现')
    }

    exec() {
        throw new Error('exec必须实现')
    }
}

module.exports = Command;

