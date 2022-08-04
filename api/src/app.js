const express = require('express');
const cookieParser = require('cookie-parser');//es un módulo que podemos instalar vía npm y que nos permite configurar cookies dentro de nuestro servidor.

const bodyParser = require('body-parser');
// permite a Express leer el cuerpo y luego analizarlo en un objeto Json que podamos entender.

const morgan = require('morgan');
//permite tener registros de las solicitudes http

const routes = require('./routes/index.js');
//permite hacer el enrutamiento de nuestras rutas 

require('./db.js');

const server = express();
// declaro una instancia de express

server.name = 'API';
//server.use(middelware) 
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;


//SON TODOS MIDDELWARES