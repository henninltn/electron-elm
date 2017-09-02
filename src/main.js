import { app, BrowserWindow } from 'electron'
import MenuBuilder from './main/menu'

let mainWindow = null

if (process.env.NODE_ENV === 'production') {
  require('source-map-support').install()
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')( {showDevTools: true} )
  const p = require('path').join(__dirname, '..', 'app', 'node_modules')
  require('module').globalPaths.push(p)
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', async () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  })

  mainWindow.loadURL(`file://${__dirname}/app.html`)

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  const menuBuilder = new MenuBuilder(mainWindow)
  menuBuilder.buildMenu()
})

