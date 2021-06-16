const { User } = require('../models/User.js')
const router = require('express').Router();


router.post('/login', async (req, res) => {
    console.log(`LOGIN:${req.sessionID}`);
    const user = await User.findByName(req.body.name);
    // console.log(`login:${user.name}`);
    // console.log(`${user.password}=== ${req.body.password.hashCode()}`);
    if (user)
        if (user.password === `${req.body.password.hashCode()}`) {
            req.session.user = user;
            res.status(201).json({ response: {}, info: {isLogin:true} });
        }
        else {
            res.status(208).json({ info: { error: "Usuario o contraseña incorrecta" } });
        }
    else
        res.status(201).json({ info: { error: "Usuario o contraseña incorrecta" } });
    res.end();
});

router.post('/logout',(req,res)=>{
    console.log(`LOGOUT:${req.sessionID}`);
    req.session.user=undefined;
    res.json({info:{message:"Se cerró sesión"}});
});

router.put('/user', async (req, res) => {
    req.session.view = req.session.view * 2;
    if (req.body.name && req.body.password && req.body.email) {

        const response = Object.assign({}, req.body);
        response["password"] = response["password2"] = "codificada";


        if (req.body["password"] === req.body["password2"]) {
            req.body.password = req.body.password.hashCode();
            const newUser = await new User(req.body).save();
            req.session.user = newUser;
            res.status(201).json({ response: response, info: {isLogin:true} });
        }
        else {
            res.status(208).json({ info: { error: "Las contraseñas deben coincidir" } });

        }
    }
    else
        res.json({ info: { error: "Rellena todos los campos" } })
        
    console.log(req.session);
    res.end();
});
module.exports = router;