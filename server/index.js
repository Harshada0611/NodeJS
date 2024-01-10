require("dotenv").config();
const port = process.env.PORT || 8000;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//database connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`database connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`database connnection failed:  ${err}`);
  }
};
connection();

//importing router
app.use(require("./route"));

//testing api
app.get("/", async (req, resp) => {
  try {
    resp.send("This is EzyBuy API");
  } catch (err) {
    console.log(err);
  }
});

//server running
app.listen(port, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
  } else {
    console.log(`Server listening on port ${port}`);
  }
});
