const authentication = function (req, res, next) {
  !process.env.API_KEY ?
    console.log('please set an API Key environment variable') :
    req.headers.Authorization = process.env.API_KEY;
  next();
};

module.exports = { authentication };