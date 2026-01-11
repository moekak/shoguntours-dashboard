import React, { useEffect, useState } from 'react';
import { useBookingContext } from '../book/context/BookingContext';

interface PaginationProps {
    lastPage: number;
    onPageChange: (page: number) => void;
    currentPage: number;
}

function Pagination(args: PaginationProps) {
    const { lastPage, onPageChange, currentPage } = args;

    return (
        <>
            <div className="flex space-x-2">
                <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                    Previous
                </button>
                {Array.from({ length: lastPage }, (_, i) => i + 1).map(
                    (page) => (
                        <button
                            onClick={() => {
                                onPageChange(page);
                            }}
                            className={`px-3 py-2 border border-[#465fff] bg-[#465fff] rounded-lg text-sm font-medium ${currentPage === page ? 'text-white hover:bg-[#7592ff] border-[#465fff] bg-[#465fff]' : 'text-gray-700 bg-white hover:bg-gray-50 border-gray-200'}`}
                        >
                            {page}
                        </button>
                    )
                )}
                <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Next
                </button>
            </div>
        </>
    );
}

export default Pagination;
