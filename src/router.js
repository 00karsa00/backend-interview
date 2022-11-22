const express = require("express");
const router = express.Router();
const service = require("./service");

router.get("/getAllOrder", (req, res) => {
  service.getAllOrder((result) => {
    console.log("result =>", result);
    res.send(result);
  });
});

router.post("/createOrder", (req, res) => {
  service.createOrder(req.body, (result) => {
    console.log("result =>", result);
    res.send(result);
  });
});

router.put("/updateOrder", (req, res) => {
  service.updateOrder(req.body, (result) => {
    console.log("result =>", result);
    res.send(result);
  });
});

router.delete("/deleteOrder", (req, res) => {
  service.deleteOrder(req.body, (result) => {
    console.log("result =>", result);
    res.send(result);
  });
});

router.get("/getAllServices", (req, res) => {
  service.getAllServices((result) => {
    console.log("result =>", result);
    res.send(result);
  });
});

module.exports = router;
