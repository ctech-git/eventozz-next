import { Axios } from './axios';

const shoppingCartService = {
  saveShoppingCart: async (car, accessToken) => {
    const response = await Axios.post("/purchase/shopping-cart",
      {
        car
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
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
  listShoppingCart: async (eventId, accessToken) => {
    const response = await Axios.get("/purchase/list-shopping-cart", {
      params: {
        eventId
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  },
  listShoppingCartAll: async (accessToken) => {
    const response = await Axios.get("/purchase/list-shopping-cart-all",
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  },
  updateQuantityShoppingCart: async ({idInShoppingCart, quantity, accessToken}) => {
    const response = await Axios.put("/purchase/update-quantity-shopping-cart", {idInShoppingCart, quantity},
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  },
  deleteShoppingCartItem: async ({idInShoppingCart, accessToken}) => {
    const response = await Axios.delete("/purchase/delete-shopping-cart-item", {
      data: {
        idInShoppingCart
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  },

}

export default shoppingCartService;