import express from 'express'

const app: express.Application = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

