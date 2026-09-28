// app.js
// Se encarga de pintar la tabla de talleres y de ejecutar la operacion
// de arreglos que se elija en el formulario.
// Los datos y los resultados vienen de 01-arreglos.js, que se carga antes.

const cuerpoTabla = document.querySelector('#tabla-talleres tbody');

// se dibuja una fila por cada taller del arreglo
function pintarTabla() {
  cuerpoTabla.innerHTML = '';

  talleres.forEach((t) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${t.nombre}</td>
      <td>${t.instructor}</td>
      <td>${t.cupo}</td>
      <td>${t.inscritos}</td>
    `;
    cuerpoTabla.appendChild(fila);
  });
}

const formArreglos = document.getElementById('formulario-arreglos');
const resultadoArreglos = document.getElementById('resultado-arreglo');
const selectOperacionArreglo = document.getElementById('operacion-arreglo');

formArreglos.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const operacion = selectOperacionArreglo.value;
  let resultado;

  switch (operacion) {
    // forEach - lista cada taller con su ocupacion
    case 'forEach':
      resultado = talleres
        .map((t) => `- ${t.nombre} (${t.inscritos}/${t.cupo})`)
        .join('\n');
      break;

    // map - copia solo los nombres
    case 'map':
      resultado = nombres.join('\n');
      break;

    // filter - los talleres que ya estan llenos
    case 'filter':
      resultado = llenos.map((t) => t.nombre).join('\n');
      break;

    // find - el primer taller de la Ing. María López
    case 'find':
      resultado = `${primerTaller.nombre} - ${primerTaller.instructor}`;
      break;

    // reduce - la suma de todos los inscritos
    case 'reduce':
      resultado = `Total de inscritos: ${totalInscritos}`;
      break;

    // filter + map encadenados - los que SI tienen cupo
    case 'disponibles':
      resultado = conCupoDisponible.join('\n');
      break;

    // si la opcion no existe
    default:
      resultado = 'Esa operacion no existe.';
  }

  resultadoArreglos.textContent = resultado;
});

pintarTabla();
