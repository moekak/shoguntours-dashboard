import React from 'react';
import { Skeleton } from '@mui/material';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '../ui/table';

function EmployeeSkelton({ rows = 6 }) {
    return (
        <div className="bg-gray-50 min-h-screen dark:bg-gray-900">
            <main className="pb-10">
                <div className="container">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="h-7 w-36 bg-gray-200 rounded animate-pulse mb-2" />
                            <div className="h-4 w-52 bg-gray-200 rounded animate-pulse" />
                        </div>
                        <div className="h-10 w-36 bg-gray-200 rounded-lg animate-pulse" />
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 dark:bg-white/[0.03] dark:border-white/[0.05]">
                                <div className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse mb-3" />
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                                <div className="h-7 w-12 bg-gray-200 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>

                    {/* Search + Filter Bar */}
                    <div className="bg-white rounded-xl border border-gray-200 px-5 py-4 mb-4 flex flex-col sm:flex-row sm:items-center gap-3 dark:bg-white/[0.03] dark:border-white/[0.05]">
                        <div className="flex-1 h-9 bg-gray-200 rounded-lg animate-pulse" />
                        <div className="flex gap-1">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-8 w-20 bg-gray-200 rounded-lg animate-pulse" />
                            ))}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                        <div className="max-w-full overflow-x-auto">
                            <Table>
                                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                    <TableRow>
                                        {['Name', 'Phone', 'Status', 'Available Shifts', 'Upcoming Tours', 'Tour History', 'Actions'].map((h) => (
                                            <TableCell
                                                key={h}
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                {h}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                    {Array.from({ length: rows }).map((_, i) => (
                                        <TableRow key={i}>
                                            {/* Name */}
                                            <TableCell className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Skeleton variant="circular" width={36} height={36} />
                                                    <Skeleton variant="text" width={120} height={18} />
                                                </div>
                                            </TableCell>
                                            {/* Phone */}
                                            <TableCell className="px-4 py-3">
                                                <Skeleton variant="text" width={100} height={18} />
                                            </TableCell>
                                            {/* Status */}
                                            <TableCell className="px-4 py-3">
                                                <Skeleton variant="rectangular" width={72} height={22} sx={{ borderRadius: 4 }} />
                                            </TableCell>
                                            {/* Available Shifts */}
                                            <TableCell className="px-4 py-3">
                                                <div className="flex gap-1">
                                                    {[1, 2, 3].map((d) => (
                                                        <Skeleton key={d} variant="rectangular" width={28} height={22} sx={{ borderRadius: 1 }} />
                                                    ))}
                                                </div>
                                            </TableCell>
                                            {/* Upcoming Tours */}
                                            <TableCell className="px-4 py-3">
                                                <Skeleton variant="text" width={24} height={18} />
                                            </TableCell>
                                            {/* Tour History */}
                                            <TableCell className="px-4 py-3">
                                                <Skeleton variant="text" width={24} height={18} />
                                            </TableCell>
                                            {/* Actions */}
                                            <TableCell className="px-4 py-3">
                                                <Skeleton variant="circular" width={32} height={32} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default EmployeeSkelton;
