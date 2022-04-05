import React, { useState, useEffect, useContext } from 'react';
import { isValidCpf, onlyUnsignedNumbers } from '../../utils/strings';
import Services from '../../services/login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleLogin from 'react-google-login';
import { AuthContext } from '../../context/auth';
import { useRouter } from 'next/router';

const LoginForm = ({
  organizer = false,
  callback = false,
  setPayloadNewAccount = false
}) => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const { setUserToken, setUserName } = authContext;

  const [emailCPF, setEmailCPF] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function responseGoogle(response) {
    console.log("========");
    console.log(response);

    let isError = false;
    let Error = '';

    if (response?.error) { isError = true; Error = response.error }

    if (!isError) {
      console.log(response)
      let tokenId = response?.tokenId;
      console.log(tokenId)

      setLoading(true);
      const result = await Services.LoginWithGoogle(tokenId, organizer);
      setLoading(false);
      console.log(result)
      if (result.status == 200) {

        if (result?.data?.token) {
          window.localStorage.setItem("accessToken", result?.data?.token);
          setUserToken(result?.data?.token);
          if (organizer) {
            window.location.href = "https://app.eventozz.com/?token=" + result?.data?.token;
          } else {
            if (callback) {
              router.push(callback);
            } else {
              router.back();
            }
          }
          // window.location.href = "/";
        } else {
          toast.error("Falhar no Login", {
            autoClose: 2000
          })
        }
      } else if(result.status == 201){
        if (result?.data?.data && setPayloadNewAccount) {
          setPayloadNewAccount(result?.data?.data)
          toast.error(result?.response?.data?.msg ? result.response.data.msg : 'Nova conta. Preencha as informações para finalizar a criação da conta', {
            autoClose: 5000
          })
        }
      } else {
        toast.error(result?.response?.data?.msg ? result.response.data.msg : 'Não foi possível criar a conta nomomento', {
          autoClose: 5000
        })
      }

    } else {
      toast.error(Error, {
        autoClose: 5000
      })
    }
  }

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
      const response = await Services.LoginNative(cpfEmail, senha, organizer);
      setLoading(false);
      console.log(response);
      if (response.status == 200) {
        if (response?.data?.token) {
          window.localStorage.setItem("accessToken", response?.data?.token);
          setUserToken(response?.data?.token);
          if (organizer) {
            window.location.href = "https://app.eventozz.com/?token=" + response?.data?.token;
          } else {
            if (callback) {
              router.push(callback);
            } else {
              router.back();
            }
          }
          // window.location.href = "/";
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
  
  const Loading = () => (
    <div class="spinner-border loading-button" role="status">
      <span class="sr-only"></span>
    </div>
  )

  return (
    <>
      {/* <ToastContainer /> */}
      <div className='col-lg-6 col-md-12'>
        <div className='login-form'>
          <h2>Já sou cliente</h2>
          <GoogleLogin
            clientId="1061997614720-m694ntnbcs1q0f1595lggt8hgjt968bm.apps.googleusercontent.com"
            buttonText="Entrar com Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            className="login-with-google"
            cookiePolicy={'single_host_origin'}
          />
          <p className='pt-4 divisor-login-types text-center'>ou</p>

          <form>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Email ou CPF'
                onChange={e => setEmailCPF(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='Senha'
                onChange={e => setSenha(e.target.value)}
              />
            </div>
            <div className='row align-items-center'>
              <div className='col-lg-6 col-md-6 col-sm-6 remember-me-wrap'>
                <div className='form-check'>
                </div>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-6 lost-your-password-wrap'>
                <a href='#' className='lost-your-password'>
                  Esqueci Minha Senha
                </a>
              </div>
            </div>


            <button type='button' onClick={() => loginEmail()}>
              {loading ? <Loading /> : 'Entrar'}
            </button>

          </form>





        </div>
      </div>
    </>
  );
};

LoginForm.getInitialProps = async (ctx) => { };

export default LoginForm;
