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
  }

}

export default checkoutService;