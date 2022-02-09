import React, { useState, useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import GoogleLogin from 'react-google-login';
import { AuthContext } from '../../context/auth';
import { useRouter } from 'next/router';
import { Col, Row } from 'react-bootstrap';

export const EventDetails = () => {

  const router = useRouter();
  const authContext = useContext(AuthContext);
  const {setUserToken, setUserName} = authContext;

  const [emailCPF, setEmailCPF] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <Row>
      <Col xs={12}>
        <div className='login-form'>
          <h2>Já sou cliente</h2>
          
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
              Entrar
            </button>

          </form>
        </div>
      </Col>
    </Row>
  );
};
