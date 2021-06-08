import axios from 'axios'
const baseUrl = process.env.BARNING_API_URL
axios.defaults.xsrfCookieName = 'CSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-CSRF-Token';
// console.log(process.env, baseUrl)
const secureApi = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

const plainApi = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
})

// securedApi.interceptors.request.use(config => {
//   const method = config.method.toUpperCase()
//   if (method !== 'OPTIONS' && method !== 'GET') {
//     config.headers = { 'X-CSRF-TOKEN': localStorage.csrf }
//   }
//   return config
// })

// securedApi.interceptors.response.use(null, error => {
//   if (error.response && error.response.config && error.response.status === 401) {
//     // If 401 by expired access cookie, we do a refresh request
//     return plainApi.post('/refresh', {}, { headers: { 'X-CSRF-TOKEN': localStorage.csrf } })
//       .then(response => {
//         localStorage.csrf = response.data.csrf
//         localStorage.signedIn = true
//         // After another successfull refresh - repeat original request
//         let retryConfig = error.response.config
//         retryConfig.headers['X-CSRF-TOKEN'] = localStorage.csrf
//         return plainApi.request(retryConfig)
//       }).catch(error => {
//         delete localStorage.csrf
//         delete localStorage.signedIn
//         // redirect to signin if refresh fails
//         location.replace('/')
//         return Promise.reject(error)
//       })
//   } else {
//     return Promise.reject(error)
//   }
// })

export { secureApi, plainApi }