var webpackCfg = require("./webpack.config")

// Set node environment to testing
process.env.NODE_ENV = "test"

module.exports = function(config) {
  config.set({
    basePath: "",
    browsers: ["Chrome"],
    files: ["src/tests/loadtests.js"],
    port: 8000,
    captureTimeout: 60000,
    frameworks: ["mocha", "chai-things", "chai-spies", "chai", "sinon-chai"],
    client: {
      captureConsole: true,
      mocha: {},
      chai: {
        includeStack: true
      }
    },
    singleRun: false,
    reporters: ["mocha", "coverage"],
    preprocessors: {
      "src/tests/loadtests.js": ["webpack", "sourcemap"]
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: "coverage/",
      reporters: [{ type: "html" }, { type: "text" }]
    },
    logLevel: "DEBUG"
  })
}
