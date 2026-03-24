export type ExpenseCategory =
  | 'TRANSPORTATION' | 'ACCOMMODATION' | 'MEALS'
  | 'ENTRANCE_FEES' | 'EQUIPMENT' | 'MARKETING' | 'OTHER';

export type ExpenseStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type PaymentStatus = 'UNPAID' | 'PAID';
export type RevenueStatus = 'PENDING' | 'PAID' | 'REFUNDED';
export type RateType = 'HOURLY' | 'DAILY' | 'PER_TOUR';

export interface Expense {
  id: number;
  tourId?: number;
  tourName?: string;
  category: ExpenseCategory;
  description: string;
  amountJpy: number;
  date: string;
  status: ExpenseStatus;
  receiptUrl?: string;
  notes?: string;
}

export interface Guide {
  id: number;
  name: string;
  rateType: RateType;
  rateJpy: number;
}

export interface GuidePayment {
  id: number;
  guideId: number;
  guideName: string;
  tourId?: number;
  tourName?: string;
  amountJpy: number;
  unitsWorked: number;
  periodStart: string;
  periodEnd: string;
  status: PaymentStatus;
  paidAt?: string;
  notes?: string;
}

export interface Revenue {
  id: number;
  bookingId?: number;
  tourId?: number;
  tourName?: string;
  tourType?: string;
  amountJpy: number;
  tourDate: string;
  status: RevenueStatus;
  notes?: string;
}

export interface TourPnLRow {
  tourId: number;
  tourName: string;
  tourDate: string;
  revenue: number;
  expenses: number;
  guidePay: number;
  netProfit: number;
}

export interface MockTour {
  id: number;
  name: string;
  type: string;
  date: string;
}
