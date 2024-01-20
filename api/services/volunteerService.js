const { query } = require("../database/db");


const getVolunteertInfo = async (data) =>{
    const { volunteer_id } = data;
    const sql = `SELECT * FROM volunteers
    WHERE volunteer_id = ? `;
    try {
        const volunteer = await query(sql, [volunteer_id]);
        if(volunteer && volunteer.length){
            return { status: 200, message: "Successful", volunteer: volunteer[0] }
        }else{
            return { status: 401, message: "cannot get credentials!" }
        }
    } catch (error) {
        return { status: 500, message: "internal error" }
    }
}
const getTherapistsInfo = async () =>{
    const sql = `SELECT * FROM volunteers
    WHERE volunteer_type = ? AND volunteer_approved = ? `;
    try {
        const volunteers = await query(sql, ["Therapist",1]);
        if(volunteers && volunteers.length){
            return { status: 200, message: "Successful", therapists: volunteers }
        }else{
            return { status: 401, message: "cannot get credentials!" }
        }
    } catch (error) {
        return { status: 500, message: "internal error" }
    }
}
const getTherapistsInfoBySpeciality = async (speciality) =>{
    const sql = `SELECT * FROM volunteers
    WHERE volunteer_type = ? AND volunteer_speciality = ? and volunteer_approved = ? `;
    try {
        const volunteers = await query(sql, ["Therapist",speciality,1]);
        if(volunteers && volunteers.length){
            return { status: 200, message: "Successful", therapists: volunteers }
        }else{
            return { status: 401, message: "cannotget credentials!" }
        }
    } catch (error) {
        return { status: 500, message: "internal error" }
    }
}

const getTherapistsInfoByOtherSpeciality = async (speciality) =>{
    const sql = `SELECT *
    FROM volunteers
    WHERE volunteer_type = ?
    AND volunteer_speciality NOT IN (
        SELECT required_speciality
        FROM mentalillness
    ) AND volunteer_approved = ?; `;
    try {
        const volunteers = await query(sql, ["Therapist",1]);
        if(volunteers && volunteers.length){
            return { status: 200, message: "Successful", therapists: volunteers }
        }else{
            return { status: 401, message: "cannotget credentials!" }
        }
    } catch (error) {
        return { status: 500, message: "internal error" }
    }
}


const getRecommendedTherapistsInfo = async (mental_illness) =>{
    const sql = `SELECT *
    FROM volunteers
    WHERE volunteer_type = ?
    AND volunteer_speciality IN (
        SELECT required_speciality
        FROM mentalillness
        WHERE mentalIllnessName = ?
    )AND volunteer_approved = ?;; `;
    try {
        const volunteers = await query(sql, ["Therapist",mental_illness,1]);
        
        if(volunteers && volunteers.length){
            return { status: 200, message: "Successful", therapists: volunteers }
        }else{
            return { status: 401, message: "cannotget credentials!" }
        }
    } catch (error) {
        return { status: 500, message: "internal error" }
    }
}

module.exports = {
    getVolunteertInfo,
    getTherapistsInfo,
    getTherapistsInfoBySpeciality,
    getTherapistsInfoByOtherSpeciality,
    getRecommendedTherapistsInfo
}