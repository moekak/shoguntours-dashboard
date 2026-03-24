import { Expense, Guide, GuidePayment, Revenue, MockTour } from '../types';

export const TOURS: MockTour[] = [
  { id: 1, name: 'Tokyo City Highlights', type: 'private', date: '2026/01/15' },
  { id: 2, name: 'Mt. Fuji Day Trip', type: 'group', date: '2026/01/20' },
  { id: 3, name: 'Kyoto Cultural Tour', type: 'standard', date: '2026/02/05' },
  { id: 4, name: 'Nara Deer Park', type: 'group', date: '2026/02/12' },
  { id: 5, name: 'Osaka Food Tour', type: 'private', date: '2026/02/28' },
  { id: 6, name: 'Hakone & Onsen', type: 'standard', date: '2026/03/10' },
];

export const GUIDES: Guide[] = [
  { id: 1, name: 'Kenji Tanaka', rateType: 'PER_TOUR', rateJpy: 25000 },
  { id: 2, name: 'Yuki Sato', rateType: 'DAILY', rateJpy: 18000 },
  { id: 3, name: 'Hiroshi Yamamoto', rateType: 'HOURLY', rateJpy: 2500 },
];

export const EXPENSES: Expense[] = [
  { id: 1, tourId: 1, tourName: 'Tokyo City Highlights', category: 'TRANSPORTATION', description: 'Bus rental', amountJpy: 35000, date: '2026/01/15', status: 'APPROVED' },
  { id: 2, tourId: 1, tourName: 'Tokyo City Highlights', category: 'MEALS', description: 'Group lunch', amountJpy: 18000, date: '2026/01/15', status: 'APPROVED' },
  { id: 3, tourId: 2, tourName: 'Mt. Fuji Day Trip', category: 'ENTRANCE_FEES', description: 'Fuji Visitor Center', amountJpy: 12000, date: '2026/01/20', status: 'APPROVED' },
  { id: 4, tourId: 2, tourName: 'Mt. Fuji Day Trip', category: 'TRANSPORTATION', description: 'Train tickets', amountJpy: 28000, date: '2026/01/20', status: 'PENDING' },
  { id: 5, tourId: 3, tourName: 'Kyoto Cultural Tour', category: 'ACCOMMODATION', description: 'Ryokan deposit', amountJpy: 45000, date: '2026/02/05', status: 'APPROVED' },
  { id: 6, tourId: 3, tourName: 'Kyoto Cultural Tour', category: 'ENTRANCE_FEES', description: 'Temple fees', amountJpy: 8000, date: '2026/02/05', status: 'APPROVED' },
  { id: 7, tourId: 4, tourName: 'Nara Deer Park', category: 'TRANSPORTATION', description: 'Bus hire', amountJpy: 22000, date: '2026/02/12', status: 'PENDING' },
  { id: 8, tourId: 4, tourName: 'Nara Deer Park', category: 'MEALS', description: 'Team lunch', amountJpy: 15000, date: '2026/02/12', status: 'APPROVED' },
  { id: 9, tourId: 5, tourName: 'Osaka Food Tour', category: 'MEALS', description: 'Food tour supplies', amountJpy: 32000, date: '2026/02/28', status: 'PENDING' },
  { id: 10, tourId: 5, tourName: 'Osaka Food Tour', category: 'EQUIPMENT', description: 'Camera gear rental', amountJpy: 18000, date: '2026/02/28', status: 'REJECTED' },
  { id: 11, tourId: 6, tourName: 'Hakone & Onsen', category: 'ACCOMMODATION', description: 'Onsen resort deposit', amountJpy: 68000, date: '2026/03/10', status: 'APPROVED' },
  { id: 12, tourName: undefined, tourId: undefined, category: 'MARKETING', description: 'Social media ads', amountJpy: 25000, date: '2026/03/15', status: 'APPROVED' },
];

