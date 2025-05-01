import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar)
    const { user } = useSelector(state => state.auth)

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {
        //todo:llegar al backend
        try {
            //todo bien
            if (calendarEvent.id) {

                //actualizando
                const id = calendarEvent.id;
                delete calendarEvent.id;
                delete calendarEvent.user;
                await calendarApi.put(`/events/${id}`, { ...calendarEvent })
                dispatch(onUpdateEvent({ id, ...calendarEvent, user: { ...user } }))
                return;
            }
            //creando
            const { data } = await calendarApi.post('/events', calendarEvent)
            const { ok, event } = data;
            dispatch(onAddNewEvent({ ...calendarEvent, id: event._id, user: { ...user } }))

        } catch (error) {

            let message = "";
            if (calendarEvent.id) {
                message = "Error en la actualización!!"
            } else {
                message = "Error en la creación!!";
            }
            Swal.fire(`${message}`, `${error.response.data.message}`, "error");
        }

    }

    const startLoadingEvents = async () => {

        try {

            const { data } = await calendarApi.get('/events')
            const events = convertEventsToDateEvents(data.events)
            dispatch(onLoadEvents(events))

        } catch (error) {
            Swal.fire(`No se han podido obtener las notas`, `${error.response.data.message}`, "error");
            //console.log(error);

        }

    }

    const deleteActiveEvent = async() => {

        try{
            const {id}=activeEvent;
            await calendarApi.delete(`/events/${id}`)
            dispatch(onDeleteEvent());
        }catch(error){
            Swal.fire(`Error al borrar la nota!!`, `${error.response.data.message}`, "error");
        }
    }

    return {
        //parametros
        events,
        activeEvent,
        //funciones
        deleteActiveEvent,
        setActiveEvent,
        startLoadingEvents,
        startSavingEvent,
    }
}