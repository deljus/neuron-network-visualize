// @flow
import { app, BrowserWindow, Menu } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import menuTemplate from './app/menuTemplate';
import Learning from './app/learning';

let mainWindow;

const devServer = 'http://localhost:3000';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 850,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  });

  const startUrl = isDev ? devServer : `file://${path.join(__dirname, '../build-ui/index.html')}`;

  mainWindow.loadURL(startUrl);

  // devtools
  if (isDev) mainWindow.webContents.openDevTools();

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
