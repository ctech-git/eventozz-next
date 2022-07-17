import React, { useState, useContext } from 'react';
import { isValidCpf, onlyUnsignedNumbers } from '../../../utils/strings';
import Services from '../../../services/login';
import { toast } from 'react-toastify';
import { Col, Row } from 'react-bootstrap';
import styles from './styles.module.scss';
import { useAuth } from '../../../context/auth';
import { useRouter } from 'next/router';
import { ModalRecovery } from '../ModalRecovery';

const LoginForm = ({
  loading,
  setLoading,
  organizer = false, 
  callback = false, 
  pageLogin = false
}) => {

  const router = useRouter();
  const [emailCPF, setEmailCPF] = useState("");
  const [senha, setSenha] = useState("");
  const [showModalRecovery, setShowModalRecovery] = useState(false);
  const { setUserName, setUserToken } = useAuth();
  
  async function loginEmail() {
    let cpfEmail = emailCPF;
    let isCpf = false;
    let isError = false;
    let Error = '';

    if (emailCPF.includes('@')) {
      isCpf = false;

    } else {
      isCpf = true; cpfEmail = onlyUnsignedNumbers(cpfEmail);
      let verificaCPF = isValidCpf(cpfEmail);
      if (!verificaCPF) {
        isError = true;
        Error = "CPF Invalido";
      }
    }

    if (!isError) {
      console.log("--------------")
      setLoading(true);
      const response = await Services.LoginNative(cpfEmail, senha);
      setLoading(false);
      if (response.status == 200) {
        if (response?.data?.token) {
          window.localStorage.setItem("accessToken", response?.data?.token);
          setUserToken(response?.data?.token);
          setUserName(response?.data?.user?.name);
          if (pageLogin) {
            if (organizer) {
              window.location.href = `${process.env.NEXT_PUBLIC_APP_URL}?token=${response?.data?.token}`;
            } else {
              if (callback) {
                router.push(callback);
              } else {
                router.back();
              }
            }
          }
        } else {
          toast.error("Falhar no Login", {
            autoClose: 2000
          })
        }
      } else {
        toast.error(response.response.data.msg, {
          autoClose: 2000
        })
      }

    } else {
      toast.error(Error, {
        autoClose: 2000
      })
    }
  }

  const handleCloseModal = () => {
    setShowModalRecovery(false);
  }

  const Loading = () => (
    <div class="spinner-border loading-button" role="status">
      <span class="sr-only"></span>
    </div>
  )

  return (
    <>
      <Col xs={12} lg={6}>
        <div className={`login-form ${styles.loginForm}`}>
          <h2>Já sou cliente</h2>
          <form>
            <div className='form-group'>
                <label>Email ou CPF</label>
              <input
                type='text'
                className='form-control'
                placeholder='Email ou CPF'
                onChange={e => setEmailCPF(e.target.value)}
              />
            </div>
            <div className='form-group'>
            <label>Senha</label>
              <input
                type='password'
                className='form-control'
                placeholder='Senha'
                onChange={e => setSenha(e.target.value)}
              />
            </div>
            <div className='row align-items-center'>
              <Col xs={6} className='remember-me-wrap'>
                <div className='form-check'>
                </div>
              </Col>
              <Col xs={6} className='lost-your-password-wrap'>
                <a onClick={() => setShowModalRecovery(true)} className={styles.recoveryPassword}>
                  Esqueci Minha Senha
                </a>
              </Col>
            </div>

            <Row>
              <Col xs={12} sm={6} className={styles.alignRight}>
                <button type='button' onClick={() => loginEmail()}>
                  {loading ? <Loading /> : 'Entrar'}
                </button>
              </Col>
            </Row>

          </form>

        </div>
      </Col>
      <ModalRecovery showModal={showModalRecovery} closeModal={handleCloseModal} />
      </>
  );
};

LoginForm.getInitialProps = async (ctx) => { };

export default LoginForm;
