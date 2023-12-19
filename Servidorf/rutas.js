const express = require('express');
const baseDatos = require('./basedatos');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/hg', (req, res) => {
  const connection = baseDatos.getConnection();

  const sql = 'SELECT * FROM SensorStatus';

  connection.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener los estatus');
    } else {
      res.json(results);
    }
  });
});

app.get('/hgs', (req, res) => {
    const connection = baseDatos.getConnection();
  
    const sql = 'SELECT * FROM SensorStatuss';
  
    connection.query(sql, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error al obtener los estatus');
      } else {
        res.json(results);
      }
    });
  });

  app.post('/estado1', (req, res) => {
    const estado = req.body.estado;  // Puedes enviar 'encendido' o 'apagado'
    console.log(`Sensor ${estado}`);
  
    const connection = baseDatos.getConnection();
  
    const sql = 'INSERT INTO SensorStatus (estado, fecha_hora) VALUES (?, NOW())';
    const values = [estado];
  
    connection.query(sql, values, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send(`Error al agregar el estado de ${estado}`);
      } else {
        res.send(`Estado de ${estado} agregado correctamente`);
      }
    });
  });

  app.post('/estado2', (req, res) => {
    const estado = req.body.estado;  // Puedes enviar 'encendido' o 'apagado'
    console.log(`Sensor ${estado}`);
  
    const connection = baseDatos.getConnection();
  
    const sql = 'INSERT INTO SensorStatuss (estado, fecha_hora) VALUES (?, NOW())';
    const values = [estado];
  
    connection.query(sql, values, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send(`Error al agregar el estado de ${estado}`);
      } else {
        res.send(`Estado de ${estado} agregado correctamente`);
      }
    });
  });
  


 app.get('/vc', (req, res) => {
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

module.exports = app;
