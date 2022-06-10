import React, { useState, useEffect } from 'react';
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
  const [telefone, setTelefone] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");

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
    if (!telefone || onlyUnsignedNumbers(telefone)?.length < 10) { errors.push('Informe um número de telefone com DDD') }

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
    if (!telefone || onlyUnsignedNumbers(telefone)?.length < 10) { errors.push('Informe um número de telefone com DDD') }
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
      var response = await Services.CreateLoginGoogle({
        email, cpf: onlyUnsignedNumbers(cpf), fullName, telefone: onlyUnsignedNumbers(telefone), googleId, organizer: false
      });
    } else {
      var response = await Services.CreateLoginNative({
        email, cpf: onlyUnsignedNumbers(cpf), fullName, telefone: onlyUnsignedNumbers(telefone), password, organizer: false
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
  const handlerTelefone = (e) => {
    let value = e.target.value;
    value = phoneMaskForList(e.target.value);
    setTelefone(value)
  }

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
                    value={telefone}
                    onChange={e => handlerTelefone(e)}
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
