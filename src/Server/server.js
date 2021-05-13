
//npm install express --save
const express = require('express');

const bodyParser = require('body-parser');

//npm install cookie-parser --save
const cookieParser = require('cookie-parser');

//npm install express-session
const session = require('express-session');

//npm install cors --save 
const cors = require('cors');


//tenemos intalado nodemon, para eso de facilitarle la vida al developer
//npm i -D nodemon


// Creamos el server express
const server = express();
server.use(cookieParser());

server.set('port', process.env.PORT || 4000);


const corsOptions = {
    //To allow requests from client
    origin: [
      "http://localhost:3000",
      `http://localhost:${server.get('port')}`
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  };
  server.use(cors(corsOptions));

  server.use(session({ secret: 'keyboard cat', cookie: { maxAge: 8640000 }}))

  //****************************************************/

  server.get('/', (req, res) => {
    res.write(`<h1>HOLA MUNDO!</h1>`)
    res.end();
  });

  server.get('/api', (req, res) => {
    res.json({ api: 'works!' });
  });

  //****************************************************/
// ponemos al servidor a escuchar el puerto elegido
server.listen(server.get('port'), () => {
    console.log(`iniciando server en puerto:${server.get('port')}`);
  });