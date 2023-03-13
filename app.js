const config = require("./config");
const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const mongoUrl = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

mongoose
  .connect(mongoUrl, {})
  .then(() => {
    console.log("MongoDB is connected!");
  })
  .catch((err) => {
    throw err;
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const customer = require("./app/routes/CustomerRoutes")();
app.use("/customer", customer);

const eventRoutes = require("./app/routes/EventRoutes");
app.use("/customerEvent", eventRoutes);

const userRoutes = require("./app/routes/UserRoutes");
app.use("/user", userRoutes);

app.listen(config.app.port, () => {
  console.log("Server is ready to use!");
});
