// _app.js - Wrapper global de la app (Pages Router)
import Menu from '../components/Menu';
import '../styles/styles.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Menu />
      <Component {...pageProps} />
    </>
  );
}