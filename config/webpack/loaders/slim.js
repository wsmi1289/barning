module.exports = {
  test: /.slim$/,
  loader: [{
    loader: 'vue-template-compiler-loader'
  }, {
    loader: 'slim-lang-loader',
    options: {
      slimOptions: {
        disable_escape: true
      }
    }
  }]
}