const repository = require("./repository");
const serviceJson = require("./serviceJson.json");

let isValue = (value) => {
  return (
    value != undefined && value != null && value != "null" && value.length > 0
  );
};

exports.getAllOrder = async (cb) => {
  try {
    let respose = {};
    let orderList = await repository.getAllOrderList();
    if (orderList.error) return cb(orderList);
    respose = {
      message: `Data get Successfully`,
      data: orderList.data,
      error: false,
      statusCode: 200
    };
    return cb(respose);
  } catch (e) {
    console.log("error => ", e);
    respose = {
      message: `Internal Error.`,
      error: true,
      statusCode: 500
    };
    return cb(respose);
  }
};

exports.createOrder = async (data, cb) => {
  try {
    let respose = {};
    if (!isValue(data.totalfee)) {
      respose = {
        message: `totalfee is missing`,
        error: true,
        statusCode: 400
      };
      return cb(respose);
    }
    if (!isValue(data.services)) {
      respose = {
        message: `services is missing`,
        error: true,
        statusCode: 400
      };
      return cb(respose);
    }

    if (typeof data.services != "object") {
      respose = {
        message: `services format mismatch`,
        error: true,
        statusCode: 400
      };
      return cb(respose);
    }

    if (data.services.length == 0) {
      respose = {
        message: `services is empty`,
        error: false,
        statusCode: 400
      };
      return cb(respose);
    }
    let lastOrder = await repository.getLastOrderDetail({ sort: { _id: -1 } });
    if (lastOrder.error) return cb(lastOrder);
    console.log(lastOrder.data);
    if (lastOrder.data) {
      lastOrder = JSON.parse(JSON.stringify(lastOrder.data));
      console.log("lastOrder.datatime  =>", lastOrder.datetime);
      let currentdate = new Date();
      currentdate = currentdate.setHours(currentdate.getHours() + 3);
      if (lastOrder.datetime < lastOrder) {
        respose = {
          message: `New Order can't created`,
          error: false,
          statusCode: 400
        };
        return cb(respose);
      }
    }
    let services = [];
    data.services.map((item) => {
      serviceJson.filter((fitem) => {
        if (fitem.id == item) {
          services.push(fitem);
        }
      });
    });
    console.log(services, "services");
    if (services.length == 0) {
      respose = {
        message: `services is not found`,
        error: true,
         statusCode: 400
      };
      return cb(respose);
    }
    let orderDetails = {
      totalfee: data.totalfee,
      services: services,
    };

    let insertDetail = await repository.insertOrder(orderDetails);
    if (insertDetail.error) return cb(insertDetail);

    respose = {
      message: `Order Successfully Created`,
      error: false,
      statusCode: 200
    };
    return cb(respose);
  } catch (e) {
    console.log("error => ", e);
    respose = {
      message: `Internal Error.`,
      error: true,
      statusCode: 500
    };
    return cb(respose);
  }
};

exports.updateOrder = async (data, cb) => {
  try {
    let respose = {};
    if (!isValue(data.totalfee)) {
      respose = {
        message: `totalfee is missing`,
        error: true,
        statusCode: 400
      };
      return cb(respose);
    }
    if (!isValue(data.services)) {
      respose = {
        message: `services is missing`,
        error: true,
        statusCode: 400
      };
      return cb(respose);
    }

    if (typeof data.services != "object") {
      respose = {
        message: `services format mismatch`,
        error: true,
        statusCode: 400
      };
      return cb(respose);
    }

    if (data.services.length == "object") {
      respose = {
        message: `services is empty`,
        error: true,
        statusCode: 400
      };
      return cb(respose);
    }
    let lastOrder = await repository.getLastOrderDetail({ sort: { _id: -1 } });
    if (lastOrder.error) return cb(lastOrder);
    if (lastOrder.data) {
      lastOrder = JSON.parse(JSON.stringify(lastOrder.data));
      console.log("lastOrder.datatime  =>", lastOrder.datetime);
      let currentdate = new Date();
      currentdate = currentdate.setHours(currentdate.getHours() + 3);
      if (lastOrder.datetime < lastOrder) {
        respose = {
          message: `Order can't Update`,
          error: true,
          statusCode: 400
        };
        return cb(respose);
      }
    } else {
      respose = {
        message: `Order Not Found`,
        error: false,
        statusCode: 200
      };
      return cb(respose);
    }
    let orderDetails = {
      totalfee: data.totalfee,
      services: data.services.map((item) => ({ id: item })),
    };
    let update = await repository.orderUpdate(
      { _id: lastOrder._id },
      orderDetails
    );
    if (update.error) return cb(update);

    respose = {
      message: `Order Successfully Updated`,
      error: false,
      statusCode: 200
    };
    return cb(respose);
  } catch (e) {
    console.log("error => ", e);
    respose = {
      message: `Internal Error.`,
      error: true,
      statusCode: 500
    };
    return cb(respose);
  }
};

exports.deleteOrder = async (data, cb) => {
  try {
    let respose = {};
    let lastOrder = await repository.getLastOrderDetail({ sort: { _id: -1 } });
    if (lastOrder.error) return cb(lastOrder);
    if (!lastOrder.data) {
      respose = {
        message: `Order Not Found`,
        error: false,
        statusCode: 200
      };
      return cb(respose);
    } else {
      lastOrder = JSON.parse(JSON.stringify(lastOrder.data));
    }

    let update = await repository.deleteOrder({ _id: lastOrder._id });
    if (update.error) return cb(update);

    respose = {
      message: `Order Delete Successfully`,
      error: false,
      statusCode: 200
    };
    return cb(respose);
  } catch (e) {
    console.log("error => ", e);
    respose = {
      message: `Internal Error.`,
      error: true,
      statusCode: 500
    };
    return cb(respose);
  }
};

exports.getAllServices = async (cb) => {
  try {
    let respose = {};
    respose = {
      message: `Data get Successfully`,
      data: serviceJson,
      error: false,
    };
    return cb(respose);
  } catch (e) {
    console.log("error => ", e);
    respose = {
      message: `Internal Error.`,
      error: true,
      statusCode: 500
    };
    return cb(respose);
  }
};
