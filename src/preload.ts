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
  document.getElementById("generate").addEventListener("click", async () => {
    if (notificationWindow) {
      notificationWindow.close();
      notificationWindow = null;
    }

    // create notification browserWindow
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

    // load HTML page which will contain notification UI
    await notificationWindow.loadURL(
      `file://${__dirname}/../views/notification.html`
    );

    notificationWindow.webContents.openDevTools({ mode: "undocked" });

    // send notification template to the notification window to parse it and render it
    notificationWindow.webContents.send("initialize", textAreaEl.value);
  });

  // resize window according to calculated size on DOM
  // & position it on the bottom right of display
  // & show it
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
