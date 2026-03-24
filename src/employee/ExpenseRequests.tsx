import { useState, useMemo, useRef } from 'react';
import { Modal } from '@/components/ui/modal';
import {
    Table, TableHeader, TableBody, TableRow, TableCell,
} from '@/components/ui/table';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';
import Select from '@/components/form/Select';
import PageMeta from '@/components/common/PageMeta';
import { formatJPY } from '../accounting/utils/formatters';
import { exportToCSV } from '../accounting/utils/csvExport';
import type { ExpenseCategory } from '../accounting/types';
import { TOURS } from '../accounting/data/mockData';
import {
    MOCK_EMPLOYEES,
    MOCK_EXPENSE_REQUESTS,
    type ExpenseRequest,
    type ExpenseRequestStatus,
} from './mockData';

// ─── constants ───────────────────────────────────────────────────────────────

const CATEGORY_OPTIONS: { value: ExpenseCategory; label: string }[] = [
    { value: 'TRANSPORTATION', label: 'Transportation' },
    { value: 'ACCOMMODATION',  label: 'Accommodation' },
    { value: 'MEALS',          label: 'Meals' },
    { value: 'ENTRANCE_FEES',  label: 'Entrance Fees' },
    { value: 'EQUIPMENT',      label: 'Equipment' },
    { value: 'MARKETING',      label: 'Marketing' },
    { value: 'OTHER',          label: 'Other' },
];

const CATEGORY_STYLES: Record<ExpenseCategory, string> = {
    TRANSPORTATION: 'bg-blue-50 text-blue-700',
    ACCOMMODATION:  'bg-purple-50 text-purple-700',
    MEALS:          'bg-orange-50 text-orange-700',
    ENTRANCE_FEES:  'bg-teal-50 text-teal-700',
    EQUIPMENT:      'bg-indigo-50 text-indigo-700',
    MARKETING:      'bg-pink-50 text-pink-700',
    OTHER:          'bg-gray-100 text-gray-600',
};

const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
    TRANSPORTATION: 'Transport',
    ACCOMMODATION:  'Accommodation',
    MEALS:          'Meals',
    ENTRANCE_FEES:  'Entrance',
    EQUIPMENT:      'Equipment',
    MARKETING:      'Marketing',
    OTHER:          'Other',
};

const STATUS_STYLES: Record<ExpenseRequestStatus, string> = {
    PENDING:  'bg-amber-50 text-amber-700',
    APPROVED: 'bg-emerald-50 text-emerald-700',
    REJECTED: 'bg-red-50 text-red-600',
};

interface FormState {
    employeeId: string;
    tourId:     string;
    category:   string;
    description:string;
    amountJpy:  string;
    date:       string;
    receiptFile:string;
    notes:      string;
}

