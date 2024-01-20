const {getChronicDisease,getMentalIllness} =require( '../services/conditionsService')


const mentalIllnessTypesController = async(req,res)=>{

    const mentalIllnessData = await getMentalIllness();
    return res.status(200).json({ mentalIllnessTypes : mentalIllnessData.mentalIllness})
   
}
const chronicDiseaseTypesController = async(req,res)=>{

    const chronicDiseaseData = await getChronicDisease();
    return res.status(200).json({ chronicDiseaseTypes : chronicDiseaseData.chronicDisease})
   
}


const mentalIllnessTSpecialityController = async(req,res)=>{

    const mentalIllnessData = await getMentalIllness();
    return res.status(200).json({ speciality : mentalIllnessData.mentalIllness})
   
}






module.exports = {
    mentalIllnessTypesController,
    chronicDiseaseTypesController,
    mentalIllnessTSpecialityController
  };
  