require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connection = require("./config/database");
const events = require("./src/routes/events");
const auth = require("./src/routes/auth");

const app = express();

app.use(express.json({
    limit: "50mb"
}));
app.use(cors());

app.use('/events', events);
app.use('/auth', auth);

connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", () => {
    console.log("Connected to the database");
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
});