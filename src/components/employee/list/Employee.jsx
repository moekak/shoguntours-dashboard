import { Breadcrumbs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { API_ENDPOINTS } from '../../../config/config';
import { useFetchData } from '../../../hooks/useFetchData';
import { useCommonContext } from '../../../context/CommonContext';
import Alert from '../../ui/alert/Alert';
import BookingsSkeleton from '../../skelton/BookingListSkelton';

import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableCell,
} from '../../ui/table';

import Pagination from '../../common/Pagination';
import BookingList from '../../book/list/BookingList';
import { useSearchBookingContext } from '../../book/search/context/SearchBookingContext';
import { useBookingContext } from '../../book/context/BookingContext';
import CreateEmployee from '@components/employee/create/CreateEmployee';
import EmployeeList from './EmployeeList';

function Employee() {
    const [page, setPage] = useState(1); // ページ番号
    const { setBookingData, bookingData, setTourCounts, tourCounts } =
        useBookingContext();
    const { appliedFilters } = useSearchBookingContext();
    const { errors, errorTitle, successMessage, isSuccess, setOpenModal } =
        useCommonContext();

    // 全ガイドを取得
    const { data: employees, isLoading } = useFetchData(
        API_ENDPOINTS.API.FETCH_TOUR_GUIDE,
        'employee'
    );

    useEffect(() => {
        if (!employees) return;
        console.log(employees);
    }, [employees]);

    if (isLoading) {
        return <BookingsSkeleton />;
    }

    return (
        <>
            <div className="bg-gray-50 min-h-screen">
                <CreateEmployee />
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

                        <div className="flex justify-between mb-8">
                            {/* Search */}
                            <div className="w-full lg:w-80">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search employees..."
                                        className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-500"
                                    />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        <svg
                                            className="w-4 h-4 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpenModal(true)}
                                className="px-6 py-2 bg-[#465fff] text-white rounded-lg hover:bg-[#3d51e8] font-medium transition-colors"
                            >
                                Add Guide
                            </button>
                        </div>

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
                                                    Employee Name
                                                </TableCell>
                                                <TableCell
                                                    isHeader
                                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                                >
                                                    Phone Number
                                                </TableCell>
                                                <TableCell
                                                    isHeader
                                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                                >
                                                    Upcoming Tours
                                                </TableCell>
                                                <TableCell
                                                    isHeader
                                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                                >
                                                    Tour History
                                                </TableCell>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                            {Array.isArray(employees.guides) &&
                                                employees.guides.map(
                                                    (employee) => {
                                                        console.log(employee);
                                                        return (
                                                            <EmployeeList
                                                                key={
                                                                    employee.id
                                                                }
                                                                employee={
                                                                    employee
                                                                }
                                                            />
                                                        );
                                                    }
                                                )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>

                        {/* Pagination */}
                        {/* <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
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
                        </div> */}
                    </div>
                </main>
            </div>
        </>
    );
}

export default Employee;
