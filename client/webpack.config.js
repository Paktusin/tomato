const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[chunkhash].js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(s)css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'head',
            template: path.join(__dirname, 'src/index.html')
        }),
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000
    }
};