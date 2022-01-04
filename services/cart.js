import { Axios } from './axios';

const showppingCartService = {
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

export default showppingCartService;