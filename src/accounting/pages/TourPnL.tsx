import React, { useState, useMemo } from 'react';
import { TourPnLRow } from '../types';
import { formatJPY, formatDate } from '../utils/formatters';
import { exportToCSV } from '../utils/csvExport';

const TOUR_TYPES: Record<number, string> = {
    1: 'private',
    2: 'group',
    3: 'standard',
    4: 'group',
    5: 'private',
    6: 'standard',
};

const ALL_ROWS: TourPnLRow[] = [
    {
        tourId: 1,
        tourName: 'Tokyo City Highlights',
        tourDate: '2026/01/15',
        revenue: 300000,
        expenses: 53000,
        guidePay: 43000,
        netProfit: 204000,
    },
    {
        tourId: 2,
        tourName: 'Mt. Fuji Day Trip',
        tourDate: '2026/01/20',
        revenue: 90000,
        expenses: 40000,
        guidePay: 25000,
        netProfit: 25000,
    },
    {
        tourId: 3,
        tourName: 'Kyoto Cultural Tour',
        tourDate: '2026/02/05',
        revenue: 85000,
        expenses: 53000,
        guidePay: 60000,
        netProfit: -28000,
    },
    {
        tourId: 4,
        tourName: 'Nara Deer Park',
        tourDate: '2026/02/12',
        revenue: 70000,
        expenses: 37000,
        guidePay: 18000,
        netProfit: 15000,
    },
    {
        tourId: 5,
        tourName: 'Osaka Food Tour',
        tourDate: '2026/02/28',
        revenue: 120000,
        expenses: 32000,
        guidePay: 45000,
        netProfit: 43000,
    },
    {
        tourId: 6,
        tourName: 'Hakone & Onsen',
        tourDate: '2026/03/10',
        revenue: 95000,
        expenses: 68000,
        guidePay: 36000,
        netProfit: -9000,
    },
];

const tourTypeBadgeClass = (type: string) => {
    if (type === 'private')
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
    if (type === 'group')
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
};

