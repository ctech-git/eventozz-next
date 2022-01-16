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

import Layout from '../components/Layout/Layout';
import GoTop from '../components/Shared/GoTop';
import cookies from 'next-cookies'
import { ToastContainer } from 'react-toastify';

function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
        <GoTop />
      </Layout>

      <ToastContainer limit={1}/>
    </Provider>
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