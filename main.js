const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;

app.on('ready', () => {
    //create new window
    mainWindow = new BrowserWindow({});
    //load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    
    //Quit app when closed
    mainWindow.on('closed', () => {
        app.quit();
    });
    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);

});

// Create menu template
const mainMenuTemplate = [
    {
        label:'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];
// If on mac, add empty object at the beginning of the menu
(process.platform == 'darwin') && mainMenuTemplate.shift({});
// Add developer tools if its not in production mode
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}