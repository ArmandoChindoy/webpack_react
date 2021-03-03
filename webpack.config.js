const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  mode:production,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath:"/"
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias:{
        "@components":path.resolve(__dirname,"./components/"),
        "@styles":path.resolve(__dirname,"./styles/")
      }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ["style-loader","css-loader", "sass-loader", ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name][hash].css",
    }),
    new CleanWebpackPlugin(),
    new CssMinimizerPlugin(),
    new TerserWebpackPlugin(),
  ],
  optimization:{
      minimize:true,
      minimizer:[
          new CssMinimizerPlugin(),
          new TerserWebpackPlugin()
      ]
  }
};
