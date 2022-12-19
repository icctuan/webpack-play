const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  // mode: "production",
  entry: "./src/index.tsx",
  output: {
    filename: "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "./build"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "entry",
                    corejs: 3,
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        // 匹配对应后缀的文件
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                // 配置 react
                [
                  "@babel/preset-react",
                  // 配置使用 jsx 不需要引入 react（编译预设）
                  { runtime: "automatic" },
                ],
                // 配置 ts
                "@babel/preset-typescript",
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    // 文件省略后缀名，按从左到右的顺序依次尝试解析
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    // 自动将打包后的文件插入html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
};
