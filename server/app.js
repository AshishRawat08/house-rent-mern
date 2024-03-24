require("dotenv").config();
require("./DB/db");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 6010;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is started at port no. ${PORT}`);
});
