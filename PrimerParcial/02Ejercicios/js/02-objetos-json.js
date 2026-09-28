// 02-objetos-json.js
// Object.keys/values/entries y JSON.stringify/parse sobre el objeto `taller`.
// Esta parte imprime en la consola y funciona con `node 02-objetos-json.js`.

const taller = {
  nombre: 'Introducción a Python',
  instructor: 'Ing. María López',
  cupo: 25,
  inscritos: 25,
};

// Object.keys - imprime solo los nombres de las propiedades
console.log('Object.keys - nombres de las propiedades:');
console.log(Object.keys(taller));

// Object.values - imprime solo los valores
console.log('Object.values - valores de las propiedades:');
console.log(Object.values(taller));

// Object.entries - recorre con for..of e imprime "campo: valor"
console.log('Object.entries - campo y valor de cada propiedad:');
for (const [campo, valor] of Object.entries(taller)) {
  console.log(`${campo}: ${valor}`);
}

// JSON.stringify - convierte `taller` a texto y lo imprime
const textoJson = JSON.stringify(taller, null, 2);
console.log('JSON.stringify - el objeto convertido a texto:');
console.log(textoJson);

// JSON.parse - convierte el texto de vuelta a objeto e imprime su nombre
const objetoDeVuelta = JSON.parse(textoJson);
console.log('JSON.parse - el objeto recuperado del texto:');
console.log(`nombre: ${objetoDeVuelta.nombre}`);

// --- Parte del navegador: formulario de la pagina talleres.html ---
// Se conecta el formulario de objetos con el arreglo `talleres` de 01-arreglos.js
// El `if` evita que esta parte corra cuando el archivo se usa con Node.

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
        const formularioObjetos = document.getElementById('formulario-objetos');
        const seleccionTaller = document.getElementById('taller-objeto');
        const operacionObjeto = document.getElementById('operacion-objeto');
        const resultadoObjeto = document.getElementById('resultado-objeto');
        const contenedorGato = document.getElementById('contenedor-gato');
        const videoGato = document.getElementById('video-gato');

        // se llena el select con el nombre de cada taller
        talleres.forEach((t, indice) => {
            const opcion = document.createElement('option');
            opcion.value = String(indice);
            opcion.textContent = t.nombre;
            seleccionTaller.appendChild(opcion);
        });

        formularioObjetos.addEventListener('submit', function (evento) {
            evento.preventDefault();

            // operacion especial: en vez de imprimir texto se muestra el gato
            if (operacionObjeto.value === 'gato') {
                contenedorGato.hidden = false;
                resultadoObjeto.textContent = 'Reproduciendo el video del gato...';
                videoGato.play();
                return;
            }

            // si no es el gato, el video se esconde y se detiene
            contenedorGato.hidden = true;
            videoGato.pause();

            const tallerElegido = talleres[Number(seleccionTaller.value)];
            let resultado;

            if (operacionObjeto.value === 'keys') {
                resultado = Object.keys(tallerElegido).join('\n');
            } else if (operacionObjeto.value === 'values') {
                resultado = Object.values(tallerElegido).join('\n');
            } else {
                resultado = '';
                for (const [campo, valor] of Object.entries(tallerElegido)) {
                    resultado += `${campo}: ${valor}\n`;
                }
                resultado = resultado.trimEnd();
            }

            resultadoObjeto.textContent = resultado;
        });
    });
}

