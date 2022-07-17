import { api } from './api';

export const userService = {
  getCustomerAddressForCheckout: async () => {
    const response = await api.get("/user/address-data-for-checkout")
      .then(({ ...response }) => {
        return response;
      }).catch(({ ...response }) => {
        return response;
      });
    return response;
  }
}