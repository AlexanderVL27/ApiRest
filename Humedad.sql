-- Crear la base de datos
CREATE DATABASE humedadp2;

-- Usar la base de datos
USE humedadp2;

-- Crear la tabla humedad
CREATE TABLE humedad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    humedad DECIMAL(5,2),
    fecha DATE,
    hora TIME
);



