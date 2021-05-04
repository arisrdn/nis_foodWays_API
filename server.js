const express = require("express");
// require("dotenv").config();
const app = express();
const cors = require("cors");
const router = require("./src/routes");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/api/v1/", router);
app.use("/uploads", express.static("uploads"));
//create the home route
app.get("/", (req, res) => {
	res.send("End point run");
});
app.listen(port, () => console.log(`Your server is running on ${port}`));
