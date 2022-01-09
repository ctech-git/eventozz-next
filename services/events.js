import { Axios } from './axios';

const servicesEventozz = {
  getEvents: async () => {
    const response = await Axios.get("/list/events", {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
      console.log(response);
    return response;
  },
  getEvent: async (slug) => {
    console.log(slug)
    const response = await Axios.get("/list/events/especific?slug=" + slug,
      {
        headers: {
          'Content-Type': 'application/json',
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

export default servicesEventozz;