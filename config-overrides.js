const { override, overrideDevServer } = require("customize-cra");

const devServerConfig = () => config => {
  return {
    ...config,
    port: 3000,
    proxy: {
      "/api": {
        target: "https://cnodejs.org/api/v1",
        changeOrigin: true,
        // ws: false,
        // pathRewrite: {
        //   "^/app/v1": "/app/v1"
        // },
        secure: false
      }
    }
  };
};

module.exports = {
  webpack: override(),
  devServer: overrideDevServer(devServerConfig())
};

