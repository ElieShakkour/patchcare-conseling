const axios = require('axios');

const diseaseApiController = async (req, res) => {
  try {

    const disease = req.query.disease;
    const apiUrl = `https://mydisease.info/v1/query?q=${disease}&fields=all&size=1&from=0&fetch_all=false&facet_size=10&dotfield=false`;

    const response = await axios.get(apiUrl, {
      headers: {
        'accept': '*/*'
      }
    });
if(response.data.hits[0].mondo.definition){ 
    return res.status(200).json(response.data.hits[0].mondo.definition);
}else{
    return res.status(404).json("Disease not found");
}
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  diseaseApiController
};
