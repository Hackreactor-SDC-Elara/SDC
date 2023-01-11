const axios = require('axios');

const rerouteToAPI = (req, res) => {
  let options = {
    method: req.method,
    headers: { Authorization: req.headers.Authorization }
  };
  let statusCode = 200;
  if (req.method === 'POST') {
    options.data = req.body;
    statusCode = 201;
  }
  console.log(JSON.stringify(options));
  axios(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${req.url}`, options)
  .then(response => res.status(statusCode).send(response.data))
  .catch(err => console.log(`error getting data from api`, err));
}

module.exports = rerouteToAPI;