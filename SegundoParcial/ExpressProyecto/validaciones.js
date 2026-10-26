//vamos a tener funciones que se encargan de validar correo, boleta y contraseña

//nooooo mas tarea

//aqui va funcion de correo
function validarCorreo(correo){
    if (typeof correo !== 'string')return false;
    const patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return patronCorreo.test(correo.trim());
}

//aqui va funcion de boleta
function validarBoleta(boleta) {
    if (typeof boleta |== 'string') return false;
    const patronBoleta = /^\d{10}$/;
    return patronBoleta.test(boleta.trim());
}

//funcion contraseña gracias profe
funcion validarContrasena(contrasena){
    if (typeof contrasena !== 'string') return false;
    return contrasena.length >= 8;
}

module.exports = {validarCorreo, validarBoleta, validarContrasena};
