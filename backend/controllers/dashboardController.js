const User = require("../models/User");

const dashboardInfo = async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.json({message:"Welcome to Dashboard",user});
    }catch(error)
    {
        res.status(500).json({message:"server error"});
    }
}

module.exports = { dashboardInfo };