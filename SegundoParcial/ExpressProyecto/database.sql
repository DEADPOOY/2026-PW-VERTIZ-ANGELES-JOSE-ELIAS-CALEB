-- la mierda de base de datos

-- Crear la base de datos (ejecutar esto primero en MySQL/MariaDB)
CREATE DATABASE IF NOT EXISTS mierda_batiz
    CHARACTER SET utf8mb4
    -- esto es para que acepte emojis
    COLLATE utf8mb4_unicode_ci;
    -- pa que la meirda al momento de buscar busque chido ahi dice ci es case insensitive

USE mierda_batiz;


-- usuarios

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    boleta VARCHAR(10) NOT NULL UNIQUE,
    rol ENUM('alumno', 'docente', 'admin') DEFAULT 'alumno',
    contrasena_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
-- esta madre de inno es el tipo de formato en el que la gaurda sirve mucho pa forain keys y mas mamadas
-- tambien pa que no se sature y la mamada lo habi explicado bien antes pero se me borro la pinche base
-- alch que puta hueva volver a explicar


-- talleres

CREATE TABLE IF NOT EXISTS talleres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    instructor VARCHAR(100),
    fecha DATE,
    cupo INT DEFAULT 30,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;


-- asistencias

CREATE TABLE IF NOT EXISTS asistencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NULL,
    nombre_alumno VARCHAR(100) NULL,
    boleta VARCHAR(10) NULL,
    taller_id INT NOT NULL,
    fecha_asistencia TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (taller_id) REFERENCES talleres(id) ON DELETE CASCADE,
    UNIQUE KEY unique_asistencia (usuario_id, taller_id)
) ENGINE=InnoDB;


-- Datos de ejemplo


INSERT INTO usuarios (nombre, correo, boleta, rol, contrasena_hash) VALUES
    ('Admin Sistema', 'admin@cecyt9.local', '2026000001', 'admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
    ('Juan Pérez López', 'juan.perez@alumno.cecyt9.local', '2026000002', 'alumno', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
    ('María García Rodríguez', 'maria.garcia@alumno.cecyt9.local', '2026000003', 'alumno', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
    ('Carlos Martínez Sánchez', 'carlos.martinez@docente.cecyt9.local', '2026000004', 'docente', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
    ('Ana Sofía Ramírez', 'ana.ramirez@alumno.cecyt9.local', '2026000005', 'alumno', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
    ('Luis Fernando Díaz', 'luis.diaz@alumno.cecyt9.local', '2026000006', 'alumno', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
    ('Elena Torres Vega', 'elena.torres@docente.cecyt9.local', '2026000007', 'docente', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
    ('Diego Alejandro Ruiz', 'diego.ruiz@alumno.cecyt9.local', '2026000008', 'alumno', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

INSERT INTO talleres (nombre, descripcion, instructor, fecha, cupo) VALUES
    ('Introducción a Python', 'Fundamentos de programación con Python', 'Ing. Maria Conchita Alonso', '2026-04-15', 30),
    ('Redes y Compus', 'Conceptos básicos de redes informáticas', 'Ing. Homero H Thomson', '2026-04-15', 25),
    ('Análisis de Videojuegos', 'Análisis de diseño y mecánicas de videojuegos', 'Ing. Porque eres Pobre', '2026-04-15', 20),
    ('Diseño Web con HTML y CSS', 'Creación de sitios web responsivos desde cero', 'Ing. Laura Méndez', '2026-05-10', 35),
    ('Bases de Datos MySQL', 'Administración y consultas en bases de datos relacionales', 'Ing. Roberto Silva', '2026-05-20', 25),
    ('Programación en JavaScript', 'Lenguaje de programación para web interactiva', 'Ing. Patricia Cruz', '2026-06-05', 30);

    -- la de talleres alch saque del primer parcial le habia puesto cosas distintas pero alch que pinche hueva cuando repites lo mismo

INSERT INTO asistencias (usuario_id, taller_id) VALUES
    (2, 1),
    (2, 4),
    (3, 1),
    (3, 3),
    (5, 2),
    (5, 5),
    (6, 1),
    (6, 6),
    (8, 3),
    (8, 4);
    -- esto es pura pinche llave foranea lo explicaria bien pero se me borro y alch no quiero volverlo a explicas digamos que mejor
    -- ponte a pensar dice usuario y taller el primer numero es usuario el segundo taller ya no es muy dificil sirve por si cambia la
    -- la mierda de arriba 


-- Fin de la mierda esta
-- ya se le voy a poner a la mierba basa mierda_batiz xDDDDDDDDD
