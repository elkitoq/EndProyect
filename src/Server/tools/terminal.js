const { exec } = require('child_process');
const readline = require("readline");

class Terminal {

    constructor() {
        this.display = false;
        this.log = "";
        this.stdout = console.log;
        this.stderr = console.error;

        this.readline = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

    }

    setDirectory = (dir) => {
        this.directory = dir;
    }

    run(command = "", display = this.display) {
        return new Promise(resolve => {
            exec(command, { encoding: "utf-8", cwd: this.directory }, (err, stdout, stderr) => {
                if (err) {
                    // node couldn't execute the command
                    return;
                }
                if (display) {
                    if (stdout)
                        this.stdout(`${stdout}`);
                    if (stderr)
                        this.stderr(`${stderr}`);
                }
                resolve({ out: stdout, err: stderr })
            });
        })
    }
}


module.exports = Terminal;