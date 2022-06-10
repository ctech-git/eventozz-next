import { api } from './api';

const shoppingCartService = {
  saveShoppingCart: async ({cart, cartId}) => {
    const response = await api.post("/purchase/shopping-cart",
      {
        cart,
        cartId
      }
    )
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  },
  listShoppingCart: async ({eventId, cartId}) => {
    const response = await api.get("/purchase/list-shopping-cart", {
      params: {
        eventId,
        cartId
      }
    })
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  },
  listShoppingCartAll: async () => {
    const response = await api.get("/purchase/list-shopping-cart-all")
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  },
  updateQuantityShoppingCart: async ({idInShoppingCart, quantity}) => {
    const response = await api.put("/purchase/update-quantity-shopping-cart", {idInShoppingCart, quantity})
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  },
  deleteShoppingCartItem: async ({idInShoppingCart}) => {
    const response = await api.delete("/purchase/delete-shopping-cart-item", {
      data: {
        idInShoppingCart
      }
    })
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  },
  getCouponId: async ({couponCode, eventId}) => {
    const response = await api.get("/purchase/get-coupon-info",
    {
      params: {
        couponCode,
        eventId
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