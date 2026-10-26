//necesitamos al modelo
const talleresModel = require('../Modelo/talleres');

//consultar todos los talleres
async function listarTalleres(req, res) {
    try{
        const talleres = await talleresModel.listar();
        res.json(talleres);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

//consultar taller por ID
async function obtenerTaller(req, res) {
    try{
        const taller = await talleresModel.obtenerPorId(req.params.id);
        if(!taller) return res.status(404).json({error: 'Taller no encontrado'});
        res.json(taller);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

//registrar un nuevo taller
async function crearTaller(req, res) {
    const {nombre, descripcion, instructor, fecha, cupo} = req.body;
    if(!nombre || !fecha){
        return res.status(400).json({error: 'El nombre y la fecha son obligatorios'});
    }
    try{
        const taller = await talleresModel.crear({nombre, descripcion, instructor, fecha, cupo});
        res.status(201).json(taller);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

//actualizar un taller
async function actualizarTaller(req, res) {
    const {nombre, descripcion, instructor, fecha, cupo} = req.body;
    try{
        const taller = await talleresModel.actualizar(req.params.id, {nombre, descripcion, instructor, fecha, cupo});
        if(!taller) return res.status(404).json({error: 'Taller no encontrado'});
        res.json(taller);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

//eliminar un taller
async function eliminarTaller(req, res) {
    try{
        const eliminado = await talleresModel.eliminar(req.params.id);
        if(!eliminado) return res.status(404).json({error: 'Taller no encontrado'});
        res.status(204).send();
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports = {listarTalleres, obtenerTaller, crearTaller, actualizarTaller, eliminarTaller};
