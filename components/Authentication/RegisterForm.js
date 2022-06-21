import React, { useState, useEffect, useCallback } from 'react';
import { isValidCpf, cpfMask, phoneMaskForList, onlyUnsignedNumbers, dateMask, isValidDate, formatDate, cepMask } from '../../utils/strings';
import Services from '../../services/login';
import ServicesExternal from '../../services/externalRequest';
import { toast } from 'react-toastify';
import GoogleLogin from 'react-google-login';
import { useAuth } from '../../context/auth';
import { useRouter } from 'next/router';

const RegisterForm = ({
  organizer = false,
  callback = false,
  payloadNewAccount = false
}) => {

  const router = useRouter();

  const { CreateLoginGoogle: createLoginGoogle, CreateLoginNative: createLoginNative, checkPhoneIsWhatsApp } = Services

  const { setUserToken, setUserName } = useAuth();
  const [etapa, setEtapa] = useState(1);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberConfirmation, setPhoneNumberConfirmation] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [cep, setCEP] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [isValidWhatsApp, setIsValidWhatsApp] = useState(false)

  const [googleId, setGoogleId] = useState(false);

  useEffect(() => {
    console.log(payloadNewAccount);
    if (payloadNewAccount) {
      setEmail(payloadNewAccount?.email);
      setFullName(payloadNewAccount?.name);
      setGoogleId(payloadNewAccount?.sub);
    }
  }, [payloadNewAccount])

  async function responseGoogle(response) {
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
      if (!isValidDate(nascimento)) { isError = true; Error = "Data de nascimento inválida"; }
      if (!googleId && password != password2) { isError = true; Error = "As senhas são diferentes"; }
      if (!googleId && password == "" || password == null || password == undefined) { isError = true; Error = "Campo 'Senha' é Obrigatorio"; }
      if (phoneNumber !== phoneNumberConfirmation) { isError = true; Error = "Os números de telefone informados não são iguais" }
      if (phoneNumber && onlyUnsignedNumbers(phoneNumber)?.length >= 10 && !isValidWhatsApp ) { isError = true; Error = "O número de telefone informado precisa ter WhatsApp" }
      if (!phoneNumber) { isError = true; Error = "Campo 'Telefone' é Obrigatorio"; }
      if (nascimento == "" || nascimento == null || nascimento == undefined) { isError = true; Error = "Campo 'Nascimento' é Obrigatorio"; }
      if (!verificaCPF) { isError = true; Error = "CPF Inválido"; }
      if (email == "" || email == null || email == undefined) { isError = true; Error = "Campo 'E-mail' é Obrigatorio"; }
      if (fullName == "" || fullName == null || fullName == undefined) { isError = true; Error = "Campo 'Nome' é Obrigatorio"; }
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
          var response = await createLoginGoogle({
            email, cpf: onlyUnsignedNumbers(cpf), fullName, telefone: onlyUnsignedNumbers(phoneNumber), password, cep: onlyUnsignedNumbers(cep),
            state, city, district, street, number, nascimento: formatDate(nascimento), googleId, organizer
          });
        } else {
          var response = await createLoginNative({
            email, cpf: onlyUnsignedNumbers(cpf), fullName, telefone: onlyUnsignedNumbers(phoneNumber), password, cep: onlyUnsignedNumbers(cep),
            state, city, district, street, number, nascimento: formatDate(nascimento), organizer
          });
        }
        setLoading(false);

        if (response.status == 200) {
          if (response?.data?.token) {
            window.localStorage.setItem("accessToken", response?.data?.token);
            setUserToken(response?.data?.token);
            setUserName(response?.data?.user?.name);
            if (organizer) {
              window.location.href = `${process.env.NEXT_PUBLIC_APP_URL}?token=${result?.data?.token}`;
            } else {
              if (callback) {
                router.push(callback);
              } else {
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
  const handleChangePhoneNumber = (e) => {
    let value = e.target.value;
    if (onlyUnsignedNumbers(value)?.length === 11) {
      checkNumberPhone(onlyUnsignedNumbers(value));
    }else{
      setIsValidWhatsApp(false)
    }
    value = phoneMaskForList(value);
    setPhoneNumber(value)
  }

  const handleChangePhoneNumberConfirmation = (e) => {
    let value = e.target.value;
    value = phoneMaskForList(e.target.value);
    setPhoneNumberConfirmation(value)
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
    if (value.length > 8) {
      return;
    }
    setCEP(value)
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

  const checkNumberPhone = useCallback(async (phoneNumber) => {
    const response = await checkPhoneIsWhatsApp(phoneNumber);
    console.log(response?.data?.data?.exists);
    // return;
    if (response.status === 200) {
        if (!response?.data?.data?.exists) {
            setIsValidWhatsApp(false)
            toast.error('O número de telefone informado não é um número de whatsapp válido')
        }else{
            setIsValidWhatsApp(true)
        }
        setLoading(false);
    } else if (response.status === 401) {
        toast.error("Você não está logado ou sua sessão expirou");
        setLoading(false);
        return false;
    } else if (response.status === 500) {
        toast.error(response?.response?.data?.msg || "Ocorreu um erro na requisição ao servidor. Entre em contato com o suporte");
        setLoading(false);
        return false;
    } else {
        toast.error(response?.response?.data?.msg || "Ocorreu um erro ao tentar verificar se o telefone possui WhatsApp");
        setLoading(false);
        return false;
    }

}, [setIsValidWhatsApp, checkPhoneIsWhatsApp, setLoading])

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
                  <label>Telefone (WhatsApp)</label>
                  <input
                    type='tel'
                    className='form-control'
                    placeholder='Telefone'
                    value={phoneNumber}
                    onChange={e => handleChangePhoneNumber(e)}
                    maxLength={15}
                  />
                </div>
                <div className='form-group'>
                  <label>Confirme seu telefone</label>
                  <input
                    type='tel'
                    className='form-control'
                    placeholder='Confirme o telefone'
                    value={phoneNumberConfirmation}
                    onChange={e => handleChangePhoneNumberConfirmation(e)}
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
                    inputMode='numeric'
                  />
                </div>
                {
                  !googleId && (
                    <>
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
                  )
                }

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
                    value={cepMask(cep)}
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
