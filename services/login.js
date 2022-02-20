import { Axios } from './axios';


const Services = {
  LoginNative: async (cpfEmail, senha, organizer) => {
    const response = await Axios.post("/signin",
      {
        cpfEmail: cpfEmail,
        password: senha,
        organizer
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
    organizer
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
        organizer
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
    organizer
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
        organizer
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
  LoginWithGoogle: async (tokenId, organizer) => {
    const response = await Axios.post("/signin/google",
      {
        tokenId: tokenId,
        organizer
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