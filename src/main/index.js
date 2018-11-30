import { app, BrowserWindow } from "electron";
import path from "path";
let mainWindow;
let isDevelopment = process.env.NODE_ENV === "development";
function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  mainWindow.loadFile(path.resolve(__dirname, "./index.html"));
  if (isDevelopment) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

console.log(1231312);

if (isDevelopment) {
  process.on("message", msg => {
    if (msg === "RELOAD") {
      mainWindow && mainWindow.reload();
    }
  });
}
