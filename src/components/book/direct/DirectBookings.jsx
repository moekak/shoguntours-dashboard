import React, { useState } from 'react';
import { useCommonContext } from '../../../context/CommonContext';
import Alert from '../../ui/alert/Alert';
import DirectBookingRow from './DirectBookingRow';
import SearchBookings from '../search/SearchBookings';
import { useSearchBookingContext } from '../search/context/SearchBookingContext';
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableCell,
} from '../../ui/table';
import Pagination from '../../common/Pagination';
import { useFetchData } from '@/hooks/useFetchData';
import { API_ENDPOINTS } from '@/config/config';

const DUMMY_BOOKINGS = [
    {
        id: 1001,
        customer: {
            first_name: 'James',
            last_name: 'Wilson',
            email: 'james.wilson@email.com',
        },
        external_tour: { tour_name: 'Tokyo City Walking Tour' },
        tour_date_formatted: 'Mar 25, 2026',
        adult_number: 2,
        youth_number: 1,
        total: 45000,
        status: 'Upcoming',
        is_paid: 1,
        is_cancelled: 0,
    },
    {
        id: 1002,
        customer: {
            first_name: 'Emily',
            last_name: 'Chen',
            email: 'emily.chen@email.com',
        },
        itinerary: { overview_title: 'Mt. Fuji Day Trip' },
        tour_date_formatted: 'Mar 27, 2026',
        adult_number: 4,
        youth_number: 0,
        total: 80000,
        status: 'Upcoming',
        is_paid: 0,
        is_cancelled: 0,
    },
    {
        id: 1003,
        customer: {
            first_name: 'Luca',
            last_name: 'Rossi',
            email: 'luca.rossi@email.com',
        },
        external_tour: { tour_name: 'Kyoto Temples & Geisha Tour' },
        tour_date_formatted: 'Mar 20, 2026',
        adult_number: 2,
        youth_number: 2,
        total: 72000,
        status: 'Completed',
        is_paid: 1,
        is_cancelled: 0,
    },
    {
        id: 1004,
        customer: {
            first_name: 'Sophie',
            last_name: 'Müller',
            email: 'sophie.m@email.com',
        },
        itinerary: { overview_title: 'Osaka Food & Street Tour' },
        tour_date_formatted: 'Apr 1, 2026',
        adult_number: 3,
        youth_number: 0,
        total: 54000,
        status: 'Upcoming',
        is_paid: 0,
        is_cancelled: 0,
    },
    {
        id: 1005,
        customer: {
            first_name: 'Hiroshi',
            last_name: 'Tanaka',
            email: 'h.tanaka@email.com',
        },
        external_tour: { tour_name: 'Nikko Shrines Day Tour' },
        tour_date_formatted: 'Mar 15, 2026',
        adult_number: 1,
        youth_number: 0,
        total: 28000,
        status: 'Completed',
        is_paid: 1,
        is_cancelled: 0,
    },
    {
        id: 1006,
        customer: {
            first_name: 'Anna',
            last_name: 'Kowalski',
            email: 'anna.k@email.com',
        },
        itinerary: { overview_title: 'Hiroshima & Miyajima Tour' },
        tour_date_formatted: 'Apr 5, 2026',
        adult_number: 2,
        youth_number: 1,
        total: 63000,
        status: 'Upcoming',
        is_paid: 0,
        is_cancelled: 0,
    },
    {
        id: 1007,
        customer: {
            first_name: 'Carlos',
            last_name: 'Reyes',
            email: 'c.reyes@email.com',
        },
        external_tour: { tour_name: 'Tokyo Night Tour' },
        tour_date_formatted: 'Mar 10, 2026',
        adult_number: 2,
        youth_number: 0,
        total: 36000,
        status: 'Cancelled',
        is_paid: 0,
        is_cancelled: 1,
    },
    {
        id: 1008,
        customer: {
            first_name: 'Yuki',
            last_name: 'Sato',
            email: 'yuki.sato@email.com',
        },
        itinerary: { overview_title: 'Nara Deer Park & Temples' },
        tour_date_formatted: 'Apr 10, 2026',
        adult_number: 5,
        youth_number: 2,
        total: 112000,
        status: 'Upcoming',
        is_paid: 1,
        is_cancelled: 0,
    },
];

