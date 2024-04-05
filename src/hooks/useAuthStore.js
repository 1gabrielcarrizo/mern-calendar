import {useDispatch, useSelector} from 'react-redux'
import calendarApi from '../api/calendarApi'
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store'

export const useAuthStore = () => {
    
    // status, user y errorMessage vienen del authSlice.js
    const {status, user, errorMessage} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    // es asincrona porque tiene que llegar al backend
    const startLogin = async ({email, password}) => {
        dispatch(onChecking())

        // agregamos un trycatch
        try {
            // hace la comunicacion con el backend
            const {data} = await calendarApi.post('/auth', {email, password})

            // colocamos el token en el localstorage
            localStorage.setItem('token', data.token)
            // agregamos la fecha en el localstorage
            localStorage.setItem('token-init-date', new Date().getTime())

            // mostramos el resultado en la pestaña de redux
            dispatch(onLogin({name: data.name, uid: data.uid}))

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }
    }

    // es asincrona porque tiene que llegar al backend
    const startRegister = async ({email, password, name}) => {
        dispatch(onChecking())

        // agregamos un trycatch
        try {
            // hace la comunicacion con el backend
            const {data} = await calendarApi.post('/auth/new', {email, password, name})

            // colocamos el token en el localstorage
            localStorage.setItem('token', data.token)
            // agregamos la fecha en el localstorage
            localStorage.setItem('token-init-date', new Date().getTime())

            // mostramos el resultado en la pestaña de redux
            dispatch(onLogin({name: data.name, uid: data.uid}))

        } catch (error) {
            console.log(error)
            dispatch(onLogout(error.response.data?.msg || '---'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }
    }

    const checkAuthToken = async () => {
        // obtener token del localstorage
        const token = localStorage.getItem('token')

        // si no existe el token...
        if(!token) return dispatch(onLogout())

        // agregar un trycatch
        try {
            const {data} = await calendarApi.get('auth/renew')

            // colocamos el token en el localstorage
            localStorage.setItem('token', data.token)
            // agregamos la fecha en el localstorage
            localStorage.setItem('token-init-date', new Date().getTime())

            // mostramos el resultado en la pestaña de redux
            dispatch(onLogin({name: data.name, uid: data.uid}))

        } catch (error) {
            
            localStorage.clear()
            dispatch(onLogout())
        }
    }

    return {
        // propiedades
        status,
        user,
        errorMessage,
        // metodos
        checkAuthToken,
        startLogin,
        startRegister
    }
}