const { query } = require("../database/db");
const { use } = require("../routes/auth");




const getUserInfo = async (data) =>{
    const { user_id } = data;
    console.log("id",user_id)
    const sql = `SELECT * FROM users
    WHERE user_id = ? `;
    try {
        const user = await query(sql, [user_id]);
        if(user && user.length){
            return { status: 200, message: "Successful", user: user[0] }
        }else{
            return { status: 401, message: "cannot get credentials!" }
        }
    } catch (error) {
        return { status: 500, message: "internal error" }
    }
}
const getUserMedicalRecord = async (data) =>{
    const { user_id } = data;
    const sql = `SELECT * FROM medicalrecord
    WHERE user_id = ? `;
    try {
        const medicalRecord = await query(sql, [user_id]);
        if(medicalRecord && medicalRecord.length){
            return { status: 200, message: "Successful", medicalRecord: medicalRecord[0] }
        }else{
            return { status: 401, message: "cannot get credentials!" }
        }
    } catch (error) {
        return { status: 500, message: "internal error" }
    }
}



module.exports = {
    getUserInfo,
    getUserMedicalRecord
}