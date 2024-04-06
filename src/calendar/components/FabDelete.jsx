
import { useCalendarStore } from '../../hooks'
import Swal from 'sweetalert2'

export const FabDelete = () => {

    const { startDeletingEvent, hasEventSelected } = useCalendarStore()


    const handleDelete = () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás recuperar este evento.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo"
        }).then((result) => {
            if (result.isConfirmed) {
                startDeletingEvent()
            }
        });
    }

    return (
        <button
            className='btn btn-danger fab-danger'
            onClick={handleDelete}
            style={{
                display: hasEventSelected ? '' : 'none'
            }}
        >
            <i className='fas fa-trash-alt'></i>
        </button>
    )
}
