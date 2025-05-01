import { parseISO } from "date-fns";


export const convertEventsToDateEvents = (events = []) => {


    return events.map(event => {
        event.id = event._id
        delete event._id
        event.start = parseISO(event.start)
        event.end = parseISO(event.end)

        return event;

    })
}