import { Skeleton } from '@mui/material';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '../ui/table';
import SearchTour from '../tour/list/SearchTour';

const TourTableSkeleton = ({ rows = 5 }) => {
    // Create array for skeleton rows
    const skeletonRows = Array.from({ length: rows }, (_, index) => index);

    return (
        <div className="space-y-6">
            {/* Filter Section Skeleton */}
            <SearchTour />

            {/* Table Section Skeleton */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        {/* Table Header */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Tour
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Category
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
                                    Itinerary
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Bookings
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        {/* Table Body Skeleton */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {skeletonRows.map((_, index) => (
                                <TableRow key={index}>
                                    {/* Tour Column */}
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        <div className="flex items-center gap-3">
                                            <Skeleton
                                                variant="rectangular"
                                                width={40}
                                                height={40}
                                                sx={{ borderRadius: 1 }}
                                            />
                                            <div className="flex-1">
                                                <Skeleton
                                                    variant="text"
                                                    width={180}
                                                    height={20}
                                                    sx={{ marginBottom: 0.5 }}
                                                />
                                                <Skeleton
                                                    variant="text"
                                                    width={120}
                                                    height={16}
                                                />
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Category Column */}
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <Skeleton
                                            variant="rectangular"
                                            width={80}
                                            height={24}
                                            sx={{ borderRadius: 4 }}
                                        />
                                    </TableCell>

                                    {/* Price Column */}
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <Skeleton
                                            variant="text"
                                            width={90}
                                            height={20}
                                        />
                                    </TableCell>

                                    {/* Itinerary Column */}
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <Skeleton
                                            variant="text"
                                            width={30}
                                            height={20}
                                        />
                                    </TableCell>

                                    {/* Bookings Column */}
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <Skeleton
                                            variant="text"
                                            width={20}
                                            height={20}
                                        />
                                    </TableCell>

                                    {/* Actions Column */}
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <Skeleton
                                            variant="circular"
                                            width={32}
                                            height={32}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default TourTableSkeleton;
