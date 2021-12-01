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
  getEventosEspecific: async (id) => {
    console.log(id)
    const response = await Axios.get("/list/events/especific?id=" + id,
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
  getTickets: async (id) => {
    console.log(id)
    const response = await Axios.get("/list/tickets/?id=" + id,
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