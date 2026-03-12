import { API_ENDPOINTS } from '@/config/config';
import React, { useState } from 'react';
import BookingOperator from '../operator/BookingOperator';
import { usePostMutation } from '@/hooks/usePostMutation';

function CreateBooking() {
    const [bookingData, setBookingData] = useState({});
    const { mutate } = usePostMutation(API_ENDPOINTS.API.CREATE_TOUR_BOOKING, {
        redirect: true,
        url: '/bookings',
    });
    // 入力処理
    const handleChange = (name, value) => {
        setBookingData({ ...bookingData, [name]: value });
    };

    // 複数フィールド一度更新用
    const handleMultipleChange = (updates) => {
        setBookingData((prev) => ({ ...prev, ...updates }));
    };

    const handleSubmit = () => {
        mutate(bookingData);
    };
    return (
        <div>
            <BookingOperator
                handleSubmit={handleSubmit}
                initialData={bookingData}
                type={'create'}
                handleChange={handleChange}
                handleMultipleChange={handleMultipleChange}
            />
        </div>
    );
}

export default CreateBooking;
