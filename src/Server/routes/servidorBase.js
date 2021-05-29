

const router = require('express').Router();

router.get('/', (req, res) => {
    res.write(`<h1>HOLA MUNDO!!!</h1>`)
    res.end();
  });

  module.exports = router;