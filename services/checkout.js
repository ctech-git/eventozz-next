import { api } from './api';

const checkoutService = {
  getCustomerForCheckout: async () => {
    const response = await api.get("/user/data-customer-for-checkout"
    )
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  },
  getPaymentInfo: async ({eventId, couponId, cartId}) => {
    const response = await api.get("/purchase/payment-info",
    {
      params: {
        eventId, 
        couponId, 
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
  getPaymentOptions: async ({params}) => {
    const response = await api.get("/payment/payment-options",
    {
      params: params
    })
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  },
  purchaseSave: async ({body}) => {
    const response = await api.post("/purchase/save", {
      ...body
    })
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  },
  checkPixPayment: async ({purchaseId}) => {
    const response = await api.get("/purchase/check-payment",
    {
      params: {
        purchaseId
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

export default checkoutService;