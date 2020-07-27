import express from 'express';
import api from './api.js';
import cors from 'cors';
import https from 'https';
import fs from 'fs';

const PORT = 5001;
const app = express();

app.use(cors());

app.post('/authentication/login', (req, res) => {
  res.send({
    id: 1,
    username: 'Test',
    balance: 100,
    token: 'thisisavalidtoken',
  });
});

app.use('/authentication/', api);

https
  .createServer(
    {
      key: fs.readFileSync('./key.pem', 'utf8'),
      cert: fs.readFileSync('./server.crt', 'utf8'),
    },
    app
  )
  .listen(PORT);
