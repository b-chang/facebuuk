import { Provider } from 'next-auth/client';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../store/store';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ReduxProvider store={store}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ReduxProvider>
  )
}

export default MyApp
