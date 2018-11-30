const { exec, fork } = require("child_process");
const util = require("util");
const ElectronExecPath = require("electron");
const path = require("path");
const cwd = path.resolve(__dirname, "../");

function start() {
  const f = fork(
    // "electron --inspect-brk=40076 dist/main.js",
    "dist/main.js",
    {
      cwd,
      execPath: ElectronExecPath
    },
    function(error, stdout, stderr) {
      console.log(error, stderr, stdout);
    }
  );

  f.on("close", function(code) {
    console.log("closing code: " + code, arguments);
  });

  f.on("error", function(e) {
    console.log("e", e);
  });
  f.on("message", function(msg) {
    console.log("msg", msg);
  });

  return f;
}

module.exports = start;
