import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import { onAddNewEvent, onDeleteEvent, onLoadingEvents, onSetActiveEvent, onUpdateEvent } from '../store'
import calendarApi from '../api/calendarApi'
import { convertEventsToDateEvents } from '../helpers'

export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const {events, activeEvent} = useSelector(state => state.calendar)
    const {user} = useSelector(state => state.auth)

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {
        
        // agregamos un trycatch
        try {
            if(calendarEvent.id){
                // actualizando
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
    
                dispatch(onUpdateEvent({...calendarEvent, user}))
    
                return;
    
            }
            // creando
            const {data} = await calendarApi.post('/events', calendarEvent)
    
            dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user}))

        } catch (error) {
            console.log(error)
            Swal.fire('Error al guardar', error.response.data.msg, 'error')
        }
        
    }

    const startDeletingEvent = async () => {
        // agregamos un trycatch
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`)
            
            dispatch(onDeleteEvent())

        } catch (error) {
            console.log(error)
            Swal.fire('Error al eliminar', error.response.data.msg, 'error')
        }
        
    }

    // carga los eventos del backend
    const startLoadingEvents = async () => {
        // agregamos un trycatch
        try {
            // mostramos los eventos
            const {data} = await calendarApi.get('/events')
            const events = convertEventsToDateEvents(data.eventos)
            dispatch(onLoadingEvents(events))

        } catch (error) {
            console.log('Error cargando eventos')
            console.log(error)
        }
    }

    return {
        // propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        // metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}
