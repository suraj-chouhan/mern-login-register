const jwt = require("jsonwebtoken");

const authMiddleware = async (req,res,next)=>{
    try{
            const token = req.headers.authorization;
            if(!token)
            {
                return res.status(401).json({message:"No token"});
            }
            const verified = jwt.verify(token,"secretkey");
            req.user = verified;
            next();
    }catch(error){
        res.status(401).json({message:"Invalid Token"});
    }
}

module.exports = authMiddleware;