var express = require("express");
var bodyParser = require("body-parser");
var redis = require("redis");
var uuidv3 = require("uuid/v3");

const namespace = "710b962e-041c-11e1-9234-0123456789ab";
var apiHostname = "127.0.0.1";
var apiPort = 3000;
var app = express();
var myRouter = express.Router();
var dbClient = redis.createClient();

const statusInternalServerError = 500;
const statusWrongParameter = 422;
const statusBadRequest = 404;
const statusSuccess = 200;

async function initialiseServer() {
  console.log("API Server initialisation...");
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(myRouter);
  launchServer();
}

function launchServer() {
  app.listen(apiPort, apiHostname, function() {
    console.log(
      "\nServer launched\nListen on http://" + apiHostname + ":" + apiPort
    );
  });
}

myRouter.route("/").all(function(req, res) {
  res.status(statusSuccess).send({
    response: "success"
  });
});

myRouter.route("/register").post(function(req, res) {
  var data = {
    email: req.body.email,
    password: req.body.password
  };

  dbClient.set(
    "users-" + uuidv3(req.body.email, namespace),
    JSON.stringify(data),
    redis.print
  );
  res.status(statusSuccess).send({
    response: "success"
  });
});

initialiseServer();
