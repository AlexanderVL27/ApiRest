const express = require('express');
const bodyParser = require('body-parser');
const baseDatos = require('./basedatos');
const rutas = require('./rutas');

const app = express();
app.use(bodyParser.json());

app.use(rutas);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
