import { Axios } from './axios';

const ServicesEventozz = {
  getEventos: async () => {
    const response = await Axios.get("/list/events",
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
  getEventosEspecific: async (id) => {
    console.log(id)
    const response = await Axios.get("/list/events/especific?id=" + id,
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
  saveShoppingCar: async (car, AcessToken) => {
    const response = await Axios.post("/purchase/shoppingCar",
      {
        car: car
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AcessToken}`
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
  listShoppingCar: async (id, AcessToken) => {
    const response = await Axios.get("/purchase/listShoppingCar/?id=" + id,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AcessToken}`
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
  listShoppingCarAll: async (AcessToken) => {
    const response = await Axios.get("/purchase/listShoppingCarAll/",
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AcessToken}`
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