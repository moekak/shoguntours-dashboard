import React, { useState, useMemo } from 'react';
import { Modal } from '@/components/ui/modal';
import { Revenue, RevenueStatus } from '../types';
import { REVENUES, TOURS } from '../data/mockData';
import { formatJPY, formatDate } from '../utils/formatters';
import { exportToCSV } from '../utils/csvExport';

const TOUR_TYPES = ['private', 'group', 'standard'];

const statusBadgeClass = (status: RevenueStatus) => {
    if (status === 'PAID')
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    if (status === 'PENDING')
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
    return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
};

const tourTypeBadgeClass = (type?: string) => {
    if (type === 'private')
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
    if (type === 'group')
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
};

const defaultForm = (): Omit<Revenue, 'id'> => ({
    bookingId: undefined,
    tourId: undefined,
    tourName: undefined,
    tourType: 'standard',
    amountJpy: 0,
    tourDate: new Date().toISOString().slice(0, 10),
    status: 'PENDING',
    notes: '',
});

export default function RevenuePage() {
    const [revenues, setRevenues] = useState<Revenue[]>(REVENUES);
    const [filterFrom, setFilterFrom] = useState('');
    const [filterTo, setFilterTo] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [searchTour, setSearchTour] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<Omit<Revenue, 'id'>>(defaultForm());

    const filtered = useMemo(() => {
        return revenues.filter((r) => {
            const dateKey = r.tourDate.replace(/\//g, '-');
            if (filterFrom && dateKey < filterFrom) return false;
            if (filterTo && dateKey > filterTo) return false;
            if (filterType && r.tourType !== filterType) return false;
            if (filterStatus && r.status !== filterStatus) return false;
            if (
                searchTour &&
                !r.tourName?.toLowerCase().includes(searchTour.toLowerCase())
            )
                return false;
            return true;
        });
    }, [revenues, filterFrom, filterTo, filterType, filterStatus, searchTour]);

    const totalAll = revenues.reduce((s, r) => s + r.amountJpy, 0);
    const totalPaid = revenues
        .filter((r) => r.status === 'PAID')
        .reduce((s, r) => s + r.amountJpy, 0);
    const totalPending = revenues
        .filter((r) => r.status === 'PENDING')
        .reduce((s, r) => s + r.amountJpy, 0);
    const totalRefunded = revenues
        .filter((r) => r.status === 'REFUNDED')
        .reduce((s, r) => s + r.amountJpy, 0);

    const openAdd = () => {
        setEditingId(null);
        setForm(defaultForm());
        setModalOpen(true);
    };

    const openEdit = (rev: Revenue) => {
        setEditingId(rev.id);
        setForm({
            bookingId: rev.bookingId,
            tourId: rev.tourId,
            tourName: rev.tourName,
            tourType: rev.tourType,
            amountJpy: rev.amountJpy,
            tourDate: rev.tourDate.replace(/\//g, '-'),
            status: rev.status,
            notes: rev.notes ?? '',
        });
        setModalOpen(true);
    };

    const handleTourChange = (tourIdStr: string) => {
        if (!tourIdStr) {
            setForm((f) => ({ ...f, tourId: undefined, tourName: undefined }));
            return;
        }
        const tid = Number(tourIdStr);
        const tour = TOURS.find((t) => t.id === tid);
        setForm((f) => ({
            ...f,
            tourId: tid,
            tourName: tour?.name,
            tourType: tour?.type ?? f.tourType,
        }));
    };

    const handleSave = () => {
        if (form.amountJpy <= 0) return;
        const dateFormatted = form.tourDate.replace(/-/g, '/');
        if (editingId !== null) {
            setRevenues((prev) =>
                prev.map((r) =>
                    r.id === editingId
                        ? { ...form, id: editingId, tourDate: dateFormatted }
                        : r
                )
            );
        } else {
            const newId = Math.max(0, ...revenues.map((r) => r.id)) + 1;
            setRevenues((prev) => [
                ...prev,
                { ...form, id: newId, tourDate: dateFormatted },
            ]);
        }
        setModalOpen(false);
    };

    const handleStatusChange = (id: number, status: RevenueStatus) => {
        setRevenues((prev) =>
            prev.map((r) => (r.id === id ? { ...r, status } : r))
        );
    };

    const handleExport = () => {
        const data = filtered.map((r) => ({
            id: r.id,
            bookingId: r.bookingId ?? '',
            tourName: r.tourName ?? '',
            tourType: r.tourType ?? '',
            tourDate: r.tourDate,
            amountJpy: r.amountJpy,
            status: r.status,
            notes: r.notes ?? '',
        }));
        exportToCSV(data as Record<string, unknown>[], 'revenue');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <main className="pb-10">
                <div className="container mx-auto ">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Revenue
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Track booking payments and revenue
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleExport}
                                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 dark:hover:bg-white/[0.06] transition-colors"
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
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                    />
                                </svg>
                                Export CSV
                            </button>
                            <button
                                onClick={openAdd}
                                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg bg-[#465fff] hover:bg-[#3a52e6] text-white transition-colors"
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
                                Add Revenue
                            </button>
                        </div>
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-xl border border-gray-200 p-4 dark:bg-white/[0.03] dark:border-white/[0.05]">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Total Revenue
                            </p>
                            <p className="text-xl font-bold text-gray-800 dark:text-white">
                                {formatJPY(totalAll)}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                {revenues.length} bookings
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4 dark:bg-white/[0.03] dark:border-white/[0.05]">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Paid
                            </p>
                            <p className="text-xl font-bold text-green-600 dark:text-green-400">
                                {formatJPY(totalPaid)}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                {
                                    revenues.filter((r) => r.status === 'PAID')
                                        .length
                                }{' '}
                                bookings
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4 dark:bg-white/[0.03] dark:border-white/[0.05]">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Pending
                            </p>
                            <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
                                {formatJPY(totalPending)}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                {
                                    revenues.filter(
                                        (r) => r.status === 'PENDING'
                                    ).length
                                }{' '}
                                bookings
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4 dark:bg-white/[0.03] dark:border-white/[0.05]">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Refunded
                            </p>
                            <p className="text-xl font-bold text-red-500 dark:text-red-400">
                                {formatJPY(totalRefunded)}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                {
                                    revenues.filter(
                                        (r) => r.status === 'REFUNDED'
                                    ).length
                                }{' '}
                                bookings
                            </p>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="bg-white rounded-xl border border-gray-200 p-4 dark:bg-white/[0.03] dark:border-white/[0.05] mb-4">
                        <div className="flex flex-wrap gap-3">
                            <div className="flex flex-col gap-1 min-w-[130px]">
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    From
                                </label>
                                <input
                                    type="date"
                                    value={filterFrom}
                                    onChange={(e) =>
                                        setFilterFrom(e.target.value)
                                    }
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30"
                                />
                            </div>
                            <div className="flex flex-col gap-1 min-w-[130px]">
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    To
                                </label>
                                <input
                                    type="date"
                                    value={filterTo}
                                    onChange={(e) =>
                                        setFilterTo(e.target.value)
                                    }
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30"
                                />
                            </div>
                            <div className="flex flex-col gap-1 min-w-[150px]">
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Tour Type
                                </label>
                                <select
                                    value={filterType}
                                    onChange={(e) =>
                                        setFilterType(e.target.value)
                                    }
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30"
                                >
                                    <option value="">All Types</option>
                                    {TOUR_TYPES.map((t) => (
                                        <option key={t} value={t}>
                                            {t.charAt(0).toUpperCase() +
                                                t.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-1 min-w-[140px]">
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Status
                                </label>
                                <select
                                    value={filterStatus}
                                    onChange={(e) =>
                                        setFilterStatus(e.target.value)
                                    }
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="PAID">Paid</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="REFUNDED">Refunded</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Search
                                </label>
                                <input
                                    type="text"
                                    placeholder="Search tour name..."
                                    value={searchTour}
                                    onChange={(e) =>
                                        setSearchTour(e.target.value)
                                    }
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30 placeholder-gray-400 dark:placeholder-gray-600"
                                />
                            </div>
                            {(filterFrom ||
                                filterTo ||
                                filterType ||
                                filterStatus ||
                                searchTour) && (
                                <div className="flex flex-col gap-1 justify-end">
                                    <label className="text-xs invisible">
                                        Clear
                                    </label>
                                    <button
                                        onClick={() => {
                                            setFilterFrom('');
                                            setFilterTo('');
                                            setFilterType('');
                                            setFilterStatus('');
                                            setSearchTour('');
                                        }}
                                        className="px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.06] transition-colors"
                                    >
                                        Clear
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl border border-gray-200 dark:bg-white/[0.03] dark:border-white/[0.05] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 dark:bg-white/[0.02] border-b border-gray-200 dark:border-white/[0.05]">
                                    <tr>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                            Date
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                            Booking ID
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                                            Tour
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                            Tour Type
                                        </th>
                                        <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                                            Amount
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                                            Status
                                        </th>
                                        <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-white/[0.04]">
                                    {filtered.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="py-12 text-center text-gray-400 dark:text-gray-500"
                                            >
                                                No revenue records found
                                            </td>
                                        </tr>
                                    )}
                                    {filtered.map((rev) => (
                                        <tr
                                            key={rev.id}
                                            className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                                        >
                                            <td className="py-3 px-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                {formatDate(rev.tourDate)}
                                            </td>
                                            <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
                                                {rev.bookingId ? (
                                                    <span className="font-mono text-xs">
                                                        #BK{rev.bookingId}
                                                    </span>
                                                ) : (
                                                    '—'
                                                )}
                                            </td>
                                            <td className="py-3 px-4 text-gray-700 dark:text-gray-300 max-w-[160px] truncate">
                                                {rev.tourName ?? (
                                                    <span className="text-gray-400 italic">
                                                        Unknown
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4">
                                                {rev.tourType ? (
                                                    <span
                                                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${tourTypeBadgeClass(rev.tourType)}`}
                                                    >
                                                        {rev.tourType}
                                                    </span>
                                                ) : (
                                                    '—'
                                                )}
                                            </td>
                                            <td className="py-3 px-4 text-right font-medium text-gray-800 dark:text-white whitespace-nowrap">
                                                {formatJPY(rev.amountJpy)}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span
                                                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusBadgeClass(rev.status)}`}
                                                >
                                                    {rev.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-1.5 justify-center">
                                                    <button
                                                        onClick={() =>
                                                            openEdit(rev)
                                                        }
                                                        title="Edit"
                                                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#465fff] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
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
                                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <select
                                                        value={rev.status}
                                                        onChange={(e) =>
                                                            handleStatusChange(
                                                                rev.id,
                                                                e.target
                                                                    .value as RevenueStatus
                                                            )
                                                        }
                                                        className="text-xs px-2 py-1 rounded-lg border border-gray-200 bg-white text-gray-600 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#465fff]/30"
                                                    >
                                                        <option value="PAID">
                                                            Paid
                                                        </option>
                                                        <option value="PENDING">
                                                            Pending
                                                        </option>
                                                        <option value="REFUNDED">
                                                            Refunded
                                                        </option>
                                                    </select>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-4 py-3 border-t border-gray-100 dark:border-white/[0.04] flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>
                                {filtered.length} of {revenues.length} records
                            </span>
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                Filtered total:{' '}
                                {formatJPY(
                                    filtered.reduce(
                                        (s, r) => s + r.amountJpy,
                                        0
                                    )
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Add/Edit Modal */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                className="max-w-lg w-full"
            >
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
                        {editingId !== null ? 'Edit Revenue' : 'Add Revenue'}
                    </h2>
                    <div className="space-y-4">
                        {/* Booking ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Booking ID{' '}
                                <span className="text-gray-400 font-normal">
                                    (optional)
                                </span>
                            </label>
                            <input
                                type="number"
                                min={1}
                                value={form.bookingId ?? ''}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        bookingId: e.target.value
                                            ? Number(e.target.value)
                                            : undefined,
                                    }))
                                }
                                placeholder="e.g. 101"
                                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30 placeholder-gray-400 dark:placeholder-gray-600"
                            />
                        </div>
                        {/* Tour */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Tour
                            </label>
                            <select
                                value={form.tourId ?? ''}
                                onChange={(e) =>
                                    handleTourChange(e.target.value)
                                }
                                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30"
                            >
                                <option value="">Select tour...</option>
                                {TOURS.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Tour Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Tour Type
                            </label>
                            <select
                                value={form.tourType ?? 'standard'}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        tourType: e.target.value,
                                    }))
                                }
                                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30"
                            >
                                {TOUR_TYPES.map((t) => (
                                    <option key={t} value={t}>
                                        {t.charAt(0).toUpperCase() + t.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Amount */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Amount (JPY){' '}
                                <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="number"
                                min={0}
                                value={form.amountJpy || ''}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        amountJpy: Number(e.target.value),
                                    }))
                                }
                                placeholder="0"
                                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30"
                            />
                        </div>
                        {/* Tour Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Tour Date
                            </label>
                            <input
                                type="date"
                                value={form.tourDate}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        tourDate: e.target.value,
                                    }))
                                }
                                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30"
                            />
                        </div>
                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Status
                            </label>
                            <select
                                value={form.status}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        status: e.target.value as RevenueStatus,
                                    }))
                                }
                                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30"
                            >
                                <option value="PENDING">Pending</option>
                                <option value="PAID">Paid</option>
                                <option value="REFUNDED">Refunded</option>
                            </select>
                        </div>
                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Notes{' '}
                                <span className="text-gray-400 font-normal">
                                    (optional)
                                </span>
                            </label>
                            <textarea
                                value={form.notes ?? ''}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        notes: e.target.value,
                                    }))
                                }
                                rows={2}
                                placeholder="Additional notes..."
                                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30 placeholder-gray-400 dark:placeholder-gray-600 resize-none"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 dark:hover:bg-white/[0.06] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={form.amountJpy <= 0}
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-[#465fff] hover:bg-[#3a52e6] text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {editingId !== null
                                ? 'Save Changes'
                                : 'Add Revenue'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
