const Dotenv = require('dotenv-webpack');
const { environment } = require('@rails/webpacker')
const { VueLoaderPlugin } = require('vue-loader')
const vue = require('./loaders/vue')
const slim = require('./loaders/slim')

environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())
environment.plugins.prepend('Dotenv', new Dotenv())
environment.loaders.prepend('vue', vue)
environment.loaders.prepend('slim', slim)
module.exports = environment
