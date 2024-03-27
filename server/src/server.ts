import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(bodyParser.json({ limit: '1mb' }));

// set path for static content
const staticPath = path.normalize(`${__dirname}/../app`);

app.use(express.static(staticPath));
// API endpoints
app.post('/api/auth/token', async (req, res) => {
  const token = await createToken();

  res.status(200).json(token);
});

async function createToken() {
  const auth = Buffer.from(`${process.env.APS_KEY}:${process.env.APS_SECRET}`).toString('base64');
  const options = new URLSearchParams({
    'grant_type': 'client_credentials',
    'scope': 'data:read viewables:read'
  });
  const response = await fetch(`https://developer.api.autodesk.com/authentication/v2/token?${options}`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
    }
  });
  const token = await response.json();

  return token;
}

// start listening
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.debug(`server is listening on port: ${port}`);
});
