require("dotenv").config();
require("./DB/db");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 6010;
const authRoutes = require("./routes/auth");
const listingsRoutes = require("./routes/listing")

app.use(cors()); 
app.use(express.json()); 
app.use(express.static("public"));

app.use("/auth", authRoutes);
app.use("/property-lists", listingsRoutes);

app.listen(PORT, () => {
  console.log(`Server is started at port no. ${PORT}`);
});
