import http from "../../http-common";
import { getToken } from "../../UTILS/localStorageUtils";

const authenticateVolunteer = (user) => 
{
    return http.post(`/auth/authenticatevolunteer`, user);
}
const getVolunteer = (volunteer_id) => {
  return http.get(`/volunteers/volunteerInfo?volunteer_id=${volunteer_id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
   
  });
};

const register = (user) => 
{
    return http.post(`/volunteerregister`, user);
}

const checkVolunteer = (volunteer) => 
{
    return http.post(`/checkvolunteer`, volunteer);
}

const getTherapists = () => 
{

    return http.get(`/volunteers/therapists`,{
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
}

const getTherapistsBySpeciality = (speciality) => 
{
    return http.get(`/volunteers/therapists/filtered?speciality=${speciality}`,{
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
}
const getRecommendedTherapists = (mental_illness) => 
{
    return http.get(`/volunteers/therapists/recommended?mental_illness=${mental_illness}`,{
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
}
const   VolunteerService = {
    register,
    getVolunteer,
    checkVolunteer,
    getTherapists,
    getTherapistsBySpeciality,
    getRecommendedTherapists,
    authenticateVolunteer

}


export default VolunteerService;