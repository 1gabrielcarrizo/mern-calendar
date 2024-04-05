import React, { useState } from 'react'

// initialForm puede tener varias propiedades, esas propiedades vienen del FormWithCustomHook
const useForm = ( initialForm = {} ) => {
    const [formState, setFormState] = useState(initialForm)

    // creamos una funcion que nos permita cambiar los inputs
    const onInputChange = ({ target }) => {
        const { name, value } = target // obtenemos el name y el value del input
        setFormState({ // es un objeto por eso usamos {}
            ...formState, // mantenemos las otras propiedades
            [name]: value, // asignamos nuevos valores al name y al value
        })
    }
    // funcion para resetear los inputs
    const onResetForm = () => {
        setFormState(initialForm)
    }

    return {
        ...formState, // desestructuramos para obtener el username, email y password
        formState,
        onInputChange,
        onResetForm
    }
}

export default useForm