const{getVolunteertInfo,getTherapistsInfo,getTherapistsInfoBySpeciality,
    getTherapistsInfoByOtherSpeciality,getRecommendedTherapistsInfo} = require("../services/volunteerService");
const { S3Client } = require("@aws-sdk/client-s3");
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


  const getVolunteerInfoController = async(req,res)=>{

    const volunteer_id = req.query;
    if(!volunteer_id){
        return res.status(401).json({message:"missing data"})
    }
    const result = await getVolunteertInfo(volunteer_id);
    if(result.volunteer){ 
    const params = {
        Bucket: 'volunteersprofilepics',
        Key: result.volunteer.volunteer_profile,
      };
      const url = s3Client.getSignedUrl('getObject', {
          Bucket: 'volunteersprofilepics',
          Key: result.volunteer.volunteer_profile,
        
      })
      result.volunteer.url = url;
    if(result.status ===200){
        return res.status(200).json({message: result.message, volunteer: result.volunteer})
    }
  }
    return res.status(401).json({message:"Unauthorized User"})

}





const therapistInfoController = async(req,res)=>{

const result = await getTherapistsInfo();
if(result.therapists){ 
for(let i = 0;i<result.therapists.length;i++){
 const params = {
        Bucket: 'volunteersprofilepics',
        Key: result.therapists[i].volunteer_profile,
      };
      const url = s3Client.getSignedUrl('getObject', {
          Bucket: 'volunteersprofilepics',
          Key: result.therapists[i].volunteer_profile,
        
      })
result.therapists[i].url = url;
}
    if(result.status ===200){
        return res.status(200).json({message: result.message, therapists: result.therapists})
    }
  }
    return res.status(401).json({message:"Unauthorized User"})

}

const therapistInfoBySpecialityController = async (req, res) => {
    const { speciality } = req.query;
    let result;
  
    if (speciality !== "Other") {
      result = await getTherapistsInfoBySpeciality(speciality);
    } else {
      result = await getTherapistsInfoByOtherSpeciality();
    }
  
    if (result.therapists) {
      for (let i = 0; i < result.therapists.length; i++) {
        const params = {
          Bucket: 'volunteersprofilepics',
          Key: result.therapists[i].volunteer_profile,
        };
        const url = s3Client.getSignedUrl('getObject', {
          Bucket: 'volunteersprofilepics',
          Key: result.therapists[i].volunteer_profile,
        });
        result.therapists[i].url = url;
      }
  
      if (result.status === 200) {
        return res.status(200).json({ message: result.message, therapists: result.therapists });
      }
    } else {
      return res.status(404).json({ message: "No Therapists" });
    }
  
    return res.status(401).json({ message: "Unauthorized User" });
  };
  
    
  const recommendedTherapistInfo = async (req, res) => {
    const { mental_illness } = req.query;

     const result = await getRecommendedTherapistsInfo(mental_illness);

  
    if (result.therapists) {
      for (let i = 0; i < result.therapists.length; i++) {
        const params = {
          Bucket: 'volunteersprofilepics',
          Key: result.therapists[i].volunteer_profile,
        };
        const url = s3Client.getSignedUrl('getObject', {
          Bucket: 'volunteersprofilepics',
          Key: result.therapists[i].volunteer_profile,
        });
        result.therapists[i].url = url;
      }
   
  
      if (result.status === 200) {
       
        return res.status(200).json({ message: result.message, therapists: result.therapists });
      }
    } else {
      return res.status(404).json({ message: "No Therapists" });
    }
  
    return res.status(401).json({ message: "Unauthorized User" });
  };
  


  
  
  
  
module.exports = {
    getVolunteerInfoController,
    therapistInfoController,
    therapistInfoBySpecialityController,
    recommendedTherapistInfo
}