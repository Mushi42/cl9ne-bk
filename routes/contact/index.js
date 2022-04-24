var express = require('express');
const { setResponse } = require('../../helpers/response.helper');
const {
  CREATE,
  FIND_ALL,
  FIND_ONE,
  DELETE_BY_ID
} = require('./service');
var router = express.Router();

router
  .post('/', async (req, res) => {
    try {
      console.log('=-=-=-',req.body)
      const response = await CREATE(req);
      setResponse(res, response);
    } catch (error) {
      return res.status(500).json({ type: 'Exception', message: error });
    }
  })
  .get('/', async (req, res) => {
    try {
      const response = await FIND_ALL(req);
      setResponse(res, response);
    } catch (error) {
      return res.status(500).json({ type: 'Exception', message: error });
    }
  })
  .get('/:id', async (req, res) => {
    try {
      const response = await FIND_ONE(req);
      setResponse(res, response);
    } catch (error) {
      return res.status(500).json({ type: 'Exception', message: error });
    }
  })
  .delete('/:id', async (req, res) => {
    try {
      const response = await DELETE_BY_ID(req);
      setResponse(res, response);
    } catch (error) {
      return res.status(500).json({ type: 'Exception', message: error });
    }
  });

module.exports = router;
