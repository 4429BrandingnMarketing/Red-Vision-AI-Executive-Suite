const { app, BrowserWindow, dialog, shell, utilityProcess } = require('electron');
const path = require('node:path');
const http = require('node:http');

const PORT = 31415;
let serverProcess;
let serverStartupError = '';

function waitForServer(attempts = 60) {
  return new Promise((resolve, reject) => {
    const check = (remaining) => {
      if (serverStartupError) return reject(new Error(serverStartupError));
      const request = http.get(`http://127.0.0.1:${PORT}/health`, (response) => {
        response.resume();
        if (response.statusCode === 200) return resolve();
        if (remaining <= 1) return reject(new Error('Desktop server health check failed'));
        setTimeout(() => check(remaining - 1), 250);
      });
      request.on('error', () => {
        if (remaining <= 1) return reject(new Error(serverStartupError || 'Desktop server did not start'));
        setTimeout(() => check(remaining - 1), 250);
      });
      request.setTimeout(1000, () => request.destroy());
    };
    check(attempts);
  });
}

function startServer() {
  const serverPath = path.join(app.getAppPath(), 'dist', 'server.cjs');
  serverProcess = utilityProcess.fork(serverPath, [], {
    env: {
      ...process.env,
      NODE_ENV: 'production',
      PORT: String(PORT),
      APP_DIST_PATH: path.join(app.getAppPath(), 'dist'),
    },
    stdio: 'pipe',
    serviceName: 'Red Vision Desktop Server',
  });
  serverProcess.stderr?.on('data', (data) => {
    const message = String(data).trim();
    if (message) {
      serverStartupError = message;
      console.error(message);
    }
  });
  serverProcess.on('error', (error) => {
    serverStartupError = `Desktop server process failed: ${error.message}`;
  });
  serverProcess.on('exit', (code) => {
    if (code && !app.isQuitting) {
      serverStartupError ||= `Desktop server exited with code ${code}`;
      console.error(serverStartupError);
    }
  });
}

async function createWindow() {
  startServer();
  await waitForServer();

  const window = new BrowserWindow({
    width: 1440,
    height: 960,
    minWidth: 1024,
    minHeight: 700,
    backgroundColor: '#000000',
    title: 'Red Vision AI Executive Suite',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  window.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://')) shell.openExternal(url);
    return { action: 'deny' };
  });

  await window.loadURL(`http://127.0.0.1:${PORT}`);
}

app.whenReady().then(createWindow).catch((error) => {
  dialog.showErrorBox('Red Vision startup failed', error.message);
  app.quit();
});

app.on('window-all-closed', () => app.quit());
app.on('before-quit', () => {
  app.isQuitting = true;
  if (serverProcess && !serverProcess.killed) serverProcess.kill('SIGTERM');
});
