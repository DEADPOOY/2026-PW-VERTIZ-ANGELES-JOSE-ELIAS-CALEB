// Layout raíz de App Router (Next.js 13+)
// Define la estructura HTML base y metadata compartida para toda la app
// Equivalente a _document.js + _app.js en Pages Router

import './globals.css';  // Estilos globales (se aplican a toda la app)

/** Metadata para SEO y configuración de página */
export const metadata = {
  title: 'Primer Proyecto Next.js',
  description: 'Plantilla base con App Router',
};

/** Layout principal - Recibe children (páginas hijas) */
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Favicon del proyecto */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        {/* Renderiza las páginas hijas (page.js de cada ruta) */}
        {children}
      </body>
    </html>
  );
}