import { useDispatch, useSelector } from 'react-redux'
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store'
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
        // TODO: update event
        // todo bien
        if(calendarEvent._id){
            // actualizando
            dispatch(onUpdateEvent({...calendarEvent}))
        } else{
            // creando
            const {data} = await calendarApi.post('/events', calendarEvent)

            dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user}))
        }
    }

    const startDeletingEvent = () => {
        //TODO: llegar al backend
        dispatch(onDeleteEvent())
    }

    // carga los eventos del backend
    const startLoadingEvents = async () => {
        // agregamos un trycatch
        try {
            // mostramos los eventos
            const {data} = await calendarApi.get('/events')
            const events = convertEventsToDateEvents(data.eventos)
            console.log(events)

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
