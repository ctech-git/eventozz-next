import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import Services from "../../../services/login";
import { Loading } from "../../Loading";
import styles from './styles.module.scss';

export function PasswordRecovery() {

  const router = useRouter();
  const token = router.query?.token;

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [finalMessage, setFinalMessage] = useState();

  async function recovery() {

    if (password?.length < 3) { return toast.error("Escolha uma senha maior") }
    if (password !== confirmPassword) { return toast.error("As senhas não são iguais") }

    setLoading(true);
    const result = await Services.updatePassword({ token, password });
    setLoading(false);
    if (result.status === 200) {
      toast.success(result?.data?.msg ? result.data.msg : 'Você já pode fazer login com a nova senha', {
        autoClose: 5000
      })
      setFinalMessage(result?.data?.msg ? result.data.msg : 'Você já pode fazer login com a nova senha')
    } else {
      toast.error(result?.response?.data?.msg ? result.response.data.msg : 'Não foi possível recuperar a senha no nomomento', {
        autoClose: 5000
      })
      setErrorMessage(result?.response?.data?.msg ? result.response.data.msg : 'Não foi possível recuperar a senha no nomomento')
    }
  }

  async function checkRecoveryToken() {
    setLoading(true);
    const response = await Services.checkTokenPasswordRecovery({ token });
    setLoading(false);

    if (response.status !== 200) {
      if (response?.response?.data?.msg) {
        setErrorMessage(response.response.data.msg)
        toast.error(response.response.data.msg, {
          autoClose: 6000
        })
      } else {
        setErrorMessage("Não será possível recuperar a senha no momento")
        toast.error("Não será possível recuperar a senha no momento", {
          autoClose: 6000
        })
      }
    }
  }

  useEffect(() => {
    checkRecoveryToken();
  }, [])

  return (
    <Container>
      <Row>
        <Col xs={12} md={6} className={styles.containerForm}>
          <div className={`login-form ${styles.loginForm}`}>
            <form>
              <h4>Informe a nova senha</h4>
              {
                !errorMessage ? (
                  !finalMessage ? (
                    <>
                      <div className='form-group'>
                        <label>Senha</label>
                        <input
                          type='password'
                          className='form-control'
                          placeholder='Senha'
                          onChange={e => setPassword(e.target.value)}
                        />
                      </div>
                      <div className='form-group'>
                        <label>Confirmar senha</label>
                        <input
                          type='password'
                          className='form-control'
                          placeholder='Confirmar senha'
                          onChange={e => setConfirmPassword(e.target.value)}
                        />
                      </div>

                      <Row>
                        <Col xs={12} sm={6} className={styles.alignRight}>
                          <button type='button' onClick={() => recovery()}>
                            {loading ? <Loading /> : 'Salvar'}
                          </button>
                        </Col>
                      </Row>
                    </>
                  ) : (
                    <>
                      <Alert variant='success'>
                        {finalMessage}
                      </Alert>
                      <Row>
                        <Col xs={12} sm={6} className={styles.alignRight}>
                          <button type='button' onClick={() => router.push('/login?callback=/')}>
                            {loading ? <Loading /> : 'Ir para o login'}
                          </button>
                        </Col>
                      </Row>
                    </>
                  )
                ) : (
                  <>
                    <Alert variant='danger'>
                      {errorMessage}
                    </Alert>
                    <Row>
                      <Col xs={12} sm={6} className={styles.alignRight}>
                        <button type='button' onClick={() => router.push('/')}>
                          {loading ? <Loading /> : 'Fechar'}
                        </button>
                      </Col>
                    </Row>
                  </>
                )
              }
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  )
}