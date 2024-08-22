const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/graphql",
    createProxyMiddleware({
      target: "http://localhost:4000", // Your GraphQL server
      changeOrigin: true,
      pathRewrite: { "^/graphql": "/graphql" }, // Rewrite paths if needed
    })
  );
};
