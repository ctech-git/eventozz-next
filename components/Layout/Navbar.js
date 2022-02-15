import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../../context/auth';
import Link from '../../utils/ActiveLink';
import { useRouter } from 'next/router'


const Navbar = () => {
  const router = useRouter()

  const authContext = useContext(AuthContext);
  const [showMenu, setshowMenu] = useState(false);
  const { userToken, logout } = authContext;
  const toggleMenu = () => {
    setshowMenu(!showMenu);
  };


  useEffect(() => {
    let elementId = document.getElementById('navbar');
    document.addEventListener('scroll', () => {
      if (window.scrollY > 170) {
        elementId.classList.add('is-sticky');
      } else {
        elementId.classList.remove('is-sticky');
      }
    });
    window.scrollTo(0, 0);
  }, []);

  function getTo(params) {
    if (params == "/sair") {
      toggleMenu();
      logout();
    } else {
      toggleMenu();
      console.log("GO TO: " + params)
      router.push(params);
    }

  }
  return (
    <>
      <div id='navbar' className='navbar-area'>
        <div className='raimo-responsive-nav'>
          <div className='container'>
            <div className='raimo-responsive-menu'>
              <div onClick={() => toggleMenu()} className='hamburger-menu'>
                {showMenu ? (
                  <i className='bx bx-x'></i>
                ) : (
                  <i className='bx bx-menu'></i>
                )}
              </div>
              <div className='logo'>
                <Link href='/'>
                  <a onClick={() => getTo('/')}>
                    <img src='/images/logo-eventozz.png' alt='logo' className='image-logo-mobile' />
                  </a>
                </Link>
              </div>

            </div>
          </div>
        </div>
        <nav
          className={
            showMenu
              ? 'show navbar navbar-expand-md navbar-light'
              : 'navbar navbar-expand-md navbar-light hide-menu'
          }
        >
          <div className='container'>
            <Link href='/'>
              <a className='navbar-brand' onClick={() => getTo('/')}>
                <img src='/images/logo-eventozz.png' alt='logo' />
              </a>
            </Link>
            <div className='collapse navbar-collapse mean-menu'>
              <ul className='navbar-nav'>
                <li className='nav-item'>

                  <Link href='/' activeClassName='active'>
                    <a className='nav-link' onClick={() => getTo('/')}>Home</a>
                  </Link>
                </li>
                <li className='nav-item megamenu'>
                  <Link href='/eventos' activeClassName='active'>
                    <a className='nav-link' onClick={() => getTo('/eventos')}>Eventos</a>
                  </Link>

                </li>

                <li className='nav-item'>
                  <Link href='/sobre-nos' activeClassName='active'>
                    <a className='nav-link listing' onClick={() => getTo('/sobre-nos')}>Sobre Nós</a>
                  </Link>
                </li>
                {
                  userToken ? (
                    <>
                      {/* <li className='nav-item VersionMobile'>
                        <Link href='/perfil' activeClassName='active'>
                          <a className='nav-link listing' onClick={() => getTo('/perfil')}>Perfil</a>
                        </Link>
                      </li> */}
                      <li className='nav-item VersionMobile'>
                        <Link href='/minhas-compras' activeClassName='active'>
                          <a className='nav-link listing' onClick={() => getTo('/minhas-compras')} >Minhas Compras</a>
                        </Link>
                      </li>
                      <li className='nav-item VersionMobile'>
                        <Link href='' activeClassName='active'>
                          <a className='nav-link listing' onClick={() => getTo('/sair')}
                          >Sair</a>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li className='nav-item'>
                      <Link href='/login' activeClassName='active'>
                        <a className='nav-link listing' onClick={() => getTo('/login')}>Entrar</a>
                      </Link>
                    </li>
                  )}

                <li className='nav-item megamenu support VersionWeb'>
                  {
                    userToken ? (
                      <>
                        <Link href='/minhas-compras' activeClassName='active'>
                          <a className='dropdown-toggle nav-link whitout-arrow' onClick={() => getTo('/minhas-compras')}>
                            <i className='bx bx-user'></i>
                          </a>
                        </Link>
                        <ul className='dropdown-menu'>
                          {/* <li className='nav-item'>
                            <Link href='/perfil' activeClassName='active'>
                              <a className='nav-link' onClick={() => getTo('/perfil')}>
                                <i className='bx bx-user'></i>
                                Pefil
                              </a>
                            </Link>
                          </li> */}
                          <li className='nav-item'>
                            <Link href='/minhas-compras' activeClassName='active'>
                              <a className='nav-link' onClick={() => getTo('/minhas-compras')}>
                                <i className='bx bx-book'></i>
                                Minhas Compras
                              </a>
                            </Link>
                          </li>
                          <li className='nav-item'>
                            <Link href='/' activeClassName='active'>
                              <a className='nav-link' onClick={() => getTo('/sair')}>
                                <i className='bx bx-log-out'></i>
                                Sair
                              </a>
                            </Link>
                          </li>

                        </ul>
                      </>
                    ) : (
                      <></>
                      // <Link href='/login' activeClassName='active'>
                      //   <a className='login-btn' onClick={() => getTo('/login')}>
                      //     <i className='bx bx-log-in'></i> Entrar
                      //   </a>
                      // </Link>
                    )
                  }

                </li>

              </ul>
              <div className='others-option'>
                <div className='d-flex align-items-center'>


                  <div className='option-item'>
                    <Link href='/contato' activeClassName='active'>
                      <a className='default-btn' onClick={() => getTo('/contato')}>
                        <i className='bx bxs-chat' ></i> Fale Conosco
                      </a>
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
