import React, { useEffect, useState } from 'react';
import { useBookingContext } from '../book/context/BookingContext';

interface PaginationProps {
    lastPage: number;
    onPageChange: (page: number) => void;
    currentPage: number;
    setPage: (num: number) => void;
    page: number;
}

function Pagination(args: PaginationProps) {
    const { lastPage, onPageChange, currentPage, setPage, page } = args;

    const getPageNumbers = (): (number | '...')[] => {
        if (lastPage <= 6) {
            return Array.from({ length: lastPage }, (_, i) => i + 1);
        }
        const pages: (number | '...')[] = [1];
        if (currentPage > 3) pages.push('...');
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(lastPage - 1, currentPage + 1);
        for (let i = start; i <= end; i++) pages.push(i);
        if (currentPage < lastPage - 2) pages.push('...');
        pages.push(lastPage);
        return pages;
    };

    return (
        <>
            <div className="flex space-x-2">
                <button
                    disabled={page == 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                {getPageNumbers().map((p, i) =>
                    p === '...' ? (
                        <span
                            key={`ellipsis-${i}`}
                            className="px-3 py-2 text-sm text-gray-500 select-none"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => onPageChange(p)}
                            className={`px-3 py-2 border rounded-lg text-sm font-medium ${currentPage === p ? 'text-white hover:bg-[#7592ff] border-[#465fff] bg-[#465fff]' : 'text-gray-700 bg-white hover:bg-gray-50 border-gray-200'}`}
                        >
                            {p}
                        </button>
                    )
                )}
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page == lastPage}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </>
    );
}

export default Pagination;
