import axios from 'axios';

export const Axios = axios.create({

  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const ApiCEP = axios.create({
  baseURL: 'https://viacep.com.br/'
})

