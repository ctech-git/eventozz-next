import { Axios } from './axios';

const ServicesEventozz = {
  getEventos: async () => {
    const response = await Axios.get("/list/events",
      {
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${token}`
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

export default ServicesEventozz;