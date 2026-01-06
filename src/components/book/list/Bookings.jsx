import { Breadcrumbs, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-router'
import { API_ENDPOINTS } from '../../../config/config'
import { useFetchData } from '../../../hooks/useFetchData'
import { useCommonContext } from '../../../context/CommonContext'
import Alert from '../../ui/alert/Alert'
import BookingsSkeleton from '../../skelton/BookingListSkelton'
import BookingList from './BookingList'
import DatePicker from '../../form/date-picker'
import Label from '../../form/Label'
import Input from '../../form/input/InputField'
import Select from '../../form/Select'
import SearchBookings from '../search/SearchBookings'
import { useSearchBookingContext } from '../search/context/SearchBookingContext'

function Bookings() {
    const { data: bookings, isLoading } = useFetchData(
        API_ENDPOINTS.API.FETCH_TOUR_BOOKINGS,
        'tourBookings'
    )
    const { filteredBookingData } = useSearchBookingContext()
    const {
        errorFields,
        errors,
        errorTitle,
        setOpenModal,
        successMessage,
        isSuccess,
    } = useCommonContext()

    useEffect(() => {
        console.log(bookings)
    }, [bookings])
    if (isLoading) {
        return <BookingsSkeleton />
    }

    return (
        <>
            <div className="bg-gray-50 min-h-screen">
                {/* Main Content */}
                <main className="pb-10">
                    <div className="container">
                        {/* Page Header */}
                        <div className="mb-4 sticky">
                            <Breadcrumbs
                                aria-label="breadcrumb"
                                className="text-xs"
                                sx={{ fontSize: '0.75rem' }}
                            >
                                <Link
                                    underline="hover"
                                    color="inherit"
                                    href="/"
                                >
                                    Tour
                                </Link>

                                <Typography
                                    sx={{
                                        color: 'text.primary',
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    Tour List
                                </Typography>
                            </Breadcrumbs>
                        </div>
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
                                    {Number(bookings?.counts['upcomingTour']) +
                                        Number(
                                            bookings?.counts['completedTour']
                                        )}
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
                                    {bookings?.counts['upcomingTour']}
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
                                    {bookings?.counts['completedTour']}
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
                                    {bookings?.counts['cancelledTour']}
                                </p>
                            </div>
                        </div>

                        {/* Filter Section */}
                        <SearchBookings
                            bookings={bookings?.bookings}
                            allTours={bookings?.allTours}
                        />

                        {/* Booking List Table */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            {/* Table Header */}
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Booking List
                                </h2>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Booking ID
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Customer
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tour Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Guests
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Price
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredBookingData.length > 0
                                            ? filteredBookingData.map(
                                                  (booking) => {
                                                      return (
                                                          <BookingList
                                                              key={booking.id}
                                                              booking={booking}
                                                          />
                                                      )
                                                  }
                                              )
                                            : bookings?.bookings.map(
                                                  (booking) => {
                                                      return (
                                                          <BookingList
                                                              key={booking.id}
                                                              booking={booking}
                                                          />
                                                      )
                                                  }
                                              )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-600">
                                        Showing{' '}
                                        <span className="font-medium">1</span>{' '}
                                        to{' '}
                                        <span className="font-medium">5</span>{' '}
                                        of{' '}
                                        <span className="font-medium">156</span>{' '}
                                        bookings
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                            Previous
                                        </button>
                                        <button className="px-3 py-2 border border-[#465fff] bg-[#465fff] rounded-lg text-sm font-medium text-white hover:bg-[#7592ff]">
                                            1
                                        </button>
                                        <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                            2
                                        </button>
                                        <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                            3
                                        </button>
                                        <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Bookings
