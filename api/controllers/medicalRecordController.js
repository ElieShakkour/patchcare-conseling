const {insertMedicalRecord,getUserMedicalRecord} = require('../services/medicalRecordService');


const medicalRecordController = async(req,res)=>{
    const medicalRecord = req.body;
    
    if(!medicalRecord){
        return res.status(401).json({message: "missing data"});
    }
    const result = await insertMedicalRecord(medicalRecord);
   
    if(result.status === 200){ 
      
        return res.status(200).json({message: result.message})
    }
}

const getUserMedicalRecordController = async(req,res)=>{
    const {user_id} = req.query;
    
   
    const result = await getUserMedicalRecord(user_id);
   
    if(result.status === 200){ 

        return res.status(200).json({message: result.message, medicalRecord : result.medicalRecord})
    }
    return res.status(500).json({message: result.message,medicalRecord :{}})
}
module.exports={
    medicalRecordController,
    getUserMedicalRecordController

}