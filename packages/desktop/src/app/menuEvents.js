import { dialog } from 'electron';
import fs from 'fs';

export const openFile = win => () => {
  dialog.showOpenDialog(fileNames => {
    // fileNames is an array that contains all the selected
    if (fileNames === undefined) {
      console.log('No file selected');
      return;
    }

    fs.readFile(fileNames[0], 'utf-8', (err, data) => {
      if (err) {
        win.webContents.send(
          'ERROR_MAIN_PROCESS',
          `An error ocurred reading the file :${err.message}`
        );
        return;
      }

      win.webContents.send('NEW_LEANING_SAMPLES', data);
    });
  });
};
