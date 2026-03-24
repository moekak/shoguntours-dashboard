import React, { useState, useMemo } from 'react';
import { Modal } from '@/components/ui/modal';
import { GuidePayment, PaymentStatus, RateType } from '../types';
import { GUIDE_PAYMENTS, GUIDES, TOURS } from '../data/mockData';
import { formatJPY, formatDate } from '../utils/formatters';
import { exportToCSV } from '../utils/csvExport';

const rateTypeLabel = (rt: RateType) => {
    if (rt === 'PER_TOUR') return 'Per Tour';
    if (rt === 'DAILY') return 'Per Day';
    return 'Per Hour';
};

const guideInitialsColor = (name: string) => {
    if (name.includes('Kenji'))
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    if (name.includes('Yuki'))
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
};

const initials = (name: string) =>
    name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

const defaultForm = () => ({
    guideId: '',
    tourId: '',
    unitsWorked: 1,
    periodStart: new Date().toISOString().slice(0, 10),
    periodEnd: new Date().toISOString().slice(0, 10),
    notes: '',
});

export default function Payroll() {
    const [payments, setPayments] = useState<GuidePayment[]>(GUIDE_PAYMENTS);
    const [filterGuide, setFilterGuide] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterTour, setFilterTour] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState(defaultForm());

    const totalPaid = payments
        .filter((p) => p.status === 'PAID')
        .reduce((s, p) => s + p.amountJpy, 0);
    const totalUnpaid = payments
        .filter((p) => p.status === 'UNPAID')
        .reduce((s, p) => s + p.amountJpy, 0);

    const filtered = useMemo(() => {
        return payments.filter((p) => {
            if (filterGuide && String(p.guideId) !== filterGuide) return false;
            if (filterStatus && p.status !== filterStatus) return false;
            if (filterTour && String(p.tourId) !== filterTour) return false;
            return true;
        });
    }, [payments, filterGuide, filterStatus, filterTour]);

    const guideStats = GUIDES.map((g) => {
        const paid = payments
            .filter((p) => p.guideId === g.id && p.status === 'PAID')
            .reduce((s, p) => s + p.amountJpy, 0);
        const unpaid = payments
            .filter((p) => p.guideId === g.id && p.status === 'UNPAID')
            .reduce((s, p) => s + p.amountJpy, 0);
        return { ...g, paid, unpaid };
    });

    const markPaid = (id: number) => {
        const today = new Date().toISOString().slice(0, 10).replace(/-/g, '/');
        setPayments((prev) =>
            prev.map((p) =>
                p.id === id
                    ? { ...p, status: 'PAID' as PaymentStatus, paidAt: today }
                    : p
            )
        );
    };

    const selectedGuide = GUIDES.find((g) => String(g.id) === form.guideId);
    const calculatedAmount = selectedGuide
        ? selectedGuide.rateJpy * (form.unitsWorked || 0)
        : 0;

    const handleSave = () => {
        if (!form.guideId || form.unitsWorked <= 0) return;
        const guide = GUIDES.find((g) => String(g.id) === form.guideId);
        if (!guide) return;
        const tour = TOURS.find((t) => String(t.id) === form.tourId);
        const newId = Math.max(0, ...payments.map((p) => p.id)) + 1;
        const newPayment: GuidePayment = {
            id: newId,
            guideId: guide.id,
            guideName: guide.name,
            tourId: tour?.id,
            tourName: tour?.name,
            amountJpy: calculatedAmount,
            unitsWorked: form.unitsWorked,
            periodStart: form.periodStart.replace(/-/g, '/'),
            periodEnd: form.periodEnd.replace(/-/g, '/'),
            status: 'UNPAID',
            notes: form.notes || undefined,
        };
        setPayments((prev) => [...prev, newPayment]);
        setModalOpen(false);
        setForm(defaultForm());
    };

    const handleExport = () => {
        const data = filtered.map((p) => ({
            id: p.id,
            guideName: p.guideName,
            tourName: p.tourName ?? '',
            periodStart: p.periodStart,
            periodEnd: p.periodEnd,
            unitsWorked: p.unitsWorked,
            amountJpy: p.amountJpy,
            status: p.status,
            paidAt: p.paidAt ?? '',
            notes: p.notes ?? '',
        }));
        exportToCSV(data as Record<string, unknown>[], 'payroll');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <main className="pb-10">
                <div className="container mx-auto ">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Payroll
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Manage guide payments and salaries
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
                                onClick={() => {
                                    setForm(defaultForm());
                                    setModalOpen(true);
                                }}
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
                                Record Payment
                            </button>
                        </div>
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-white rounded-xl border border-gray-200 p-5 dark:bg-white/[0.03] dark:border-white/[0.05]">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Total Paid
                                </span>
                                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-green-100 dark:bg-green-900/30">
                                    <svg
                                        className="w-5 h-5 text-green-600 dark:text-green-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {formatJPY(totalPaid)}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                {
                                    payments.filter((p) => p.status === 'PAID')
                                        .length
                                }{' '}
                                payments
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-5 dark:bg-white/[0.03] dark:border-white/[0.05]">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Total Unpaid
                                </span>
                                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                    <svg
                                        className="w-5 h-5 text-amber-600 dark:text-amber-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                                {formatJPY(totalUnpaid)}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                {
                                    payments.filter(
                                        (p) => p.status === 'UNPAID'
                                    ).length
                                }{' '}
                                outstanding
                            </p>
                        </div>
                    </div>

                    {/* Guide Rate Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        {guideStats.map((g) => (
                            <div
                                key={g.id}
                                className="bg-white rounded-xl border border-gray-200 p-4 dark:bg-white/[0.03] dark:border-white/[0.05]"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <span
                                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${guideInitialsColor(g.name)}`}
                                    >
                                        {initials(g.name)}
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                                            {g.name}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {rateTypeLabel(g.rateType)} ·{' '}
                                            {formatJPY(g.rateJpy)}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 dark:border-white/[0.05]">
                                    <div>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">
                                            Paid
                                        </p>
                                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                                            {formatJPY(g.paid)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">
                                            Unpaid
                                        </p>
                                        <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                                            {formatJPY(g.unpaid)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Filter Bar */}
                    <div className="bg-white rounded-xl border border-gray-200 p-4 dark:bg-white/[0.03] dark:border-white/[0.05] mb-4">
                        <div className="flex flex-wrap gap-3">
                            <div className="flex flex-col gap-1 min-w-[160px]">
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Guide
                                </label>
                                <select
                                    value={filterGuide}
                                    onChange={(e) =>
                                        setFilterGuide(e.target.value)
                                    }
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30"
                                >
                                    <option value="">All Guides</option>
                                    {GUIDES.map((g) => (
                                        <option key={g.id} value={g.id}>
                                            {g.name}
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
                                    <option value="UNPAID">Unpaid</option>
                                    <option value="PAID">Paid</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1 min-w-[180px]">
                                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Tour
                                </label>
                                <select
                                    value={filterTour}
                                    onChange={(e) =>
                                        setFilterTour(e.target.value)
                                    }
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30"
                                >
                                    <option value="">All Tours</option>
                                    {TOURS.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {(filterGuide || filterStatus || filterTour) && (
                                <div className="flex flex-col gap-1 justify-end">
                                    <label className="text-xs invisible">
                                        Clear
                                    </label>
                                    <button
                                        onClick={() => {
                                            setFilterGuide('');
                                            setFilterStatus('');
                                            setFilterTour('');
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
                                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                                            Guide
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                                            Tour
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                            Period
                                        </th>
                                        <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                                            Units
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                            Rate Type
                                        </th>
                                        <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                                            Amount
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                                            Status
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                            Paid Date
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
                                                colSpan={9}
                                                className="py-12 text-center text-gray-400 dark:text-gray-500"
                                            >
                                                No payments found
                                            </td>
                                        </tr>
                                    )}
                                    {filtered.map((p) => {
                                        const guide = GUIDES.find(
                                            (g) => g.id === p.guideId
                                        );
                                        return (
                                            <tr
                                                key={p.id}
                                                className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                                            >
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-2">
                                                        <span
                                                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${guideInitialsColor(p.guideName)}`}
                                                        >
                                                            {initials(
                                                                p.guideName
                                                            )}
                                                        </span>
                                                        <span className="text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                                            {p.guideName}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-gray-600 dark:text-gray-400 max-w-[140px] truncate">
                                                    {p.tourName ?? (
                                                        <span className="text-gray-400 dark:text-gray-500 italic">
                                                            —
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4 text-gray-600 dark:text-gray-400 whitespace-nowrap text-xs">
                                                    {formatDate(p.periodStart)}
                                                    {p.periodStart !==
                                                    p.periodEnd
                                                        ? ` – ${formatDate(p.periodEnd)}`
                                                        : ''}
                                                </td>
                                                <td className="py-3 px-4 text-center text-gray-700 dark:text-gray-300">
                                                    {p.unitsWorked}
                                                </td>
                                                <td className="py-3 px-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                    {guide
                                                        ? rateTypeLabel(
                                                              guide.rateType
                                                          )
                                                        : '—'}
                                                </td>
                                                <td className="py-3 px-4 text-right font-medium text-gray-800 dark:text-white whitespace-nowrap">
                                                    {formatJPY(p.amountJpy)}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span
                                                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${p.status === 'PAID' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}
                                                    >
                                                        {p.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-gray-500 dark:text-gray-400 whitespace-nowrap text-xs">
                                                    {p.paidAt
                                                        ? formatDate(p.paidAt)
                                                        : '—'}
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    {p.status === 'UNPAID' ? (
                                                        <button
                                                            onClick={() =>
                                                                markPaid(p.id)
                                                            }
                                                            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[#465fff] hover:bg-[#3a52e6] text-white transition-colors whitespace-nowrap"
                                                        >
                                                            Mark Paid
                                                        </button>
                                                    ) : (
                                                        <span className="flex items-center justify-center gap-1 text-xs text-green-600 dark:text-green-400">
                                                            <svg
                                                                className="w-3.5 h-3.5"
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
                                                                    d="M5 13l4 4L19 7"
                                                                />
                                                            </svg>
                                                            Paid
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-4 py-3 border-t border-gray-100 dark:border-white/[0.04] text-sm text-gray-500 dark:text-gray-400">
                            {filtered.length} of {payments.length} records
                        </div>
                    </div>
                </div>
            </main>

            {/* Record Payment Modal */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                className="max-w-lg w-full"
            >
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
                        Record Payment
                    </h2>
                    <div className="space-y-4">
                        {/* Guide */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Guide <span className="text-red-400">*</span>
                            </label>
                            <select
                                value={form.guideId}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        guideId: e.target.value,
                                    }))
                                }
                                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30"
                            >
                                <option value="">Select guide...</option>
                                {GUIDES.map((g) => (
                                    <option key={g.id} value={g.id}>
                                        {g.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Tour */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Tour{' '}
                                <span className="text-gray-400 font-normal">
                                    (optional)
                                </span>
                            </label>
                            <select
                                value={form.tourId}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        tourId: e.target.value,
                                    }))
                                }
                                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30"
                            >
                                <option value="">No specific tour</option>
                                {TOURS.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Units Worked */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Units Worked{' '}
                                <span className="text-red-400">*</span>
                                {selectedGuide && (
                                    <span className="ml-2 font-normal text-xs text-gray-400 dark:text-gray-500">
                                        ({rateTypeLabel(selectedGuide.rateType)}{' '}
                                        · {formatJPY(selectedGuide.rateJpy)}{' '}
                                        each)
                                    </span>
                                )}
                            </label>
                            <input
                                type="number"
                                min={1}
                                value={form.unitsWorked}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        unitsWorked: Number(e.target.value),
                                    }))
                                }
                                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30"
                            />
                        </div>
                        {/* Calculated Amount */}
                        {selectedGuide && (
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                                <svg
                                    className="w-4 h-4 text-[#465fff] shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                    />
                                </svg>
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    Calculated Amount:{' '}
                                    <strong className="text-[#465fff]">
                                        {formatJPY(calculatedAmount)}
                                    </strong>
                                    <span className="text-gray-400 dark:text-gray-500 ml-1 text-xs">
                                        ({formatJPY(selectedGuide.rateJpy)} ×{' '}
                                        {form.unitsWorked}{' '}
                                        {rateTypeLabel(
                                            selectedGuide.rateType
                                        ).toLowerCase()}
                                        )
                                    </span>
                                </span>
                            </div>
                        )}
                        {/* Period */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Period Start
                                </label>
                                <input
                                    type="date"
                                    value={form.periodStart}
                                    onChange={(e) =>
                                        setForm((f) => ({
                                            ...f,
                                            periodStart: e.target.value,
                                        }))
                                    }
                                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Period End
                                </label>
                                <input
                                    type="date"
                                    value={form.periodEnd}
                                    onChange={(e) =>
                                        setForm((f) => ({
                                            ...f,
                                            periodEnd: e.target.value,
                                        }))
                                    }
                                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#465fff]/30"
                                />
                            </div>
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
                                value={form.notes}
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
                            disabled={!form.guideId || form.unitsWorked <= 0}
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-[#465fff] hover:bg-[#3a52e6] text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Record Payment
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
