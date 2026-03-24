import { useState, useEffect, useRef, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { Modal } from '@/components/ui/modal';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';
import Select from '@/components/form/Select';
import PageMeta from '@/components/common/PageMeta';
import {
    MOCK_EMPLOYEES,
    MOCK_SHIFT_SCHEDULES,
    type ShiftSchedule,
    type ShiftType,
    type MockEmployee,
} from './mockData';

// ─── helpers ─────────────────────────────────────────────────────────────────

const SHIFT_LABELS: Record<ShiftType, string> = {
    full_day:  'Full Day (8:00–17:00)',
    morning:   'Morning (8:00–12:00)',
    afternoon: 'Afternoon (13:00–17:00)',
};

const STATUS_STYLES: Record<ShiftSchedule['status'], string> = {
    confirmed: 'bg-emerald-50 text-emerald-700',
    submitted: 'bg-amber-50 text-amber-700',
    cancelled: 'bg-gray-100 text-gray-500 line-through',
};

function toDisplayDate(yyyymmdd: string): string {
    return yyyymmdd.replace(/-/g, '/');
}

// FullCalendar `end` for all-day events is exclusive. Subtract 1 day for display.
function exclusiveEndToDisplay(yyyymmdd: string): string {
    const d = new Date(yyyymmdd);
    d.setDate(d.getDate() - 1);
    return d.toISOString().slice(0, 10).replace(/-/g, '/');
}

// ─── Component ───────────────────────────────────────────────────────────────

interface FormState {
    employeeId: string;
    startDate: string;
    endDate: string;
    shiftType: ShiftType;
    notes: string;
}

const EMPTY_FORM: FormState = {
    employeeId: '',
    startDate:  '',
    endDate:    '',
    shiftType:  'full_day',
    notes:      '',
};

export default function ShiftCalendar() {
    const calendarRef = useRef<FullCalendar>(null);
    const [schedules, setSchedules] = useState<ShiftSchedule[]>(MOCK_SHIFT_SCHEDULES);
    const [filterEmployeeId, setFilterEmployeeId] = useState<number | null>(null);

    // submit modal
    const [submitOpen, setSubmitOpen] = useState(false);
    const [form, setForm] = useState<FormState>(EMPTY_FORM);

    // detail modal
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedShift, setSelectedShift] = useState<ShiftSchedule | null>(null);

    // next id counter
    const nextId = useRef(Math.max(...schedules.map((s) => s.id)) + 1);

    // ── calendar events ──────────────────────────────────────────────────────

    const calendarEvents = useMemo(() => {
        return schedules
            .filter((s) =>
                s.status !== 'cancelled' &&
                (filterEmployeeId === null || s.employeeId === filterEmployeeId)
            )
            .map((s) => ({
                id:              String(s.id),
                title:           `${s.employeeName.split(' ')[0]} — ${SHIFT_LABELS[s.shiftType].split(' ')[0]}`,
                start:           s.startDate,
                end:             s.endDate,
                backgroundColor: s.status === 'submitted'
                    ? s.calendarColor + '99' // 60% opacity for pending
                    : s.calendarColor,
                borderColor:     s.calendarColor,
                textColor:       '#ffffff',
                extendedProps:   { shiftId: s.id },
            }));
    }, [schedules, filterEmployeeId]);

    // ── handlers ─────────────────────────────────────────────────────────────

    const openSubmitBlank = () => {
        setForm(EMPTY_FORM);
        setSubmitOpen(true);
    };

    const handleDateSelect = (info: DateSelectArg) => {
        setForm({
            ...EMPTY_FORM,
            startDate: info.startStr,
            // FullCalendar end is exclusive; store as exclusive for consistency
            endDate: info.endStr,
        });
        setSubmitOpen(true);
    };

    const handleEventClick = (info: EventClickArg) => {
        const id = Number(info.event.extendedProps.shiftId);
        const shift = schedules.find((s) => s.id === id) ?? null;
        setSelectedShift(shift);
        setDetailOpen(true);
    };

    const handleSubmit = () => {
        if (!form.employeeId || !form.startDate || !form.endDate) return;
        const emp = MOCK_EMPLOYEES.find((e) => e.id === Number(form.employeeId))!;
        // ensure endDate is always > startDate (add 1 day if equal)
        let end = form.endDate;
        if (end <= form.startDate) {
            const d = new Date(form.startDate);
            d.setDate(d.getDate() + 1);
            end = d.toISOString().slice(0, 10);
        }
        const newShift: ShiftSchedule = {
            id:            nextId.current++,
            employeeId:    emp.id,
            employeeName:  emp.name,
            calendarColor: emp.calendarColor,
            startDate:     form.startDate,
            endDate:       end,
            shiftType:     form.shiftType,
            notes:         form.notes,
            status:        'submitted',
        };
        setSchedules((prev) => [...prev, newShift]);
        setSubmitOpen(false);
    };

    const handleCancelShift = () => {
        if (!selectedShift) return;
        setSchedules((prev) =>
            prev.map((s) =>
                s.id === selectedShift.id ? { ...s, status: 'cancelled' } : s
            )
        );
        setDetailOpen(false);
    };

    const handleConfirmShift = () => {
        if (!selectedShift) return;
        setSchedules((prev) =>
            prev.map((s) =>
                s.id === selectedShift.id ? { ...s, status: 'confirmed' } : s
            )
        );
        setDetailOpen(false);
    };

    // ── counts for legend ────────────────────────────────────────────────────

    const counts = useMemo(() => {
        const visible = filterEmployeeId
            ? schedules.filter((s) => s.employeeId === filterEmployeeId)
            : schedules;
        return {
            confirmed: visible.filter((s) => s.status === 'confirmed').length,
            submitted: visible.filter((s) => s.status === 'submitted').length,
            cancelled: visible.filter((s) => s.status === 'cancelled').length,
        };
    }, [schedules, filterEmployeeId]);

    // ─────────────────────────────────────────────────────────────────────────

    return (
        <>
            <PageMeta
                title="Shift Schedule | Shogun Tours Dashboard"
                description="View and manage employee shift schedules"
            />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-10">
                <div className="container">

                    {/* ── Header ─────────────────────────────────────────── */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                Shift Schedule
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                View and submit employee availability
                            </p>
                        </div>
                        <button
                            onClick={openSubmitBlank}
                            className="flex items-center gap-2 bg-[#465fff] hover:bg-[#3a52e0] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Submit Shift
                        </button>
                    </div>

                    {/* ── Stats row ──────────────────────────────────────── */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {[
                            { label: 'Confirmed', value: counts.confirmed, color: 'bg-emerald-50 text-emerald-700' },
                            { label: 'Pending Review', value: counts.submitted, color: 'bg-amber-50 text-amber-700' },
                            { label: 'Cancelled', value: counts.cancelled, color: 'bg-gray-100 text-gray-500' },
                        ].map(({ label, value, color }) => (
                            <div key={label} className="bg-white rounded-xl border border-gray-200 p-5 dark:bg-white/[0.03] dark:border-white/[0.05]">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${color} mb-3`}>
                                    {label}
                                </span>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
                            </div>
                        ))}
                    </div>

                    {/* ── Employee filter + legend ───────────────────────── */}
                    <div className="bg-white rounded-xl border border-gray-200 px-5 py-4 mb-4 flex flex-wrap items-center gap-3 dark:bg-white/[0.03] dark:border-white/[0.05]">
                        <span className="text-sm text-gray-500 dark:text-gray-400 mr-1">Filter:</span>

                        <button
                            onClick={() => setFilterEmployeeId(null)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                filterEmployeeId === null
                                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                                    : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                            }`}
                        >
                            All Guides
                        </button>

                        {MOCK_EMPLOYEES.map((emp) => (
                            <button
                                key={emp.id}
                                onClick={() =>
                                    setFilterEmployeeId(
                                        filterEmployeeId === emp.id ? null : emp.id
                                    )
                                }
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                                    filterEmployeeId === emp.id
                                        ? 'border-transparent text-white'
                                        : 'border-gray-200 text-gray-600 hover:border-gray-300 dark:border-gray-700 dark:text-gray-400'
                                }`}
                                style={
                                    filterEmployeeId === emp.id
                                        ? { backgroundColor: emp.calendarColor }
                                        : {}
                                }
                            >
                                <span
                                    className="w-2.5 h-2.5 rounded-full shrink-0"
                                    style={{ backgroundColor: emp.calendarColor }}
                                />
                                {emp.name}
                            </button>
                        ))}

                        <div className="ml-auto flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                            <span className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded-sm bg-[#465fff]" />
                                Confirmed
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded-sm bg-[#465fff] opacity-60" />
                                Submitted
                            </span>
                            <span className="text-gray-300 dark:text-gray-600">
                                Click a date range to submit · Click an event for details
                            </span>
                        </div>
                    </div>

                    {/* ── Calendar ───────────────────────────────────────── */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-4 dark:bg-white/[0.03] dark:border-white/[0.05]">
                        <div className="custom-calendar">
                            <FullCalendar
                                ref={calendarRef}
                                plugins={[dayGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                initialDate="2026-01-01"
                                headerToolbar={{
                                    left:   'prev,next today',
                                    center: 'title',
                                    right:  'dayGridMonth',
                                }}
                                events={calendarEvents}
                                selectable
                                select={handleDateSelect}
                                eventClick={handleEventClick}
                                eventContent={(info) => (
                                    <div className="px-1.5 py-0.5 text-xs font-medium truncate">
                                        {info.event.title}
                                    </div>
                                )}
                                height="auto"
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* ── Submit Shift Modal ─────────────────────────────────────────── */}
            <Modal isOpen={submitOpen} onClose={() => setSubmitOpen(false)} className="max-w-[520px] m-4">
                <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-10">
                    <div className="pr-10 mb-6">
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                            Submit Shift
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Register available dates for a guide
                        </p>
                    </div>

                    <div className="space-y-4">
                        {/* Employee */}
                        <div>
                            <Label required>Guide</Label>
                            <Select
                                value={form.employeeId}
                                placeholder="Select guide"
                                options={MOCK_EMPLOYEES.map((e) => ({ value: String(e.id), label: e.name }))}
                                onChange={(v) => setForm({ ...form, employeeId: v })}
                            />
                        </div>

                        {/* Date range */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label required>From</Label>
                                <Input
                                    type="date"
                                    value={form.startDate}
                                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label required>To</Label>
                                <Input
                                    type="date"
                                    value={form.endDate ? (() => {
                                        // show one day before exclusive end
                                        const d = new Date(form.endDate);
                                        d.setDate(d.getDate() - 1);
                                        return d.toISOString().slice(0, 10);
                                    })() : ''}
                                    onChange={(e) => {
                                        // store as exclusive end
                                        const d = new Date(e.target.value);
                                        d.setDate(d.getDate() + 1);
                                        setForm({ ...form, endDate: d.toISOString().slice(0, 10) });
                                    }}
                                />
                            </div>
                        </div>

                        {/* Shift type */}
                        <div>
                            <Label>Shift Type</Label>
                            <div className="flex gap-2 flex-wrap mt-1">
                                {(Object.entries(SHIFT_LABELS) as [ShiftType, string][]).map(([key, label]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => setForm({ ...form, shiftType: key })}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                                            form.shiftType === key
                                                ? 'bg-[#465fff] text-white border-[#465fff]'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
                                        }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <Label>Notes <span className="text-gray-400 font-normal">(optional)</span></Label>
                            <textarea
                                rows={3}
                                value={form.notes}
                                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                placeholder="e.g. Tour name, special requirements…"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#465fff] focus:outline-none focus:ring-2 focus:ring-[#465fff]/20 dark:bg-gray-900 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-7 lg:justify-end">
                        <button
                            onClick={() => setSubmitOpen(false)}
                            className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!form.employeeId || !form.startDate || !form.endDate}
                            className="px-6 py-2.5 rounded-lg bg-[#465fff] hover:bg-[#3a52e0] disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
                        >
                            Submit Shift
                        </button>
                    </div>
                </div>
            </Modal>

            {/* ── Event Detail Modal ────────────────────────────────────────── */}
            <Modal isOpen={detailOpen} onClose={() => setDetailOpen(false)} className="max-w-[440px] m-4">
                {selectedShift && (
                    <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-10">
                        <div className="pr-10 mb-6">
                            <h4 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-1">
                                Shift Details
                            </h4>
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${STATUS_STYLES[selectedShift.status]}`}>
                                {selectedShift.status.charAt(0).toUpperCase() + selectedShift.status.slice(1)}
                            </span>
                        </div>

                        <div className="space-y-4">
                            {/* Guide */}
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
                                    style={{ backgroundColor: selectedShift.calendarColor }}
                                >
                                    {selectedShift.employeeName.split(' ').map((n) => n[0]).join('')}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedShift.employeeName}</p>
                                    <p className="text-xs text-gray-400">Tour Guide</p>
                                </div>
                            </div>

                            <hr className="border-gray-100 dark:border-white/[0.08]" />

                            {/* Dates */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">From</p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                        {toDisplayDate(selectedShift.startDate)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">To</p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                        {exclusiveEndToDisplay(selectedShift.endDate)}
                                    </p>
                                </div>
                            </div>

                            {/* Shift type */}
                            <div>
                                <p className="text-xs text-gray-400 mb-1">Shift Type</p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {SHIFT_LABELS[selectedShift.shiftType]}
                                </p>
                            </div>

                            {/* Notes */}
                            {selectedShift.notes && (
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Notes</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {selectedShift.notes}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-3 mt-7">
                            {selectedShift.status === 'submitted' && (
                                <button
                                    onClick={handleConfirmShift}
                                    className="flex-1 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors"
                                >
                                    Confirm Shift
                                </button>
                            )}
                            {selectedShift.status !== 'cancelled' && (
                                <button
                                    onClick={handleCancelShift}
                                    className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                                        selectedShift.status === 'submitted'
                                            ? 'border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20'
                                            : 'border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03]'
                                    }`}
                                >
                                    Cancel Shift
                                </button>
                            )}
                            <button
                                onClick={() => setDetailOpen(false)}
                                className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03] transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}
