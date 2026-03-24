import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { REVENUES, EXPENSES, GUIDE_PAYMENTS } from '../data/mockData';
import { GuidePayment } from '../types';
import { formatJPY, formatDate } from '../utils/formatters';

const totalRevenue = REVENUES.filter((r) => r.status === 'PAID').reduce(
    (s, r) => s + r.amountJpy,
    0
);
const totalExpenses = EXPENSES.filter((e) => e.status === 'APPROVED').reduce(
    (s, e) => s + e.amountJpy,
    0
);
const paidGuidePay = GUIDE_PAYMENTS.filter((g) => g.status === 'PAID').reduce(
    (s, g) => s + g.amountJpy,
    0
);
const netProfit = totalRevenue - totalExpenses - paidGuidePay;
const unpaidSalaries = GUIDE_PAYMENTS.filter(
    (g) => g.status === 'UNPAID'
).reduce((s, g) => s + g.amountJpy, 0);

const barOptions: ApexOptions = {
    chart: {
        type: 'bar',
        fontFamily: 'Outfit, sans-serif',
        toolbar: { show: false },
    },
    plotOptions: {
        bar: { columnWidth: '55%', borderRadius: 4 },
    },
    colors: ['#465fff', '#f87171'],
    dataLabels: { enabled: false },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        labels: { style: { colors: '#6b7280', fontSize: '12px' } },
        axisBorder: { show: false },
        axisTicks: { show: false },
    },
    yaxis: {
        labels: {
            formatter: (val: number) => `¥${(val / 1000).toFixed(0)}k`,
            style: { colors: '#6b7280', fontSize: '12px' },
        },
    },
    tooltip: {
        y: {
            formatter: (val: number) => `¥${val.toLocaleString('ja-JP')}`,
        },
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left',
        fontFamily: 'Outfit, sans-serif',
        fontSize: '13px',
    },
    grid: {
        borderColor: '#f3f4f6',
        strokeDashArray: 4,
    },
};

const barSeries = [
    {
        name: 'Revenue',
        data: [390000, 275000, 190000, 0, 0, 0],
    },
    {
        name: 'Expenses',
        data: [93000, 122000, 93000, 0, 0, 0],
    },
];

const donutOptions: ApexOptions = {
    chart: {
        type: 'donut',
        fontFamily: 'Outfit, sans-serif',
        toolbar: { show: false },
    },
    labels: [
        'Transportation',
        'Accommodation',
        'Meals',
        'Entrance Fees',
        'Equipment',
        'Marketing',
    ],
    colors: ['#465fff', '#22c55e', '#f59e0b', '#f87171', '#8b5cf6', '#06b6d4'],
    legend: {
        position: 'bottom',
        fontFamily: 'Outfit, sans-serif',
        fontSize: '12px',
    },
    dataLabels: {
        enabled: true,
        formatter: (
            _val: number,
            opts: { w: { globals: { labels: string[] } }; seriesIndex: number }
        ) => opts.w.globals.labels[opts.seriesIndex],
        style: { fontSize: '11px', fontFamily: 'Outfit, sans-serif' },
        dropShadow: { enabled: false },
    },
    plotOptions: {
        pie: {
            donut: {
                size: '65%',
                labels: {
                    show: true,
                    total: {
                        show: true,
                        label: 'Approved',
                        formatter: () => formatJPY(totalExpenses),
                        fontSize: '13px',
                        fontFamily: 'Outfit, sans-serif',
                    },
                },
            },
        },
    },
    tooltip: {
        y: {
            formatter: (val: number) => `¥${val.toLocaleString('ja-JP')}`,
        },
    },
};

const donutSeries = [35000, 113000, 33000, 20000, 0, 25000];

type TransactionItem = {
    date: string;
    description: string;
    type: 'Revenue' | 'Expense';
    amount: number;
    status: string;
};

const recentTransactions: TransactionItem[] = [
    {
        date: '2026/03/15',
        description: 'Social media ads',
        type: 'Expense',
        amount: 25000,
        status: 'APPROVED',
    },
    {
        date: '2026/03/11',
        description: 'Hakone & Onsen',
        type: 'Revenue',
        amount: 95000,
        status: 'REFUNDED',
    },
    {
        date: '2026/03/10',
        description: 'Onsen resort deposit',
        type: 'Expense',
        amount: 68000,
        status: 'APPROVED',
    },
    {
        date: '2026/03/10',
        description: 'Hakone & Onsen',
        type: 'Revenue',
        amount: 95000,
        status: 'PENDING',
    },
    {
        date: '2026/02/28',
        description: 'Camera gear rental',
        type: 'Expense',
        amount: 18000,
        status: 'REJECTED',
    },
    {
        date: '2026/02/28',
        description: 'Osaka Food Tour',
        type: 'Revenue',
        amount: 120000,
        status: 'PAID',
    },
    {
        date: '2026/02/28',
        description: 'Food tour supplies',
        type: 'Expense',
        amount: 32000,
        status: 'PENDING',
    },
    {
        date: '2026/02/12',
        description: 'Nara Deer Park',
        type: 'Revenue',
        amount: 35000,
        status: 'PENDING',
    },
];

const statusBadgeClass = (status: string) => {
    if (status === 'APPROVED' || status === 'PAID')
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    if (status === 'PENDING')
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
    if (status === 'REJECTED')
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    if (status === 'REFUNDED')
        return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
    return 'bg-gray-100 text-gray-600';
};

