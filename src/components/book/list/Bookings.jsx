import { Breadcrumbs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { API_ENDPOINTS } from '../../../config/config';
import { useFetchData } from '../../../hooks/useFetchData';
import { useCommonContext } from '../../../context/CommonContext';
import Alert from '../../ui/alert/Alert';
import BookingsSkeleton from '../../skelton/BookingListSkelton';
import BookingList from './BookingList';
import SearchBookings from '../search/SearchBookings';
import { useSearchBookingContext } from '../search/context/SearchBookingContext';
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableCell,
} from '../../ui/table';
import { useBookingContext } from '../context/BookingContext';
import Pagination from '../../common/Pagination';

function Bookings() {
    const [page, setPage] = useState(1); // ページ番号
    const {
        setBookingData,
        bookingData,
        setTourCounts,
        tourCounts,
        setTotalPages,
    } = useBookingContext();
    const { appliedFilters } = useSearchBookingContext();
    const {
        errorFields,
        errors,
        errorTitle,
        setOpenModal,
        successMessage,
        isSuccess,
    } = useCommonContext();

    const onSuccess = (data) => {
        setBookingData(data.bookings.data);
        setTourCounts(data.counts);
    };

    const buildParams = (filtersToUse) => {
        const params = new URLSearchParams();

        Object.entries(filtersToUse).forEach(([key, value]) => {
            if (value) {
                params.append(key, value);
            }
        });

        return params.toString();
    };
    const buildUrl = () => {
        const paramsString = buildParams(appliedFilters);
        return paramsString
            ? `${API_ENDPOINTS.API.FETCH_TOUR_BOOKINGS}?page=${page}&${paramsString}`
            : `${API_ENDPOINTS.API.FETCH_TOUR_BOOKINGS}?page=${page}`;
    };

    const { data: bookings, isLoading } = useFetchData(
        buildUrl(),
        ['tourBookings', page, appliedFilters],
        {
            onSuccess,
        }
    );

    const onPageChange = (page) => {
        console.log(page);
        setPage(page);
    };

    if (isLoading) {
        return <BookingsSkeleton />;
    }

    // useEffect(() => {
    //     console.log(bookings);
    // }, [bookings]);
    return (
        <>
            <div className="bg-gray-50 min-h-screen">
                {/* Main Content */}
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
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
                                    {Number(tourCounts['upcomingTour']) +
                                        Number(tourCounts['completedTour']) +
                                        Number(tourCounts['cancelledTour'])}
                                </p>
                            </div>

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
                                    {tourCounts['upcomingTour']}
                                </p>
                            </div>

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
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm mb-1">
                                    Completed
                                </p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {tourCounts['completedTour']}
                                </p>
                            </div>

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
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm mb-1">
                                    Cancelled
                                </p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {tourCounts['cancelledTour']}
                                </p>
                            </div>
                        </div>

                        {/* Filter Section */}
                        <SearchBookings
                            bookings={bookingData}
                            allTours={bookings?.allTours}
                        />

                        {/* Booking List Table */}
                        <div className="container">
                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                                <div className="max-w-full overflow-x-auto">
                                    <Table>
                                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                            <TableRow>
                                                <TableCell
                                                    isHeader
                                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                                >
                                                    Booking ID
                                                </TableCell>
                                                <TableCell
                                                    isHeader
                                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                                >
                                                    Customer
                                                </TableCell>
                                                <TableCell
                                                    isHeader
                                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                                >
                                                    Tour Name
                                                </TableCell>
                                                <TableCell
                                                    isHeader
                                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                                >
                                                    Date
                                                </TableCell>
                                                <TableCell
                                                    isHeader
                                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                                >
                                                    Guests
                                                </TableCell>
                                                <TableCell
                                                    isHeader
                                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                                >
                                                    Price
                                                </TableCell>
                                                <TableCell
                                                    isHeader
                                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                                >
                                                    Status
                                                </TableCell>
                                                <TableCell
                                                    isHeader
                                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                                >
                                                    Actions
                                                </TableCell>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                            {bookingData.map((booking) => {
                                                return (
                                                    <BookingList
                                                        key={booking.id}
                                                        booking={booking}
                                                    />
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                    Showing{' '}
                                    <span className="font-medium">
                                        {bookings.bookings.from}
                                    </span>{' '}
                                    to{' '}
                                    <span className="font-medium">
                                        {bookings.bookings.to}
                                    </span>{' '}
                                    of{' '}
                                    <span className="font-medium">
                                        {bookings.bookings.total}
                                    </span>{' '}
                                    bookings
                                </div>
                                <Pagination
                                    lastPage={Number(
                                        bookings.bookings.last_page
                                    )}
                                    onPageChange={onPageChange}
                                    currentPage={bookings.bookings.current_page}
                                    setPage={setPage}
                                    page={page}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Bookings;
