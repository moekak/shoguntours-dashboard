import { TableCell, TableRow } from '../../ui/table';

const STATUS_CONFIG = {
    available: { label: 'Available', classes: 'bg-emerald-50 text-emerald-700' },
    on_tour: { label: 'On Tour', classes: 'bg-blue-50 text-[#465fff]' },
    unavailable: { label: 'Unavailable', classes: 'bg-red-50 text-red-600' },
};

function EmployeeList({ employee, onShiftEdit }) {
    const status = employee.status ?? 'available';
    const statusCfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.available;
    const shifts = employee.shifts ?? [];

    return (
        <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            {/* Name */}
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
                            #{employee.id}
                        </p>
                    </div>
                </div>
            </TableCell>

            {/* Phone */}
            <TableCell className="px-5 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                    {employee.phone}
                </span>
            </TableCell>

            {/* Status */}
            <TableCell className="px-5 py-4 whitespace-nowrap">
                <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${statusCfg.classes}`}
                >
                    {statusCfg.label}
                </span>
            </TableCell>

            {/* Available Shifts */}
            <TableCell className="px-5 py-4">
                {shifts.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                        {shifts.map((day) => (
                            <span
                                key={day}
                                className="px-2 py-0.5 rounded bg-[#465fff]/10 text-[#465fff] text-xs font-medium dark:bg-[#465fff]/20"
                            >
                                {day}
                            </span>
                        ))}
                    </div>
                ) : (
                    <span className="text-xs text-gray-400 dark:text-gray-600">
                        Not set
                    </span>
                )}
            </TableCell>

            {/* Upcoming Tours */}
            <TableCell className="px-5 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                    {employee.upcoming_tours ?? 0}
                </span>
            </TableCell>

            {/* Tour History */}
            <TableCell className="px-5 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                    {employee.tour_history ?? 0}
                </span>
            </TableCell>

            {/* Actions */}
            <TableCell className="px-5 py-4 whitespace-nowrap">
                <button
                    onClick={() => onShiftEdit(employee)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors"
                >
                    <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    Shifts
                </button>
            </TableCell>
        </TableRow>
    );
}

export default EmployeeList;
