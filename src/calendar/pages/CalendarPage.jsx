import { Calendar } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Navbar } from "../components/Navbar"
import { localizer } from '../../helpers/calendarLocalizer';
import { getMessagesES } from '../../helpers';
import { CalendarEvent } from '../components/CalendarEvent';
import { useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore } from '../../hooks';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';

const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
        backgroundColor: '#347cf7',
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white'
    }
    return { style }
}


export const CalendarPage = () => {

    const { openDateModal } = useUiStore()
    const { events, setActiveEvent, activeEvent } = useCalendarStore();
    const [lastView, setLastView] = useState(localStorage.getItem('lastview') || 'week');

    const onDoubleClick = (event) => {
        console.log({ event });
        openDateModal();
    }

    const onSelect = (event) => {
        console.log({ onSelect: event });
        setActiveEvent(event)
    }

    const onVIewChanged = (event) => {
        console.log({ viewchanged: event });
        localStorage.setItem("lastview", event)
        setLastView(event)

    }
    return (
        <>
            <Navbar />

            <Calendar
                culture="es"
                localizer={localizer}
                events={events}
                defaultView={lastView}
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
                onView={onVIewChanged}
            />
            <CalendarModal />
            <FabAddNew />
            (
            if(activeEvent!==null){
                <FabDelete /> 
            }
            )
        </>
    )
}