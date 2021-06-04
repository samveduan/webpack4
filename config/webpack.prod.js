/**
 * 此文件是webpack配置文件，用于指定webpack去执行哪些任务
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: './js/bundle.js',
        publicPath: '/'
    },
    mode: 'production',
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": [
                            ["@babel/preset-env", {
                                useBuiltIns: "usage", //按需引入需要使用polyfill
                                corejs: { version: 3 }, //解决不能找到core-js的问题
                                targets: { //解决兼容性处理哪些浏览器
                                    "chrome": "58",
                                    "ie": "9"
                                }
                            }]
                        ],
                        "cacheDirectory": false // 开启babel缓存，只编译未编译代码，可减少编译时间
                    }
                }
            },
            {
                test: /\.less$/, //匹配所有less文件
                use: [
                    MiniCssExtractPlugin.loader, //3、用于在html文档中创建一个style标签，将样式“塞”进去
                    'css-loader', //2、将less编译后的css转换为CommonJs的一个模块
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                          ident: 'postcss',
                          plugins: () => [
                            require('postcss-flexbugs-fixes'),
                            require('postcss-preset-env')({
                              autoprefixer: {
                                flexbox: 'no-2009',
                              },
                              stage: 3,
                            }),
                            require('postcss-normalize')()
                          ],
                          sourceMap: true,
                        },
                    },
                    'less-loader' //1、将less编译成为css，但不生成单独的css文件，在内存中
                ]
            }, {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192, //url-loader能将小于8k图片编译成base64，file-loader不具此功能
                            publicPath: '../images', //决定图片的url路径
                            outputPath: 'images', //决定文件本地输出路径
                            name: '[hash:5].[ext]' //修改文件名称，[hash:5]取hash值前5位，[ext]文件扩展名
                        }
                    }
                ]
            }, {
                test: /\.(eot|svg|woff|woff2|ttf|mp3|mp4|avi)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'media', //决定文件本地输出路径
                            name: '[hash:5].[ext]' //修改文件名称，[hash:5]取hash值前5位，[ext]文件扩展名
                        }
                    }
                ]
            }, {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html', //以当前文件为模板创建新的html（1、结构和原来一样；2、会自动引入打包的资源）
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        }
    }), new MiniCssExtractPlugin({
        filename: 'css/[name].css'
    }), new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
            preset: [
                'default',
                {
                    discardComments: {
                        removeAll: true
                    },
                },
            ]
        },
        cssProcessorOptions: {
            map: {
                inline: false,
                annotation: true
            }
        }
    })]
};