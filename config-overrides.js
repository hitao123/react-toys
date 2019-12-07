const { override, overrideDevServer } = require("customize-cra");

const devServerConfig = () => config => {
  return {
    ...config,
    port: 3000,
    proxy: {
      "/api": {
        target: "https://cnodejs.org",
        changeOrigin: true,
        // ws: false,
        pathRewrite: {
          "^/api": "/api/v1"
        },
        secure: false
      }
    }
  };
};

module.exports = {
  webpack: override(),
  devServer: overrideDevServer(devServerConfig())
};

