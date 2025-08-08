"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";

import styles from './calendar.module.css'; // Import custom styles

const CalendarPage: React.FC = () => {
    const [events, setEvents] = useState([
        { id: "1", title: "Meeting", start: "2024-11-20T10:00:00", end: "2024-11-20T11:00:00" },
        { id: "2", title: "Lunch", start: "2024-11-21T12:00:00", end: "2024-11-21T13:00:00" },
    ]);

    const handleDateClick = (info: { dateStr: string }) => {
        const title = prompt("Enter event title:");
        if (title) {
            setEvents([...events, { id: String(events.length + 1), title, start: info.dateStr, end: info.dateStr }]);
        }
    };


    return (
        <div className={styles.calendarContainer}>
            <h1 className={styles.title}>Google Calendar Clone</h1>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                events={events}
                dateClick={handleDateClick}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                height="80vh"
            />
        </div>
    );
};

export default CalendarPage;
