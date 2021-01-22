const express = require("express");
require("dotenv").config();
const cors = require("cors");
const models = require("./db");

// ROUTER
const prodRouter = require("./services/products");
const revRouter = require("./services/reviews");
// SERVER
const server = express();
server.use(cors());

// PORT
const port = process.env.PORT || 3000;

server.use(express.json());
server.use("/products", prodRouter);
server.use("/reviews", revRouter);

models.sequelize
  .sync({ force: false }) //{force:true} to drop all tables before creating

  .then((result) => {
    server.listen(port || 3002, () => console.log("Running on port " + port));
  })
  .catch((e) => console.log(e));
