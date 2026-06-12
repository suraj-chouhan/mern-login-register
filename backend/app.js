const express = require("express");
const cors = require("cors");

const app = express();

require("./db");

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");

app.use("/api",authRoutes);

app.listen(3000,()=>{
    console.log("Server running");
});