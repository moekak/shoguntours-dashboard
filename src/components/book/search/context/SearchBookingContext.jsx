import { createContext, useContext, useState } from 'react';
import { useBookingContext } from '../../context/BookingContext';

export const SearchBookingContext = createContext();
export const useSearchBookingContext = () => {
    const context = useContext(SearchBookingContext);
    if (context === undefined) {
        throw new Error(
            'useSearchBookingContext must be used within an SearchBookingProvider'
        );
    }
    return context;
};

export const SearchBookingProvider = ({ children }) => {
    const [filters, setFilters] = useState({});
    const [appliedFilters, setAppliedFilters] = useState({}); //filters複製用;

    const filter = () => {
        setAppliedFilters(filters);
    };

    const resetSearch = () => {
        console.log('reset!');
        setFilters({});
        setAppliedFilters({});
    };
    const statusOptions = [
        { value: 'Upcoming', label: 'Upcoming' },
        { value: 'Completed', label: 'Completed' },
        { value: 'Cancelled', label: 'Cancelled' },
        { value: 'Pending', label: 'Pending' },
    ];
    const sortOptions = [
        { value: 'date-newest', label: 'Date (Newest)' },
        { value: 'date-oldest', label: 'Date (Oldest)' },
        { value: 'price-high', label: 'Price (High to Low)' },
        { value: 'price-low', label: 'Price (Low to High)' },
        { value: 'name-asc', label: 'Customer Name (A-Z)' },
        { value: 'name-desc', label: 'Customer Name (Z-A)' },
    ];

    const value = {
        statusOptions,
        sortOptions,
        filter,
        resetSearch,
        filters,
        setFilters,
        appliedFilters,
        setAppliedFilters,
    };

    return (
        <SearchBookingContext.Provider value={value}>
            {children}
        </SearchBookingContext.Provider>
    );
};
