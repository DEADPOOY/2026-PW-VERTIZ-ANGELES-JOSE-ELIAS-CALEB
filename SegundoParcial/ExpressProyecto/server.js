const express = require('express');

const app = express();

app.use(express.json());

const PORT = 4000;

// tenemos la ruta principal por medio del metodo get
app.get('/saludo', (req, res) => {
  res.json({ mensaje: 'Hola desde el mini servidor' });
});

// POST /eco - devuelve el mismo texto que recibe
app.post('/eco', (req, res) => {
  const { texto } = req.body;
  if (!texto) {
    return res.status(400).json({ error: 'Falta el campo "texto" en el body' });
  }
  res.status(201).json({eco:texto})
});

const usuarios = require('./Controlador/usuarios_controlador');
const talleres = require('./Controlador/talleres_controlador');
const asistencias = require('./Controlador/asistencias_controlador');

app.get('/api/usuarios', usuarios.listarUsuarios);
app.get('/api/usuarios/:id', usuarios.obtenerUsuario);
app.post('/api/usuarios', usuarios.crearUsuario);
app.put('/api/usuarios/:id', usuarios.actualizarUsuario);
app.delete('/api/usuarios/:id', usuarios.eliminarUsuario);

app.get('/api/talleres', talleres.listarTalleres);

// Alias que usa el front de la guía: /api/talleres/:id/asistencias
app.get('/api/talleres/:id/asistencias', (req, res) => {
  req.params.taller_id = req.params.id;
  asistencias.listarAsistenciasPorTaller(req, res);
});

app.get('/api/talleres/:id', talleres.obtenerTaller);
app.post('/api/talleres', talleres.crearTaller);
app.put('/api/talleres/:id', talleres.actualizarTaller);
app.delete('/api/talleres/:id', talleres.eliminarTaller);

app.get('/api/asistencias', asistencias.listarAsistencias);
app.get('/api/asistencias/usuario/:usuario_id', asistencias.listarAsistenciasPorUsuario);
app.get('/api/asistencias/taller/:taller_id', asistencias.listarAsistenciasPorTaller);
app.get('/api/asistencias/:id', asistencias.obtenerAsistencia);
app.post('/api/asistencias', asistencias.crearAsistencia);
app.put('/api/asistencias/:id', asistencias.actualizarAsistencia);
app.delete('/api/asistencias/:id', asistencias.eliminarAsistencia);

app.listen(PORT, () => {
  console.log(`Mini servidor Express en http://localhost:${PORT}`);
  console.log(`  GET  http://localhost:${PORT}/saludo`);
  console.log(`  POST http://localhost:${PORT}/eco`);
  console.log(`  API  http://localhost:${PORT}/api/usuarios`);
  console.log(`  API  http://localhost:${PORT}/api/talleres`);
  console.log(`  API  http://localhost:${PORT}/api/asistencias`);
});