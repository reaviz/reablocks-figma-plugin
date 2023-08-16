module.exports = function (buildOptions) {
  return {
    ...buildOptions,
    define: {
      global: "window",
    },
    plugins: buildOptions.plugins.filter(function (plugin) {
      return plugin.name !== "preact-compat";
    }),
  };
};
