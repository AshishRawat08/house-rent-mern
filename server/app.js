require("dotenv").config();
require("./DB/db");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 6010;
const authRoutes = require("./routes/auth");

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies before routing
app.use(express.static("public"));

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is started at port no. ${PORT}`);
});