const DUMMY_COUNTS = {
    upcomingTour: 5,
    completedTour: 2,
    cancelledTour: 1,
    paidCount: 4,
    unpaidCount: 3,
};

function DirectBookings() {
    const [page, setPage] = useState(1);
    const { appliedFilters } = useSearchBookingContext();
    const { errors, errorTitle, successMessage, isSuccess } =
        useCommonContext();

    const bookingData = DUMMY_BOOKINGS;
    const tourCounts = DUMMY_COUNTS;
    const paymentCounts = {
        paidCount: DUMMY_COUNTS.paidCount,
        unpaidCount: DUMMY_COUNTS.unpaidCount,
    };

    const onPageChange = (newPage) => setPage(newPage);

    const totalBookings =
        tourCounts.upcomingTour +
        tourCounts.completedTour +
        tourCounts.cancelledTour;

    return (
        <>
            <div className="bg-gray-50 min-h-screen">
                <main className="pb-10">
                    <div className="container">
                        {isSuccess && (
                            <div className="mb-4">
                                <Alert
                                    variant="success"
                                    title={successMessage?.title}
                                    message={successMessage?.message}
                                />
                            </div>
                        )}
                        {errors?.length > 0 && (
                            <div className="mb-3">
                                <Alert
                                    variant="error"
                                    title={errorTitle}
                                    message={errors}
                                    showLink={false}
                                />
                            </div>
                        )}

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                            {/* Total Bookings */}
                            <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-200 transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 text-[#465fff]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm mb-1">
                                    Total Bookings
                                </p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {totalBookings}
                                </p>
                            </div>

                            {/* Upcoming */}
                            <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-200 transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 text-[#465fff]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm mb-1">
                                    Upcoming
                                </p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {tourCounts['upcomingTour'] ?? 0}
                                </p>
                            </div>

                            {/* Completed */}
                            <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-green-200 transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 text-emerald-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm mb-1">
                                    Completed
                                </p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {tourCounts['completedTour'] ?? 0}
                                </p>
                            </div>

                            {/* Paid */}
                            <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-emerald-200 transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 text-emerald-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm mb-1">
                                    Paid
                                </p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {paymentCounts.paidCount}
                                </p>
                            </div>

                            {/* Unpaid */}
                            <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-amber-200 transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 text-amber-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm mb-1">
                                    Unpaid
                                </p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {paymentCounts.unpaidCount}
                                </p>
                            </div>
                        </div>

                        {/* Filter Section */}
                        {/* <SearchBookings
                            bookings={bookingData}
                            allTours={bookings?.allTours}
                        /> */}

                        {/* Direct Booking Table */}
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                            <div className="max-w-full overflow-x-auto">
                                <Table>
                                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                        <TableRow>
                                            {[
                                                'Booking ID',
                                                'Customer',
                                                'Tour Name',
                                                'Date',
                                                'Guests',
                                                'Total',
                                                'Status',
                                                'Payment',
                                                'Actions',
                                            ].map((col) => (
                                                <TableCell
                                                    key={col}
                                                    isHeader
                                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                                >
                                                    {col}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                        {Array.isArray(bookingData) &&
                                            bookingData.map((booking) => (
                                                <DirectBookingRow
                                                    key={booking.id}
                                                    booking={booking}
                                                />
                                            ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-600">
                                        Showing{' '}
                                        <span className="font-medium">
                                            {DUMMY_BOOKINGS.length}
                                        </span>{' '}
                                        of{' '}
                                        <span className="font-medium">
                                            {DUMMY_BOOKINGS.length}
                                        </span>{' '}
                                        bookings
                                    </div>
                                    <Pagination
                                        lastPage={1}
                                        onPageChange={onPageChange}
                                        currentPage={1}
                                        setPage={setPage}
                                        page={page}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default DirectBookings;
