import { useState } from "react";

import { Calendar } from "react-big-calendar";
import { CalendarEvent } from "./components/CalendarEvent";
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar } from "./components/Navbar";
import { localizer, getMessagesES } from "../../helpers";
import { CalendarModal } from "./components/CalendarModal";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { FabAddNew } from "./components/FabAddNew";
import { FabDelete } from "./components/FabDelete";
import { useEffect } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";

export const CalendarPage = () => {
    const { user } = useAuthStore();
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
    const { openDateModal } = useUiStore();
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

    const eventStyleGetter = (event, start, end, isSelected) => {

        const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);
       
        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#46560',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return { style }
    }

    const onDoubleClick = (event) => {
        openDateModal();
    }

    const onSelect = (event) => {
        setActiveEvent(event);
    }

    const onViewChange = (event) => {
        localStorage.setItem('lastView', event);
        setLastView(event);

    }
    
    useEffect(() => {
     startLoadingEvents();
    }, [])
    

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
                style={{ height: 'calc( 100vh - 80px )' }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChange}

            />
            <CalendarModal />
            <FabAddNew />
            <FabDelete />

        </>
    )
}
