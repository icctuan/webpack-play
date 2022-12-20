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
      // 解析图片资源
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        // asset 是 webpack 自带的资源模块
        type: "asset/resource",
      },
      // 字体文件
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      // 解析svg 可以作为组件使用和 url 同时使用
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack", "file-loader"],
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
    }),
  ],
  devServer: {
    // 需要修改本地电脑 hosts 文件，对应上本机ip地址，一般是放在C:\Windows\System32\drivers\etc\hosts
    host: "local.newrank.cn",
    // 自定义端口
    port: 7080,
    // 自动打开浏览器
    open: true,
    // 支持 HTTPS
    https: true,
    // history 路由
    historyApiFallback: true,
    // 热更新
    hot: true,
  },
};