const EMPTY_FORM: FormState = {
    employeeId:  '',
    tourId:      '',
    category:    '',
    description: '',
    amountJpy:   '',
    date:        '',
    receiptFile: '',
    notes:       '',
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function ExpenseRequests() {
    const [requests, setRequests] = useState<ExpenseRequest[]>(MOCK_EXPENSE_REQUESTS);
    const nextId = useRef(Math.max(...MOCK_EXPENSE_REQUESTS.map((r) => r.id)) + 1);

    // filters
    const [filterEmployee, setFilterEmployee] = useState('');
    const [filterStatus,   setFilterStatus]   = useState<ExpenseRequestStatus | ''>('');
    const [filterCategory, setFilterCategory] = useState<ExpenseCategory | ''>('');
    const [filterFrom,     setFilterFrom]     = useState('');
    const [filterTo,       setFilterTo]       = useState('');

    // modal
    const [modalOpen,  setModalOpen]  = useState(false);
    const [editingId,  setEditingId]  = useState<number | null>(null);
    const [form,       setForm]       = useState<FormState>(EMPTY_FORM);

    // detail modal
    const [detailOpen,    setDetailOpen]    = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<ExpenseRequest | null>(null);

    // ── derived data ─────────────────────────────────────────────────────────

    const filtered = useMemo(() => {
        return requests.filter((r) => {
            if (filterEmployee && String(r.employeeId) !== filterEmployee) return false;
            if (filterStatus   && r.status   !== filterStatus)              return false;
            if (filterCategory && r.category !== filterCategory)            return false;
            if (filterFrom     && r.date < filterFrom.replace(/-/g, '/'))  return false;
            if (filterTo       && r.date > filterTo.replace(/-/g, '/'))    return false;
            return true;
        });
    }, [requests, filterEmployee, filterStatus, filterCategory, filterFrom, filterTo]);

    const counts = useMemo(() => ({
        total:    requests.length,
        pending:  requests.filter((r) => r.status === 'PENDING').length,
        approved: requests.filter((r) => r.status === 'APPROVED').length,
        rejected: requests.filter((r) => r.status === 'REJECTED').length,
        pendingAmount: requests
            .filter((r) => r.status === 'PENDING')
            .reduce((s, r) => s + r.amountJpy, 0),
    }), [requests]);

    // ── actions ──────────────────────────────────────────────────────────────

    const openAddModal = () => {
        setEditingId(null);
        setForm(EMPTY_FORM);
        setModalOpen(true);
    };

    const openEditModal = (req: ExpenseRequest) => {
        setEditingId(req.id);
        setForm({
            employeeId:  String(req.employeeId),
            tourId:      String(req.tourId ?? ''),
            category:    req.category,
            description: req.description,
            amountJpy:   String(req.amountJpy),
            date:        req.date.replace(/\//g, '-'),
            receiptFile: req.receiptFile ?? '',
            notes:       req.notes ?? '',
        });
        setModalOpen(true);
    };

    const handleSave = () => {
        if (!form.employeeId || !form.category || !form.description || !form.amountJpy || !form.date) return;
        const emp  = MOCK_EMPLOYEES.find((e) => e.id === Number(form.employeeId))!;
        const tour = TOURS.find((t) => t.id === Number(form.tourId));
        const today = new Date().toISOString().slice(0, 10).replace(/-/g, '/');
        const saved: Omit<ExpenseRequest, 'id'> = {
            employeeId:   emp.id,
            employeeName: emp.name,
            tourId:       tour?.id,
            tourName:     tour?.name,
            category:     form.category as ExpenseCategory,
            description:  form.description,
            amountJpy:    Number(form.amountJpy),
            date:         form.date.replace(/-/g, '/'),
            receiptFile:  form.receiptFile || undefined,
            notes:        form.notes || undefined,
            status:       'PENDING',
            submittedAt:  today,
        };
        if (editingId !== null) {
            setRequests((prev) =>
                prev.map((r) => (r.id === editingId ? { ...r, ...saved } : r))
            );
        } else {
            setRequests((prev) => [...prev, { id: nextId.current++, ...saved }]);
        }
        setModalOpen(false);
    };

    const handleApprove = (id: number) => {
        const today = new Date().toISOString().slice(0, 10).replace(/-/g, '/');
        setRequests((prev) =>
            prev.map((r) => r.id === id ? { ...r, status: 'APPROVED', reviewedAt: today } : r)
        );
    };

    const handleReject = (id: number) => {
        const today = new Date().toISOString().slice(0, 10).replace(/-/g, '/');
        setRequests((prev) =>
            prev.map((r) => r.id === id ? { ...r, status: 'REJECTED', reviewedAt: today } : r)
        );
    };

    const handleDelete = (id: number) => {
        setRequests((prev) => prev.filter((r) => r.id !== id));
    };

    const handleExport = () => {
        exportToCSV(
            filtered.map((r) => ({
                Employee:    r.employeeName,
                Tour:        r.tourName ?? '—',
                Category:    CATEGORY_LABELS[r.category],
                Description: r.description,
                Amount:      r.amountJpy,
                Date:        r.date,
                Status:      r.status,
                Submitted:   r.submittedAt,
                Receipt:     r.receiptFile ?? '',
            })),
            'expense-requests'
        );
    };

    // ─────────────────────────────────────────────────────────────────────────

    return (
        <>
            <PageMeta
                title="Expense Requests | Shogun Tours Dashboard"
                description="Employee expense request management"
            />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-10">
                <div className="container">

                    {/* ── Header ─────────────────────────────────────────── */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                Expense Requests
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Review and approve guide expense submissions
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleExport}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.06] transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Export CSV
                            </button>
                            <button
                                onClick={openAddModal}
                                className="flex items-center gap-2 bg-[#465fff] hover:bg-[#3a52e0] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Submit Request
                            </button>
                        </div>
                    </div>

                    {/* ── Stats cards ────────────────────────────────────── */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                        {[
                            { label: 'Total',           value: counts.total,          color: 'bg-gray-100 text-gray-600',         fmt: String },
                            { label: 'Pending',         value: counts.pending,         color: 'bg-amber-50 text-amber-700',        fmt: String },
                            { label: 'Approved',        value: counts.approved,        color: 'bg-emerald-50 text-emerald-700',    fmt: String },
                            { label: 'Rejected',        value: counts.rejected,        color: 'bg-red-50 text-red-600',            fmt: String },
                            { label: 'Pending Amount',  value: counts.pendingAmount,   color: 'bg-blue-50 text-[#465fff]',         fmt: formatJPY },
                        ].map(({ label, value, color, fmt }) => (
                            <div key={label} className="bg-white rounded-xl border border-gray-200 p-5 dark:bg-white/[0.03] dark:border-white/[0.05]">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${color} mb-3`}>
                                    {label}
                                </span>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {fmt(value as number)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* ── Filters ────────────────────────────────────────── */}
                    <div className="bg-white rounded-xl border border-gray-200 px-5 py-4 mb-4 dark:bg-white/[0.03] dark:border-white/[0.05]">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            <Select
                                value={filterEmployee}
                                placeholder="All Guides"
                                options={MOCK_EMPLOYEES.map((e) => ({ value: String(e.id), label: e.name }))}
                                onChange={(v) => setFilterEmployee(v)}
                            />
                            <Select
                                value={filterStatus}
                                placeholder="All Statuses"
                                options={[
                                    { value: 'PENDING',  label: 'Pending' },
                                    { value: 'APPROVED', label: 'Approved' },
                                    { value: 'REJECTED', label: 'Rejected' },
                                ]}
                                onChange={(v) => setFilterStatus(v as ExpenseRequestStatus | '')}
                            />
                            <Select
                                value={filterCategory}
                                placeholder="All Categories"
                                options={CATEGORY_OPTIONS}
                                onChange={(v) => setFilterCategory(v as ExpenseCategory | '')}
                            />
                            <Input
                                type="date"
                                value={filterFrom}
                                onChange={(e) => setFilterFrom(e.target.value)}
                                placeholder="From"
                            />
                            <Input
                                type="date"
                                value={filterTo}
                                onChange={(e) => setFilterTo(e.target.value)}
                                placeholder="To"
                            />
                        </div>
                        {(filterEmployee || filterStatus || filterCategory || filterFrom || filterTo) && (
                            <button
                                onClick={() => {
                                    setFilterEmployee('');
                                    setFilterStatus('');
                                    setFilterCategory('');
                                    setFilterFrom('');
                                    setFilterTo('');
                                }}
                                className="mt-3 text-xs text-[#465fff] hover:underline"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>

                    {/* ── Table ──────────────────────────────────────────── */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                        <div className="max-w-full overflow-x-auto">
                            <Table>
                                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                    <TableRow>
                                        {['Guide', 'Tour', 'Category', 'Description', 'Amount', 'Date', 'Receipt', 'Status', 'Actions'].map((h) => (
                                            <TableCell key={h} isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap">
                                                {h}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                    {filtered.map((req) => {
                                        const emp = MOCK_EMPLOYEES.find((e) => e.id === req.employeeId);
                                        return (
                                            <TableRow
                                                key={req.id}
                                                className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                                            >
                                                {/* Guide */}
                                                <TableCell className="px-5 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className={`w-8 h-8 rounded-full ${emp?.colorClass ?? 'bg-gray-400'} flex items-center justify-center text-white text-xs font-semibold shrink-0`}>
                                                            {emp?.initials ?? '?'}
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {req.employeeName}
                                                        </span>
                                                    </div>
                                                </TableCell>

                                                {/* Tour */}
                                                <TableCell className="px-5 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                                        {req.tourName ?? <span className="text-gray-400">—</span>}
                                                    </span>
                                                </TableCell>

                                                {/* Category */}
                                                <TableCell className="px-5 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${CATEGORY_STYLES[req.category]}`}>
                                                        {CATEGORY_LABELS[req.category]}
                                                    </span>
                                                </TableCell>

                                                {/* Description */}
                                                <TableCell className="px-5 py-4 max-w-[200px]">
                                                    <p
                                                        className="text-sm text-gray-700 dark:text-gray-300 truncate cursor-pointer hover:text-[#465fff]"
                                                        onClick={() => { setSelectedRequest(req); setDetailOpen(true); }}
                                                        title={req.description}
                                                    >
                                                        {req.description}
                                                    </p>
                                                </TableCell>

                                                {/* Amount */}
                                                <TableCell className="px-5 py-4 whitespace-nowrap">
                                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {formatJPY(req.amountJpy)}
                                                    </span>
                                                </TableCell>

                                                {/* Date */}
                                                <TableCell className="px-5 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-gray-600 dark:text-gray-300">{req.date}</span>
                                                </TableCell>

                                                {/* Receipt */}
                                                <TableCell className="px-5 py-4 whitespace-nowrap">
                                                    {req.receiptFile ? (
                                                        <span title={req.receiptFile} className="flex items-center gap-1 text-[#465fff] text-xs font-medium">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                            </svg>
                                                            File
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-300 dark:text-gray-600">—</span>
                                                    )}
                                                </TableCell>

                                                {/* Status */}
                                                <TableCell className="px-5 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${STATUS_STYLES[req.status]}`}>
                                                        {req.status.charAt(0) + req.status.slice(1).toLowerCase()}
                                                    </span>
                                                </TableCell>

                                                {/* Actions */}
                                                <TableCell className="px-5 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        {req.status === 'PENDING' && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleApprove(req.id)}
                                                                    className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-medium transition-colors"
                                                                >
                                                                    Approve
                                                                </button>
                                                                <button
                                                                    onClick={() => handleReject(req.id)}
                                                                    className="px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium transition-colors"
                                                                >
                                                                    Reject
                                                                </button>
                                                            </>
                                                        )}
                                                        <button
                                                            onClick={() => openEditModal(req)}
                                                            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-200 transition-colors"
                                                            title="Edit"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(req.id)}
                                                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                            title="Delete"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>

                        {filtered.length === 0 && (
                            <div className="py-16 text-center text-gray-400 dark:text-gray-600">
                                No expense requests match your filters.
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* ── Add / Edit Modal ──────────────────────────────────────────── */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} className="max-w-[580px] m-4">
                <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-10">
                    <div className="pr-10 mb-6">
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                            {editingId !== null ? 'Edit Request' : 'Submit Expense Request'}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Fill in the expense details below
                        </p>
                    </div>

                    <div className="space-y-4">
                        {/* Guide + Tour */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label required>Guide</Label>
                                <Select
                                    value={form.employeeId}
                                    placeholder="Select guide"
                                    options={MOCK_EMPLOYEES.map((e) => ({ value: String(e.id), label: e.name }))}
                                    onChange={(v) => setForm({ ...form, employeeId: v })}
                                />
                            </div>
                            <div>
                                <Label>Tour <span className="text-gray-400 font-normal">(optional)</span></Label>
                                <Select
                                    value={form.tourId}
                                    placeholder="Select tour"
                                    options={TOURS.map((t) => ({ value: String(t.id), label: t.name }))}
                                    onChange={(v) => setForm({ ...form, tourId: v })}
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <Label required>Category</Label>
                            <Select
                                value={form.category}
                                placeholder="Select category"
                                options={CATEGORY_OPTIONS}
                                onChange={(v) => setForm({ ...form, category: v })}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <Label required>Description</Label>
                            <Input
                                type="text"
                                placeholder="Brief description of the expense"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                            />
                        </div>

                        {/* Amount + Date */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label required>Amount (JPY)</Label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 3500"
                                    value={form.amountJpy}
                                    min="0"
                                    onChange={(e) => setForm({ ...form, amountJpy: e.target.value })}
                                />
                                {form.amountJpy && (
                                    <p className="mt-1 text-xs text-gray-400">
                                        {formatJPY(Number(form.amountJpy))}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label required>Date</Label>
                                <Input
                                    type="date"
                                    value={form.date}
                                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Receipt upload */}
                        <div>
                            <Label>Receipt <span className="text-gray-400 font-normal">(optional)</span></Label>
                            <label className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border border-dashed border-gray-300 cursor-pointer hover:border-[#465fff] hover:bg-blue-50/30 transition-colors dark:border-gray-700 dark:hover:border-[#465fff] dark:hover:bg-[#465fff]/5">
                                <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {form.receiptFile || 'Click to upload receipt (image / PDF)'}
                                </span>
                                <input
                                    type="file"
                                    accept="image/*,.pdf"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) setForm({ ...form, receiptFile: file.name });
                                    }}
                                />
                            </label>
                            {form.receiptFile && (
                                <button
                                    onClick={() => setForm({ ...form, receiptFile: '' })}
                                    className="mt-1 text-xs text-red-400 hover:text-red-600"
                                >
                                    Remove
                                </button>
                            )}
                        </div>

                        {/* Notes */}
                        <div>
                            <Label>Notes <span className="text-gray-400 font-normal">(optional)</span></Label>
                            <textarea
                                rows={3}
                                value={form.notes}
                                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                placeholder="Any additional context for the reviewer…"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#465fff] focus:outline-none focus:ring-2 focus:ring-[#465fff]/20 dark:bg-gray-900 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-7 lg:justify-end">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!form.employeeId || !form.category || !form.description || !form.amountJpy || !form.date}
                            className="px-6 py-2.5 rounded-lg bg-[#465fff] hover:bg-[#3a52e0] disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
                        >
                            {editingId !== null ? 'Save Changes' : 'Submit Request'}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* ── Detail Modal ──────────────────────────────────────────────── */}
            <Modal isOpen={detailOpen} onClose={() => setDetailOpen(false)} className="max-w-[480px] m-4">
                {selectedRequest && (
                    <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-10">
                        <div className="pr-10 mb-5">
                            <div className="flex items-center justify-between">
                                <h4 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                                    Request Details
                                </h4>
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${STATUS_STYLES[selectedRequest.status]}`}>
                                    {selectedRequest.status.charAt(0) + selectedRequest.status.slice(1).toLowerCase()}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Guide */}
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-white/[0.08]">
                                {(() => {
                                    const emp = MOCK_EMPLOYEES.find((e) => e.id === selectedRequest.employeeId);
                                    return (
                                        <>
                                            <div className={`w-10 h-10 rounded-full ${emp?.colorClass ?? 'bg-gray-400'} flex items-center justify-center text-white text-sm font-semibold`}>
                                                {emp?.initials ?? '?'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRequest.employeeName}</p>
                                                <p className="text-xs text-gray-400">Submitted: {selectedRequest.submittedAt}</p>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>

                            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                                {[
                                    { label: 'Tour',        value: selectedRequest.tourName ?? '—' },
                                    { label: 'Date',        value: selectedRequest.date },
                                    { label: 'Category',    value: CATEGORY_LABELS[selectedRequest.category] },
                                    { label: 'Amount',      value: formatJPY(selectedRequest.amountJpy) },
                                    { label: 'Receipt',     value: selectedRequest.receiptFile ?? '—' },
                                    { label: 'Reviewed',    value: selectedRequest.reviewedAt ?? '—' },
                                ].map(({ label, value }) => (
                                    <div key={label}>
                                        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">{value}</p>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <p className="text-xs text-gray-400 mb-0.5">Description</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{selectedRequest.description}</p>
                            </div>

                            {selectedRequest.notes && (
                                <div>
                                    <p className="text-xs text-gray-400 mb-0.5">Notes</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">{selectedRequest.notes}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-3 mt-7">
                            {selectedRequest.status === 'PENDING' && (
                                <>
                                    <button
                                        onClick={() => { handleApprove(selectedRequest.id); setDetailOpen(false); }}
                                        className="flex-1 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => { handleReject(selectedRequest.id); setDetailOpen(false); }}
                                        className="flex-1 py-2.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 text-sm font-medium transition-colors"
                                    >
                                        Reject
                                    </button>
                                </>
                            )}
                            <button
                                onClick={() => setDetailOpen(false)}
                                className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03] transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}
