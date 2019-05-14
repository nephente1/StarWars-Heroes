const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const getNodeConfig = () => ({
    target: 'node',
    node: {
        __filename: true
    }
});

const makeConfig = (params) => {
    const dirname = params.dirname;
    const nodeConf = params.mode === 'server' ? getNodeConfig() : {};

    return {
        mode: 'development',
        entry: path.join(dirname, params.entry),
        output: {
            path: path.join(dirname, params.dist),
            publicPath: params.publicPath,
            filename: params.outFileName,
            pathinfo: true
        },
        module: {
            rules: [
                {
                    test: /\.(svg|png|jpg|gif|ico|jpeg)$/,
                    loaders: ['file-loader'],
                },
                {
                    test: /\.tsx?$/,
                    loader: "awesome-typescript-loader"
                }
            ],
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            modules: [
                path.join(dirname, params.src),
                'node_modules'
            ],
            plugins: [
                new TsconfigPathsPlugin({ configFile: path.join(dirname, params.tsconfig) })
            ]
        },
        target: nodeConf.target,
        node: nodeConf.node
    };
};

module.exports = makeConfig;
