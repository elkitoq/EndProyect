
const router = require('express').Router();

const fs = require('fs');

//Lee el contenido de la carpeta "./src/server/routes"
fs.readdir("./src/server/routes", function (err, archivos) {
    //Imprime errores en caso de haberlos,
    if (err) {
        console.log(err);
        return;
    }
    //Recorre los archivos de la carpeta
    for (const archivo of archivos) {
        if (archivo !== 'routes.js') {
            //Intenta cargar el router de cada archivo con
            try {
                router.use(require(`./${archivo}`));
                console.log('\x1b[34m%s\x1b[0m', `Cargada la ruta del servidor: "${archivo}"`);
            } catch (e) {
                // En caso de Fallar imprime un error
                console.log('\x1b[31m%s\x1b[0m', `Falló la carga de: "${archivo}"`);
                console.error('\x1b[31m%s\x1b[0m', e);
            }
        }
    }
    
    //Al terminar el proceso imprime un mensaje
    console.log('\x1b[32m%s\x1b[0m', `Rutas cargadas`);

});


module.exports = router;
