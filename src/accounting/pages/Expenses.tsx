import React, { useState, useMemo } from 'react';
import { Modal } from '@/components/ui/modal';
import { Expense, ExpenseCategory, ExpenseStatus } from '../types';
import { EXPENSES, TOURS } from '../data/mockData';
import { formatJPY, formatDate } from '../utils/formatters';
import { exportToCSV } from '../utils/csvExport';

const CATEGORY_OPTIONS: { value: ExpenseCategory; label: string }[] = [
    { value: 'TRANSPORTATION', label: 'Transportation' },
    { value: 'ACCOMMODATION', label: 'Accommodation' },
    { value: 'MEALS', label: 'Meals' },
    { value: 'ENTRANCE_FEES', label: 'Entrance Fees' },
    { value: 'EQUIPMENT', label: 'Equipment' },
    { value: 'MARKETING', label: 'Marketing' },
    { value: 'OTHER', label: 'Other' },
];

const STATUS_OPTIONS: { value: ExpenseStatus; label: string }[] = [
    { value: 'APPROVED', label: 'Approved' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'REJECTED', label: 'Rejected' },
];

const categoryBadgeClass = (cat: ExpenseCategory) => {
    const map: Record<ExpenseCategory, string> = {
        TRANSPORTATION:
            'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        ACCOMMODATION:
            'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
        MEALS: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
        ENTRANCE_FEES:
            'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
        EQUIPMENT:
            'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
        MARKETING:
            'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
        OTHER: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    };
    return map[cat] ?? 'bg-gray-100 text-gray-700';
};

const statusBadgeClass = (status: ExpenseStatus) => {
    if (status === 'APPROVED')
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    if (status === 'PENDING')
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
    return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
};

const categoryLabel = (cat: ExpenseCategory) =>
    CATEGORY_OPTIONS.find((o) => o.value === cat)?.label ?? cat;

const defaultForm = (): Omit<Expense, 'id'> => ({
    tourId: undefined,
    tourName: undefined,
    category: 'TRANSPORTATION',
    description: '',
    amountJpy: 0,
    date: new Date().toISOString().slice(0, 10),
    status: 'PENDING',
    receiptUrl: undefined,
    notes: '',
});

