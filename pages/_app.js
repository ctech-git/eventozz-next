import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useStore } from '../store';
import '../public/css/animate.min.css';
import '../public/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/css/boxicons.min.css';
import '../public/css/fontawesome.min.css';
import '../public/css/meanmenu.min.css';
import '../public/css/style.css';
import '../public/css/responsive.css';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '../components/Layout/Layout';
import GoTop from '../components/Shared/GoTop';
import cookies from 'next-cookies'
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../context/auth';
import TagManager from 'react-gtm-module';
import { CartProvider } from '../context/cart';

function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  useEffect(() => {
    TagManager.initialize({ gtmId: 'G-530SX4GF64' });
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
            <GoTop />
          </Layout>
          <ToastContainer limit={1} />
        </Provider>
      </CartProvider>
    </AuthProvider>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}
  pageProps = {
    car: cookies(ctx).namu_token,
    idUser: cookies(ctx).business_id,
    nome: cookies(ctx).namu_intro
  }
  return { pageProps }
}

export default App;