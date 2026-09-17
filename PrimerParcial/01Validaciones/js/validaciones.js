/*
Las validaciones de formulario usan expresiones regulares.
Se dividen en tres partes:

1. nombre  -> letras y espacios, de 2 a 60 caracteres
2. boleta  -> exactamente 10 dígitos
3. fecha   -> formato DD/MM/AAAA
*/

const patrones = {
    nombre: /^[A-Za-zÁÉÍÓÚÑáéíóúñüÜ\s]{2,60}$/,
    boleta: /^\d{10}$/,
    fecha: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
};

const mensajes = {
    nombre: "Solo letras y espacios, entre 2 y 60 caracteres.",
    boleta: "Debe tener exactamente 10 dígitos.",
    fecha: "Formato esperado: DD/MM/AAAA (ej. 15/04/2023)"
};

function validarCampo(campo, valor) {
    if (!patrones[campo]) {
        return false;
    }
    return patrones[campo].test(String(valor).trim());
}

function mostrarEstadoCampo(campo) {
    const input = document.getElementById(campo);
    const spanError = document.getElementById("error-" + campo);

    if (!input || !spanError) {
        return true;
    }

    const esValido = validarCampo(campo, input.value);
    input.classList.toggle("invalido", !esValido);
    spanError.textContent = esValido ? "" : mensajes[campo];
    return esValido;
}

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("form-registro");
    if (!formulario) {
        return;
    }

    Object.keys(patrones).forEach(function (campo) {
        const input = document.getElementById(campo);
        if (!input) {
            return;
        }

        input.addEventListener("blur", function () {
            mostrarEstadoCampo(campo);
        });

        input.addEventListener("input", function () {
            if (input.classList.contains("invalido")) {
                mostrarEstadoCampo(campo);
            }
        });
    });

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        let formularioValido = true;
        Object.keys(patrones).forEach(function (campo) {
            if (!mostrarEstadoCampo(campo)) {
                formularioValido = false;
            }
        });

        formulario.classList.toggle("exito", formularioValido);
        formulario.classList.toggle("error", !formularioValido);

        const mensajeExito = document.getElementById("mensaje-exito");
        if (mensajeExito) {
            mensajeExito.textContent = formularioValido ? "Registro exitoso." : "";
        }
    });
});
