const terminal = new (require('./terminal'))();
terminal.display = false;

const execute = async (cmd) => {
    const ret = await terminal.run(cmd);
    return (`${ret.out}`);
}

const repair = async (module, lastVersion, directory = ".") => {
    terminal.setDirectory(directory)
    const version = await getVersion(module)

    if (version !== lastVersion) {
        console.log('\x1b[31m%s\x1b[0m', `Version incorrecta del modulo "${module}" en ${directory}`);
        console.log('\x1b[31m%s\x1b[0m', `Se esperaba "${lastVersion}" pero es ${version}`);
        terminal.readline.question("Actualizar? (S/N)", async(res) => {
            if (res === "s" || res === "y" || res === "si" || res === "yes")
                console.log(await execute("npm install "+module+lastVersion))
        });
    }
}

const getVersion = async (module) => {

    let transition = await execute("npm list " + module);
    transition = transition.slice(
        transition.search(module) + module.length
    )
    return transition.slice(0,
        transition.search(" \n\n")
    )
}

module.exports = repair;
