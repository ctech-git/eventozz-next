import { Axios } from './axios';

const servicesEventozz = {
  getEventzz: async () => {
    const response = await Axios.get("/list/eventzz", {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });

    return response;
  },
  getEvent: async (slug) => {

    const response = await Axios.get("/list/eventzz/especific?slug=" + slug,
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
  getUserEventzz: async ({ accessToken }) => {
    const response = await Axios.get("/list/user-eventzz", {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    })
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });

    return response;
  },
  findEvent: async ({ accessToken, eventId }) => {

    const response = await Axios.get("/list/eventzz/find",
      {
        params: {
          eventId
        },
        headers: {
          'Authorization': `Bearer ${accessToken}`,
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