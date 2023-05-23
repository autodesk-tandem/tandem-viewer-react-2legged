import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

function init() {
  return new Promise<void>((resolve) => {
    const options = {
      env: 'DtProduction',
      api: 'dt',
      getAccessToken: getToken,
      productId: 'Digital Twin',
      corsWorker: true
    };

    Autodesk.Viewing.Initializer(options, () => {
      resolve();
    });
  });
}

function getToken(callback: (access_token: string, expires_in: number) => void) {
  fetch('/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    return response.json();
  }).then((data) => {
    callback(data.access_token, data.expires_in);
  }).catch((err) => {
    console.error(err);
  });
}

function initApp() {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

init().then(() => {
  initApp();
}).catch((err) => {
  console.error(err);
});
