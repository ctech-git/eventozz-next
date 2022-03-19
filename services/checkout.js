import { Axios } from './axios';

const checkoutService = {
  getCustomerForCheckout: async (accessToken) => {
    const response = await Axios.get("/user/data-customer-for-checkout", {
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
  getPaymentInfo: async ({accessToken, params}) => {
    const response = await Axios.get("/purchase/payment-info",
    {
      params: params,
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
  getPaymentOptions: async ({accessToken, params}) => {
    const response = await Axios.get("/payment/payment-options",
    {
      params: params,
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
  purchaseSave: async ({accessToken, body}) => {
    const response = await Axios.post("/purchase/save", {
      ...body
    },
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

}

export default checkoutService;