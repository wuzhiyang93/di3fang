'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://39.104.60.30/api/admin"',
  UPLOAD_API: '"https://39.104.60.30/api/admin/uploadtoupyun"',
})
