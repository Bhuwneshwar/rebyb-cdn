const express = require("express");
const { tradeAlarm,testserver } = require("../controller/Api");
const api = express.Router();
//const uploadContent = require("../controllers/uploadContent");

api.route("/trade-alarm").post(tradeAlarm);
api.route("/test").get(testserver);
module.exports = api;
