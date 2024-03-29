import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { addHours, differenceInSeconds } from 'date-fns';
import { useMemo, useState } from 'react';
import Modal from 'react-modal';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es'
import { useUiStore } from '../../hooks';

registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

Modal.setAppElement('#root'); // se sobrepone en los elementos

export const CalendarModal = () => {

    const {isDateModalOpen, closeDateModal} = useUiStore()

    const [formSubmitted, setFormSubmitted] = useState(false)
    // 1- creamos un form de manera tradicional
    const [formValues, setFormValues] = useState({
        title: 'Gabriel',
        notes: 'Carrizo',
        start: new Date(),
        end: addHours(new Date(), 2)
    })
    // usamos useMemo para memorizar el valor
    const titleClass = useMemo(() => {
        if(!formSubmitted) return'';
        return(formValues.title.length > 0)
        ? 'is-valid'
        : 'is-invalid'
    }, [formValues.title, formSubmitted])

    // 3- creamos una funcion para cambiar el form
    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onCloseModal = () => {
        closeDateModal()
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setFormSubmitted(true)
        // la fecha final siempre debe ser mayor a la inicial
        const difference = differenceInSeconds(formValues.end, formValues.start)
        if(isNaN(difference) || difference <= 0){
            Swal.fire('Fecha incorrectas', 'Revisar las fechas ingresadas', 'error')
            return;
        }
        if(formValues.title.length <= 0) return;
        console.log(formValues)
    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValues.start}
                        onChange={(event) => onDateChanged(event, "start")}
                        className='form-control'
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start} // no seleciona flechas anteriores a lo que se elige
                        selected={formValues.end}
                        onChange={(event) => onDateChanged(event, "end")}
                        className='form-control'
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title} // 2- agregamos el value
                        onChange={onInputChanged} // 4- llamamos a la funcion
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes} // 2- agregamos el value
                        onChange={onInputChanged} // 4- llamamos a la funcion
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}