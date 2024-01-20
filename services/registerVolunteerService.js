const {query} = require('../database/db');

const register = async (data)=>{
    const {volunteer_name,volunteer_email,volunteer_type,volunteer_password,volunteer_about,volunteer_phonenumber,volunteer_Dob,volunteer_speciality} = data;
    const sql = `Insert INTO volunteers (volunteer_name,volunteer_email,volunteer_type,
        volunteer_password,volunteer_about,volunteer_phonenumber,volunteer_dob,volunteer_speciality) VALUES (?,?,?,?,?,?,?,?)`;
    try{
        const volunteer = await query(sql,[volunteer_name,volunteer_email,volunteer_type,volunteer_password,volunteer_about,volunteer_phonenumber,volunteer_Dob,volunteer_speciality]);
        if (!volunteer) {
            return { status: 401, message: "cannot Signup with these credentials!" }
        }

        return { status: 200, message: "Successful", volunteer: volunteer }
    } catch (error) {
        console.log(error);
        return { status: 500, message: "internal error" }
    }
    }
const checkIfPresent = async (data)=>{
  
    const {volunteer_email} = data;
       const sql =`Select * from volunteers where volunteer_email = ? `
       try{
        const user = await query(sql,[volunteer_email]);
        if (user.length===0) {
            return { status: 401, message: "Email not found" }
        }
        return { status: 200, message: "Email Found", user: user }
    } catch (error) {
        return { status: 500, message: "internal error" }
    }
}


const insertImage = async (img,email) => {
    const sql = `UPDATE volunteers SET volunteer_profile = ? WHERE volunteer_email = ?`;
    try {
        const result = await query(sql, [img, email]);

        if (result.affectedRows === 0) {
            return { status: 401, message: "Email not found" };
        }

        return { status: 200, message: "Image inserted successfully" };
    } catch (error) {
        return { status: 500, message: "Internal error" };
    }
}

const approve = async(data)=>{
    const sql = `UPDATE volunteers SET volunteer_approved = ? WHERE volunteer_email = ?`;
    try {
        const result = await query(sql, [1, data]);

       

        return { status: 200, message: "Volunteer is approved" };
    } catch (error) {
        return { status: 500, message: "Internal error" };
    } 
}


    module.exports = {
        register,
        checkIfPresent,
        insertImage,
        approve
        
    }