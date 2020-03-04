import express, { Application } from 'express';
import routes from './routes';
import bodyParser from 'body-parser';

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});

routes(app);
