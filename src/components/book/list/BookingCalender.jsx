import React, { useEffect, useState } from 'react';
import Calendar from '../../../pages/Calendar';
import { useFetchData } from '@/hooks/useFetchData';
import { API_ENDPOINTS } from '@/config/config';

function BookingCalender() {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const { data, isLoading } = useFetchData(
        `${API_ENDPOINTS.API.FETCH_BOOKING_FOR_CALENDER}/${currentYear}/${currentMonth}`,
        'calender',
        { id: `${currentYear}${currentMonth}` }
    );

    useEffect(() => {
        console.log(data);
    }, [data]);
    return (
        <div>
            <Calendar
                data={data?.bookings}
                setCurrentMonth={setCurrentMonth}
                setCurrentYear={setCurrentYear}
            />
        </div>
    );
}

export default BookingCalender;
