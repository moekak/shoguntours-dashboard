import { useEffect, useRef, useState } from "react";

const ActionDropdown = ({ tourId, onAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleActionClick = (action) => {
    setIsOpen(false);
    onAction(action, tourId);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Three dots button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        aria-label="Actions"
        aria-expanded={isOpen}
      >
        <svg 
          className="w-4 h-4 text-gray-500 dark:text-gray-400" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
          <path d="M10 4a2 2 0 100-4 2 2 0 000 4z"/>
          <path d="M10 20a2 2 0 100-4 2 2 0 000 4z"/>
        </svg>
      </button>
      
      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 dark:bg-gray-800 dark:border-gray-700 animate-in fade-in-0 zoom-in-95 duration-100">
          {/* View Details */}
          <button
            onClick={() => handleActionClick('view')}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </button>
          
          {/* Edit Tour */}
          <button
            onClick={() => handleActionClick('edit')}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Tour
          </button>
          
          {/* Separator */}
          <hr className="my-1 border-gray-200 dark:border-gray-600" />
          
          {/* Delete Tour */}
          <button
            onClick={() => handleActionClick('delete')}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete Tour
          </button>
        </div>
      )}
    </div>
  );
};
export default ActionDropdown