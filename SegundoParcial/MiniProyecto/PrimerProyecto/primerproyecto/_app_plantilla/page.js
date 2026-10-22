// Página principal de App Router (Next.js 13+)
// Ruta: / (raíz) - Equivalente a pages/index.js en Pages Router

import styles from './page.module.css';  // CSS Modules para estilos locales

export default function Page() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Bienvenido a Next.js con App Router</h1>
      <p className={styles.description}>
        Esta es la plantilla base para el mini proyecto del segundo parcial.
      </p>
      <div className={styles.cardGrid}>
        <a href="/mini-servidor" className={styles.card}>
          <h2>Mini Servidor &rarr;</h2>
          <p>Consumo de API Express</p>
        </a>
        <a href="/practica/1" className={styles.card}>
          <h2>Rutas Dinámicas &rarr;</h2>
          <p>Parámetros en URL</p>
        </a>
      </div>
    </main>
  );
}