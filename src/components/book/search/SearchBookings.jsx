import React, { useState } from 'react';
import Label from '../../form/Label';
import Select from '../../form/Select';
import Input from '../../form/input/InputField';
import DatePicker from '../../form/date-picker';
import { useSearchBookingContext } from './context/SearchBookingContext';

function SearchBookings({ allTours }) {
    const {
        statusOptions,
        sortOptions,
        filter,
        resetSearch,
        setFilters,
        filters,
    } = useSearchBookingContext();

    // DateオブジェクトをYYYY-MM-DD形式に変換
    const convertDateObjToString = (dates, key) => {
        const dateObj = dates instanceof Date ? dates : new Date(dates);
        if (isNaN(dateObj.getTime())) return;
        // ローカルの年月日を取得
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const convertedDate = `${year}-${month}-${day}`;
        setFilters({ ...filters, [key]: convertedDate });
    };

    return (
        <div className="bg-white rounded-xl p-6 mb-6">
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {/* Status Filter */}
                    <div>
                        <Label required={true}>Status</Label>
                        <Select
                            options={statusOptions}
                            placeholder="Status"
                            value={filters.status}
                            className="dark:bg-dark-900"
                            onChange={(selectedOption) =>
                                setFilters({
                                    ...filters,
                                    status: selectedOption,
                                })
                            }
                        />
                    </div>

                    {/* Tour Filter */}
                    <div>
                        <Label required={true}>Tour</Label>
                        <Select
                            options={allTours}
                            placeholder="Tour"
                            className="dark:bg-dark-900"
                            value={filters.tour ?? ''}
                            onChange={(selectedOption) =>
                                setFilters({
                                    ...filters,
                                    tour: selectedOption,
                                })
                            }
                        />
                    </div>

                    {/* Date Range */}
                    <div>
                        <DatePicker
                            defaultDate={filters?.fromDate ?? ''}
                            id="fromDate"
                            label="From Date"
                            placeholder="Select a date"
                            onChange={(dates) => {
                                convertDateObjToString(dates, 'fromDate');
                            }}
                        />
                    </div>

                    <div>
                        <DatePicker
                            defaultDate={filters?.toDate ?? ''}
                            id="toDate"
                            label="To Date"
                            placeholder="Select a date"
                            onChange={(dates) => {
                                convertDateObjToString(dates, 'toDate');
                            }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Price Range */}
                    <div>
                        <Label>Min Price</Label>
                        <Input
                            type="number"
                            placeholder="0"
                            min="0"
                            value={filters.minPrice ?? ''}
                            onChange={(e) => {
                                setFilters({
                                    ...filters,
                                    minPrice: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div>
                        <Label>Max Price</Label>
                        <Input
                            type="number"
                            placeholder="0"
                            min="0"
                            value={filters.maxPrice ?? ''}
                            onChange={(e) => {
                                setFilters({
                                    ...filters,
                                    maxPrice: e.target.value,
                                });
                            }}
                        />
                    </div>

                    {/* Sort */}
                    <div>
                        <Label required={true}>Sort By</Label>
                        <Select
                            value={filters.sort ?? ''}
                            options={sortOptions}
                            placeholder="Tour"
                            className="dark:bg-dark-900"
                            onChange={(selectedOption) =>
                                setFilters({
                                    ...filters,
                                    sort: selectedOption,
                                })
                            }
                        />
                    </div>

                    {/* Customer Name */}
                    <div>
                        <Label>Customer Name</Label>
                        <Input
                            onChange={(e) => {
                                setFilters({
                                    ...filters,
                                    customer_name: e.target.value,
                                });
                            }}
                            value={filters.customer_name ?? ''}
                            placeholder="search by customer name..."
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end mt-4 pt-4 border-t border-gray-200">
                    <div className="flex gap-3">
                        <button
                            onClick={() => resetSearch()}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                        >
                            Clear All
                        </button>
                        <button
                            onClick={() => filter()}
                            className="px-6 py-2 bg-[#465fff] text-white rounded-lg hover:bg-[#3d51e8] font-medium transition-colors"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
            {/* )} */}
        </div>
    );
}

export default SearchBookings;
