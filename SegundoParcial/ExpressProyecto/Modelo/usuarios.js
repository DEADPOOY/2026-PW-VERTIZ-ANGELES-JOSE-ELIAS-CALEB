const pool = requiere('../db-local');
//pregunta que es pool? en lugar de abrir o cerrar consulta es lento
const COLUMNAS_PUBLICAS = 'id, nombre, correo, boleta, rol';

//ahora queremos consultar todos los usuarios
//async referencia a los combos de ice climbers xd
async function listar() {
    const [filas] = await pool.query(`SELECT ${COLUMNAS_PUBLICAS} FROM usuarios ORDER BY id`);
    return filas;
}

//vamos a consultar ID
async function obtenerPorId(id) {
    const [filas] = await pool.query(`SELECT ${COLUMNAS_PUBLICAS} FROM usuarios WHERE id = ?`, [id]);
    return filas[0];
}

//registrar un nuevo usuario
async function crear({nombre, correo, contrasenaHash, boleta, rol}) {
    const [info] = await pool.query(`INSERT INTO usuarios (nombre, correo, contrasena_hash, boleta, rol) VALUES(?, ?, ?, ?, ?)`,
    [nombre, correo, contrasenaHash, boleta, rol || 'alumno']);
    return obtenerPorId(info.insertId);
}

//si queremos registrar a un batiziano
async function actualizar(id, {nombre, correo, rol}) {
    const cambios = Object.entries({nombre, correo, rol}).filter(([, valor]) => valor !== undefined);
    if(cambios.length === 0) return obtenerPorId(id);

    const columnas = cambios.map(([columna]) => `${columnas} WHERE id = ?`, [...cambios.map(([, valor]) => valor), id]);
    if(info.affectedRows === 0) return undefined;
    return obtenerPorId(id);
}

//eliminar
async function eliminar(id) {
    const [filas] = await pool.query(`DELETE FROM usuarios WHERE id = ?`, [id]);
    return filas.affectedRows > 0;
}

//buscar por correo
async function buscarPorCorreoConHash(correo) {
    const [filas] = await pool.query(`SELECT * FROM usuarios WHERE correo = ?`, [correo]);
    return filas[0];
}

//siempre es necesario exportar las funciones para poder crear su api
module.exports = {listar, obtenerPorId, crear, actualizar, eliminar, buscarPorCorreoConHash};