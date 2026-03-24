import React from 'react';
import { Skeleton } from '@mui/material';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '../ui/table';

function BlogTableSkelton({ rows = 6 }) {
    return (
        <div className="space-y-6">
            {/* Filter Section Skeleton */}
            <div className="bg-white rounded-xl border border-gray-200">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
                    <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-10 bg-gray-200 rounded-lg animate-pulse" />
                        ))}
                    </div>
                    <div className="flex justify-end pt-4 border-t border-gray-200 gap-3">
                        <div className="h-9 w-20 bg-gray-200 rounded-lg animate-pulse" />
                        <div className="h-9 w-28 bg-gray-200 rounded-lg animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Table Section Skeleton */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                {['Article', 'Category', 'Status', 'Views', 'Last Modified', 'Actions'].map((h) => (
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
                                    {/* Article */}
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        <div className="flex items-center gap-3">
                                            <Skeleton variant="rectangular" width={40} height={40} sx={{ borderRadius: 1 }} />
                                            <div className="flex-1">
                                                <Skeleton variant="text" width={180} height={18} sx={{ marginBottom: 0.5 }} />
                                                <Skeleton variant="text" width={120} height={14} />
                                            </div>
                                        </div>
                                    </TableCell>
                                    {/* Category */}
                                    <TableCell className="px-4 py-3">
                                        <Skeleton variant="rectangular" width={80} height={22} sx={{ borderRadius: 4 }} />
                                    </TableCell>
                                    {/* Status */}
                                    <TableCell className="px-4 py-3">
                                        <Skeleton variant="rectangular" width={60} height={22} sx={{ borderRadius: 4 }} />
                                    </TableCell>
                                    {/* Views */}
                                    <TableCell className="px-4 py-3">
                                        <Skeleton variant="text" width={30} height={18} />
                                    </TableCell>
                                    {/* Last Modified */}
                                    <TableCell className="px-4 py-3">
                                        <Skeleton variant="text" width={110} height={18} />
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
    );
}

export default BlogTableSkelton;
