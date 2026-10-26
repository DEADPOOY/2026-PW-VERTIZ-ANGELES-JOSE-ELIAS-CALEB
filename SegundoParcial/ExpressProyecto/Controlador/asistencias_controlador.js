//necesitamos al modelo
const asistenciasModel = require('../Modelo/asistencias');

//consultar lista de asistencias
async function listarAsistencias(req, res) {
    try{
        const asistencias = await asistenciasModel.listar();
        res.json(asistencias);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

//consultar asistencia por ID
async function obtenerAsistencia(req, res) {
    try{
        const asistencia = await asistenciasModel.obtenerPorId(req.params.id);
        if(!asistencia) return res.status(404).json({error: 'Asistencia no encontrada'});
        res.json(asistencia);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

//registrar asistencia en un taller
async function crearAsistencia(req, res) {
    const {usuario_id, taller_id} = req.body;
    if(!usuario_id || !taller_id){
        return res.status(400).json({error: 'El usuario_id y taller_id son obligatorios'});
    }
    try{
        const asistencia = await asistenciasModel.crear({usuario_id, taller_id});
        res.status(201).json(asistencia);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

//actualizar una asistencia
async function actualizarAsistencia(req, res) {
    const {usuario_id, taller_id} = req.body;
    try{
        const asistencia = await asistenciasModel.actualizar(req.params.id, {usuario_id, taller_id});
        if(!asistencia) return res.status(404).json({error: 'Asistencia no encontrada'});
        res.json(asistencia);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

//eliminar una asistencia
async function eliminarAsistencia(req, res) {
    try{
        const eliminada = await asistenciasModel.eliminar(req.params.id);
        if(!eliminada) return res.status(404).json({error: 'Asistencia no encontrada'});
        res.status(204).send();
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

//consultar asistencias de un usuario
async function listarAsistenciasPorUsuario(req, res) {
    try{
        const asistencias = await asistenciasModel.listarPorUsuario(req.params.usuario_id);
        res.json(asistencias);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

//consultar asistencias de un taller
async function listarAsistenciasPorTaller(req, res) {
    try{
        const asistencias = await asistenciasModel.listarPorTaller(req.params.taller_id);
        res.json(asistencias);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports = {listarAsistencias, obtenerAsistencia, crearAsistencia, actualizarAsistencia, eliminarAsistencia, listarAsistenciasPorUsuario, listarAsistenciasPorTaller};
