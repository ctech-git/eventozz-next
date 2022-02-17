import Head from 'next/head';
import { useRouter } from 'next/router';

//top header
import TopHeader from './TopHeader';

//navbar
import Navbar from './Navbar';
import NavbarTwo from './NavbarTwo';

//footer
import Footer from './Footer';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth';

const Layout = ({ children }) => {

  const authContext = useContext(AuthContext);

  const { checkUserToken } = authContext;

  useEffect(() => {
    checkUserToken();
  }, [])

  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      <Head>
        <title>Eventozz - ingressos online</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />

      </Head>

      {/* {pathname === '/' ? <TopHeader /> : ''} */}
      {/* {pathname === '/index-2' ? <NavbarTwo /> : <Navbar />} */}
      <Navbar />

      {children}

      <Footer />
    </>
  );
};

export default Layout;
