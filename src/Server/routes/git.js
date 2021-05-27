

const router = require('express').Router();

const terminal = new (require('../tools/terminal'));
terminal.display = true;

router.get('/pullgit', async(req, res) => {
    res.write(execute("git status"));
    res.end();
});

router.get('/statusgit', async(req, res) => {
    res.write(await execute("git status"));
    res.end();
});


const execute= async(cmd) =>{
    const log= await terminal.run(cmd);
    return (`${log.out}`);
}

module.exports = router;