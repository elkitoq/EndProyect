
//npm install express --save
const express = require('express');

//npm install cookie-parser --save
const cookieParser = require('cookie-parser');

//npm install express-session
const session = require('express-session');

//npm install cors --save 
const cors = require('cors');

//npm install mongoose --save
const mongoose = require('mongoose');

//tenemos intalado nodemon, para eso de facilitarle la vida al developer
//npm i -D nodemon


// Creamos el server express
const server = express();
server.use(cookieParser());

server.set('port', process.env.PORT || 4000);
const MONGO_URI = 'mongodb://localhost:27017/MaipuJobs';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//Esto habilita para comunicarse entre cliente y servidor
//sin que el explorador piense que son paginas separadas
//asi nos evitamos que nos bloquee cuando uno quiere modificar al otro
const corsOptions = {
  origin: [
    //localhost para funcionar en local
    "http://localhost:3000",
    `http://localhost:${server.get('port')}`,
    //y aca pondria los dns SI TUVIERA ALGUNO 
    ``,
    ``
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};
server.use(cors(corsOptions));

server.use(session({ secret: 'keyboard cat', cookie: { maxAge: 8640000 } }))

//Decodifica el body
server.use(express.urlencoded({ extended: true }));
server.use(express.json());


server.use(require("./routes/routes"));

// ponemos al servidor a escuchar el puerto elegido
server.listen(server.get('port'), () => {
  console.log(`iniciando server en puerto:${server.get('port')}`);
});