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
    const { bookingData } = useBookingContext();
    const [filteredBookingData, setFilteredBookingData] = useState([]);
    const [searchByStatus, setSearchByStatus] = useState(null);
    const [searchByTour, setSearchByTour] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);

    const filter = () => {
        console.log(bookingData?.bookings);
        // 元データから直接フィルタする
        let filterdData = bookingData?.bookings || [];

        // statusでフィルター
        if (searchByStatus) {
            filterdData = filterdData.filter(
                (booking) => booking.status === searchByStatus
            );
        }

        if (searchByTour) {
            console.log(searchByTour);
            filterdData = filterdData.filter(
                (booking) => booking.external_tour_id == searchByTour
            );
        }
        if (minPrice) {
            filterdData = filterdData.filter(
                (booking) => booking.total >= minPrice
            );
        }
        if (maxPrice) {
            filterdData = filterdData.filter(
                (booking) => booking.total <= maxPrice
            );
        }

        setFilteredBookingData(filterdData);
        console.log(filterdData);
    };

    const resetSearch = () => {
        setSearchByStatus(null);
        setFilteredBookingData([]);
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
        setSearchByStatus,
        searchByTour,
        setSearchByTour,
        setMinPrice,
        setMaxPrice,
        filteredBookingData,
        resetSearch,
    };

    return (
        <SearchBookingContext.Provider value={value}>
            {children}
        </SearchBookingContext.Provider>
    );
};
