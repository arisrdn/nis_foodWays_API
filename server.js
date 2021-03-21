/** * Server Activation */
const express = require("express");
// const multer = require("multer");

const router = require("./src/routes");

const app = express();

const port = 5000;

app.use(express.json());
// app.use(express.urlencoded());
// app.use(multer().array());

app.use("/api/v1", router);

app.listen(port, () => console.log(`Your server is running on port : ${port}`));
