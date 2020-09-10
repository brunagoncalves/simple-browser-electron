const { app, BrowserWindow, globalShortcut } = require('electron');

let win;
let contents;

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 800,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.setMenuBarVisibility(false);
  win.loadURL('http://localhost:5000');
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
