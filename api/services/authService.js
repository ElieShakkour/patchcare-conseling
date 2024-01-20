const { query } = require("../database/db");




const authenticate = async (data) =>{
    const { email, password } = data;
    const sql = `SELECT * FROM users
    WHERE user_email = ? AND user_password = ?`;
    try {
        const user = await query(sql, [email, password]);
        if(user && user.length){
            return { status: 200, message: "Successful", user: user[0] }
        }else{
            return { status: 401, message: "cannot login with these credentials!" }
        }
    } catch (error) {
        return { status: 500, message: "internal error" }
    }
}
const authenticateVolunteer = async (data) =>{
    const { email, password } = data;
    const sql = `SELECT * FROM volunteers
    WHERE volunteer_email = ? AND volunteer_password = ? AND volunteer_approved = ?`;
    try {
        const volunteer = await query(sql, [email, password,1]);
        if(volunteer && volunteer.length){
            return { status: 200, message: "Successful", volunteer: volunteer[0] }
        }else{
            return { status: 401, message: "cannot login with these credentials!" }
        }
    } catch (error) {
        return { status: 500, message: "internal error" }
    }
}



module.exports = {
    authenticate,
    authenticateVolunteer
}