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
    res.json({response:datos});
    res.end();
});

router.post('/user', async(req, res) => {
    datos.user=req.body;
    console.log(datos);
    const response=Object.assign({}, datos.user);
    response["Password"]="codificada";
    response["Repetir Password"]="codificada";
    res.json({response:response});
    res.end();
});


module.exports = router;