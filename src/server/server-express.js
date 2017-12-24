const port =
  process.env.OPENSHIFT_NODEJS_PORT ||
  process.env.VCAP_APP_PORT ||
  process.env.PORT ||
  process.argv[2] ||
  8080;
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const Gun = require("gun");
require("./vendors/gun-level");

const app = express();
// const levelup = require("levelup");
// const leveldown = require("leveldown");

// const levelDB = levelup("data/keys-data", {
//   db: leveldown
// });

const API = require("./serverapi/index");
const api = API.api;
// const s3Options = require("./configs/s3");
const gunPeers = [];
//const gunPeers = ['https://ut.usertoken.com/gun'];
app.use(Gun.serve);
app.use(express.static(__dirname + "../public"));
app.use(favicon(path.join(__dirname, "../public/images", "favicon.ico")));

app.use("*", (req, res) => api(req, res));
var server = app.listen(port);
const CLOUD_MEMORIES = "https://tropospheric.mybluemix.net/gun";
Gun({
  web: server,
  peers: CLOUD_MEMORIES
});

console.log("Server started on port " + port + " with /gun");
