//necesitamos al modelo
const asistenciasModel = require('../Modelo/asistencias');
const usuariosModel = require('../Modelo/usuarios');
const {validarBoleta} = require('../validaciones');

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
// Acepta las dos formas:
//   {usuario_id, taller_id}
//   {taller_id, nombre_alumno, boleta}  (la que usa el front de la guía)
async function crearAsistencia(req, res) {
    const {usuario_id, taller_id, nombre_alumno, boleta} = req.body;
    const boletaTexto = boleta ? String(boleta).trim() : null;

    if(!taller_id){
        return res.status(400).json({error: 'El taller_id es obligatorio'});
    }
    if(!usuario_id && !boletaTexto){
        return res.status(400).json({error: 'Falta usuario_id o boleta'});
    }
    if(boletaTexto && !validarBoleta(boletaTexto)){
        return res.status(400).json({error: 'La boleta debe tener 10 dígitos'});
    }

    try{
        let usuarioId = usuario_id || null;
        let nombre = null;
        let boletaFinal = null;

        // Si viene boleta, se busca al usuario. Si no existe, la asistencia
        // se guarda con nombre_alumno y boleta (alumno sin cuenta).
        if(!usuarioId && boletaTexto){
            const usuario = await usuariosModel.buscarPorBoleta(boletaTexto);
            if(usuario){
                usuarioId = usuario.id;
            }else{
                const existente = await asistenciasModel.buscarPorBoletaYTaller(boletaTexto, taller_id);
                if(existente){
                    return res.status(409).json({error: 'Esa boleta ya está inscrita en este taller.'});
                }
                nombre = nombre_alumno || 'Alumno sin cuenta';
                boletaFinal = boletaTexto;
            }
        }

        const asistencia = await asistenciasModel.crear({
            usuario_id: usuarioId,
            taller_id,
            nombre_alumno: nombre,
            boleta: boletaFinal,
        });
        res.status(201).json(asistencia);
    }catch(error){
        if(error.code === 'ER_DUP_ENTRY'){
            return res.status(409).json({error: 'Esa boleta ya está inscrita en este taller.'});
        }
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
