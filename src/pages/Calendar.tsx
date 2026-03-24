import { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { Modal } from '@components/ui/modal';
import { useModal } from '../hooks/useModal';
import PageMeta from '../components/common/PageMeta';

interface CalendarEvent extends EventInput {
    extendedProps: {
        calendar: string;
    };
}

interface Booking {
    id: number;
    title: string;
    start: Date;
    guide: string;
}

interface Props {
    data: Booking[];
    setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
    setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
}
const Calendar: React.FC<Props> = ({
    data,
    setCurrentMonth,
    setCurrentYear,
}) => {
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
        null
    );
    const [eventTitle, setEventTitle] = useState('');
    const [eventStartDate, setEventStartDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [guide, setGuide] = useState('');
    const [eventLevel, setEventLevel] = useState('');
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const calendarRef = useRef<FullCalendar>(null);
    const { isOpen, openModal, closeModal } = useModal();

    useEffect(() => {
        if (data) {
            const formattedEvents = data.map((item: Booking) => ({
                id: String(item.id),
                title: item.title,
                start: item.start,
                guide: item.guide,
                extendedProps: { calendar: 'Danger' },
            }));
            setEvents(formattedEvents);
        }
    }, [data]);

    const toLocalDateString = (date: Date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        resetModalFields();
        setEventStartDate(selectInfo.startStr);
        setEventEndDate(selectInfo.endStr || selectInfo.startStr);
        openModal();
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        const event = clickInfo.event;
        console.log(event);
        setSelectedEvent(event as unknown as CalendarEvent);
        setEventTitle(event.title);
        setEventStartDate(event.start ? toLocalDateString(event.start) : '');
        setEventEndDate(event.end ? toLocalDateString(event.end) : '');
        setGuide(event.extendedProps.guide);
        setEventLevel(event.extendedProps.calendar);
        openModal();
    };

    const handleAddOrUpdateEvent = () => {
        if (selectedEvent) {
            // Update existing event
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event.id === selectedEvent.id
                        ? {
                              ...event,
                              title: eventTitle,
                              start: eventStartDate,
                              end: eventEndDate,
                              extendedProps: { calendar: eventLevel },
                          }
                        : event
                )
            );
        } else {
            // Add new event
            const newEvent: CalendarEvent = {
                id: Date.now().toString(),
                title: eventTitle,
                start: eventStartDate,
                end: eventEndDate,
                allDay: true,
                extendedProps: { calendar: eventLevel },
            };
            setEvents((prevEvents) => [...prevEvents, newEvent]);
        }
        closeModal();
        resetModalFields();
    };

    const resetModalFields = () => {
        setEventTitle('');
        setEventStartDate('');
        setEventEndDate('');
        setEventLevel('');
        setSelectedEvent(null);
    };

    return (
        <>
            <PageMeta
                title="React.js Calendar Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Calendar Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <div className="rounded-2xl border  border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="custom-calendar">
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                        ]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: 'prev,next addEventButton',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                        events={events}
                        selectable={true}
                        select={handleDateSelect}
                        eventClick={handleEventClick}
                        eventContent={renderEventContent}
                        customButtons={{
                            addEventButton: {
                                text: 'Add Boooking +',
                                click: openModal,
                            },
                        }}
                        datesSet={(dateInfo) => {
                            const date = dateInfo.start;
                            const month = date.getMonth() + 1;
                            const year = date.getFullYear();
                            setCurrentMonth(month);
                            setCurrentYear(year);
                        }}
                    />
                </div>
                <Modal
                    isOpen={isOpen}
                    onClose={closeModal}
                    className="max-w-[700px] p-6 lg:p-10"
                >
                    <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                        <div>
                            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                                {selectedEvent ? 'Edit Event' : 'Add Event'}
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Plan your next big moment: schedule or edit an
                                event to stay on track
                            </p>
                        </div>
                        <div className="mt-8">
                            <div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Tour title
                                    </label>
                                    {/* input → テキスト表示に変更 */}
                                    <div className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90">
                                        {eventTitle || (
                                            <span className="text-gray-400 dark:text-white/30">
                                                —
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="grid-cols-2 grid gap-4">
                                <div className="mt-6">
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Date
                                    </label>
                                    <div className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90">
                                        {eventStartDate || (
                                            <span className="text-gray-400 dark:text-white/30">
                                                —
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Guide
                                    </label>
                                    <div className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90">
                                        {guide || (
                                            <span className="text-gray-400 dark:text-white/30">
                                                —
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Note
                                </label>
                                <div className="h-30 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90">
                                    {guide || (
                                        <span className="text-gray-400 dark:text-white/30">
                                            —
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
                            <button
                                onClick={closeModal}
                                type="button"
                                className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleAddOrUpdateEvent}
                                type="button"
                                className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                            >
                                {selectedEvent ? 'Edit Booking' : 'Add Event'}
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
};

const renderEventContent = (eventInfo: any) => {
    const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar.toLowerCase()}`;
    return (
        <div
            className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm`}
        >
            <div className="fc-daygrid-event-dot"></div>
            <div className="fc-event-title">{eventInfo.event.title}</div>
        </div>
    );
};

export default Calendar;
