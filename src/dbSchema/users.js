var mongoose = require("mongoose");

var Users = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", Users, "Users");
