import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { TableCell, TableRow } from '../../ui/table';
import { usePostMutation } from '../../../hooks/usePostMutation';
import { API_ENDPOINTS } from '../../../config/config';

function DirectBookingRow({ booking }) {
    const navigate = useNavigate();
    const [loadingId, setLoadingId] = useState(null);

    const onSuccess = (data) => {
        setLoadingId(null);
        if (data?.payment_url) {
            window.open(data.payment_url, '_blank');
        }
    };

    const { mutate } = usePostMutation(
        API_ENDPOINTS.API.GENERATE_STRIPE_PAYMENT_LINK,
        {
            onSuccess,
            redirect: false,
        }
    );

    const handleSendPaymentLink = (id) => {
        setLoadingId(id);
        mutate({ booking_id: id });
    };

    const tourName =
        booking?.external_tour?.tour_name ?? booking?.itinerary?.overview_title;

    return (
        <TableRow className="hover:bg-gray-50 transition-colors">
            {/* Booking ID */}
            <TableCell className="px-5 py-4 whitespace-nowrap">
                <span className="text-sm font-medium text-gray-700">
                    #{booking?.id}
                </span>
            </TableCell>

            {/* Customer */}
            <TableCell className="px-6 py-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-9 w-9 bg-gradient-to-br from-[#9cb9ff] to-[#465fff] rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {booking?.customer?.first_name?.[0]?.toUpperCase()}
                        {booking?.customer?.last_name?.[0]?.toUpperCase()}
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                            {booking?.customer?.first_name}{' '}
                            {booking?.customer?.last_name}
                        </p>
                        <p className="text-xs text-gray-500">
                            {booking?.customer?.email}
                        </p>
                    </div>
                </div>
            </TableCell>

            {/* Tour Name */}
            <TableCell className="px-6 py-4">
                <p className="text-sm font-medium text-gray-900">{tourName}</p>
            </TableCell>

            {/* Date */}
            <TableCell className="px-6 py-4 whitespace-nowrap">
                <p className="text-sm text-gray-900">
                    {booking?.tour_date_formatted}
                </p>
            </TableCell>

            {/* Guests */}
            <TableCell className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-600">
                    <svg
                        className="w-4 h-4 text-gray-400 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                    {Number(booking?.adult_number) +
                        Number(booking?.youth_number)}
                </div>
            </TableCell>

            {/* Total */}
            <TableCell className="px-6 py-4 whitespace-nowrap">
                <p className="text-sm font-medium text-gray-900">
                    ¥{booking?.total?.toLocaleString()}
                </p>
            </TableCell>

            {/* Booking Status */}
            <TableCell className="px-6 py-4 whitespace-nowrap">
                <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                        booking?.status === 'Upcoming'
                            ? 'bg-[#9cb9ff]/20 text-[#465fff]'
                            : booking?.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-red-50 text-red-700'
                    }`}
                >
                    {booking?.status}
                </span>
            </TableCell>

            {/* Payment */}
            <TableCell className="px-6 py-4 whitespace-nowrap">
                {booking?.is_paid == 1 ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700">
                        Paid
                    </span>
                ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700">
                        Unpaid
                    </span>
                )}
            </TableCell>

            {/* Actions */}
            <TableCell className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    {booking?.is_paid != 1 && (
                        <button
                            onClick={() => handleSendPaymentLink(booking?.id)}
                            disabled={loadingId === booking?.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#465fff] text-white text-xs font-medium hover:bg-[#3a52e0] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loadingId === booking?.id ? (
                                <svg
                                    className="w-3.5 h-3.5 animate-spin"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-3.5 h-3.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                    />
                                </svg>
                            )}
                            Send Payment Link
                        </button>
                    )}
                    <button
                        onClick={() => navigate(`/booking/${booking?.id}`)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                        title="Edit booking"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                    </button>
                </div>
            </TableCell>
        </TableRow>
    );
}

export default DirectBookingRow;
