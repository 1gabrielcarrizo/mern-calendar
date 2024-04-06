import { parseISO } from "date-fns"

export const convertEventsToDateEvents = (events = []) => {

    return events.map(event => {

        // convertir string a fecha
        event.end = parseISO(event.end)
        event.start = parseISO(event.start)

        return event
    })
}