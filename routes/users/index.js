var express = require('express');
const { setResponse }= require('../../helpers/response.helper');
const { CREATE, LOGIN, FIND_ONE, FIND_ALL, UPDATE_BY_ID, DELETE_BY_ID } = require('./service');
var router = express.Router();

router.post('/', async (req, res) => {
  try {
    const response = await CREATE(req)
    res.send(response)

  } catch (error) {
    setResponse(res, { type: 'Error', data: error.stack });
  }
}).post('/login', async (req, res) => {
  try {

    const response = await LOGIN(req);
    setResponse(res, response);
  } catch (error) {
    setResponse(res, { type: 'Error', data: error.stack });
  }
})
.get('/', async (req, res) => {

  try {

    const users = await FIND_ALL()
    res.send(users)

  } catch (error) {
    setResponse(res, { type: 'Error', data: error.stack });
  }
}).get('/:id', async (req, res) => {
  try {
    const response = await FIND_ONE(req)
    res.send(response)

  } catch (error) {
    setResponse(res, { type: 'Error', data: error.stack });
  }
}).put('/:id', async (req, res) => {

  try {

    const response = await UPDATE_BY_ID(req)
    res.send(response)

  } catch (error) {
    setResponse(res, { type: 'Error', data: error.stack });
  }
}).delete('/:id', async (req, res) => {

  try {

    const response = await DELETE_BY_ID(req)
    res.send(response)

  } catch (error) {
    setResponse(res, { type: 'Error', data: error.stack });
  }
})

module.exports = router;