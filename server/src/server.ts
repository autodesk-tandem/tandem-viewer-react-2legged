import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import axios from 'axios';
import querystring from 'querystring';

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(bodyParser.json({ limit: '1mb' }));

// set path for static content
const staticPath = path.normalize(`${__dirname}/../app`);

app.use(express.static(staticPath));
// API endpoints
app.post('/api/token', async (req, res) => {
  const token = await createToken();

  res.status(200).json(token);
});

async function createToken() {
  const options = {
    'grant_type': 'client_credentials',
    'scope': 'data:read viewables:read'
  };
  const response = await axios.post(`https://developer.api.autodesk.com/authentication/v2/token`,
    querystring.stringify(options),
    {
      auth: {
        username: process.env.FORGE_CLIENT_ID,
        password: process.env.FORGE_CLIENT_SECRET,
      }
    });

  return response.data;
}

// start listening
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.debug(`server is listening on port: ${port}`);
});
