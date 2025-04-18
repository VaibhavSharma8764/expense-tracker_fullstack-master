const { db } = require("./db/db.js");
const { readdirSync } = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config({ path: "config.env" });

const PORT = process.env.PORT;

app.use(express.json());

// Enable CORS for requests from your frontend (React port 3001)
app.use(cors());

// app.get("/", (req, res) => {
//   res.send("HELLO WORLD");
// });

readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening to port", PORT);
  });
};
server();
