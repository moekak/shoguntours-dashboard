import React from 'react';
import { Skeleton } from '@mui/material';

function TourOperatorSkelton() {
      return (
            <div className="bg-gray-50 min-h-screen">
                  <main className="pb-10">
                        <div className="container mx-auto px-4">
                              {/* Page Header */}
                              <div className="mb-8 sticky">
                                    {/* Breadcrumb Skeleton */}
                                    <div className="flex items-center gap-2 text-xs mb-2">
                                          <div className="text-gray-500">Tour</div>
                                          <div className="text-gray-400">/</div>
                                          <Skeleton variant="text" width={80} height={16} />
                                    </div>
                                    
                                    {/* Title Skeleton */}
                                    <Skeleton variant="text" width={200} height={32} sx={{ marginBottom: 1 }} />
                                    
                                    {/* Description Skeleton */}
                                    <Skeleton variant="text" width={350} height={20} sx={{ marginBottom: 1 }} />
                              </div>

                              {/* Form Sections */}
                              <div className="space-y-6">
                                    
                                    {/* Basic Information */}
                                    <div className="bg-white rounded-xl shadow-sm p-6">
                                          <div className="flex items-center gap-2 mb-6">
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                      <Skeleton variant="rectangular" width={20} height={20} />
                                                </div>
                                                <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
                                          </div>

                                          <div className="space-y-5">
                                                {/* Tour Title */}
                                                <div>
                                                      <Skeleton variant="text" width={100} height={20} sx={{ marginBottom: 1 }} />
                                                      <Skeleton variant="rectangular" height={44} sx={{ borderRadius: 2 }} />
                                                </div>

                                                {/* Subtitle */}
                                                <div>
                                                      <Skeleton variant="text" width={80} height={20} sx={{ marginBottom: 1 }} />
                                                      <Skeleton variant="rectangular" height={44} sx={{ borderRadius: 2 }} />
                                                </div>

                                                {/* Badge */}
                                                <div>
                                                      <Skeleton variant="text" width={100} height={20} sx={{ marginBottom: 1 }} />
                                                      <Skeleton variant="rectangular" height={44} sx={{ borderRadius: 2 }} />
                                                </div>

                                                {/* Region, Category, Feature Row */}
                                                <div className="flex justify-between gap-5">
                                                      <div className="flex-1">
                                                            <Skeleton variant="text" width={60} height={20} sx={{ marginBottom: 1 }} />
                                                            <Skeleton variant="rectangular" height={44} sx={{ borderRadius: 2 }} />
                                                      </div>
                                                      <div className="flex-1">
                                                            <Skeleton variant="text" width={70} height={20} sx={{ marginBottom: 1 }} />
                                                            <Skeleton variant="rectangular" height={44} sx={{ borderRadius: 2 }} />
                                                      </div>
                                                      <div className="flex-1 flex flex-col justify-around">
                                                            <Skeleton variant="text" width={60} height={20} sx={{ marginBottom: 1 }} />
                                                            <div className="flex flex-wrap items-center gap-8">
                                                                  <div className="flex items-center gap-2">
                                                                        <Skeleton variant="circular" width={16} height={16} />
                                                                        <Skeleton variant="text" width={30} height={16} />
                                                                  </div>
                                                                  <div className="flex items-center gap-2">
                                                                        <Skeleton variant="circular" width={16} height={16} />
                                                                        <Skeleton variant="text" width={25} height={16} />
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>

                                    {/* Hero Image Section */}
                                    <div className="bg-white rounded-xl shadow-sm p-6">
                                          <div className="flex items-center gap-2 mb-6">
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                      <Skeleton variant="rectangular" width={20} height={20} />
                                                </div>
                                                <h2 className="text-xl font-semibold text-gray-800">Hero Image</h2>
                                                <span className="text-red-600 text-xs">*</span>
                                          </div>
                                          <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
                                    </div>

                                    {/* Overview Section */}
                                    <div className="bg-white rounded-xl shadow-sm p-6">
                                          <div className="flex items-center gap-2 mb-6">
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                      <Skeleton variant="rectangular" width={20} height={20} />
                                                </div>
                                                <h2 className="text-xl font-semibold text-gray-800">Overview Section</h2>
                                          </div>

                                          <div className="space-y-5">
                                                {/* Overview Title */}
                                                <div>
                                                      <Skeleton variant="text" width={130} height={20} sx={{ marginBottom: 1 }} />
                                                      <Skeleton variant="rectangular" height={44} sx={{ borderRadius: 2 }} />
                                                </div>

                                                {/* Overview Description */}
                                                <div>
                                                      <Skeleton variant="text" width={160} height={20} sx={{ marginBottom: 1 }} />
                                                      <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
                                                </div>
                                          </div>
                                    </div>

                                    {/* QA Section */}
                                    <div className="bg-white rounded-xl shadow-sm p-6">
                                          <div className="flex items-center gap-2 mb-6">
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                      <Skeleton variant="rectangular" width={20} height={20} />
                                                </div>
                                                <Skeleton variant="text" width={150} height={28} />
                                          </div>
                                          
                                          <div className="space-y-4">
                                                {[1, 2, 3].map((item) => (
                                                      <div key={item} className="border border-gray-200 rounded-lg p-4">
                                                            <Skeleton variant="text" width="75%" height={20} sx={{ marginBottom: 1 }} />
                                                            <Skeleton variant="text" width="50%" height={16} />
                                                      </div>
                                                ))}
                                          </div>
                                    </div>

                                    {/* Highlights Section */}
                                    <div className="bg-white rounded-xl shadow-sm p-6">
                                          <div className="flex items-center gap-2 mb-6">
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                      <Skeleton variant="rectangular" width={20} height={20} />
                                                </div>
                                                <Skeleton variant="text" width={180} height={28} />
                                          </div>
                                    
                                          <div className="space-y-3">
                                                {[1, 2, 3, 4].map((item) => (
                                                      <div key={item} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                                                            <Skeleton variant="rectangular" width={24} height={24} sx={{ borderRadius: 1 }} />
                                                            <Skeleton variant="text" width="70%" height={20} />
                                                      </div>
                                                ))}
                                          </div>
                                    </div>

                                    {/* Reviews Section */}
                                    <div className="bg-white rounded-xl shadow-sm p-6">
                                          <div className="flex items-center gap-2 mb-6">
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                      <Skeleton variant="rectangular" width={20} height={20} />
                                                </div>
                                                <Skeleton variant="text" width={120} height={28} />
                                          </div>
                                          
                                          <div className="space-y-4">
                                                {[1, 2, 3].map((item) => (
                                                      <div key={item} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                                                            <Skeleton variant="circular" width={48} height={48} />
                                                            <div className="flex-1">
                                                                  <Skeleton variant="text" width={150} height={20} sx={{ marginBottom: 1 }} />
                                                                  <Skeleton variant="text" width="100%" height={16} sx={{ marginBottom: 0.5 }} />
                                                                  <Skeleton variant="text" width="80%" height={16} />
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>

                                    {/* Tour Itinerary Section */}
                                    <div className="bg-white rounded-xl shadow-sm p-6">
                                          <div className="flex items-center gap-2 mb-6">
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                      <Skeleton variant="rectangular" width={20} height={20} />
                                                </div>
                                                <Skeleton variant="text" width={160} height={28} />
                                          </div>
                                    
                                          <div className="space-y-4">
                                                {[1, 2, 3].map((item) => (
                                                      <div key={item} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                                                            <Skeleton variant="rectangular" width={80} height={80} sx={{ borderRadius: 2 }} />
                                                            <div className="flex-1">
                                                                  <Skeleton variant="text" width={200} height={24} sx={{ marginBottom: 1 }} />
                                                                  <Skeleton variant="text" width="100%" height={16} sx={{ marginBottom: 0.5 }} />
                                                                  <Skeleton variant="text" width="90%" height={16} sx={{ marginBottom: 0.5 }} />
                                                                  <Skeleton variant="text" width="70%" height={16} />
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>

                                    {/* Gallery Section */}
                                    <div className="bg-white rounded-xl shadow-sm p-6">
                                          <div className="flex items-center gap-2 mb-6">
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                      <Skeleton variant="rectangular" width={20} height={20} />
                                                </div>
                                                <Skeleton variant="text" width={100} height={28} />
                                          </div>
                                          
                                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                                      <Skeleton key={item} variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
                                                ))}
                                          </div>
                                    </div>
                              </div>

                              {/* Fixed Publish Button */}
                              <div className="fixed bottom-6 right-6">
                                    <Skeleton variant="circular" width={56} height={56} />
                              </div>
                        </div>
                  </main>
            </div>
      );
}

export default TourOperatorSkelton