export default function TourPnL() {
    const [filterFrom, setFilterFrom] = useState('');
    const [filterTo, setFilterTo] = useState('');
    const [applied, setApplied] = useState({ from: '', to: '' });

    const filtered = useMemo(() => {
        return ALL_ROWS.filter((row) => {
            const dateKey = row.tourDate.replace(/\//g, '-');
            if (applied.from && dateKey < applied.from) return false;
            if (applied.to && dateKey > applied.to) return false;
            return true;
        });
    }, [applied]);

    const handleApply = () => setApplied({ from: filterFrom, to: filterTo });
    const handleReset = () => {
        setFilterFrom('');
        setFilterTo('');
        setApplied({ from: '', to: '' });
    };

    const totalRevenue = filtered.reduce((s, r) => s + r.revenue, 0);
    const totalExpenses = filtered.reduce((s, r) => s + r.expenses, 0);
    const totalGuidePay = filtered.reduce((s, r) => s + r.guidePay, 0);
    const totalNet = filtered.reduce((s, r) => s + r.netProfit, 0);

    const handleExport = () => {
        const data = filtered.map((r) => ({
            tourId: r.tourId,
            tourName: r.tourName,
            tourDate: r.tourDate,
            type: TOUR_TYPES[r.tourId] ?? '',
            revenue: r.revenue,
            expenses: r.expenses,
            guidePay: r.guidePay,
            netProfit: r.netProfit,
        }));
        exportToCSV(data as Record<string, unknown>[], 'tour-pnl');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <main className="pb-10">
                <div className="container mx-auto ">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Tour P&L
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Profit & Loss breakdown per tour
                            </p>
                        </div>
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
                    </div>

                    {/* Filter Bar */}
                    <div className="bg-white rounded-xl border border-gray-200 p-4 dark:bg-white/[0.03] dark:border-white/[0.05] mb-6">
                        <div className="flex flex-wrap items-end gap-3">
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
                            <button
                                onClick={handleApply}
                                className="px-4 py-2 text-sm font-medium rounded-lg bg-[#465fff] hover:bg-[#3a52e6] text-white transition-colors"
                            >
                                Apply
                            </button>
                            <button
                                onClick={handleReset}
                                className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-gray-300 dark:hover:bg-white/[0.06] transition-colors"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-xl border border-gray-200 p-4 dark:bg-white/[0.03] dark:border-white/[0.05]">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Total Revenue
                            </p>
                            <p className="text-xl font-bold text-green-600 dark:text-green-400">
                                {formatJPY(totalRevenue)}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4 dark:bg-white/[0.03] dark:border-white/[0.05]">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Total Expenses
                            </p>
                            <p className="text-xl font-bold text-red-500 dark:text-red-400">
                                {formatJPY(totalExpenses)}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4 dark:bg-white/[0.03] dark:border-white/[0.05]">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Total Guide Pay
                            </p>
                            <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
                                {formatJPY(totalGuidePay)}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-4 dark:bg-white/[0.03] dark:border-white/[0.05]">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Net Profit
                            </p>
                            <p
                                className={`text-2xl font-bold ${totalNet >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}
                            >
                                {totalNet >= 0 ? '▲ ' : '▼ '}
                                {formatJPY(Math.abs(totalNet))}
                            </p>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl border border-gray-200 dark:bg-white/[0.03] dark:border-white/[0.05] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 dark:bg-white/[0.02] border-b border-gray-200 dark:border-white/[0.05]">
                                    <tr>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                                            Tour
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                            Date
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                                            Type
                                        </th>
                                        <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                                            Revenue
                                        </th>
                                        <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                                            Expenses
                                        </th>
                                        <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                            Guide Pay
                                        </th>
                                        <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                            Net Profit
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
                                                No tour data in selected range
                                            </td>
                                        </tr>
                                    )}
                                    {filtered.map((row) => {
                                        const isLoss = row.netProfit < 0;
                                        const tourType =
                                            TOUR_TYPES[row.tourId] ??
                                            'standard';
                                        return (
                                            <tr
                                                key={row.tourId}
                                                className={`transition-colors ${isLoss ? 'bg-red-50 dark:bg-red-900/10' : 'hover:bg-gray-50 dark:hover:bg-white/[0.02]'}`}
                                            >
                                                <td className="py-3 px-4 font-medium text-gray-800 dark:text-white">
                                                    {row.tourName}
                                                </td>
                                                <td className="py-3 px-4 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                    {formatDate(row.tourDate)}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span
                                                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${tourTypeBadgeClass(tourType)}`}
                                                    >
                                                        {tourType}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-right font-medium text-green-600 dark:text-green-400 whitespace-nowrap">
                                                    {formatJPY(row.revenue)}
                                                </td>
                                                <td className="py-3 px-4 text-right font-medium text-red-500 dark:text-red-400 whitespace-nowrap">
                                                    {formatJPY(row.expenses)}
                                                </td>
                                                <td className="py-3 px-4 text-right font-medium text-amber-600 dark:text-amber-400 whitespace-nowrap">
                                                    {formatJPY(row.guidePay)}
                                                </td>
                                                <td
                                                    className={`py-3 px-4 text-right font-bold whitespace-nowrap ${isLoss ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}
                                                >
                                                    {isLoss ? '▼ ' : '▲ '}
                                                    {formatJPY(
                                                        Math.abs(row.netProfit)
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                {filtered.length > 0 && (
                                    <tfoot className="border-t-2 border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.02]">
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-300"
                                            >
                                                Totals ({filtered.length} tours)
                                            </td>
                                            <td className="py-3 px-4 text-right font-bold text-green-600 dark:text-green-400 whitespace-nowrap">
                                                {formatJPY(totalRevenue)}
                                            </td>
                                            <td className="py-3 px-4 text-right font-bold text-red-500 dark:text-red-400 whitespace-nowrap">
                                                {formatJPY(totalExpenses)}
                                            </td>
                                            <td className="py-3 px-4 text-right font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">
                                                {formatJPY(totalGuidePay)}
                                            </td>
                                            <td
                                                className={`py-3 px-4 text-right font-bold whitespace-nowrap ${totalNet >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                                            >
                                                {totalNet >= 0 ? '▲ ' : '▼ '}
                                                {formatJPY(Math.abs(totalNet))}
                                            </td>
                                        </tr>
                                    </tfoot>
                                )}
                            </table>
                        </div>
                    </div>

                    {/* Margin Insights */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {filtered.map((row) => {
                            const margin =
                                row.revenue > 0
                                    ? (
                                          (row.netProfit / row.revenue) *
                                          100
                                      ).toFixed(1)
                                    : '0.0';
                            const isLoss = row.netProfit < 0;
                            return (
                                <div
                                    key={row.tourId}
                                    className={`bg-white rounded-xl border p-4 dark:bg-white/[0.03] ${isLoss ? 'border-red-200 dark:border-red-900/30' : 'border-gray-200 dark:border-white/[0.05]'}`}
                                >
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <p className="text-sm font-semibold text-gray-800 dark:text-white leading-snug">
                                            {row.tourName}
                                        </p>
                                        <span
                                            className={`text-xs font-bold px-2 py-0.5 rounded shrink-0 ${isLoss ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}
                                        >
                                            {isLoss ? '' : '+'}
                                            {margin}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-white/[0.06] rounded-full h-1.5 mb-3">
                                        <div
                                            className={`h-1.5 rounded-full transition-all ${isLoss ? 'bg-red-400' : 'bg-[#465fff]'}`}
                                            style={{
                                                width: `${Math.min(100, Math.max(0, row.revenue > 0 ? (row.netProfit / row.revenue) * 100 : 0))}%`,
                                            }}
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 gap-1 text-xs">
                                        <div>
                                            <p className="text-gray-400 dark:text-gray-500">
                                                Revenue
                                            </p>
                                            <p className="font-medium text-gray-700 dark:text-gray-300">
                                                {formatJPY(row.revenue)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 dark:text-gray-500">
                                                Costs
                                            </p>
                                            <p className="font-medium text-gray-700 dark:text-gray-300">
                                                {formatJPY(
                                                    row.expenses + row.guidePay
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 dark:text-gray-500">
                                                Net
                                            </p>
                                            <p
                                                className={`font-bold ${isLoss ? 'text-red-500 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}
                                            >
                                                {formatJPY(row.netProfit)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
