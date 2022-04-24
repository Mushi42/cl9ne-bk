var express = require('express');
const { CREATE, FIND_ONE, FIND_ALL, UPDATE_BY_ID, DELETE_BY_ID } = require('./service');
var router = express.Router();

router.post('/', async (req, res) => {
  try {
    const response = await CREATE(req)
    res.send(response)

  } catch (error) {
    return res.status(500).json({ type: 'Exception', message: error })
  }
}).post('/login', async (req, res) => {
  try {
    const response = await LOGIN(req);
    res.send(response)

  } catch (error) {
    return res.status(500).json({ type: 'Exception', message: error })
  }
})
  .get('/', async (req, res) => {

    try {

      const users = await FIND_ALL()
      res.send(users)

    } catch (error) {
      return res.status(500).json({ type: 'Exception', message: error })
    }
  }).get('/:id', async (req, res) => {
    try {
      const response = await FIND_ONE(req)
      res.send(response)

    } catch (error) {
      return res.status(500).json({ type: 'Exception', message: error })
    }
  }).put('/:id', async (req, res) => {

    try {

      const response = await UPDATE_BY_ID(req)
      res.send(response)

    } catch (error) {
      return res.status(500).json({ type: 'Exception', message: error })
    }
  }).delete('/:id', async (req, res) => {

    try {

      const response = await DELETE_BY_ID(req)
      res.send(response)

    } catch (error) {
      return res.status(500).json({ type: 'Exception', message: error })
    }
  })

module.exports = router;