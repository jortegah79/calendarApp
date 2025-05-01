import { Calendar } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Navbar } from "../components/Navbar"
import { localizer } from '../../helpers/calendarLocalizer';
import { getMessagesES } from '../../helpers';
import { CalendarEvent } from '../components/CalendarEvent';
import { useEffect, useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useAuthStore, useUiStore } from '../../hooks';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';


export const CalendarPage = () => {
    
    const { openDateModal } = useUiStore()
    const { status,user } = useAuthStore();
    const { events, setActiveEvent, activeEvent, startLoadingEvents } = useCalendarStore();
    const [lastView, setLastView] = useState(localStorage.getItem('lastview') || 'week');
    
    
    const eventStyleGetter = (event, start, end, isSelected) => {
          
        const isMyEvent=event.user._id === user._id
        const style = {
            backgroundColor: isMyEvent?'#1111DD':'#dd1133',
            borderRadius: '15px',
            border:"2px solid black",
            boxShadow:'0px 0px 8px 2px black,1px 1px 12px 3px gray',
            padding:'15px',
            opacity: 0.9,
            color: 'white'
        }
        return { style }
    }
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
    useEffect(() => {
        if (status === 'authenticated')
            startLoadingEvents()
    }, [status])

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

            {activeEvent !== null && <FabDelete />}


        </>
    )
}