import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from 'react-redux';
import store from '../store/store';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ReduxProvider store={store}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ReduxProvider>
  )
}

export default MyApp
