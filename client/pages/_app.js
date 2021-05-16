import './../styles/globals.scss';
import { AccountContextComponent } from '../layouts/ClientLayoutContext.js';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }) {
  return <AccountContextComponent.Provider>
    <Component {...pageProps} />
  </AccountContextComponent.Provider>
}

export default MyApp
