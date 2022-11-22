// const mongoose = require("mongoose");
var mongoose = require("mongoose");

// Connecting to database
var query =
  "mongodb+srv://demotest:1t1c8NJewFCTgG4n@cluster0.hw2el.mongodb.net/orderManagement?retryWrites=true";
const db = query;
mongoose.Promise = global.Promise;
mongoose.connect(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (error) {
    if (error) {
      console.log("Error!" + error);
    }
  }
);
