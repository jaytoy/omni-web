import { Provider } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import store from '../redux/store';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </Provider>
  );
}

export default MyApp
