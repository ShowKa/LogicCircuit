'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const dev_env = require('./webpack.config.dev')

// add environment variable
const envPlugin = new webpack.EnvironmentPlugin({
  DEBUG: true
})
module.exports = merge(dev_env, {
  plugins: [envPlugin]
})
