import React, { useState } from 'react'
import Label from '../../form/Label'
import Select from '../../form/Select'
import Input from '../../form/input/InputField'
import DatePicker from '../../form/date-picker'
import { useSearchBookingContext } from './context/SearchBookingContext'

function SearchBookings({ allTours }) {
    const {
        statusOptions,
        sortOptions,
        filter,
        setSearchByStatus,
        setSearchByTour,
        resetSearch,
        setMinPrice,
        setMaxPrice,
    } = useSearchBookingContext()
    const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false)

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            {/* シンプル検索バー */}
            <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                    <Input
                        name="last_name"
                        id="last_name"
                        placeholder="Search bookings by customer name, email, or tour..."
                    />
                </div>

                <button
                    onClick={() =>
                        setIsAdvancedFilterOpen(!isAdvancedFilterOpen)
                    }
                    className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        />
                    </svg>
                    <span className="font-medium text-md">
                        Advanced Filters
                    </span>
                </button>
            </div>

            {/* 高機能フィルタパネル（折りたたみ可能） */}
            {isAdvancedFilterOpen && (
                <div className="border-t border-gray-200 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        {/* Status Filter */}
                        <div>
                            <Label required={true}>Status</Label>
                            <Select
                                options={statusOptions}
                                placeholder="Status"
                                className="dark:bg-dark-900"
                                onChange={(selectedOption) =>
                                    setSearchByStatus(selectedOption)
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
                                onChange={(selectedOption) =>
                                    setSearchByTour(selectedOption)
                                }
                            />
                        </div>

                        {/* Date Range */}
                        <div>
                            {/* <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            From Date
                                        </label> */}
                            <DatePicker
                                // defaultDate={bookingData?.tour_date}
                                id="date-picker"
                                label="From Date"
                                placeholder="Select a date"
                            />
                        </div>

                        <div>
                            <DatePicker
                                // defaultDate={bookingData?.tour_date}
                                id="date-picker"
                                label="To Date"
                                placeholder="Select a date"
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
                                onChange={(e) => {
                                    setMinPrice(e.target.value)
                                }}
                            />
                        </div>

                        <div>
                            <Label>Max Price</Label>
                            <Input
                                type="number"
                                placeholder="0"
                                min="0"
                                onChange={(e) => {
                                    setMaxPrice(e.target.value)
                                }}
                            />
                        </div>

                        {/* Sort */}
                        <div>
                            <Label required={true}>Sort By</Label>
                            <Select
                                options={sortOptions}
                                placeholder="Tour"
                                className="dark:bg-dark-900"
                            />
                        </div>

                        {/* Participants */}
                        <div>
                            <Label required={true}>Participants</Label>
                            <Select
                                options={[
                                    'All Status',
                                    'Upcoming',
                                    'Completed',
                                    'Cancelled',
                                    'Pending',
                                ]}
                                placeholder="Tour"
                                className="dark:bg-dark-900"
                            />
                            {/* <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Participants
                                        </label>
                                        <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9cb9ff] focus:border-[#465fff] bg-white text-gray-600">
                                            <option>Any Number</option>
                                            <option>1 person</option>
                                            <option>2-3 people</option>
                                            <option>4-5 people</option>
                                            <option>6+ people</option>
                                        </select> */}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-500">
                            <span className="font-medium">3 filters</span>{' '}
                            applied
                        </div>
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
            )}
        </div>
    )
}

export default SearchBookings
