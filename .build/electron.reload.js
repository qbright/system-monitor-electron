const { exec } = require("child_process");
const util = require("util");
const kill = require("./kill");
const path = require("path");
const cwd = path.resolve(__dirname, "../");

function start() {
  const hello = exec(
    // "electron --inspect-brk=40076 dist/main.js",
    "electron dist/main.js",
    {
      cwd
    },
    function(error, stdout, stderr) {
      console.log(error, stderr, stdout);
    }
  );

  hello.on("close", function(code) {
    console.log("closing code: " + code, arguments);
  });
  hello.on("error", function(e) {
    console.log("e", e);
  });

  hello.stderr.on("data", function(data) {
    console.log(data.toString());
  });

  hello.stdout.on("data", function(data) {
    console.log(data.toString());
  });

  hello.on("message", function(msg) {
    console.log("msg", msg);
  });

  //   setTimeout(() => {
  //     console.log(110, hello.pid);
  //     kill(hello.pid);
  //   }, 3000);
}

start();
