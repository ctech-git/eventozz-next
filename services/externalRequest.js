import { ApiCEP } from './api';


const ServicesExternal = {
  getCep: async (value) => {
    const response = await ApiCEP.get("/ws/" + value + "/json",
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
  }

}

export default ServicesExternal;