const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/** 将css提取到单独的文件 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
      // 解析css文件
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // 解析less文件
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 设置了css module，就必须用模式引入的写法
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
              },
            },
          },
          {
            loader: require.resolve("postcss-loader"),
            options: {
              postcssOptions: {
                // 将css 转换为大多数浏览器可以理解的内容，内置 autoprefixer
                plugins: [["postcss-preset-env"]],
              },
            },
          },
          "less-loader",
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
    // css文件单独打包，设置文件命名格式
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    })
  ],
};
