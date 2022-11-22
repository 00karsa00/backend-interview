var mongoose = require("mongoose");

var OrderDetails = new mongoose.Schema({
  // customerName: String,
  // mobileNumber: Number,
  totalfee: Number,
  datetime: { type: Date, default: Date.now },
  // endtime: Date,
  // status:{type: String, enum: ['start', 'inporgress', 'completed','cancel']},
  services: [
    {
      id: Number,
      name: String,
    },
  ],
  // createAt: { type: Date, default: Date.now },
  // updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("orderDetails", OrderDetails, "orderDetails");
