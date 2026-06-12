require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

require("./db");

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");

app.use("/api",authRoutes);

app.listen(process.env.PORT,()=>{
    console.log("Server running");
});