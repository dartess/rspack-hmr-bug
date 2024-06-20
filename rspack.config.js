const { HtmlRspackPlugin } = require('@rspack/core');
const ReactRefreshPlugin = require('@rspack/plugin-react-refresh');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    filename: `[name].[fullhash].js`,
    chunkFilename: `chunks/[name].[fullhash].js`,
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        type: 'javascript/auto',
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                  development: !isProduction,
                  refresh: !isProduction,
                },
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlRspackPlugin({ template: 'src/index.html' }),
    !isProduction && new ReactRefreshPlugin(),
  ],
  devServer: {
    port: 3000,
  },
  experiments: {
    css: true,
  },
};
