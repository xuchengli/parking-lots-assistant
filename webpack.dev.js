/**
 * Created by lixuc on 2017/7/16.
 */
const webpack = require("webpack");

module.exports = {
    entry: [
        "webpack-hot-middleware/client?reload=true",
        "./web/js/index.js"
    ],
    output: {
        filename: "bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};