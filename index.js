require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connection = require("./config/database");
const api = require("./src/routes/api")

const app = express();

app.use(express.json({
    limit: "50mb"
}));
app.use(cors());
app.use("/api/*", api);

app.use('/admin/*', express.static("public/admin"));
app.use('/*', express.static("public/client"));
app.use(express.static("public"));


connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", () => {
    console.log("Connected to the database");
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
});