import React from 'react';

function BookingsSkeleton() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Main Content */}
            <main className="pb-10">
                <div className="container">
                    {/* Page Header */}
                    <div className="mb-4">
                        {/* Breadcrumbs Skeleton */}
                        <div className="flex gap-2 mb-2">
                            <div className="h-3 w-10 bg-gray-200 rounded animate-pulse"></div>
                            <span className="text-gray-300">/</span>
                            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>

                    {/* Stats Cards Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl border border-gray-200 p-5"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse"></div>
                                </div>
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        ))}
                    </div>

                    {/* Filter Section Skeleton */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="h-10 bg-gray-200 rounded-lg animate-pulse"
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Table Skeleton */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        {/* Table Header Skeleton */}
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                        </div>

                        {/* Table Content Skeleton */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                            <th
                                                key={i}
                                                className="px-6 py-3 text-left"
                                            >
                                                <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                        (row) => (
                                            <tr
                                                key={row}
                                                className="hover:bg-gray-50"
                                            >
                                                {/* Booking ID */}
                                                <td className="px-6 py-4">
                                                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                                                </td>

                                                {/* Customer */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-9 w-9 bg-gray-200 rounded-full animate-pulse"></div>
                                                        <div className="ml-3 space-y-2">
                                                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                                            <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Tour Name */}
                                                <td className="px-6 py-4">
                                                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                                                </td>

                                                {/* Date */}
                                                <td className="px-6 py-4">
                                                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                                </td>

                                                {/* Guests */}
                                                <td className="px-6 py-4">
                                                    <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                                                </td>

                                                {/* Price */}
                                                <td className="px-6 py-4">
                                                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                                                </td>

                                                {/* Status */}
                                                <td className="px-6 py-4">
                                                    <div className="h-6 w-20 bg-gray-200 rounded-md animate-pulse"></div>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4">
                                                    <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Skeleton */}
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                                <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div
                                            key={i}
                                            className="h-9 w-16 bg-gray-200 rounded-lg animate-pulse"
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default BookingsSkeleton;
