import http from "../src/http-commonmon";

const getDisease = (disease) => 
{
    return http.get(`/diseaseApi?disease=${disease}`);
}
const ApisService = {
    getDisease,
 
}

export default ApisService;