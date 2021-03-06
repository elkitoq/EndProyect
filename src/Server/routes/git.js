

const router = require('express').Router();

const terminal = new (require('../tools/terminal'))();
terminal.display = true;

router.get('/pullGit', async (req, res) => {
    res.write(await execute("git pull"));
    res.end();
});

router.get('/statusGit', async (req, res) => {
    res.write(await execute("git status"));
    res.end();
});

router.get('/checkoutGit', async (req, res) => {
    if (req.query.branch)
        res.write(await execute(`git checkout ${req.query.branch}`));
    else {
        const lista = (await execute(`git branch -a`)).split("\n")
        const select = lista.findIndex((e) => e.search(" * "));
        res.write(`<html>
    <form>
        <select name="branch" value=${lista[select].substring(2)}>
            ${lista.map((e) => `<option value="${e.substring(2)}">${e}</option>`)}
        </select>
        <button>Enviar</button>
    </form></html>`);
    }
    res.end();
});

router.get('/git', async (req, res) => {
    res.write(`
    <html>
        <a href="/statusGit">git status</a><br/>
        <a href="/checkoutGit">git checkout</a><br/>
        <a href="/pullGit">git pull</a><br/>
    </html>
    `);
    res.end();
});



const execute = async (cmd) => {
    const log = await terminal.run(cmd);
    return (`${log.out}`);
}

module.exports = router;