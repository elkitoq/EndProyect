const { User } = require('../models/User.js')
const router = require('express').Router();


router.post('/login', async (req, res) => {
    const user = await User.findByName(req.body.name);
    console.log(`login:${user.name}`);
    console.log(`${user.password}=== ${req.body.password.hashCode()}`);
    if (user)
        if (user.password === `${req.body.password.hashCode()}`){
            res.status(201).json({response:{},info:{userId:user._id}});
        }
    else {
        res.status(208).json({ info: { error: "Usuario o contraseña incorrecta" } });
    }
    res.end();
});

router.put('/user', async (req, res) => {
    console.log(req.body);

    const response = Object.assign({}, req.body);
    response["password"] = response["password2"] = "codificada";

    if (req.body["password"] === req.body["password2"]) {
        req.body.password = req.body.password.hashCode();
        const newUser = new User(req.body).save();
        res.status(201).json({ response: response });
    }
    else {
        res.status(208).json({ info: { error: "Las contraseñas deben coincidir" } });

    }
    res.end();
});
module.exports = router;