import Head from 'next/head';
import { useRouter } from 'next/router';

//navbar
import Navbar from './Navbar';

//footer
import Footer from './Footer';
import { useEffect } from 'react';
import { useAuth } from '../../context/auth';

const Layout = ({ children }) => {

  const { checkUserToken } = useAuth();

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
