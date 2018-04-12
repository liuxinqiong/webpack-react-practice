安装react
* npm i --save react react-dom
* react 从 0.14 版本开始，将 react-dom 拆分出 react 包，所以现在需要单独安装

安装webpack
* npm i --save-dev webpack webpack-cli webpack-dev-server
* webpack-cli 作为一个命令行工具，接收一些参数并用于 webpack 的编译器
* webpack-dev-server 是一个基于 express 的开发服务器，还提供了 live reloading 的功能，它还有两个 hook api 以方便我们扩展自己想要的功能

安装编译插件
* 在写 react 应用的时候，都会用到 es6/7/8 和 jsx 的一些语法，所以我们需要安装能够编译这些语法的插件
* npm i --save-dev babel-core babel-loader babel-preset-env babel-preset-react html-webpack-plugin
* babel-x 插件是为了让 webpack 能够使用 babel 编译 es6/7/8 和 jsx 的语法，而 html-webpack-plugin 会生成一个 html 文件，它的内容自动引入了 webpack 产出的 bundle 文件。

配置webpack
* webpakc 的配置文件名叫 webpack.config.js，这个文件需要返回包含 webpack 配置项的对象。webpack 配置项中最常用到的是 entry、output 和 rules。
* 见代码

配置 devServer
* mock：一个项目往往有很多数据需要通过请求异步接口拿到，在项目开始的时候，后端还没有为我们提供这些接口，这时候我们不得不自己造一些假的接口用于调度我们的代码，这时候我们可以使用 devServer 的 after 选项来为 devServer 添加自己的异步接口
* devServer 还提供了 proxy 可以代理远端的接口，这个适合于后端已经准备好接口，需要进行前后端联调的时候，从本地请求远端的接口。

处理资源和css
* npm i --save-dev file-loader style-loader css-loader extract-text-webpack-plugin
* extract-text-webpack-plugin该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
* file-loader 处理静态资源问题，现更多被url-loader取代
* style-loader 处理样式问题

多页应用配置
* 如果我们的应用不止一个页面，我们需要对上面的配置进行改造，主要包括 entry、output 和 HtmlWebpackPlugin 等几项。

minimist 库：读取命令行参数

公共模块抽离
* 直接npm run build 后，我们会在 dist 目录找到打包后的结果。但发现文件会特别大，因为他们都各自包含了react库相关的代码
* 这里通常的做法是，将公共模块单独打包到一个文件，在页面中分别引用，这里我们要用到 webpack 的另一个插件 SplitChunksPlugin
* 在 webpack 4.0 以前是用的 CommonsChunkPlugin，4.0过后改用了新的 SplitChunksPlugin
* 这是一个内置插件

# 实践来源
* [webpack react](https://www.chenliqiang.cn/post/webpack-react-without-create-react-app.html)