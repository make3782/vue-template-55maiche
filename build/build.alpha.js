'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'alpha'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.alpha.conf')

const spinner = ora('building for alpha-test...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // if you are using ts-loader, setting this to true will make tyescript errors show up during build
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  编译错误！！！！\n'))
      process.exit(1)
    }

    console.log(chalk.yellow(
      '  说明:\n' +
      '  服务器正在构建【alpha测试】alpha.sale.55maiche.com卖车项目前端系统...\n' +
      '  文件将被编译打包为纯静态站点，HTML+JS+CSS并自动发布，文件发布将在该编译完毕后自动进行.\n' +
      '  ============================================\n' +
      '   ┏┓　　　┏┓\n' +
      ' ┏┛┻━━━┛┻┓\n' +
      ' ┃　　　　　　　┃ 　\n' +
      ' ┃　　　━　　　┃\n' +
      ' ┃　┳┛　┗┳　┃\n' +
      ' ┃　　　　　　　┃\n' +
      ' ┃　　　┻　　　┃\n' +
      ' ┃　　　　　　　┃\n' +
      ' ┗━┓　　　┏━┛\n' +
      ' 　　┃　　　┃神兽保佑\n' +
      ' 　　┃　　　┃代码无BUG！\n' +
      ' 　　┃　　　┗━━━┓\n' +
      ' 　　┃　　　　　　　┣┓\n' +
      ' 　　┃　　　　　　　┏┛\n' +
      ' 　　┗┓┓┏━┳┓┏┛\n' +
      ' 　　　┃┫┫　┃┫┫\n' +
      ' 　　　┗┻┛　┗┻┛ \n' +
      ' 　　　\n'
    ))

    console.log(chalk.cyan('  编译完成.\n'))
  })
})
