const router = require('express').Router();


router.get('/api', async(req, res) => {
    console.log(req.session.datos);
    res.json({response:req.session.datos});
    res.end();
});

router.post('/api', async(req, res) => {
    if (req.session.datos===undefined)
        req.session.datos={hola:"mundo",view:0}
    console.log(req.body);
    req.session.datos.pull=req.body.pull;
    req.session.datos.view++;
    res.json({response:req.session.datos});
    res.end();
});


module.exports = router;