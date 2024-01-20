const{authenticate,authenticateVolunteer} = require("../services/authService");
var jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateController = async(req,res)=>{

    const user = req.body;

    if(!user){
        return res.status(401).json({message:"missing data"})
    }
    const result = await authenticate(user.user);
    if(result.status ===200){
        const token = jwt.sign({user_id:result?.user?.user_id}, process.env.SECRET_KEY)
        return res.status(200).json({message: result.message, user: result.user, token: token})
    }
    return res.status(401).json({message:"Unauthorized User"})

}
const authenticateVolunteerController = async(req,res)=>{

    const user = req.body;
  
    if(!user){
        return res.status(401).json({message:"missing data"})
    }
    const result = await authenticateVolunteer(user.user);
    if(result.status ===200){
        const token = jwt.sign({volunteer_id:result?.volunteer?.volunteer_id}, process.env.SECRET_KEY)
        return res.status(200).json({message: result.message, user: result.volunteer, token: token})
    }
    return res.status(401).json({message:"Unauthorized User"})

}


module.exports = {
    authenticateController,
    authenticateVolunteerController,
}