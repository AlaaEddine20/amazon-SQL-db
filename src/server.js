const express = require("express");
require("dotenv").config();
const cors = require("cors");
const models = require("./db");

// ROUTER
const prodRouter = require("./services/products");

// SERVER
const server = express();
server.use(cors());

// PORT
const port = process.env.PORT || 3000;

server.use(express.json());
server.use("/products", prodRouter);

models.sequelize
  .sync({ force: true }) //{force:true} to drop all tables before creating

  .then((result) => {
    server.listen(port || 3002, () => console.log("Running on port " + port));
  })
  .catch((e) => console.log(e));
