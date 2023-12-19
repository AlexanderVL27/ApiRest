const express = require('express');
const baseDatos = require('./controladores/basededatos');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/humedad', (req, res) => {
  if (req.protocol === 'https') {
    const httpUrl = 'http://' + req.get('host') + req.originalUrl;
    return res.redirect(httpUrl);
  } else {
    const humedad = req.body.humedad;
    console.log('Valor de humedad:', humedad);
    const connection = baseDatos.getConnection();

    const sql = 'INSERT INTO humedad (humedad, fecha, hora) VALUES (?, CURDATE(), CURTIME())';
    const values = [humedad];

    connection.query(sql, values, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error al agregar la humedad');
      } else {
        res.send('Humedad agregada correctamente');
      }
    });
  }
});

 app.get('/conexion', (req, res) => {
  const connection = baseDatos.getConnection();

  connection.ping((error) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al verificar la conexión a la base de datos');
    } else {
      res.send('La conexión a la base de datos está funcionando correctamente');
    }
  });
});


app.get('/humedad', (req, res) => {
  if (req.protocol === 'https') {
    const httpUrl = 'http://' + req.get('host') + req.originalUrl;
    return res.redirect(httpUrl);
  }

  const connection = baseDatos.getConnection();
  const sql = 'SELECT * FROM humedad';

  connection.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener los datos de humedad');
    } else {
      res.json(results);
    }
  });
});


app.put('/humedad', (req, res) => {
  const id = req.body.id;
  const nuevaHumedad = req.body.humedad;

  const connection = baseDatos.getConnection();

  const sql = 'UPDATE humedad SET humedad = ? WHERE id = ?';

  connection.query(sql, [nuevaHumedad, id], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al actualizar la humedad');
    } else {
      res.send('Humedad actualizada correctamente');
    }
  });
});

app.delete('/humedad', (req, res) => {
  const id = req.body.id;

  const connection = baseDatos.getConnection();

  const sql = 'DELETE FROM humedad WHERE id = ?';

  connection.query(sql, [id], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al eliminar la entrada de humedad');
    } else {
      res.send('Entrada de humedad eliminada correctamente');
    }
  });
});


module.exports = app;
