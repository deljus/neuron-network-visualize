// @flow
import { app, BrowserWindow, Menu } from 'electron';
import url from 'url';
import path from 'path';
import menuTemplate from './app/menuTemplate';
import Learning from './app/learning';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 850,
    webPreferences: {
      nodeIntegration: true
    }
  });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true
    });

  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  return mainWindow;
}

app.on('ready', () => {
  const mainWin = createWindow();

  // eslint-disable-next-line no-new
  new Learning(mainWindow);

  const menu = Menu.buildFromTemplate(menuTemplate(app, mainWin));
  Menu.setApplicationMenu(menu);
});

app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
