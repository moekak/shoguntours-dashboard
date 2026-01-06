import React from 'react'

function BookingList({ booking }) {
    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-medium text-gray-900">
                    {booking?.bookingId}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-9 w-9 bg-gradient-to-br from-[#9cb9ff] to-[#465fff] rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {booking?.customer?.first_name[0].toUpperCase() +
                            booking?.customer?.last_name[0].toUpperCase()}
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
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                            {booking?.external_tour?.tour_name ??
                                booking?.itinerary?.overview_title}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <p className="text-sm text-gray-900">
                    {booking?.tour_date_formatted}
                </p>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
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
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <p className="text-sm font-medium text-gray-900">
                    ¥{booking?.total.toLocaleString()}
                </p>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                        booking?.status === 'Upcoming'
                            ? 'bg-[#9cb9ff]/20 text-[#465fff]'
                            : booking?.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-red-50 text-red-700'
                    } `}
                >
                    {booking?.status}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button className="text-gray-400 hover:text-gray-600">
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                </button>
            </td>
        </tr>
    )
}

export default BookingList
