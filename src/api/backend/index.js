import axios from 'axios'
import { authInterceptor } from './interceptors'
import resources from './resources'

export const instance = axios.create({
  baseURL: 'http://172.16.151.156:8892',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(authInterceptor)

instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response.status && error.response.status === 401) {
      return Promise.reject(error.response)
    }
  }
)

export default function (option) {
  let apiResources = {}
  Object.entries(resources).forEach(([key, factory]) => {
    apiResources[key] = factory[instance]
  })
  return apiResources
}
