/**
 * Created by trigkit4 on 2017/6/22.
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports =  class HandleAllCssLoader {

    constructor({
        fallback = 'style-loader',
        cssLoader = 'css-loader',
        postcss,
        sourceMap,
        extract,
        minimize,
        cssModules
    } = {}) {
        this.fallback = fallback
        this.cssLoader = cssLoader
        this.postcssOptions = postcss
        this.sourceMap = sourceMap
        this.extract = extract
        this.minimize = minimize
        this.cssModules = cssModules
    }

    getLoaders(test, loader, options = {}) {
        const cssLoaderOptions = {
            autoprefixer: false,
            sourceMap: this.sourceMap,
            minimize: this.minimize
        }

        if (this.cssModules) {
            cssLoaderOptions.modules = true
            cssLoaderOptions.importLoaders = 1
            cssLoaderOptions.localIdentName = '[name]_[local]__[hash:base64:5]'
        }

        if (loader === 'css-loader') {
            Object.assign(cssLoaderOptions, options)
        }

        const loaderOptions = [{
            loader: this.cssLoader,
            options: cssLoaderOptions
        }]

        if (loader !== 'postcss-loader' && this.postcssOptions !== false) {
            const postcssOptions = {
                sourceMap: this.sourceMap
            }

            if (Array.isArray(this.postcssOptions)) {
                postcssOptions.plugins = this.postcssOptions
            } else if (typeof this.postcssOptions === 'object') {
                Object.assign(postcssOptions, this.postcssOptions)
            }

            loaderOptions.push({
                loader: 'postcss-loader',
                options: postcssOptions
            })
        }

        if (loader && loader !== 'css-loader') {
            loaderOptions.push({
                loader,
                options: {
                    ...options,
                    sourceMap: this.sourceMap
                }
            })
        }

        return {
            test,
            use: this.extract ? ExtractTextPlugin.extract({
                loaderOptions,
                fallback: this.fallback
            }) : [{
                loader: this.fallback,
                options: {
                    sourceMap: this.sourceMap
                }
            }, ...loaderOptions]
        }
    }


    css(options) {
        let test = /\.css$/
        return this.getLoaders(test, 'css-loader', options)
    }


    sass(options = {}) {
        let test =  /\.css$|\.sass$/
        return this.getLoaders(test, 'sass-loader', {
            indentedSyntax: true,
            ...options
        })
    }


    scss(options) {
        let test =  /\.cs$|\.scss$/
        return this.getLoaders(test, 'sass-loader', options)
    }


    less(options) {
        let test = /\.css$|\.less$/
        return this.getLoaders(test, 'less-loader', options)
    }

    styl(options) {
        let test = /\.css$|\.styl$/
        return this.getLoaders(test, 'stylus-loader', options)
    }
}
