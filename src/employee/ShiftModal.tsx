import { useState, useEffect } from 'react';
import { Modal } from '../components/ui/modal';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
type Day = (typeof DAYS)[number];
type Status = 'available' | 'on_tour' | 'unavailable';

export interface ShiftData {
    shifts: Day[];
    status: Status;
}

interface Employee {
    id: number;
    full_name: string;
    initials: string;
    color: string;
    shifts?: Day[];
    status?: Status;
}

interface ShiftModalProps {
    isOpen: boolean;
    onClose: () => void;
    employee: Employee | null;
    onSave: (employeeId: number, data: ShiftData) => void;
}

function ShiftModal({ isOpen, onClose, employee, onSave }: ShiftModalProps) {
    const [selectedDays, setSelectedDays] = useState<Day[]>([]);
    const [status, setStatus] = useState<Status>('available');

    useEffect(() => {
        if (employee) {
            setSelectedDays(employee.shifts ?? []);
            setStatus(employee.status ?? 'available');
        }
    }, [employee]);

    const toggleDay = (day: Day) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    const handleSave = () => {
        if (!employee) return;
        onSave(employee.id, { shifts: selectedDays, status });
        onClose();
    };

    const statusConfig: Record<Status, { label: string; classes: string }> = {
        available: {
            label: 'Available',
            classes: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        },
        on_tour: {
            label: 'On Tour',
            classes: 'bg-blue-50 text-[#465fff] border-blue-200',
        },
        unavailable: {
            label: 'Unavailable',
            classes: 'bg-red-50 text-red-600 border-red-200',
        },
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px] m-4">
            <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-10">
                {/* Header */}
                <div className="px-2 pr-14 mb-6">
                    <div className="flex items-center gap-3 mb-1">
                        {employee && (
                            <div
                                className={`w-9 h-9 rounded-full ${employee.color} flex items-center justify-center text-white text-sm font-semibold shrink-0`}
                            >
                                {employee.initials}
                            </div>
                        )}
                        <div>
                            <h4 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                                Manage Shifts
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {employee?.full_name}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className="px-2 mb-6">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Availability Status
                    </p>
                    <div className="flex gap-2 flex-wrap">
                        {(Object.keys(statusConfig) as Status[]).map((s) => (
                            <button
                                key={s}
                                onClick={() => setStatus(s)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                                    status === s
                                        ? statusConfig[s].classes +
                                          ' ring-2 ring-offset-1 ring-current'
                                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
                                }`}
                            >
                                {statusConfig[s].label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Shift Days */}
                <div className="px-2 mb-8">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Available Days
                    </p>
                    <div className="flex gap-2 flex-wrap">
                        {DAYS.map((day) => {
                            const active = selectedDays.includes(day);
                            return (
                                <button
                                    key={day}
                                    onClick={() => toggleDay(day)}
                                    className={`w-12 h-12 rounded-xl text-sm font-semibold transition-all ${
                                        active
                                            ? 'bg-[#465fff] text-white shadow-sm'
                                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        {selectedDays.length === 0
                            ? 'No days selected'
                            : `${selectedDays.length} day${selectedDays.length > 1 ? 's' : ''} selected`}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 px-2 lg:justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03] transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2.5 rounded-lg bg-[#465fff] hover:bg-[#3a52e0] text-white text-sm font-medium transition-colors"
                    >
                        Save Shifts
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ShiftModal;
export type { Day, Status, Employee as EmployeeShift };
