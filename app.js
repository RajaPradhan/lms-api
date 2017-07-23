import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import './models/db';
import router from './routes';

const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/api/v1', router);

app.listen(port, () => {
  console.log('[Express]: Server listening at port: ', port);
});
