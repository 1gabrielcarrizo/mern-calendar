import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const {VITE_API_URL} = getEnvVariables()

// nos sirve para no especificar a cada momento la URL del backend
const calendarApi = axios.create({
    baseURL: VITE_API_URL
})

// TODO: configurar interceptores (interceptar una peticion antes o despues de que se haga para modificarla)

export default calendarApi;