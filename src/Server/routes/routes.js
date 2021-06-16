
const router = require('express').Router();

const fs = require('fs');

fs.readdir("./src/server/routes", function (err, archivos) {
if (err) {
onError(err);
return;
}
for(archivo of archivos){
    if (archivo != 'routes.js'){
        try{
        router.use(require(`./${archivo}`));
        console.log('\x1b[34m%s\x1b[0m', `Cargada la ruta del servidor: "${archivo}"`);
        } catch(e) {
            console.log('\x1b[31m%s\x1b[0m', `Falló la carga de: "${archivo}"`);
            console.error('\x1b[31m%s\x1b[0m',e);
        }
    }
}

console.log('\x1b[32m%s\x1b[0m', `Rutas cargadas`);

});


module.exports = router;
