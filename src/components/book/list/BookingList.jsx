import { useNavigate } from 'react-router';

import { TableCell, TableRow } from '../../ui/table';
import ActionDropDown from '../../common/ActionDropDown';
import { usePostMutation } from '../../../hooks/usePostMutation';
import { API_ENDPOINTS } from '../../../config/config';
import { useBookingContext } from '../context/BookingContext';

function BookingList({ booking }) {
    const navigate = useNavigate();
    const { setBookingData, setTourCounts } = useBookingContext();
    const onSuccess = (data) => {
        console.log(data.data.ounts);
        setBookingData(data.data.bookings);
        setTourCounts(data.data.counts);
    };
    const { mutate } = usePostMutation(API_ENDPOINTS.API.CANCEL_BOKIKING, {
        onSuccess,
    });

    const handleAction = (action, id) => {
        console.log(id);

        switch (action) {
            case 'view':
                alert(`View details for booking ${id}`);
                break;
            case 'edit':
                navigate(`/booking/${id}`);
                break;
            case 'delete':
                setIsModalOpen(true);
                setSelectedblog(id);
                break;
            default:
                break;
        }
    };

    const cancel = (id) => {
        mutate({ id: id });
    };

    return (
        <TableRow className="hover:bg-gray-50 transition-colors">
            <TableCell className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-medium text-gray-900">
                    {booking?.bookingId}
                </span>
            </TableCell>
            <TableCell className="px-6 py-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-9 w-9 bg-gradient-to-br from-[#9cb9ff] to-[#465fff] rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {booking?.customer?.first_name[0].toUpperCase() +
                            booking?.customer?.last_name[0].toUpperCase()}
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                            {booking?.customer?.first_name}{' '}
                            {booking?.customer?.last_name}
                        </p>
                        <p className="text-xs text-gray-500">
                            {booking?.customer?.email}
                        </p>
                    </div>
                </div>
            </TableCell>
            <TableCell className="px-6 py-4">
                <div className="flex items-center">
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                            {booking?.external_tour?.tour_name ??
                                booking?.itinerary?.overview_title}
                        </p>
                    </div>
                </div>
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap">
                <p className="text-sm text-gray-900">
                    {booking?.tour_date_formatted}
                </p>
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-600">
                    <svg
                        className="w-4 h-4 text-gray-400 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                    {Number(booking?.adult_number) +
                        Number(booking?.youth_number)}
                </div>
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap">
                <p className="text-sm font-medium text-gray-900">
                    ¥{booking?.total.toLocaleString()}
                </p>
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap">
                <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                        booking?.status === 'Upcoming'
                            ? 'bg-[#9cb9ff]/20 text-[#465fff]'
                            : booking?.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-red-50 text-red-700'
                    } `}
                >
                    {booking?.status}
                </span>
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                <ActionDropDown
                    id={booking?.id}
                    onAction={handleAction}
                    type="booking"
                    cancel={cancel}
                />
            </TableCell>
        </TableRow>
    );
}

export default BookingList;
