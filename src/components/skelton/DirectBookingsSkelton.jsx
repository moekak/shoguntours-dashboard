import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '../ui/table';

function DirectBookingsSkeleton() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <main className="pb-10">
                <div className="container">
                    {/* Stats Cards — 5 columns */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl border border-gray-200 p-5"
                            >
                                <div className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse mb-3"></div>
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        ))}
                    </div>

                    {/* Filter Section (accordion skeleton) */}
                    <div className="bg-white rounded-xl border border-gray-200 mb-6">
                        <div className="flex items-center justify-between px-6 py-4">
                            <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="px-6 pb-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="h-10 bg-gray-200 rounded-lg animate-pulse"
                                    ></div>
                                ))}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="h-10 bg-gray-200 rounded-lg animate-pulse"
                                    ></div>
                                ))}
                            </div>
                            <div className="flex justify-end pt-4 border-t border-gray-200 mt-4 gap-3">
                                <div className="h-9 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
                                <div className="h-9 w-28 bg-gray-200 rounded-lg animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
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
                                    {Array.from({ length: 10 }).map((_, i) => (
                                        <TableRow key={i}>
                                            {/* Booking ID */}
                                            <TableCell className="px-5 py-4">
                                                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                                            </TableCell>

                                            {/* Customer */}
                                            <TableCell className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse shrink-0"></div>
                                                    <div>
                                                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1"></div>
                                                        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* Tour Name */}
                                            <TableCell className="px-5 py-4">
                                                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                                            </TableCell>

                                            {/* Date */}
                                            <TableCell className="px-5 py-4">
                                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                            </TableCell>

                                            {/* Guests */}
                                            <TableCell className="px-5 py-4">
                                                <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                                            </TableCell>

                                            {/* Total */}
                                            <TableCell className="px-5 py-4">
                                                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                                            </TableCell>

                                            {/* Status */}
                                            <TableCell className="px-5 py-4">
                                                <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                                            </TableCell>

                                            {/* Payment */}
                                            <TableCell className="px-5 py-4">
                                                <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                                            </TableCell>

                                            {/* Actions */}
                                            <TableCell className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-36 bg-gray-200 rounded-lg animate-pulse"></div>
                                                    <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse"></div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                                <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div
                                            key={i}
                                            className="h-9 w-9 bg-gray-200 rounded-lg animate-pulse"
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

export default DirectBookingsSkeleton;
