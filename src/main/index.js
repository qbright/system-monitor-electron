import { app, BrowserWindow } from "electron";
import path from "path";
let mainWindow;
let isDevelopment = process.env.NODE_ENV === "development";
function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  console.log(__dirname);

  mainWindow.loadFile(path.resolve(__dirname, "./index.html"));
  if (isDevelopment) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

// function a() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(1111);
//     }, 2000);
//   });
// }

// async function b() {
//   let c = await a();
//   console.log(c);
// }
