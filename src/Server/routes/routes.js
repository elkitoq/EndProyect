
const router = require('express').Router();

const fs = require('fs');

fs.readdir("./src/server/routes", function (err, archivos) {
if (err) {
onError(err);
return;
}
for(archivo of archivos){
    if (archivo != 'routes.js'){
        console.log('\x1b[33m%s\x1b[0m', `Cargando ruta del servidor: "${archivo}"`);
        router.use(require("./servidorBase.js"));
    }
}

console.log('\x1b[32m%s\x1b[0m', `Rutas cargadas`);

});


module.exports = router;
