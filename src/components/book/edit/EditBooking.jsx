import React, { useEffect, useState } from 'react';
import BookingOperator from '../operator/BookingOperator';
import { usePostMutation } from '@/hooks/usePostMutation';
import { API_ENDPOINTS } from '@/config/config';
import { useFetchData } from '@/hooks/useFetchData';
import { useParams } from 'react-router';

function EditBooking() {
    const { bookingId } = useParams();
    const [bookingData, setBookingData] = useState({});

    const { mutate } = usePostMutation(
        `${API_ENDPOINTS.API.EDIT_TOUR_BOOKING}/${bookingId}`,
        {
            redirect: true,
            url: '/bookings',
        }
    );

    const { data: booking, isLoading } = useFetchData(
        `${API_ENDPOINTS.API.FETCH_TOUR_BOOKING}/${bookingId}`,
        'booking',
        { id: bookingId }
    );

    useEffect(() => {
        const { customer, external_tour, itinerary, guide, ...bookingFields } =
            booking?.booking ?? {};

        console.log(booking?.booking);
        setBookingData({
            // customer情報
            customer_id: customer?.id,
            first_name: customer?.first_name,
            last_name: customer?.last_name,
            email: customer?.email,
            phone_number: customer?.phone_number,

            // tour情報
            tour_type: external_tour?.id,
            itinerary_id: itinerary?.id,

            // booking情報
            youth_number: bookingFields.youth_number,
            adult_number: bookingFields.adult_number,
            youth_price: bookingFields.youth_price,
            adult_price: bookingFields.adult_price,
            logistics_fee: bookingFields.logistics_fee,
            other_fee: bookingFields.other_fee,
            tour_date: bookingFields.tour_date,
            duration: bookingFields.duration,
            guide_id: bookingFields.guide_id,
            request: bookingFields.request,
        });
    }, [booking]);

    // 入力処理
    const handleChange = (name, value) => {
        setBookingData({ ...bookingData, [name]: value });
    };

    // 複数フィールド一度更新用
    const handleMultipleChange = (updates) => {
        setBookingData((prev) => ({ ...prev, ...updates }));
    };

    const handleSubmit = () => {
        console.log(bookingData);
        mutate(bookingData);
    };
    return (
        <div>
            <BookingOperator
                handleSubmit={handleSubmit}
                initialData={bookingData}
                type={'edit'}
                handleChange={handleChange}
                handleMultipleChange={handleMultipleChange}
                options={{ isLoading }}
            />
        </div>
    );
}

export default EditBooking;
