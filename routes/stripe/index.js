var express = require('express');
const { setResponse } = require('../../helpers/response.helper');
const {
  CHARGE
} = require('./service');
var router = express.Router();

router
  .post('/charge', async (req, res) => {
    try {
      const response = await CHARGE(req);
      setResponse(res, response);
    } catch (error) {
      console.log(error);
      setResponse(res, { type: 'Error', data: error.stack });
    }
  });

module.exports = router;
