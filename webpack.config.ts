import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

const config: webpack.Configuration = {
  externals: [
    {
      react: 'React',
      'react-dom': 'ReactDOM',
      '@material-ui/core': 'window["material-ui"]',
      'highlight.js': 'hljs',
      esprima: 'esprima',
      'js-yaml': 'jsyaml'
    }
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
    // new BundleAnalyzerPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        vendors: {
          name: 'vendors',
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          enforce: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};

export default config;
