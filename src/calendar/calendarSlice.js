import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    _id: new Date().getTime(),
    title: 'Cumple del jefe',
    notes: 'Hay que comprar torta',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Gabo'
    }
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, {payload}) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, {payload}) => {
            state.events.push(payload);
            state.activeEvent = null; //limpar el evento activo
        },
        onUpdateEvent: (state, {payload}) => {
            state.events = state.events.map(event => {
                if(event._id === payload._id){
                    return payload
                }
                return event
            })
        },
        onDeleteEvent: (state) => {
            // si hay una nota activa entonces lo elimina
            if(state.activeEvent){
                state.events = state.events.filter(event => event._id !== state.activeEvent._id) // regresamos todos los eventos que sean diferentes al _id de la nota activa
            }
            state.activeEvent = null
        },
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;