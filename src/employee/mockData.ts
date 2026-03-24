import type { ExpenseCategory } from '../accounting/types';

// ─── Employee ────────────────────────────────────────────────────────────────

export interface MockEmployee {
    id: number;
    name: string;
    initials: string;
    colorClass: string;   // Tailwind bg class for avatars
    calendarColor: string; // hex for FullCalendar events
}

export const MOCK_EMPLOYEES: MockEmployee[] = [
    { id: 1, name: 'Kenji Tanaka',    initials: 'KT', colorClass: 'bg-blue-500',    calendarColor: '#465fff' },
    { id: 2, name: 'Yuki Sato',       initials: 'YS', colorClass: 'bg-emerald-500', calendarColor: '#22c55e' },
    { id: 3, name: 'Hiroshi Yamamoto',initials: 'HY', colorClass: 'bg-purple-500',  calendarColor: '#8b5cf6' },
];

// ─── Shift Schedules ─────────────────────────────────────────────────────────

export type ShiftType = 'full_day' | 'morning' | 'afternoon';
export type ShiftStatus = 'submitted' | 'confirmed' | 'cancelled';

export interface ShiftSchedule {
    id: number;
    employeeId: number;
    employeeName: string;
    calendarColor: string;
    startDate: string;  // YYYY-MM-DD  (FullCalendar format)
    endDate: string;    // YYYY-MM-DD  (exclusive — day after last day)
    shiftType: ShiftType;
    notes?: string;
    status: ShiftStatus;
}

export const MOCK_SHIFT_SCHEDULES: ShiftSchedule[] = [
    // --- confirmed tour shifts ---
    { id: 1,  employeeId: 1, employeeName: 'Kenji Tanaka',     calendarColor: '#465fff', startDate: '2026-01-15', endDate: '2026-01-16', shiftType: 'full_day',  notes: 'Tokyo City Highlights',  status: 'confirmed' },
    { id: 2,  employeeId: 2, employeeName: 'Yuki Sato',        calendarColor: '#22c55e', startDate: '2026-01-15', endDate: '2026-01-16', shiftType: 'full_day',  notes: 'Tokyo City Highlights',  status: 'confirmed' },
    { id: 3,  employeeId: 1, employeeName: 'Kenji Tanaka',     calendarColor: '#465fff', startDate: '2026-01-20', endDate: '2026-01-21', shiftType: 'full_day',  notes: 'Mt. Fuji Day Trip',      status: 'confirmed' },
    { id: 4,  employeeId: 3, employeeName: 'Hiroshi Yamamoto', calendarColor: '#8b5cf6', startDate: '2026-02-05', endDate: '2026-02-08', shiftType: 'full_day',  notes: 'Kyoto Cultural Tour',    status: 'confirmed' },
    { id: 5,  employeeId: 2, employeeName: 'Yuki Sato',        calendarColor: '#22c55e', startDate: '2026-02-12', endDate: '2026-02-13', shiftType: 'full_day',  notes: 'Nara Deer Park',         status: 'confirmed' },
    { id: 6,  employeeId: 1, employeeName: 'Kenji Tanaka',     calendarColor: '#465fff', startDate: '2026-02-28', endDate: '2026-03-01', shiftType: 'full_day',  notes: 'Osaka Food Tour',        status: 'confirmed' },
    { id: 7,  employeeId: 3, employeeName: 'Hiroshi Yamamoto', calendarColor: '#8b5cf6', startDate: '2026-02-28', endDate: '2026-03-01', shiftType: 'morning',   notes: 'Osaka Food Tour (AM)',   status: 'confirmed' },
    { id: 8,  employeeId: 2, employeeName: 'Yuki Sato',        calendarColor: '#22c55e', startDate: '2026-03-10', endDate: '2026-03-12', shiftType: 'full_day',  notes: 'Hakone & Onsen',         status: 'confirmed' },
    // --- pending availability submissions ---
    { id: 9,  employeeId: 2, employeeName: 'Yuki Sato',        calendarColor: '#22c55e', startDate: '2026-03-16', endDate: '2026-03-21', shiftType: 'full_day',  notes: '',                       status: 'submitted' },
    { id: 10, employeeId: 1, employeeName: 'Kenji Tanaka',     calendarColor: '#465fff', startDate: '2026-03-23', endDate: '2026-03-28', shiftType: 'full_day',  notes: 'Available all week',     status: 'submitted' },
    { id: 11, employeeId: 3, employeeName: 'Hiroshi Yamamoto', calendarColor: '#8b5cf6', startDate: '2026-03-18', endDate: '2026-03-20', shiftType: 'afternoon', notes: 'PM only',                status: 'submitted' },
];

// ─── Expense Requests ────────────────────────────────────────────────────────

export type ExpenseRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface ExpenseRequest {
    id: number;
    employeeId: number;
    employeeName: string;
    tourId?: number;
    tourName?: string;
    category: ExpenseCategory;
    description: string;
    amountJpy: number;
    date: string;           // YYYY/MM/DD
    receiptFile?: string;   // filename only (UI)
    notes?: string;
    status: ExpenseRequestStatus;
    submittedAt: string;    // YYYY/MM/DD
    reviewedAt?: string;
}

export const MOCK_EXPENSE_REQUESTS: ExpenseRequest[] = [
    { id: 1, employeeId: 1, employeeName: 'Kenji Tanaka',     tourId: 2, tourName: 'Mt. Fuji Day Trip',    category: 'TRANSPORTATION', description: 'Parking fee at Fuji 5th station', amountJpy: 1500, date: '2026/01/20', notes: 'Paid with personal card',     status: 'PENDING',   submittedAt: '2026/01/21' },
    { id: 2, employeeId: 2, employeeName: 'Yuki Sato',        tourId: 1, tourName: 'Tokyo City Highlights', category: 'MEALS',          description: 'Client dinner receipt',          amountJpy: 4800, date: '2026/01/15', receiptFile: 'receipt_dinner.jpg',    status: 'PENDING',   submittedAt: '2026/01/16' },
    { id: 3, employeeId: 3, employeeName: 'Hiroshi Yamamoto', tourId: 3, tourName: 'Kyoto Cultural Tour',   category: 'ACCOMMODATION',  description: 'Late hotel checkout fee',        amountJpy: 3000, date: '2026/02/07', receiptFile: 'checkout_fee.pdf',      status: 'APPROVED',  submittedAt: '2026/02/08', reviewedAt: '2026/02/09', notes: 'Tour ran over schedule' },
    { id: 4, employeeId: 1, employeeName: 'Kenji Tanaka',     tourId: 5, tourName: 'Osaka Food Tour',       category: 'EQUIPMENT',      description: 'Portable speaker rental',       amountJpy: 2500, date: '2026/02/28',                                        status: 'PENDING',   submittedAt: '2026/03/01' },
    { id: 5, employeeId: 2, employeeName: 'Yuki Sato',        tourId: 4, tourName: 'Nara Deer Park',        category: 'ENTRANCE_FEES',  description: 'Deer park premium entrance',    amountJpy:  600, date: '2026/02/12', receiptFile: 'nara_entrance.jpg',     status: 'APPROVED',  submittedAt: '2026/02/13', reviewedAt: '2026/02/14' },
    { id: 6, employeeId: 3, employeeName: 'Hiroshi Yamamoto', tourId: 5, tourName: 'Osaka Food Tour',       category: 'MEALS',          description: 'Guide meal during tour',        amountJpy: 1200, date: '2026/02/28',                                        status: 'REJECTED',  submittedAt: '2026/03/01', reviewedAt: '2026/03/02' },
];
