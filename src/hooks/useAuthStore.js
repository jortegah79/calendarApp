import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { onChecking, onClearErrorMessage, onLogin, onLogout } from "../store";


export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch();


    const startLogin = async ({ email, password }) => {

        dispatch(onChecking())
        try {

            const { data } = await calendarApi.post('/auth', { email, password })

            localStorage.setItem("token", data.token)
            localStorage.setItem("token-init-date", new Date().getTime())
            dispatch(onLogin(data.user))

        } catch (error) {
            console.log(error);

            // console.error(error.response.data.msg)
            let message = "";
            if (error.response.data.message) {
                message = error.response.data.message[0];
            } else {
                message = error.response.data.msg;
            }
            dispatch(onLogout(message))
            setTimeout(() => {
                dispatch(onClearErrorMessage())
            }, 10)
        }
    }

    const startRegister = async ({ name, email, password }) => {

        dispatch(onChecking());
        try {

            console.log({ name, email, password });
            const { data } = await calendarApi.post('auth/new', { name, email, password })
            localStorage.setItem("token", data.token)
            localStorage.setItem("token-init-date", new Date().getTime())
            dispatch(onLogin(data.user))
        } catch (error) {

            let message = "";
            if (error.response.data.message) {
                message = error.response.data.message[0];
            } else {
                message = error.response.data.msg;
            }
            dispatch(onLogout(message))
            setTimeout(() => {
                dispatch(onClearErrorMessage())
            }, 10)
        }

    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token')
        if (!token) return dispatch(onLogout())
        try {
            const { data } = await calendarApi.get('auth/renew');
            localStorage.setItem("token", data.token)
            localStorage.setItem("token-init-date", new Date().getTime())
            dispatch(onLogin(data.user))
        } catch (error) {
            localStorage.clear();
            return dispatch(onLogout())
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    return {

        //* Propiedades
        errorMessage,
        status,
        user,

        //* Métodos
        startLogin,
        startLogout,
        startRegister,
        checkAuthToken


    }
}