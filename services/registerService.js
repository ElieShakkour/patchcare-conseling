const {query} = require('../database/db');

const register = async (data)=>{
    const {fullName,email,password,dob,phone,gender} = data;
    const sql = `Insert INTO users (fullName,user_email,user_password,dob,phoneNumber,gender) VALUES (?,?,?,?,?,?)`;
    try{
        const user = await query(sql,[fullName,email,password,dob,phone,gender]);
        if (!user) {
            return { status: 401, message: "cannot Signup with these credentials!" }
        }

        return { status: 200, message: "Successful", user: user }
    } catch (error) {
        return { status: 500, message: "internal error" }
    }
    }
const checkIfPresent = async (data)=>{
  
    const {email} = data;
       const sql =`Select * from users where user_email = ? `
       try{
        const user = await query(sql,[email]);
        if (user.length===0) {
            return { status: 401, message: "Email not found" }
        }
        return { status: 200, message: "Email Found", user: user }
    } catch (error) {
        return { status: 500, message: "internal error" }
    }
}
const insertImage = async (img,email) => {
    const sql = `UPDATE users SET user_profile = ? WHERE user_email = ?`;
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


    module.exports = {
        register,
        checkIfPresent,
        insertImage
    }