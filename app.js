const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv/config");
const cors = require("cors");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

app.use(cors());
app.options("*", cors());

//middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

//Routes
const productRoute = require("./routes/products");
const categoryRoute = require("./routes/categories");
const userRoute = require("./routes/users");
const orderRoute = require("./routes/orders");

const api = process.env.APP_URL;

app.use(`${api}/products`, productRoute);
app.use(`${api}/categories`, categoryRoute);
app.use(`${api}/users`, userRoute);
app.use(`${api}/orders`, orderRoute);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-db",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log(api);
  console.log("Server started on 3000");
});
