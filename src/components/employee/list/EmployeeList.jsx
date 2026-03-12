import { TableCell, TableRow } from '@mui/material';
import { useEffect } from 'react';

function EmployeeList({ employee }) {
    useEffect(() => {
        console.log(employee);
    });
    // const navigate = useNavigate();
    // const { setBookingData, setTourCounts, isModalOpen, setIsModalOpen } =
    //     useBookingContext();

    // const onSuccess = (data) => {
    //     setBookingData(data.data.bookings);
    //     setTourCounts(data.data.counts);
    //     setIsModalOpen(false);
    // };

    // const { mutate, isPending } = usePostMutation(
    //     API_ENDPOINTS.API.CANCEL_BOKIKING,
    //     {
    //         onSuccess,
    //     }
    // );

    // const handleAction = (action, id) => {
    //     console.log(id);

    //     switch (action) {
    //         case 'view':
    //             alert(`View details for booking ${id}`);
    //             break;
    //         case 'edit':
    //             navigate(`/booking/${id}`);
    //             break;
    //         case 'delete':
    //             setIsModalOpen(true);
    //             setSelectedblog(id);
    //             break;
    //         default:
    //             break;
    //     }
    // };

    // const cancel = (id) => {
    //     setIsModalOpen(true);
    // };

    return (
        <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            {/* Employee Name */}
            <TableCell className="px-5 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                    <div
                        className={`w-9 h-9 rounded-full ${employee.color} flex items-center justify-center text-white text-sm font-semibold shrink-0`}
                    >
                        {employee.initials}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {employee.full_name}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                            {employee.id}
                        </p>
                    </div>
                </div>
            </TableCell>

            {/* Phone Number */}
            <TableCell className="px-5 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                    {employee.phone}
                </span>
            </TableCell>

            {/* Upcoming Tours */}
            <TableCell className="px-5 py-4 whitespace-nowrap">
                1
                {/* <TourBadge count={employee.upcomingTours} type="upcoming" /> */}
            </TableCell>

            {/* Tour History */}
            <TableCell className="px-5 py-4 whitespace-nowrap">
                2
                {/* <TourBadge count={employee.tourHistory} type="history" /> */}
            </TableCell>

            {/* Actions */}
            <TableCell className="px-5 py-4 whitespace-nowrap">
                <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-200 transition-colors">
                    <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                </button>
            </TableCell>
        </TableRow>
    );
}

export default EmployeeList;
