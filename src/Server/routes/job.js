const { Application } = require('../models/Applications.js');
const { Candidate } = require('../models/candidate.js');
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

    res.status(201).json({ info: { saved: true } });
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
            if (index >= 0) {
                Object.assign(profile.applications[index], req.body);
                console.log(profile.applications[index]);
                profile.save()

                const application = await await Application.findById(req.body._id)
                Object.assign(application, req.body);
                application.save()
                info.saved = true;
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
        const application = await Application.findById(req.query.id)
        application.candidates = undefined
        res.status(201).json({ response: application });
    }
    res.end();
});

router.get('/jobs', async (req, res) => {
    console.log(`getJOBs:${req.sessionID}`);
    console.log(req.query);

    if (req.query.b) {
        const response = [];
        const match = {}

        for (const post of req.query.b.split(" ")) {
            const applications = await Application.findSimilar(post)
            for (const application of applications) {
                application.candidates = undefined
                if (req.query.listAll || (application.status === 1))
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
        const response = 
        (await Application.findById(application._id)).candidates
        application.candidates = undefined
        if (profile) {
            res.status(201).json({ response, info: { application } });
        }
    }else res.status(201).json({ info: { error: "No ha iniciado session" } });
    res.end();
});

router.post('/postulate', async (req, res) => {
    console.log(`postCANDIDATES:${req.sessionID}`);
    console.log(req.body);

    if (req.session.user && req.body.role && req.body.id)
        if (req.session.user.profile[req.body.role] && req.session.user.profile[req.body.role].profileType) {
            const application = await Application.findById(req.body.id)
            if (application.candidates.find((e) => e._id === req.session.user.profile[req.body.role]._id))
                res.status(201).json({ info: { error: "Ya estaba postulado" } });
            else {
                application.candidates.push(req.session.user.profile[req.body.role])
                application.save()
                res.status(201).json({ info: { message: "Te has postulado" } });
            }
        }
        else res.status(201).json({ info: { error: "Debe postularse desde un perfil de Aspirante" } });
    else res.status(201).json({ info: { error: "No ha iniciado session" } });
    res.end();
});
module.exports = router;


