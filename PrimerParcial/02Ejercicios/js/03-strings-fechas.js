// 03-strings-fechas.js
// Metodos de string mas usados + el objeto Date, conectados con la validacion
// de fecha (DD/MM/AAAA) de la semana 4. Se ejecuta con `node 03-strings-fechas.js`.

const entrada = '  María López  ';

// trim - imprime `entrada` sin espacios sobrantes
const entradaLimpia = entrada.trim();
console.log(`trim: "${entradaLimpia}"`);

// split - parte el resultado del trim en un arreglo `partes`, separado por espacio
const partes = entradaLimpia.split(' ');
console.log(`split: ${partes}`);
console.log(`- primera parte: ${partes[0]}`);
console.log(`- segunda parte: ${partes[1]}`);

// includes - imprime si 'correo@cecyt9.ipn.mx' contiene '@'
const correo = 'correo@cecyt9.ipn.mx';
console.log(`includes: ${correo} contiene '@' -> ${correo.includes('@')}`);

// replace y replaceAll - con '05/09/2026' se reemplaza '/' por '-'
const fechaTexto = '05/09/2026';
console.log(`replace:    ${fechaTexto.replace('/', '-')}`);
console.log(`replaceAll: ${fechaTexto.replaceAll('/', '-')}`);

// template literals - arma la frase con los valores de las variables
const nombre = 'María';
const cupo = 25;
console.log(`${nombre} se inscribió en un taller con cupo para ${cupo} personas.`);

// Date - construye un objeto Date a partir de un texto 'DD/MM/AAAA'.
// Ojo: en Date los meses empiezan en 0, por eso el mes se resta con -1.
function fechaDesdeTexto(textoFecha) {
  const [dia, mes, anio] = textoFecha.split('/');
  return new Date(Number(anio), Number(mes) - 1, Number(dia));
}

const fecha = fechaDesdeTexto('05/09/2026');
console.log(`toISOString: ${fecha.toISOString()}`);
console.log(`getDay: ${fecha.getDay()} (0 = domingo, 6 = sabado)`);

// dias de diferencia entre esa fecha y el dia de hoy
const hoy = new Date();
const diasDeDiferencia = Math.round((hoy - fecha) / (1000 * 60 * 60 * 24));
console.log(`diferencia contra hoy: ${diasDeDiferencia} dias`);
