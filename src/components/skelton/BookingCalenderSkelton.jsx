import React from 'react';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function BookingCalenderSkelton() {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 px-2">
                {/* Left: prev / next + Add Booking */}
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                    <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse" />
                </div>

                {/* Center: Month Year title */}
                <div className="h-7 w-40 bg-gray-200 rounded animate-pulse" />

                {/* Right: view switcher */}
                <div className="flex items-center gap-1">
                    <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
                    <div className="h-8 w-14 bg-gray-200 rounded animate-pulse" />
                    <div className="h-8 w-12 bg-gray-200 rounded animate-pulse" />
                </div>
            </div>

            {/* Day-of-week header */}
            <div className="grid grid-cols-7 mb-1">
                {DAYS_OF_WEEK.map((day) => (
                    <div
                        key={day}
                        className="py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wide"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid — 6 rows × 7 days */}
            <div className="grid grid-cols-7 border-l border-t border-gray-100">
                {Array.from({ length: 42 }).map((_, i) => (
                    <div
                        key={i}
                        className="min-h-[90px] border-r border-b border-gray-100 p-2"
                    >
                        {/* Day number */}
                        <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse mb-2" />

                        {/* Random event pills on some cells */}
                        {i % 5 === 0 && (
                            <div className="h-5 w-full bg-gray-200 rounded animate-pulse mb-1" />
                        )}
                        {i % 7 === 2 && (
                            <div className="h-5 w-4/5 bg-gray-200 rounded animate-pulse" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookingCalenderSkelton;
