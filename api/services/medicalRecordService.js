
const {query} = require('../database/db');
const insertMedicalRecord = async (data)=>{
    const {blood_type,user_id,chronic_disease,mental_illness,more_info} = data;
    const sql = `Insert INTO medicalrecord (blood_type,user_id,chronic_disease,mental_illness,more_info) VALUES (?,?,?,?,?)`;
    try{
        console.log(blood_type,user_id,chronic_disease,mental_illness,more_info)
        const user = await query(sql,[blood_type,user_id,chronic_disease,mental_illness,more_info]);
        console.log(user)
        if (!user) {
            return { status: 401, message: "cannot insert these credentials!" }
        }
        return { status: 200, message: "Successful", user: user }
    } catch (error) {
        console.error(error);
        return { status: 500, message: "internal error" }
    }
    }
    const getUserMedicalRecord = async (user_id) => {
        const sql = 'SELECT * FROM medicalrecord WHERE user_id = ?';
        try {
        
            const record = await query(sql, [user_id]);
            return { status: 200, message: 'Successful', medicalRecord: record[0] };
        } catch (error) {
            console.error(error);
            return { status: 500, message: 'Internal error' };
        }
    }
    module.exports = {
        insertMedicalRecord,
        getUserMedicalRecord,
    }