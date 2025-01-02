const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        fullscreen: true,
        icon: path.join(__dirname, 'public', 'icon.ico'),
    });

    // Load your Next.js app
    mainWindow.loadURL('http://localhost:3000');

    mainWindow.setMenuBarVisibility(false);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
