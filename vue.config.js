const isProd = process.env.NODE_ENV === "production";

module.exports = {
  productionSourceMap: false,
  publicPath: isProd ? process.env.VUE_APP_BASE_URL : "/",
  lintOnSave: false,
  transpileDependencies: ["vuetify"],
};
