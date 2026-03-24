import { useState, useMemo } from 'react';
import { API_ENDPOINTS } from '../config/config';
import { useFetchData } from '../hooks/useFetchData';
import { useCommonContext } from '../context/CommonContext';
import Alert from '../components/ui/alert/Alert';
import BookingsSkeleton from '../components/skelton/EmployeeSkelton';
import PageMeta from '../components/common/PageMeta';
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableCell,
} from '../components/ui/table';
import EmployeeList from '../components/employee/list/EmployeeList';
import CreateEmployee from '../components/employee/create/CreateEmployee';
import ShiftModal, { type ShiftData, type Day, type Status } from './ShiftModal';

interface Employee {
    id: number;
    full_name: string;
    phone: string;
    color: string;
    initials: string;
    status?: Status;
    shifts?: Day[];
    upcoming_tours?: number;
    tour_history?: number;
}

type StatusFilter = 'all' | Status;

const STATUS_TABS: { key: StatusFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'available', label: 'Available' },
    { key: 'on_tour', label: 'On Tour' },
    { key: 'unavailable', label: 'Unavailable' },
];

function Employee() {
    const { errors, errorTitle, successMessage, isSuccess, setOpenModal } =
        useCommonContext();

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const [shiftModalOpen, setShiftModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    // Local shift/status overrides (replaces API data until backend supports it)
    const [shiftOverrides, setShiftOverrides] = useState<
        Record<number, ShiftData>
    >({});

    const { data: rawEmployees, isLoading } = useFetchData(
        API_ENDPOINTS.API.FETCH_TOUR_GUIDE,
        'employee'
    );

    // Merge API data with local shift overrides
    const employees: Employee[] = useMemo(() => {
        if (!Array.isArray(rawEmployees)) return [];
        return rawEmployees.map((emp: Employee) => ({
            ...emp,
            ...(shiftOverrides[emp.id] ?? {}),
        }));
    }, [rawEmployees, shiftOverrides]);

    const filtered = useMemo(() => {
        return employees.filter((emp) => {
            const matchesSearch = emp.full_name
                .toLowerCase()
                .includes(search.toLowerCase());
            const matchesStatus =
                statusFilter === 'all' ||
                (emp.status ?? 'available') === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [employees, search, statusFilter]);

    const counts = useMemo(() => {
        return {
            total: employees.length,
            available: employees.filter(
                (e) => (e.status ?? 'available') === 'available'
            ).length,
            on_tour: employees.filter((e) => e.status === 'on_tour').length,
            unavailable: employees.filter((e) => e.status === 'unavailable')
                .length,
        };
    }, [employees]);

    const handleShiftEdit = (employee: Employee) => {
        setSelectedEmployee(employee);
        setShiftModalOpen(true);
    };

    const handleShiftSave = (employeeId: number, data: ShiftData) => {
        setShiftOverrides((prev) => ({ ...prev, [employeeId]: data }));
    };

    if (isLoading) {
        return <BookingsSkeleton />;
    }

    return (
        <>
            <PageMeta
                title="Employees | Shogun Tours Dashboard"
                description="Manage tour guides and employees"
            />

            <div className="bg-gray-50 min-h-screen dark:bg-gray-900">
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

                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    Tour Guides
                                </h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Manage your tour guides and staff
                                </p>
                            </div>
                            <button
                                onClick={() => setOpenModal(true)}
                                className="flex items-center gap-2 bg-[#465fff] hover:bg-[#3a52e0] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                Add Employee
                            </button>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {[
                                {
                                    label: 'Total Guides',
                                    value: counts.total,
                                    icon: (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    ),
                                    color: 'bg-blue-50 text-[#465fff]',
                                },
                                {
                                    label: 'Available',
                                    value: counts.available,
                                    icon: (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    ),
                                    color: 'bg-emerald-50 text-emerald-600',
                                },
                                {
                                    label: 'On Tour',
                                    value: counts.on_tour,
                                    icon: (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                                        />
                                    ),
                                    color: 'bg-blue-50 text-blue-600',
                                },
                                {
                                    label: 'Unavailable',
                                    value: counts.unavailable,
                                    icon: (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                                        />
                                    ),
                                    color: 'bg-red-50 text-red-500',
                                },
                            ].map(({ label, value, icon, color }) => (
                                <div
                                    key={label}
                                    className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all dark:bg-white/[0.03] dark:border-white/[0.05]"
                                >
                                    <div
                                        className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            {icon}
                                        </svg>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-1 dark:text-gray-400">
                                        {label}
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Search + Filter */}
                        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4 mb-4 flex flex-col sm:flex-row sm:items-center gap-3 dark:bg-white/[0.03] dark:border-white/[0.05]">
                            {/* Search */}
                            <div className="relative flex-1">
                                <svg
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
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
                                <input
                                    type="text"
                                    placeholder="Search by name..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#465fff]/30 focus:border-[#465fff] dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
                                />
                            </div>

                            {/* Status Tabs */}
                            <div className="flex gap-1">
                                {STATUS_TABS.map(({ key, label }) => (
                                    <button
                                        key={key}
                                        onClick={() => setStatusFilter(key)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                            statusFilter === key
                                                ? 'bg-[#465fff] text-white'
                                                : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                                        }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Employee Table */}
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                            <div className="max-w-full overflow-x-auto">
                                <Table>
                                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                        <TableRow>
                                            {[
                                                'Name',
                                                'Phone',
                                                'Status',
                                                'Available Shifts',
                                                'Upcoming Tours',
                                                'Tour History',
                                                'Actions',
                                            ].map((h) => (
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
                                        {filtered.map((employee) => (
                                            <EmployeeList
                                                key={employee.id}
                                                employee={employee}
                                                onShiftEdit={handleShiftEdit}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {filtered.length === 0 && (
                                <div className="py-16 text-center text-gray-400 dark:text-gray-600">
                                    {employees.length === 0
                                        ? 'No employees found. Add your first tour guide.'
                                        : 'No employees match your search.'}
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            <CreateEmployee />

            <ShiftModal
                isOpen={shiftModalOpen}
                onClose={() => setShiftModalOpen(false)}
                employee={selectedEmployee}
                onSave={handleShiftSave}
            />
        </>
    );
}

export default Employee;
