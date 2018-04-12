const path = require('path');
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
const mockServer = require('./mock/server')

module.exports = {
    // 让 webpack 知道以哪个模块为入口，做依赖收集
    entry: {
        index: './src/pages/index.js',
        about: './src/pages/about.js'
    },
    // 告诉 webpack 打包好的文件存放在哪里，以及怎么命名
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'js/[name].js'
    },
    resolve: {
        alias: {
            // 别名方便引入资源，如：background: url('~@static/img/logo.svg')
            '@static': path.resolve(__dirname, 'src/static'),
        }
    },
    module: {
        // 使用 babel-loader 编译 es6/7/8 和 jsx 语法
        rules: [{
            test: /\.jsx?$/,
            // include 表示哪些目录中的 .js 文件需要进行 babel-loader
            // exclude 表示哪些目录中的 .js 文件不要进行 babel-loader
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /.(png|jpg|svg)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]'
                }
            }
        }, {
            test: /.css$/,
            use: extractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/pages/index.html',
            // 注入公共模块 commons
            chunks: ['commons', 'index']
        }),
        new htmlWebpackPlugin({
            template: './src/pages/about.html',
            filename: 'about.html',
            // 注入公共模块 commons
            chunks: ['commons', 'index']
        }),
        new extractTextPlugin("css/[name].css")
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 创建一个 commons 块，用于包含所有入口模块共用的代码
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    devServer: {
        after: (app) => {
            mockServer(app)
        }
    }
}