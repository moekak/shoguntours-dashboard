import React, { useState } from 'react'
import { useTourCreateContext } from '../../context/TourCreateContext';

function IconSelector({selectedIcon, onIconSelect}) {
      const {iconOptions} = useTourCreateContext()
      const [isOpen, setIsOpen] = useState(false);
      const handleIconSelect = (iconClass) => {
            onIconSelect(iconClass);
            setIsOpen(false);
      };

      return (
            <div className="flex-shrink-0 relative">
                  <button 
                        type="button" 
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-10 h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-[#e92929] transition-all focus:outline-none focus:ring-2 focus:ring-[#e92929]/20"
                  >
                        <i className={`${selectedIcon} text-[#e92929] text-sm`}></i>
                  </button>
                  
                  {isOpen && (
                        <div className="absolute top-12 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-60 z-10">
                              <div className="text-xs font-medium text-gray-600 mb-2">アイコンを選択:</div>
                              <div className="grid grid-cols-6 gap-2">
                                    {iconOptions.map((option) => (
                                          <button
                                                key={option.icon}
                                                type="button"
                                                onClick={() => handleIconSelect(option.icon)}
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