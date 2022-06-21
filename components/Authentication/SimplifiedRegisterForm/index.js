import React, { useState, useEffect, useCallback } from 'react';
import { isValidCpf, cpfMask, phoneMaskForList, onlyUnsignedNumbers, isValidEmail } from '../../../utils/strings';
import { toast } from 'react-toastify';
import Services from '../../../services/login';
import { useAuth } from '../../../context/auth';
import { Col, Row } from 'react-bootstrap';
import styles from './styles.module.scss';

export const RegisterForm = ({
  loading,
  setLoading,
  payloadNewAccount = false
}) => {

  const { setUserToken, setUserName } = useAuth();
  const [step, setStep] = useState(1);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberConfirmation, setPhoneNumberConfirmation] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [isValidWhatsApp, setIsValidWhatsApp] = useState(false)
  const { CreateLoginGoogle: createLoginGoogle, CreateLoginNative: createLoginNative, checkPhoneIsWhatsApp } = Services

  const [googleId, setGoogleId] = useState(false);

  useEffect(() => {
    if (payloadNewAccount) {
      setEmail(payloadNewAccount?.email);
      setFullName(payloadNewAccount?.name);
      setGoogleId(payloadNewAccount?.sub);
    }
  }, [payloadNewAccount])

  async function handleNextStep() {

    let errors = []

    if (!fullName) { errors.push('Informe seu nome completo') }
    if (!isValidCpf(cpf)) { errors.push('Você precisa informar um CPF válido') }
    if (!phoneNumber || onlyUnsignedNumbers(phoneNumber)?.length < 10) { errors.push('Informe um número de telefone com DDD') }
    if (phoneNumber && onlyUnsignedNumbers(phoneNumber)?.length >= 10 && !isValidWhatsApp ) { errors.push('O número de telefone informado precisa ter WhatsApp') }
    if (phoneNumber !== phoneNumberConfirmation) { errors.push('Os números de telefone informados não são iguais') }

    if (errors?.length === 0) {
      setStep(2)
    } else {
      toast.error(<div>{errors.map(error => <div>{error}<br /></div>)}</div>, {
        autoClose: 2000 * errors.length
      })
    }

  }

  async function createNewAccount() {
    let errors = []

    if (!fullName) { errors.push('Informe seu nome completo') }
    if (!isValidCpf(cpf)) { errors.push('Você precisa informar um CPF válido') }
    if (!phoneNumber || onlyUnsignedNumbers(phoneNumber)?.length < 10) { errors.push('Informe um número de telefone com DDD') }
    if (!isValidEmail(email)) { errors.push('Informe um email válido') }
    if (!googleId && !password) { errors.push('Informe uma senha') }
    if (!googleId && password !== password2) { errors.push('As senhas são diferentes') }

    if (errors?.length > 0) {
      return toast.error(<div>{errors.map(error => <div>{error}<br /></div>)}</div>, {
        autoClose: 2000 * errors.length
      })
    }

    setLoading(true);
    if (googleId) {
      var response = await createLoginGoogle({
        email, cpf: onlyUnsignedNumbers(cpf), fullName, telefone: onlyUnsignedNumbers(phoneNumber), googleId, organizer: false
      });
    } else {
      var response = await createLoginNative({
        email, cpf: onlyUnsignedNumbers(cpf), fullName, telefone: onlyUnsignedNumbers(phoneNumber), password, organizer: false
      });
    }
    setLoading(false);
    if (response.status == 200) {
      if (response?.data?.token) {
        window.localStorage.setItem("accessToken", response?.data?.token);
        setUserName(response?.data?.user?.name);
        setUserToken(response?.data?.token);
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
    value = phoneMaskForList(e.target.value);
    setPhoneNumber(value)
  }

  const handleChangePhoneNumberConfirmation = (e) => {
    let value = e.target.value;
    value = phoneMaskForList(e.target.value);
    setPhoneNumberConfirmation(value)
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
      <Col xs={12} lg={6}>
        <div className={`register-form ${styles.registerForm}`}>
          <h2>Criar conta</h2>
          <form>
            {step === 1 && (
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
              </>
            )}
            {
              step === 2 && (
                <>

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
            {step == 1 && (
              <Row>
                <Col xs={12} md={6} className={styles.alignRight}>
                  {
                    googleId ? (
                      <button type='button' onClick={() => createNewAccount()}
                      >{loading ? <Loading /> : 'Cadastrar'}</button>
                    ) :
                      (<button type='button' onClick={() => handleNextStep()}
                      >Proximo</button>)
                  }
                </Col>
              </Row>
            )}
            {step == 2 && (
              <Row>
                <Col xs={12} md={6} className={styles.containerButton}>
                  <button className="create-account" type='button' onClick={() => setStep(1)}
                  >{loading ? <Loading /> : 'Voltar'}</button>
                </Col>
                <Col xs={12} md={6} className={styles.containerButton}>
                  <button className="create-account" type='button' onClick={() => createNewAccount()}
                  >{loading ? <Loading /> : 'Cadastrar'}</button>
                </Col>
              </Row>
            )}

          </form>

        </div>
      </Col>
    </>
  );
};
