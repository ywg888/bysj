const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: `http://${process.env.REACT_APP_SERVER_URL}`, // 后台服务地址以及端口号
      changeOrigin: true, // 是否开启代理
    })
  );
};