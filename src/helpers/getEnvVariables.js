export const getEnvVariables = () => {
    // obtenemos las variables de entorno
    import.meta.env

    return {
        ...import.meta.env
    }
}