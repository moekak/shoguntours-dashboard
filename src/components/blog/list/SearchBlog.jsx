import React, { useEffect } from 'react';
import { useBlogsContext } from '../context/BlogsContext';

function SearchBlog({ blogCategories }) {
    const {
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        filter,
        selectedStatus,
        setSelectedStatus,
    } = useBlogsContext();

    useEffect(() => {
        console.log(searchTerm);
        console.log(selectedCategory);

        filter();
    }, [searchTerm, selectedCategory, selectedStatus]);
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                {/* Search */}
                <div className="w-full lg:w-80">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-500"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <svg
                                className="w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                    {/* Category Filter */}
                    <div className="flex flex-col sm:flex-row gap-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap self-center">
                            Category:
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }
                            className="h-10 px-3 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white min-w-[150px]"
                        >
                            <option value="all">All Categories</option>
                            {blogCategories?.map((category, index) => (
                                <option
                                    key={`category-${category.id}-${index}`}
                                    value={category.id}
                                >
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* status */}
                    <div className="flex flex-col sm:flex-row gap-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap self-center">
                            Status:
                        </label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="h-10 px-3 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white min-w-[120px]"
                        >
                            <option value="all">All Status</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchBlog;
