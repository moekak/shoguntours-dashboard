import { Breadcrumbs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { API_ENDPOINTS } from '../../../config/config';
import { useFetchData } from '../../../hooks/useFetchData';
import { useCommonContext } from '../../../context/CommonContext';
import Alert from '../../ui/alert/Alert';
import BookingsSkeleton from '../../skelton/EmployeeSkelton';

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
import ComponentCard from '@/components/common/ComponentCard';
import BasicTableOne from '@/components/tables/BasicTables/BasicTableOne';

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
            <ComponentCard title="Basic Table 1">
                <BasicTableOne />
            </ComponentCard>
        </>
    );
}

export default Employee;
