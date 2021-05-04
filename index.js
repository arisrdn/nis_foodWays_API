//instatiate express module
const express = require("express");

require("express-group-routes");

const cors = require("cors");

//init bodyparser
const bodyParser = require("body-parser");

//use express in app variable
const app = express();

//define the server port
const port = process.env.PORT || 5000;

app.use(cors());

//create the home route
app.get("/", (req, res) => {
	res.send("End point run");
});

//executed port
app.listen(port, () => console.log(`Listening on port ${port}!`));
