import React, { useState, useEffect, useContext } from 'react';
import { isValidCpf, cpfMask, phoneMaskForList, onlyUnsignedNumbers, dateMask, isValidDate, formatDate } from '../../utils/strings';
import Services from '../../services/login';
import ServicesExternal from '../../services/externalRequest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleLogin from 'react-google-login';
import { AuthContext } from '../../context/auth';
import { useRouter } from 'next/router';

const RegisterForm = ({
  organizer = false,
  callback = false
}) => {

  const router = useRouter();
  const authContext = useContext(AuthContext);

  const { setUserToken } = authContext;
  const [etapa, setEtapa] = useState(1);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [loading, setLoading] = useState(false);
  const [telefone, setTelefone] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [cep, setCEP] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");

  const [googleId, setGoogleId] = useState(false);



  async function responseGoogle(response) {
    console.log("========");
    console.log(response);
    setEmail(response?.profileObj?.email);
    setFullName(response?.profileObj?.name);
    setGoogleId(response?.googleId);
  }


  async function loginNative(type) {
    if (etapa == 1) {
      let isError = false;
      let Error = '';
      let cpfOnlyNumber = onlyUnsignedNumbers(cpf);
      let verificaCPF = isValidCpf(cpfOnlyNumber);
      console.log(password)
      console.log(password2)
      if (!verificaCPF) { isError = true; Error = "CPF Invalido"; }
      if (fullName == "" || fullName == null || fullName == undefined) { isError = true; Error = "Campo 'Nome' é Obrigatorio"; }
      if (email == "" || email == null || email == undefined) { isError = true; Error = "Campo 'E-mail' é Obrigatorio"; }
      if (nascimento == "" || nascimento == null || nascimento == undefined) { isError = true; Error = "Campo 'Nascimento' é Obrigatorio"; }
      if (telefone == "" || telefone == null || telefone == undefined) { isError = true; Error = "Campo 'Telefone' é Obrigatorio"; }
      if (password == "" || password == null || password == undefined) { isError = true; Error = "Campo 'Senha' é Obrigatorio"; }
      if (password2 == "" || password2 == null || password2 == undefined) { isError = true; Error = "Campo 'Senha' é Obrigatorio"; }
      if (password != password2) { isError = true; Error = "As senhas são diferentes"; }
      if (!isValidDate(nascimento)) { isError = true; Error = "Data de nascimento inválida"; }
      if (!isError) {
        setEtapa(2)
      } else {
        toast.error(Error, {
          position: "bottom-left",
          autoClose: 2000
        })
      }

    } else if (etapa == 2) {
      let isError = false;
      let Error = '';

      if (cep == "" || cep == null || cep == undefined) { isError = true; Error = "Campo 'Cep' é Obrigatorio"; }
      if (state == "" || state == null || state == undefined) { isError = true; Error = "Campo 'Estado' é Obrigatorio"; }
      if (city == "" || city == null || city == undefined) { isError = true; Error = "Campo 'Cidade' é Obrigatorio"; }
      if (district == "" || district == null || district == undefined) { isError = true; Error = "Campo 'Bairro' é Obrigatorio"; }
      if (street == "" || street == null || street == undefined) { isError = true; Error = "Campo 'Logradouro' é Obrigatorio"; }
      if (number == "" || number == null || number == undefined) { isError = true; Error = "Campo 'Número' é Obrigatorio"; }

      if (!isError) {
        console.log(googleId)
        setLoading(true);
        if (googleId) {
          var response = await Services.CreateLoginGoogle(
            email, cpf, fullName, telefone, password, cep,
            state, city, district, street, number, nascimento=formatDate(nascimento), googleId, organizer
          );
        } else {
          var response = await Services.CreateLoginNative(
            email, cpf, fullName, telefone, password, cep,
            state, city, district, street, number, nascimento=formatDate(nascimento), organizer
          );
        }
        setLoading(false);

        console.log(response)
        if (response.status == 200) {
          if (response?.data?.token) {
            window.localStorage.setItem("accessToken", response?.data?.token);
            setUserToken(response?.data?.token);
            if (organizer) {
              window.location.href = "https://app-eventozz-dev.herokuapp.com/?token=" + response?.data?.token;
            } else {
              if (callback) {
                router.push(callback);
              }else{
                router.push('/');
              }
            }

          } else {
            toast.error("Falhar no Login", {
              position: "bottom-left",
              autoClose: 2000
            })
          }
        } else {
          toast.error(response.response.data.msg, {
            position: "bottom-left",
            autoClose: 2000
          })
        }
      } else {
        toast.error(Error, {
          position: "bottom-left",
          autoClose: 2000
        })
      }

    }

  }
  const handlerCpf = (e) => {
    let value = e.target.value;
    value = cpfMask(e.target.value);
    setCpf(value)
  }
  const handlerTelefone = (e) => {
    let value = e.target.value;
    value = phoneMaskForList(e.target.value);
    setTelefone(value)
  }

  const handlerNascimento = (e) => {
    let value = e.target.value;
    if (value?.length > 10) {
      return;
    }
    setNascimento(value)
  }

  async function handlerCep(e) {
    let value = onlyUnsignedNumbers(e.target.value);
    setCEP(value)
    console.log(value)
    if (value.length < 8) {
      return;
    }

    const result = await ServicesExternal.getCep(value);

    if (result.status == 200) {
      setState(result?.data?.uf);
      setCity(result?.data?.localidade);
      setDistrict(result?.data?.bairro);
      setStreet(result?.data?.logradouro);

    } else {
      toast.error("Cep invalido", {
        position: "bottom-left",
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
      <div className='col-lg-6 col-md-12'>
        <div className='register-form'>
          <h2>Quero criar uma conta</h2>
          {etapa == 1 && (
            <GoogleLogin
              clientId="1061997614720-m694ntnbcs1q0f1595lggt8hgjt968bm.apps.googleusercontent.com"
              buttonText="Entrar com Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              className="login-with-google"
              cookiePolicy={'single_host_origin'}
            />
          )}
          <p className='pt-4 divisor-login-types text-center'>ou</p>
          <form>
            {etapa == 1 && (
              <>
                <div className='form-group'>
                  <label>Nome Completo</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Nome Completo'
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Email</label>
                  <input
                    type='email'
                    value={email}
                    className='form-control'
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>CPF</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='CPF'
                    onChange={e => handlerCpf(e)}
                    value={cpf}
                    maxLength={14}
                  />
                </div>
                <div className='form-group'>
                  <label>Telefone para contato</label>
                  <input
                    type='tel'
                    className='form-control'
                    placeholder='Telefone'
                    value={telefone}
                    onChange={e => handlerTelefone(e)}
                    maxLength={15}
                  />
                </div>
                <div className='form-group'>
                  <label>Data de nascimento</label>
                  <input
                    className='form-control'
                    placeholder='Data de Nascimento'
                    value={dateMask(nascimento)}
                    onChange={e => handlerNascimento(e)}
                    maxLength={15}
                  />
                </div>

                <div className='form-group'>
                  <label>Insira uma senha</label>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='Senha'
                    value={password}
                    onChange={e => setpassword(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Repita sua senha</label>
                  <input
                    type='password'
                    value={password2}
                    className='form-control'
                    placeholder='Confirme a Senha'
                    onChange={e => setpassword2(e.target.value)}
                  />
                </div>
              </>
            )}
            {etapa == 2 && (
              <>
                <div className='form-group'>
                  <label>CEP</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='CEP'
                    value={cep}
                    onChange={e => handlerCep(e)}
                  />
                </div>
                <div className='form-group'>
                  <label>Estado</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Estado'
                    value={state}
                    onChange={e => setState(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Cidade</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Cidade'
                    value={city}
                    onChange={e => setCity(e.target.value)}
                  />
                </div>
                <label>Bairro</label>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='bairro'
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Logradouro</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Logradouro'
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label>Número</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Número'
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                  />
                </div>
              </>
            )}



            {etapa == 1 && (
              <button type='button' onClick={() => loginNative()}
              >Proximo</button>
            )}
            {etapa == 2 && (
              <div className="box-button">
                <button className="create-account" type='button' onClick={() => setEtapa(1)}
                >{loading ? <Loading /> : 'Voltar'}</button>
                <button className="create-account" type='button' onClick={() => loginNative()}
                >{loading ? <Loading /> : 'Cadastre-se'}</button>
              </div>
            )}
          </form>

        </div>
      </div>
    </>
  );
};

export default RegisterForm;