export default function AccountingDashboard() {
    const [guidePayments, setGuidePayments] =
        useState<GuidePayment[]>(GUIDE_PAYMENTS);

    const unpaidPayments = guidePayments.filter((g) => g.status === 'UNPAID');

    const markPaid = (id: number) => {
        const today = new Date().toISOString().slice(0, 10).replace(/-/g, '/');
        setGuidePayments((prev) =>
            prev.map((g) =>
                g.id === id ? { ...g, status: 'PAID', paidAt: today } : g
            )
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <main className="pb-10">
                <div className="container mx-auto ">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Accounting Overview
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Financial summary and key metrics
                        </p>
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                        {/* Total Revenue */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 dark:bg-white/[0.03] dark:border-white/[0.05]">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Total Revenue
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
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {formatJPY(totalRevenue)}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Paid invoices only
                            </p>
                        </div>

                        {/* Total Expenses */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 dark:bg-white/[0.03] dark:border-white/[0.05]">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Total Expenses
                                </span>
                                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-100 dark:bg-red-900/30">
                                    <svg
                                        className="w-5 h-5 text-red-500 dark:text-red-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <p className="text-2xl font-bold text-red-500 dark:text-red-400">
                                {formatJPY(totalExpenses)}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Approved expenses only
                            </p>
                        </div>

                        {/* Net Profit */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 dark:bg-white/[0.03] dark:border-white/[0.05]">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Net Profit
                                </span>
                                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                    <svg
                                        className="w-5 h-5 text-blue-600 dark:text-blue-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {formatJPY(netProfit)}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Revenue − Expenses − Salaries
                            </p>
                        </div>

                        {/* Unpaid Salaries */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 dark:bg-white/[0.03] dark:border-white/[0.05]">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Unpaid Salaries
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
                                {formatJPY(unpaidSalaries)}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Outstanding guide payments
                            </p>
                        </div>
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
                        {/* Bar Chart */}
                        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-5 dark:bg-white/[0.03] dark:border-white/[0.05]">
                            <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
                                Monthly Revenue vs Expenses
                            </h2>
                            <Chart
                                options={barOptions}
                                series={barSeries}
                                type="bar"
                                height={280}
                            />
                        </div>

                        {/* Donut Chart */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 dark:bg-white/[0.03] dark:border-white/[0.05]">
                            <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
                                Expenses by Category
                            </h2>
                            <Chart
                                options={donutOptions}
                                series={donutSeries}
                                type="donut"
                                height={280}
                            />
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                        {/* Recent Transactions */}
                        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-5 dark:bg-white/[0.03] dark:border-white/[0.05]">
                            <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
                                Recent Transactions
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-100 dark:border-white/[0.05]">
                                            <th className="text-left py-2 px-2 font-medium text-gray-500 dark:text-gray-400">
                                                Date
                                            </th>
                                            <th className="text-left py-2 px-2 font-medium text-gray-500 dark:text-gray-400">
                                                Description
                                            </th>
                                            <th className="text-left py-2 px-2 font-medium text-gray-500 dark:text-gray-400">
                                                Type
                                            </th>
                                            <th className="text-right py-2 px-2 font-medium text-gray-500 dark:text-gray-400">
                                                Amount
                                            </th>
                                            <th className="text-left py-2 px-2 font-medium text-gray-500 dark:text-gray-400">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-white/[0.03]">
                                        {recentTransactions.map((tx, i) => (
                                            <tr
                                                key={i}
                                                className="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                                            >
                                                <td className="py-2.5 px-2 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                    {formatDate(tx.date)}
                                                </td>
                                                <td className="py-2.5 px-2 text-gray-700 dark:text-gray-300 max-w-[160px] truncate">
                                                    {tx.description}
                                                </td>
                                                <td className="py-2.5 px-2">
                                                    <span
                                                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${tx.type === 'Revenue' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}
                                                    >
                                                        {tx.type}
                                                    </span>
                                                </td>
                                                <td
                                                    className={`py-2.5 px-2 text-right font-medium whitespace-nowrap ${tx.type === 'Revenue' ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}
                                                >
                                                    {tx.type === 'Expense'
                                                        ? '-'
                                                        : ''}
                                                    {formatJPY(tx.amount)}
                                                </td>
                                                <td className="py-2.5 px-2">
                                                    <span
                                                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusBadgeClass(tx.status)}`}
                                                    >
                                                        {tx.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Unpaid Guide Salaries */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5 dark:bg-white/[0.03] dark:border-white/[0.05]">
                            <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
                                Unpaid Guide Salaries
                            </h2>
                            {unpaidPayments.length === 0 ? (
                                <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">
                                    All salaries are paid
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {unpaidPayments.map((payment) => (
                                        <div
                                            key={payment.id}
                                            className="flex items-start justify-between p-3 rounded-lg bg-amber-50 border border-amber-100 dark:bg-amber-900/10 dark:border-amber-900/20"
                                        >
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                                                    {payment.guideName}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                                                    {payment.tourName}
                                                </p>
                                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                                    {formatDate(
                                                        payment.periodStart
                                                    )}
                                                    {payment.periodStart !==
                                                    payment.periodEnd
                                                        ? ` – ${formatDate(payment.periodEnd)}`
                                                        : ''}
                                                </p>
                                                <p className="text-sm font-bold text-amber-700 dark:text-amber-400 mt-1">
                                                    {formatJPY(
                                                        payment.amountJpy
                                                    )}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    markPaid(payment.id)
                                                }
                                                className="ml-3 mt-0.5 shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg bg-[#465fff] hover:bg-[#3a52e6] text-white transition-colors"
                                            >
                                                Mark Paid
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
