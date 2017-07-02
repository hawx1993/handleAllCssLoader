


## Get started


## Install

```bash
$ npm install handle-allcss-loader -D
```

## Usage
```javascript
const HandleAllCSSLoader = require('handle-allcss-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const handleLoader = new HandleAllCSSLoader({
  minimize: isProd,
  extract: isProd,
  sourceMap: false,
  cssModules: false
})

module.exports = {
  module: {
    rules: [
      // Handle .css files with css-loader & postcss-loader
      handleLoader.css(),
      // Handle .sass files
      // Similar to above but add sass-loader too
      handleLoader.sass()
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css',
      disable: !isProd
    })
  ]
}
```
