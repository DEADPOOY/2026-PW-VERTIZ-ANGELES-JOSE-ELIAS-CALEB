// Menu.js - Navegación global
import Link from 'next/link';

export default function Menu() {
  return (
    <nav>
      <Link href="/">Inicio</Link>
      <Link href="/mini-servidor">Mi Primer Proyecto</Link>
      <Link href="/practica/1">Pagina 2</Link>
    </nav>
  );
}