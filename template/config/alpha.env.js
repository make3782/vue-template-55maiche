'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')



module.exports = merge(devEnv, {
  NODE_ENV: '"alpha"',

  // API接口地址
  API_HOST: '"http://alpha.api.55maichetech.com/"',

})
