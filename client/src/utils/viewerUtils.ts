export async function createToken() {
  const response = await fetch('/api/auth/token', {
    method: 'POST'
  });
  const data = await response.json();

  return data;
}

export async function getUserProfile(): Promise<any> {
  const response = await fetch('/api/userprofile');
  const data = await response.json();

  return data;
}

function getToken(callback: (access_token: string, expires_in: number) => void) {
  createToken().then((token) => {
    callback(token.access_token, token.expires_in);
  });
}

export async function initializeViewer(): Promise<void> {
  return new Promise<void>((resolve) => {
    const options = {
      env: 'DtProduction',
      api: 'dt',
      getAccessToken: getToken,
      productId: 'Digital Twin',
      corsWorker: true,
      useCookie: false
    };

    Autodesk.Viewing.Initializer(options, () => {
      resolve();
    });
  });
}