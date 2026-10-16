const express = require('express');
const rutas = require('./routes');

const app = express();
const PORT = 3000;

//PERMITE  RECIBIR DATOS EN FORMATO .JSON

app.use(express.json());

//CONECTA LAS RUTAS DE NUESTRA API

app.use(rutas);

//INICIA EL SERVIDOR 

app.listen(PORT, () =>{
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});