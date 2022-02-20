import { Axios } from './axios';


const Services = {
  LoginNative: async (cpfEmail, senha, organizador) => {
    const response = await Axios.post("/signin",
      {
        cpfEmail: cpfEmail,
        password: senha,
        organizador
      },
      {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        }
      }
    )
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  },
  CreateLoginGoogle: async (
    email,
    cpf,
    fullName,
    telefone,
    password,
    cep,
    state,
    city,
    district,
    street,
    number,
    nascimento,
    googleId,
    organizador
  ) => {
    const response = await Axios.post("/signup/google",
      {
        email: email,
        cpf: cpf,
        name: fullName,
        fone: telefone,
        nascimento: nascimento,
        cep: cep,
        state: state,
        city: city,
        district: district,
        street: street,
        number: number,
        password: password,
        googleId: googleId,
        organizador
      },
      {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        }
      }
    )
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  },
  CreateLoginNative: async (
    email,
    cpf,
    fullName,
    telefone,
    password,
    cep,
    state,
    city,
    district,
    street,
    number,
    nascimento,
    organizador
  ) => {
    const response = await Axios.post("/signup",
      {
        email: email,
        cpf: cpf,
        name: fullName,
        fone: telefone,
        nascimento: nascimento,
        cep: cep,
        state: state,
        city: city,
        district: district,
        street: street,
        number: number,
        password: password,
        organizador
      },
      {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        }
      }
    )
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  },
  LoginWithGoogle: async (tokenId, organizador) => {
    const response = await Axios.post("/signin/google",
      {
        tokenId: tokenId,
        organizador
      },
      {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        }
      }
    )
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  },
}

export default Services;