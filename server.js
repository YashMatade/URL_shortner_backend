const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const indexRoutes = require("./routes/index");
require("dotenv").config();
const { mongodbConnection } = require("./db/connect");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRoutes);
app.get("/", (req, res) => {
    res.send("server is running")
})
let port = process.env.PORT || 5000
mongodbConnection();
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
