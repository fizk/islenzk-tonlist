const genDefaultConfig = require("@storybook/react/dist/server/config/defaults/webpack.config.js");
const myConfig = require("../webpack.config.js");
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = (baseConfig, env) => {
    const config = genDefaultConfig(baseConfig, env);
    config.module.rules = myConfig.module.rules;

    config.resolve.extensions.push(".tsx");
    config.resolve.extensions.push(".ts");
    config.resolve.extensions.push(".js");
    config.resolve.extensions.push(".jsx");

    config.plugins.push(new ExtractTextPlugin('./bundle.css'));

    return config;

};
