'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  // API接口地址
  API_HOST: '"http://dev.api.sale.55maiche.com/"'
  // API_HOST: '"http://localhost:36742"'
})
