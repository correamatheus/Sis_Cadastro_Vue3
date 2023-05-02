import axios from 'axios'
import AuthService from './auth'

const API_ENVS = {
    local: 'https://fakestoreapi.com'
}
const httpClient = axios.create({
    baseURL: API_ENVS.local
})

// httpClient.interceptors.request.use(config => {
//     const token = window.localStorage.getItem('toke')
//     if(token){

//     }
// })

httpClient.interceptors.response.use((response) => {}, (error) => {
    const canThrowAnError = error.request.status === 0 || error.request.status === 500
    if(canThrowAnError){
        throw new Error(error.message)
    }
    return error 
})

export default {
    auth: AuthService(httpClient)
}