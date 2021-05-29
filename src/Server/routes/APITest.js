

const router = require('express').Router();

const datos={hola:"mundo"};

router.get('/api', async(req, res) => {
    console.log(datos);
    res.json(datos);
    res.end();
});

router.post('/api', async(req, res) => {
    console.log(req.body);
    datos.pull=req.body.pull;
    res.json(datos);
    res.end();
});

module.exports = router;