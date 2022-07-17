import { api } from './api';

const Services = {
  LoginNative: async (cpfEmail, senha, organizer) => {
    const response = await api.post("/signin",
      {
        cpfEmail: cpfEmail,
        password: senha,
        organizer
      }
    )
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  },
  CreateLoginGoogle: async ({
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
  }) => {
    const response = await api.post("/signup/google",
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
      }
    )
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  },
  CreateLoginNative: async ({
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
  }) => {
    const response = await api.post("/signup",
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
    const response = await api.post("/signin/google",
      {
        tokenId: tokenId,
        organizer
      }
    )
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  },
  checkPhoneIsWhatsApp: async (phone) => {
    const response = await api.get('/customer/check-phone-is-whatsapp', { params: { phone } })
      .then(({ ...response }) => response)
      .catch(({ ...response }) => response)

    return response
  },
  passwordRecovery: async ({ email }) => {
    const response = await api.post("/signin/recovery", {
      email
    })
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  },
  checkTokenPasswordRecovery: async ({ token }) => {
    const response = await api.get("/signin/check-token-password-recovery", {
      params: {
        token,
      }
    })
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  },
  updatePassword: async ({ password, token }) => {
    const response = await api.post("/signin/update-password", {
      password,
      token
    })
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  },
}

export default Services;