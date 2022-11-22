const mongoose = require("mongoose");
const db = require("./dbConnection");
const orderCollection = require("./dbSchema/ordersDetails");

exports.getAllOrderList = () => {
  let respose = {};
  return new Promise((resolve) => {
    try {
      orderCollection.find({}, function (err, results) {
        if (err) {
          console.log("error => ", err);
          respose = {
            error: true,
            message: "Database Error",
            statusCode: 500
          };
          resolve(respose);
        } else {
          respose = {
            error: false,
            data: results,
          };
          resolve(respose);
        }
      });
    } catch (err) {
      console.log(err);
      respose = {
        message: `Internal Error.`,
        error: true,
        statusCode: 500
      };
      resolve(respose);
    }
  });
};

exports.insertOrder = (data) => {
  let respose = {};
  return new Promise((resolve) => {
    try {
      var insertData = new orderCollection(data);
      insertData.save(function (err, result) {
        if (err) {
          console.log("error => ", err);
          respose = {
            error: true,
            message: "Database Error",
            statusCode: 500
          };
        } else {
          console.log("result => ", result);
          respose = {
            error: false,
          };
        }
        resolve(respose);
      });
    } catch (err) {
      console.log(err);
      respose = {
        message: `Internal Error.`,
        error: true,
        statusCode: 500
      };
      resolve(respose);
    }
  });
};

exports.getOrderDetail = (condition) => {
  let respose = {};
  return new Promise((resolve) => {
    try {
      orderCollection.find(condition, function (err, result) {
        if (err) {
          console.log("error => ", err);
          respose = {
            error: true,
            message: "Database Error",
            statusCode: 500
          };
        } else {
          console.log("result => ", result);
          respose = {
            error: false,
            data: result,
          };
        }
        resolve(respose);
      });
    } catch (err) {
      console.log(err);
      respose = {
        message: `Internal Error.`,
        error: true,
        statusCode: 500
      };
      resolve(respose);
    }
  });
};

exports.getLastOrderDetail = (sort) => {
  let respose = {};
  return new Promise((resolve) => {
    try {
      orderCollection.findOne({}, {}, sort, function (err, result) {
        if (err) {
          console.log("error => ", err);
          respose = {
            error: true,
            message: "Database Error",
            statusCode: 500
          };
        } else {
          console.log("result => ", result);
          respose = {
            error: false,
            data: result,
          };
        }
        resolve(respose);
      });
    } catch (err) {
      console.log(err);
      respose = {
        message: `Internal Error.`,
        error: true,
        statusCode: 500
      };
      resolve(respose);
    }
  });
};

exports.orderUpdate = (condition, data) => {
  let respose = {};
  return new Promise((resolve) => {
    try {
      orderCollection.updateOne(condition, data, function (err, result) {
        if (err) {
          console.log("error => ", err);
          respose = {
            error: true,
            message: "Database Error",
            statusCode: 500
          };
        } else {
          console.log("result => ", result);
          respose = {
            error: false,
            data: result,
          };
        }
        resolve(respose);
      });
    } catch (err) {
      console.log(err);
      respose = {
        message: `Internal Error.`,
        error: true,
        statusCode: 500
      };
      resolve(respose);
    }
  });
};

exports.deleteOrder = (condition, data) => {
  let respose = {};
  return new Promise((resolve) => {
    try {
      orderCollection.remove(condition, {}, function (err, result) {
        if (err) {
          console.log("error => ", err);
          respose = {
            error: true,
            message: "Database Error",
            statusCode: 500
          };
        } else {
          console.log("result => ", result);
          respose = {
            error: false,
            data: result,
          };
        }
        resolve(respose);
      });
    } catch (err) {
      console.log(err);
      respose = {
        message: `Internal Error.`,
        error: true,
        statusCode: 500
      };
      resolve(respose);
    }
  });
};
