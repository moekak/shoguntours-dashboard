import React, { useState } from 'react'
import { useTourOperatorContext } from '../../context/TourOperatorContext';

function IconSelector({selectedIcon,itineraryIndex, activityIndex}) {
      const {iconOptions, setTour, tour} = useTourOperatorContext()
      const [isOpen, setIsOpen] = useState(false);
      const handleInput = (value, itineraryIndex, activityIndex, field) => {
            setTour({
                  ...tour,
                  itinerary: tour.itinerary.map((item, iIndex) => 
                        iIndex === itineraryIndex 
                        ? {
                              ...item,
                              activity: item.activity.map((act, aIndex) => 
                                    aIndex === activityIndex 
                                    ? { ...act, [field]: value }
                                    : act
                              )
                        }
                        : item
                  )
            });
      };

      return (
            <div className="flex-shrink-0 relative">
                  <button 
                        type="button" 
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-10 h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-[#465fff] transition-all "
                  >
                        <i className={`fa-solid ${selectedIcon} text-[#465fff] text-sm`}></i>
                  </button>
                  
                  {isOpen && (
                        <div className="absolute top-12 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-60 z-10">
                              <div className="text-xs font-medium text-gray-600 mb-2">アイコンを選択:</div>
                              <div className="grid grid-cols-6 gap-2">
                                    {iconOptions.map((option) => (
                                          <button
                                                key={`icon-${itineraryIndex}-${activityIndex}-${option.icon}`}
                                                type="button"
                                                onClick={() =>{
                                                      handleInput(option.icon, itineraryIndex, activityIndex, "activity_icon")
                                                      setIsOpen(!isOpen)
                                                }}
                                                
                                                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
                                                title={option.title}
                                          >
                                                <i className={`fas ${option.icon} text-gray-600`}></i>
                                          </button>
                                    ))}
                              </div>
                        </div>
                  )}
            </div>
      );
}

export default IconSelector