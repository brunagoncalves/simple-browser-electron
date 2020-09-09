const { app, BrowserWindow, globalShortcut } = require('electron');
const config = require('./config');

let win = null;
let contents = null;

function createWindow() {
  win = new BrowserWindow({
    width: config.width,
    height: config.heigth,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.setMenuBarVisibility(false);
  win.loadURL('config.url');
  contents = win.webContents;
}

function toggleDevTools() {
  contents.toggleDevTools();
}

function createShortcuts() {
  globalShortcut.register('CmdOrCtrl+J', toggleDevTools);
}

app.whenReady().then(createWindow).then(createShortcuts);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
