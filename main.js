// importing electron
// app: controls applications lifecycle
// BrowserWindow: creates and manages app windows
const { app, BrowserWindow } = require('electron');

// runs when the app is ready
app.whenReady().then(() => {

    // create a window
    // loads your web page into a new BrowserWindow instanc
    const myWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // load a webpage
    myWindow.loadFile('/index.html');

    console.log('App running');
})
