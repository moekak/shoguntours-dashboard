import React, { useEffect } from 'react'
import { useToursContext } from '../context/ToursContext'

function SearchTour({categories, regions}) {
      const {searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, filter, selectedRegions, setSelectedRegions, setSelectedStatus, selectedStatus} = useToursContext()

      useEffect(()=>{
            filter()

      },[searchTerm, selectedCategory, selectedRegions, selectedStatus])

      return (
            <div className="bg-white rounded-xl border border-gray-200 p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
                  <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        {/* Search */}
                        <div className="w-full lg:w-80">
                              <div className="relative">
                                    <input
                                          type="text"
                                          placeholder="Search tours..."
                                          onChange={(e) => setSearchTerm(e.target.value)}
                                          value={searchTerm}
                                          className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-500"
                                    />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
                                          onChange={(e) => setSelectedCategory(e.target.value)}
                                          className="h-10 px-3 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white min-w-[150px]"
                                    >
                                          <option value="all">All Categories</option>
                                          {categories?.map((category, index)=>(
                                                <option key={`category-${category.id}-${index}`} value={category.id}>{category.category}</option>
                                          ))}
                                    </select>
                              </div>

                              {/* Region Filter */}
                              <div className="flex flex-col sm:flex-row gap-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap self-center">
                                          Regions:
                                    </label>
                                    <select
                                          value={selectedRegions}
                                          onChange={(e) => setSelectedRegions(e.target.value)}
                                          className="h-10 px-3 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white min-w-[150px]"
                                    >
                                          <option value="all">All Regions</option>
                                          {regions?.map(region => (
                                                <option key={region.id} value={region.id}>{region.region}</option>
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

                              {/* Clear Filters */}
                              {/* {(selectedCategory !== 'all' || selectedStatus !== 'all' || searchTerm !== '') && (
                                    <button
                                          onClick={() => {
                                                setSelectedCategory('all');
                                                setSelectedStatus('all');
                                                setSearchTerm('');
                                          }}
                                          className="h-10 px-4 text-sm font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                                    >
                                          Clear Filters
                                    </button>
                              )} */}
                        </div>
                  </div>
            </div>
      )
}

export default SearchTour