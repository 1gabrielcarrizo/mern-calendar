import React, { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from '../'
import { getMessagesES, localizer } from '../../helpers'
import { useUiStore, useCalendarStore } from '../../hooks'

export const CalendarPage = () => {

  const {openDateModal} = useUiStore()
  const {events, setActiveEvent} = useCalendarStore()
  // 1- obtener la ultima vista del localStorage, si es la primera vez lo obtiene de week
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  // evento para reconocer doble click
  const onDoubleClick = (event) => {
    // console.log({onDoubleClick: event})
    openDateModal()
  }
  // evento para reconocer click
  const onSelect = (event) => {
    // console.log({click: event})
    setActiveEvent(event)
  }
  // evento para cambiar la vista
  const onViewChanged = (event) => {
    // 2- al cambiar de vista, se guarda en el localStorage
    localStorage.setItem('lastView', event)
    setLastView(event)
  }

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView} // 3- vista por defecto
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal/>
      <FabAddNew/>
      <FabDelete/>
    </>
  )
}