export const REVENUES: Revenue[] = [
  { id: 1, bookingId: 101, tourId: 1, tourName: 'Tokyo City Highlights', tourType: 'private', amountJpy: 150000, tourDate: '2026/01/15', status: 'PAID' },
  { id: 2, bookingId: 102, tourId: 1, tourName: 'Tokyo City Highlights', tourType: 'private', amountJpy: 150000, tourDate: '2026/01/16', status: 'PAID' },
  { id: 3, bookingId: 103, tourId: 2, tourName: 'Mt. Fuji Day Trip', tourType: 'group', amountJpy: 45000, tourDate: '2026/01/20', status: 'PAID' },
  { id: 4, bookingId: 104, tourId: 2, tourName: 'Mt. Fuji Day Trip', tourType: 'group', amountJpy: 45000, tourDate: '2026/01/20', status: 'PAID' },
  { id: 5, bookingId: 105, tourId: 3, tourName: 'Kyoto Cultural Tour', tourType: 'standard', amountJpy: 85000, tourDate: '2026/02/05', status: 'PAID' },
  { id: 6, bookingId: 106, tourId: 4, tourName: 'Nara Deer Park', tourType: 'group', amountJpy: 35000, tourDate: '2026/02/12', status: 'PENDING' },
  { id: 7, bookingId: 107, tourId: 4, tourName: 'Nara Deer Park', tourType: 'group', amountJpy: 35000, tourDate: '2026/02/12', status: 'PAID' },
  { id: 8, bookingId: 108, tourId: 5, tourName: 'Osaka Food Tour', tourType: 'private', amountJpy: 120000, tourDate: '2026/02/28', status: 'PAID' },
  { id: 9, bookingId: 109, tourId: 6, tourName: 'Hakone & Onsen', tourType: 'standard', amountJpy: 95000, tourDate: '2026/03/10', status: 'PENDING' },
  { id: 10, bookingId: 110, tourId: 6, tourName: 'Hakone & Onsen', tourType: 'standard', amountJpy: 95000, tourDate: '2026/03/11', status: 'REFUNDED' },
];

export const GUIDE_PAYMENTS: GuidePayment[] = [
  { id: 1, guideId: 1, guideName: 'Kenji Tanaka', tourId: 1, tourName: 'Tokyo City Highlights', amountJpy: 25000, unitsWorked: 1, periodStart: '2026/01/15', periodEnd: '2026/01/15', status: 'PAID', paidAt: '2026/01/18' },
  { id: 2, guideId: 2, guideName: 'Yuki Sato', tourId: 1, tourName: 'Tokyo City Highlights', amountJpy: 18000, unitsWorked: 1, periodStart: '2026/01/15', periodEnd: '2026/01/15', status: 'PAID', paidAt: '2026/01/18' },
  { id: 3, guideId: 1, guideName: 'Kenji Tanaka', tourId: 2, tourName: 'Mt. Fuji Day Trip', amountJpy: 25000, unitsWorked: 1, periodStart: '2026/01/20', periodEnd: '2026/01/20', status: 'PAID', paidAt: '2026/01/22' },
  { id: 4, guideId: 3, guideName: 'Hiroshi Yamamoto', tourId: 3, tourName: 'Kyoto Cultural Tour', amountJpy: 60000, unitsWorked: 24, periodStart: '2026/02/05', periodEnd: '2026/02/07', status: 'PAID', paidAt: '2026/02/10' },
  { id: 5, guideId: 2, guideName: 'Yuki Sato', tourId: 4, tourName: 'Nara Deer Park', amountJpy: 18000, unitsWorked: 1, periodStart: '2026/02/12', periodEnd: '2026/02/12', status: 'UNPAID' },
  { id: 6, guideId: 1, guideName: 'Kenji Tanaka', tourId: 5, tourName: 'Osaka Food Tour', amountJpy: 25000, unitsWorked: 1, periodStart: '2026/02/28', periodEnd: '2026/02/28', status: 'PAID', paidAt: '2026/03/02' },
  { id: 7, guideId: 3, guideName: 'Hiroshi Yamamoto', tourId: 5, tourName: 'Osaka Food Tour', amountJpy: 20000, unitsWorked: 8, periodStart: '2026/02/28', periodEnd: '2026/02/28', status: 'UNPAID' },
  { id: 8, guideId: 2, guideName: 'Yuki Sato', tourId: 6, tourName: 'Hakone & Onsen', amountJpy: 36000, unitsWorked: 2, periodStart: '2026/03/10', periodEnd: '2026/03/11', status: 'UNPAID' },
];
