import http from "../src/http-commonmon";

const getMentalIllness = () => 
{
    return http.get(`/conditions/mentalillness`);
}
const getChronicDisease = () => 
{
    return http.get(`/conditions/chronicdisease`);
}
const getSpeciality = () => 
{
    return http.get(`/conditions/speciality`);
}
const ConditionsService = {
    getMentalIllness,
    getChronicDisease,
    getSpeciality
}

export default ConditionsService;