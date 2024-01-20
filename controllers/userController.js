const{getUserInfo,getUserMedicalRecord} = require("../services/userService");
require("@aws-sdk/client-s3");
var jwt = require('jsonwebtoken');
require('dotenv').config();
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const region = process.env.REGION;
const accessKeyId = process.env.ACCESSKEYID;
const secretAccessKey = process.env.SECRETACCESSKEY;
const AWS = require('aws-sdk')
const s3Client = new AWS.S3({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });


const getUserInfoController = async(req,res)=>{

    const user_id = req.query;
    if(!user_id){
        return res.status(401).json({message:"missing data"})
    }
    // console.log("id",user_id)
    
    const result = await getUserInfo(user_id);
   console.log(result);
    const params = {
        Bucket: 'patchcare',
        Key: result.user.user_profile,
      };
      const url = s3Client.getSignedUrl('getObject', {
          Bucket: 'patchcare',
          Key: result.user.user_profile,
        
      })

      result.user.url = url;
     let recordResult = await getUserMedicalRecord(user_id);
     
      result.user.chronic_disease = recordResult.medicalRecord.chronic_disease;
      result.user.mental_illness = recordResult.medicalRecord.mental_illness;

    if(result.status ===200){
        return res.status(200).json({message: result.message, user: result.user})
    }
    return res.status(401).json({message:"Unauthorized User"})

}





  
  
  
  
module.exports = {
    getUserInfoController,
}