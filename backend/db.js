const mongoose = require("mongoose");
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DB connected")).catch((err)=>console.log(err));