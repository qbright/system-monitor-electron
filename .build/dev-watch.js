const webpack = require("webpack");
const chalk = require("chalk");
const kill = require("./kill");

const MAIN_CONFIG = require("./webpack.main.config");
const RENDERER_CONFIG = require("./webpack.renderer.config");
const electronReloadStart = require("./electron.reload");

let rendererCompiler = webpack(RENDERER_CONFIG(process.env));
let mainCompiler = webpack(MAIN_CONFIG(process.env));

let electronChildProcess;

let rendererWatching = rendererCompiler.watch({}, (err, stats) => {
  if (!err) {
    console.log("\n\n\n");
    console.log(
      chalk.black.bgBlue(
        "-----------------------Renderer Watch-----------------------"
      )
    );

    console.log(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      })
    );

    console.log(
      chalk.black.bgBlue(
        "---------------------Renderer Watch End---------------------"
      )
    );

    // electronChildProcess.send("hhhh");
  } else {
    console.error(err);
  }
});

let mainWatching = mainCompiler.watch({}, (err, stats) => {
  if (!err) {
    console.log("\n\n\n");
    console.log(
      chalk.black.bgGreen(
        "-------------------------Main Watch-------------------------"
      )
    );

    console.log(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkmodules: false
      })
    );
    console.log(
      chalk.black.bgGreen(
        "---------------------Renderer Watch End---------------------"
      )
    );
    restartElectronMainProcess();
  } else {
    console.error(err);
  }
});

function restartElectronMainProcess() {
  if (electronChildProcess) {
    kill(electronChildProcess.pid);
  }
  setTimeout(() => {
    electronChildProcess = electronReloadStart();
  }, 100);
}