export default function Expenses() {
    const [expenses, setExpenses] = useState<Expense[]>(EXPENSES);
    const [filterFrom, setFilterFrom] = useState('');
    const [filterTo, setFilterTo] = useState('');
    const [filterCategory, setFilterCategory] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<string>('');
    const [searchDesc, setSearchDesc] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<Omit<Expense, 'id'>>(defaultForm());
    const [receiptFileName, setReceiptFileName] = useState('');
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    const filtered = useMemo(() => {
        return expenses.filter((e) => {
            const dateKey = e.date.replace(/\//g, '-');
            if (filterFrom && dateKey < filterFrom) return false;
            if (filterTo && dateKey > filterTo) return false;
            if (filterCategory && e.category !== filterCategory) return false;
            if (filterStatus && e.status !== filterStatus) return false;
            if (
                searchDesc &&
                !e.description.toLowerCase().includes(searchDesc.toLowerCase())
            )
                return false;
            return true;
        });
    }, [
        expenses,
        filterFrom,
        filterTo,
        filterCategory,
        filterStatus,
        searchDesc,
    ]);

    const totalAll = expenses.reduce((s, e) => s + e.amountJpy, 0);
    const totalApproved = expenses
        .filter((e) => e.status === 'APPROVED')
        .reduce((s, e) => s + e.amountJpy, 0);
    const totalPending = expenses
        .filter((e) => e.status === 'PENDING')
        .reduce((s, e) => s + e.amountJpy, 0);
    const totalRejected = expenses
        .filter((e) => e.status === 'REJECTED')
        .reduce((s, e) => s + e.amountJpy, 0);

    const openAdd = () => {
        setEditingId(null);
        setForm(defaultForm());
        setReceiptFileName('');
        setModalOpen(true);
    };

    const openEdit = (exp: Expense) => {
        setEditingId(exp.id);
        setForm({
            tourId: exp.tourId,
            tourName: exp.tourName,
            category: exp.category,
            description: exp.description,
            amountJpy: exp.amountJpy,
            date: exp.date.replace(/\//g, '-'),
            status: exp.status,
            receiptUrl: exp.receiptUrl,
            notes: exp.notes ?? '',
        });
        setReceiptFileName(exp.receiptUrl ?? '');
        setModalOpen(true);
    };

    const handleTourChange = (tourIdStr: string) => {
        if (!tourIdStr) {
            setForm((f) => ({ ...f, tourId: undefined, tourName: undefined }));
            return;
        }
        const tid = Number(tourIdStr);
        const tour = TOURS.find((t) => t.id === tid);
        setForm((f) => ({ ...f, tourId: tid, tourName: tour?.name }));
    };

    const handleSave = () => {
        if (!form.description.trim() || form.amountJpy <= 0) return;
        const dateFormatted = form.date.replace(/-/g, '/');
        if (editingId !== null) {
            setExpenses((prev) =>
                prev.map((e) =>
                    e.id === editingId
                        ? {
                              ...form,
                              id: editingId,
                              date: dateFormatted,
                              receiptUrl: receiptFileName || undefined,
                          }
                        : e
                )
            );
        } else {
            const newId = Math.max(0, ...expenses.map((e) => e.id)) + 1;
            setExpenses((prev) => [
                ...prev,
                {
                    ...form,
                    id: newId,
                    date: dateFormatted,
                    receiptUrl: receiptFileName || undefined,
                },
            ]);
        }
        setModalOpen(false);
    };

    const handleDelete = (id: number) => {
        setExpenses((prev) => prev.filter((e) => e.id !== id));
        setConfirmDeleteId(null);
    };

    const handleExport = () => {
        const data = filtered.map((e) => ({
            id: e.id,
            date: e.date,
            tourName: e.tourName ?? '',
            category: e.category,
            description: e.description,
            amountJpy: e.amountJpy,
            status: e.status,
            notes: e.notes ?? '',
        }));
        exportToCSV(data as Record<string, unknown>[], 'expenses');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <main className="pb-10">
                <div className="container mx-auto ">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Expenses
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Track and manage tour expenses
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
                                Add Expense
                            </button>
                        </div>
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-xl border border-gray-200 p-4 dark:bg-white/[0.03] dark:border-white/[0.05]">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                All Expenses
                            </p>
                            <p className="text-xl font-bold text-gray-800 dark:text-white">
                                {formatJPY(totalAll)}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                {expenses.length} records
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4 dark:bg-white/[0.03] dark:border-white/[0.05]">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Approved
                            </p>
                            <p className="text-xl font-bold text-green-600 dark:text-green-400">
                                {formatJPY(totalApproved)}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                {
                                    expenses.filter(
                                        (e) => e.status === 'APPROVED'
                                    ).length
                                }{' '}
                                records
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
                                    expenses.filter(
                                        (e) => e.status === 'PENDING'
                                    ).length
                                }{' '}
                                records
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4 dark:bg-white/[0.03] dark:border-white/[0.05]">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Rejected
                            </p>
                            <p className="text-xl font-bold text-red-500 dark:text-red-400">
                                {formatJPY(totalRejected)}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                {
                                    expenses.filter(
                                        (e) => e.status === 'REJECTED'
                                    ).length
                                }{' '}
                                records
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
                            <div className="flex flex-col gap-1 min-w-[160px]">
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Category
                                </label>
                                <select
                                    value={filterCategory}
                                    onChange={(e) =>
                                        setFilterCategory(e.target.value)
                                    }
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30"
                                >
                                    <option value="">All Categories</option>
                                    {CATEGORY_OPTIONS.map((o) => (
                                        <option key={o.value} value={o.value}>
                                            {o.label}
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
                                    {STATUS_OPTIONS.map((o) => (
                                        <option key={o.value} value={o.value}>
                                            {o.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Search
                                </label>
                                <input
                                    type="text"
                                    placeholder="Search description..."
                                    value={searchDesc}
                                    onChange={(e) =>
                                        setSearchDesc(e.target.value)
                                    }
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30 placeholder-gray-400 dark:placeholder-gray-600"
                                />
                            </div>
                            {(filterFrom ||
                                filterTo ||
                                filterCategory ||
                                filterStatus ||
                                searchDesc) && (
                                <div className="flex flex-col gap-1 justify-end">
                                    <label className="text-xs invisible">
                                        Clear
                                    </label>
                                    <button
                                        onClick={() => {
                                            setFilterFrom('');
                                            setFilterTo('');
                                            setFilterCategory('');
                                            setFilterStatus('');
                                            setSearchDesc('');
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
                                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                                            Tour
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                                            Category
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                                            Description
                                        </th>
                                        <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                            Amount
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                                            Status
                                        </th>
                                        <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                                            Receipt
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
                                                colSpan={8}
                                                className="py-12 text-center text-gray-400 dark:text-gray-500"
                                            >
                                                No expenses found
                                            </td>
                                        </tr>
                                    )}
                                    {filtered.map((exp) => (
                                        <tr
                                            key={exp.id}
                                            className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                                        >
                                            <td className="py-3 px-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                {formatDate(exp.date)}
                                            </td>
                                            <td className="py-3 px-4 text-gray-700 dark:text-gray-300 max-w-[140px] truncate">
                                                {exp.tourName ?? (
                                                    <span className="text-gray-400 dark:text-gray-500 italic">
                                                        General
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span
                                                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${categoryBadgeClass(exp.category)}`}
                                                >
                                                    {categoryLabel(
                                                        exp.category
                                                    )}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-700 dark:text-gray-300 max-w-[200px] truncate">
                                                {exp.description}
                                            </td>
                                            <td className="py-3 px-4 text-right font-medium text-gray-800 dark:text-white whitespace-nowrap">
                                                {formatJPY(exp.amountJpy)}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span
                                                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusBadgeClass(exp.status)}`}
                                                >
                                                    {exp.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                {exp.receiptUrl ? (
                                                    <svg
                                                        className="w-4 h-4 text-[#465fff] mx-auto"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <span className="text-gray-300 dark:text-gray-600">
                                                        —
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4">
                                                {confirmDeleteId === exp.id ? (
                                                    <div className="flex items-center gap-1.5 justify-center">
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            Delete?
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    exp.id
                                                                )
                                                            }
                                                            className="text-xs px-2 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors"
                                                        >
                                                            Yes
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                setConfirmDeleteId(
                                                                    null
                                                                )
                                                            }
                                                            className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
                                                        >
                                                            No
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1.5 justify-center">
                                                        <button
                                                            onClick={() =>
                                                                openEdit(exp)
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
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                setConfirmDeleteId(
                                                                    exp.id
                                                                )
                                                            }
                                                            title="Delete"
                                                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
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
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-4 py-3 border-t border-gray-100 dark:border-white/[0.04] flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>
                                {filtered.length} of {expenses.length} records
                            </span>
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                Filtered total:{' '}
                                {formatJPY(
                                    filtered.reduce(
                                        (s, e) => s + e.amountJpy,
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
                        {editingId !== null ? 'Edit Expense' : 'Add Expense'}
                    </h2>
                    <div className="space-y-4">
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
                                <option value="">General / No Tour</option>
                                {TOURS.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Category
                            </label>
                            <select
                                value={form.category}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        category: e.target
                                            .value as ExpenseCategory,
                                    }))
                                }
                                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30"
                            >
                                {CATEGORY_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Description{' '}
                                <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={form.description}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        description: e.target.value,
                                    }))
                                }
                                placeholder="Enter description"
                                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30 placeholder-gray-400 dark:placeholder-gray-600"
                            />
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
                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Date
                            </label>
                            <input
                                type="date"
                                value={form.date}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        date: e.target.value,
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
                                        status: e.target.value as ExpenseStatus,
                                    }))
                                }
                                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30"
                            >
                                {STATUS_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Receipt */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Receipt
                            </label>
                            <input
                                type="file"
                                accept="image/*,.pdf"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) setReceiptFileName(file.name);
                                }}
                                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-[#465fff] file:text-white"
                            />
                            {receiptFileName && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                                    {receiptFileName}
                                </p>
                            )}
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
                            disabled={
                                !form.description.trim() || form.amountJpy <= 0
                            }
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-[#465fff] hover:bg-[#3a52e6] text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {editingId !== null
                                ? 'Save Changes'
                                : 'Add Expense'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
