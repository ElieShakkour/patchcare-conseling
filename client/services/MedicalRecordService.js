
import http from "../../http-common";
import { getToken } from "../../UTILS/localStorageUtils";
const insertMedicalRecord = (medicalRecord) => {
    return http.post('/medicalrecord', medicalRecord, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  };
  
  const getUserMedicalRecord = (user_id) => {
    return http.get(`/medicalrecord/usermedicalrecord?user_id=${user_id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  };
  
const MedicalRecordService = {
    insertMedicalRecord,
    getUserMedicalRecord
}


export default MedicalRecordService;