import { api } from './api';

const servicesEventozz = {
  getEventzzGeneral: async () => {
    const response = await api.get("/list/eventzzGeneral")
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });

    return response;
  },
  getEventzz: async () => {
    // console.log('there');
    const response = await api.get("/list/eventzz")
      .then(({ ...response }) => {
        return response;
      }).catch(( response ) => {
        console.log('catch -> ', response);
        return response;
      });

    return response;
  },
  getEvent: async (slug) => {

    const response = await api.get("/list/eventzz/especific",
      {
        params: {
          slug
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

    const response = await api.get("/list/tickets",
      {
        params: {
          eventId: id
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
  getUserEventzz: async () => {
    const response = await api.get("/list/user-eventzz")
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });

    return response;
  },
  findEvent: async ({ eventId }) => {

    const response = await api.get("/list/eventzz/find",
      {
        params: {
          eventId
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
  getTicketsSoldNumber:  async ({ eventId }) => {

    const response = await api.get("/eventzz/get-tickets-sold-number",
      {
        params: {
          eventId
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