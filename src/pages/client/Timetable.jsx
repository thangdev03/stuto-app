import { useState } from "react";
import FullCalendar from "@fullcalendar/react"
import { formatDate } from "@fullcalendar/core"
import dayGridPlugin from "@fullcalendar/daygrid";
import viLocale from "@fullcalendar/core/locales/vi"
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list";

function Timetable() {
    const [currentEvents, setCurrentEvents] = useState([]);

    const handleDateClick = (selected) => {
        const title = prompt("Hãy nhập tiêu đề cho sự kiện của bạn");
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();

        if (title) {
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay
            });
        }
    };

    const handleEventClick = (selected) => {
        if (
            window.confirm(
                `Bạn có chắc chắn muốn xóa sự kiện '${selected.event.title}' không?`
            ) 
        ) {
            selected.event.remove();
        }
    };
    
    return (
        <div className="ml-72 mr-8 mt-10 mb-10 flex gap-5">
            {/* <img src="../img/timetable.png" alt="" /> */}
            {/* SIDEBAR */}
            <div className="w-1/5 p-3 flex-grow bg-boxBackground rounded-md">
                <p className="font-medium">Các sự kiện</p>
                <ul className="mt-3 flex flex-col gap-2">
                    {currentEvents.map((event) => (
                        <li 
                        key={event.id}
                        className="p-3 bg-primaryColor rounded-sm text-white"
                        >
                            <h1>
                                {event.title}
                            </h1>
                            <span>
                                {formatDate(event.start, {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric"
                                })}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            
            {/* CALENDAR */}
            <div className="grow w-4/5">
                <FullCalendar
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        listPlugin
                    ]}
                    dayMaxEvents={true}
                    editable={true}
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                    }}
                    height="75vh"
                    initialView="dayGridMonth"
                    locale={viLocale}
                    selectable={true}
                    selectMirror={true}
                    select={handleDateClick}
                    eventClick={handleEventClick}
                    eventsSet={(events) => setCurrentEvents(events)}
                    initialEvents={[
                        {
                            id: "12315",
                            title: "All-day event",
                            date: "2022-09-14",
                        },
                        {
                            id: "5123",
                            title: "Timed event",
                            date: "2022-09-28",
                        },
                    ]}
                    titleFormat={{
                        year: 'numeric', 
                        month: 'long'
                    }}
                />
            </div>
        </div>
    );
}

export default Timetable;