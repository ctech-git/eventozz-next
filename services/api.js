import axios from 'axios';

const api = axios.create({

  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

api.interceptors.request.use(async req => {
  if (req?.headers) {
    if (typeof window !== "undefined") {

      const storagedToken = await localStorage.getItem('accessToken');
      console.log('storagedToken -> ', storagedToken);
      req.headers.contentType = 'application/json';
      if (storagedToken) {
        req.headers.authorization = `Baerer ${storagedToken}`;
      }

    }
  }
  return req
})

export const ApiCEP = axios.create({
  baseURL: 'https://viacep.com.br/'
})

export {
  api
}