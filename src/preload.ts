import { remote } from "electron";
import DEFAULT_TEMPLATE from "./default-template";

const { BrowserWindow, ipcMain, screen } = remote;
const BORDER_SPACING = 5;

window.addEventListener("DOMContentLoaded", () => {
  // set default template value
  const textAreaEl = document.getElementById("template") as HTMLTextAreaElement;
  textAreaEl.value = DEFAULT_TEMPLATE;

  // handle notification window creation logic
  let notificationWindow: Electron.BrowserWindow = null;
  document.getElementById("generate").addEventListener("click", () => {
    if (notificationWindow) {
      notificationWindow.close();
      notificationWindow = null;
    }

    notificationWindow = new BrowserWindow({
      alwaysOnTop: true,
      frame: false,
      resizable: false,
      show: false,
      skipTaskbar: true,
      transparent: true,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    notificationWindow.loadURL(
      `file://${__dirname}/../views/notification.html`
    );

    notificationWindow.webContents.openDevTools({ mode: "undocked" });

    notificationWindow.once("ready-to-show", () => {
      notificationWindow.webContents.send("initialize", textAreaEl.value);
    });
  });

  // resize window according to calculated size on DOM
  ipcMain.on("RESIZE", (event, calculatedSize: Electron.Size) => {
    if (notificationWindow) {
      const { width, height } = calculatedSize;
      const { workArea } = screen.getPrimaryDisplay();
      const x = workArea.x + workArea.width - BORDER_SPACING - width;
      const y = workArea.y + workArea.height - BORDER_SPACING - height;
      const bounds = { ...calculatedSize, x, y };
      notificationWindow.setBounds(bounds);
      notificationWindow.show();
    }
  });
});
