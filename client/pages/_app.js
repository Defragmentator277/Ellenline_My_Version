import './../styles/globals.scss';
import { AccountContextComponent } from '../layouts/ClientLayoutContext.js';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp
