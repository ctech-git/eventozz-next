import axios from 'axios';

export const Axios = axios.create({

  //baseURL: 'https://api-eventozz.herokuapp.com'
  baseURL: 'https://api-eventozz-dev.herokuapp.com/'

})

export const ApiCEP = axios.create({
  baseURL: 'https://viacep.com.br/'
})

