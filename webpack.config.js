const DefinePlugin = require('webpack').DefinePlugin;
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
    name: 'jazz',
    entry: {
        'bundle': './src/client/index.tsx',
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {},
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                }),
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', ],
    },
    plugins: [
        new DashboardPlugin(),
        new ExtractTextPlugin('./bundle.css'),
        new DefinePlugin({
            __API_URL__: JSON.stringify(
                process.env.NODE_ENV === 'production'
                ? 'https://us-central1-reactscales.cloudfunctions.net'
                : 'http://localhost:5001/reactscales/us-central1'
            ),
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 3001,
        hot: false,
        historyApiFallback: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
};
