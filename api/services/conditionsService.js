const { query } = require("../database/db");




const getMentalIllness = async () =>{

    const sql = `SELECT * FROM mentalillness`;
    try {
        const mentalIllness = await query(sql);
            return { status: 200, message: "Successful", mentalIllness: mentalIllness }
      
    } catch (error) {
        return { status: 500, message: "internal error" }
    }
}



const getChronicDisease = async () =>{

    const sql = `SELECT * FROM chronicdisease`;
    try {
        const chronicDisease = await query(sql);
            return { status: 200, message: "Successful", chronicDisease: chronicDisease }
      
    } catch (error) {
        return { status: 500, message: "internal error" }
    }
}



module.exports = {
    getMentalIllness,
    getChronicDisease
}