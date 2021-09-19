const { Application } = require('../models/Applications.js');
const { getProfile } = require('../models/Profile.js');
const { User } = require('../models/User.js')
const router = require('express').Router();

router.put('/job', async (req, res) => {
    console.log(`JOB:${req.sessionID}`);
    console.log(req.body);

    if (req.session.user && req.body.role) {
        const profile = await getProfile(req.session.user.profile[req.body.role])
        if (profile) {
            profile.applications.push(await new Application(req.body).save())
            profile.save()
        }
    }

    res.status(201).json({});
    res.end();
});

router.post('/job', async (req, res) => {
    console.log(`postJOB:${req.sessionID}`);
    console.log(req.body);

    const info = {}

    if (!req.session.user)
        info.error = "no ha iniciado sesion"
    else if (req.body.role) {
        const profile = await getProfile(req.session.user.profile[req.body.role])
        if (profile) {


            const index = profile.applications.findIndex((e) => e._id.toString() === req.body._id)
            console.log(index);
            if (index) {
                Object.assign(profile.applications[index], req.body);
                console.log(profile.applications[index]);
                profile.save()

                const application = await await Application.findById(req.body._id)
                Object.assign(application, req.body);
                application.save()
            }
            else info.error = "No puede editar la busqueda laboral"

        }
        else info.error = "No se localiza el perfil"
    }

    res.status(201).json({ info });
    res.end();
});

router.get('/job', async (req, res) => {
    console.log(`getJOB:${req.sessionID}`);
    console.log(req.query);
    if (req.query.id) {
        const applications = await Application.findById(req.query.id)
        res.status(201).json({ response: applications });
    }
    res.end();
});

router.get('/jobs', async (req, res) => {
    console.log(`getJOBs:${req.sessionID}`);
    console.log(req.query);

    if (req.query.post) {
        const response = [];
        const match = {}

        for (const post of req.query.post.split(" ")) {
            const applications = await Application.findSimilar(post)
            for (const application of applications) {
                if (match[application._id] === undefined) {
                    response.push(Object.assign({ match: 1 }, application._doc));
                    match[application._id] = response.length - 1
                } else
                    response[match[application._id]].match++;
            }
        }

        response.sort((a, b) => b.match - a.match)

        res.status(201).json({ response });

    }



    if (req.session.user && req.query.role) {

        const profile = await getProfile(req.session.user.profile[req.query.role])
        if (profile) {
            res.status(201).json({ response: profile.applications });
        }
    }
    res.end();
});

router.get('/candidates', async (req, res) => {
    console.log(`getCANDIDATES:${req.sessionID}`);
    console.log(req.query);

    if (req.session.user && req.query.role && req.query.application) {

        const profile = await getProfile(req.session.user.profile[req.query.role])
        const application = profile.applications.find((e) => e._id.toString() === req.query.application);
        const response = application.candidates;
        application.candidates = undefined
        if (profile) {
            res.status(201).json({ response, info: { application } });
        }
    }
    res.end();
});

module.exports = router;


