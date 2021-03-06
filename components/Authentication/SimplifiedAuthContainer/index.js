import { useRouter } from "next/router";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import GoogleLogin from "react-google-login";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";
import Services from "../../../services/login";
import LoginForm from "../SimplifiedLoginForm";
import { RegisterForm } from "../SimplifiedRegisterForm";
import styles from './styles.module.scss';

export function SimplifiedAuthContainer({ organizer = false, callback = false, pageLogin = false }) {

  const router = useRouter();
  const [payloadNewAccount, setPayloadNewAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUserName, setUserToken } = useAuth()

  async function responseGoogle(response) {

    let isError = false;
    let Error = '';

    if (response?.error) { isError = true; Error = response.error }

    if (!isError) {
      let tokenId = response?.tokenId;
      console.log(tokenId)

      setLoading(true);
      const result = await Services.LoginWithGoogle(tokenId, false);
      setLoading(false);
      if (result.status == 200) {

        if (result?.data?.token) {
          window.localStorage.setItem("accessToken", result?.data?.token);
          setUserName(result?.data?.user?.name);
          setUserToken(result?.data?.token);
          if (pageLogin) {
            if (organizer) {
              window.location.href = `${process.env.NEXT_PUBLIC_APP_URL}?token=${result?.data?.token}`;
            } else {
              if (callback) {
                router.push(callback);
              } else {
                router.back();
              }
            }
          }
        } else {
          toast.error("Falha no Login", {
            autoClose: 2000
          })
        }
      } else if (result.status == 201) {
        if (result?.data?.data && setPayloadNewAccount) {
          setPayloadNewAccount(result?.data?.data)
          toast.error(result?.response?.data?.msg ? result.response.data.msg : 'Nova conta. Preencha as informa????es para finalizar a cria????o da conta', {
            autoClose: 5000
          })
        }
      } else {
        toast.error(result?.response?.data?.msg ? result.response.data.msg : 'N??o foi poss??vel criar a conta nomomento', {
          autoClose: 5000
        })
      }

    } else {
      toast.error(Error, {
        autoClose: 5000
      })
    }
  }

  return (
    <Row className={`${styles.container} ${pageLogin ? styles.containerPageLogin : ''}`}>
      <Container className={styles.containerForm}>
        <LoginForm loading={loading} setLoading={setLoading} organizer={organizer} callback={callback} pageLogin={pageLogin} />
        <RegisterForm loading={loading} setLoading={setLoading} organizer={organizer} callback={callback} pageLogin={pageLogin} payloadNewAccount={payloadNewAccount} />
      </Container>
      <Row>
        <Col xs={12} sm={6} md={4} className={styles.containerGoogle}>
          <GoogleLogin
            clientId="1061997614720-m694ntnbcs1q0f1595lggt8hgjt968bm.apps.googleusercontent.com"
            buttonText="Entrar com o Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            className="login-with-google"
            cookiePolicy={'single_host_origin'}
          />
        </Col>
      </Row>
    </Row>
  )
}