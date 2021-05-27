const { exec } = require('child_process');

class Terminal {

    constructor() {
        this.display = false;
        this.log = "";
        this.stdout = console.log;
        this.stderr = console.error;

    }

    run(command = "", display = this.display) {
        return new Promise(resolve => {
            exec(command, { encoding: "utf-8" }, (err, stdout, stderr) => {
                if (err) {
                    // node couldn't execute the command
                    return;
                }
                console.log(stdout);

                if (display) {
                    if (stdout)
                        this.stdout(`${stdout}`);
                    if (stderr)
                        this.stderr(`${stderr}`);
                }
                resolve({out:stdout,err:stderr})
            });
        })
    }
}


module.exports = Terminal;