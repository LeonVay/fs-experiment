const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const dev = env === 'development';

// plugins
const devPlugins = [
    new NodemonPlugin(),
    new webpack.HotModuleReplacementPlugin()
];
const prodPlugins = [];
const commonPlugins = [];
const plugins = dev ? devPlugins.concat(commonPlugins) : prodPlugins.concat(commonPlugins);
const entry = dev ? ['webpack/hot/poll?1000', './src/main.ts'] : './src/server/main.ts';

module.exports = {
    entry: [
        './src/main.ts',
    ],
    output: {
        path: path.resolve(__dirname, "../../dist/"),
        filename: "bundle.js"
    },
    plugins: plugins,
    target: "node",
    mode: "development",
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: ["ts-loader"],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ ".ts", ".js" ],
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })]
    }
}