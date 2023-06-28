const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:4015", // 后台服务地址以及端口号
      changeOrigin: true, // 是否开启代理
    })
  );
};