import { BrowserRouter as Router, Routes, Route } from 'react-router';

import SignUp from './pages/AuthPages/SignUp';
import NotFound from './pages/OtherPage/NotFound';
import UserProfiles from './pages/UserProfiles';
import Videos from './pages/UiElements/Videos';
import Images from './pages/UiElements/Images';
import Alerts from './pages/UiElements/Alerts';
import Badges from './pages/UiElements/Badges';
import Avatars from './pages/UiElements/Avatars';
import Buttons from './pages/UiElements/Buttons';
import LineChart from './pages/Charts/LineChart';
import BarChart from './pages/Charts/BarChart';
import Calendar from './pages/Calendar';
import BasicTables from './pages/Tables/BasicTables';
import FormElements from './pages/Forms/FormElements';
import Blank from './pages/Blank';
import AppLayout from './layout/AppLayout';
import { ScrollToTop } from './components/common/ScrollToTop';
import Home from './pages/Dashboard/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { TourOperatorProvider } from './components/tour/context/TourOperatorContext';
import { ToursProvider } from './components/tour/context/ToursContext';
import TourOperator from './components/tour/operator/TourOperator';
import Tours from './components/tour/list/Tours';
import TourEdit from './components/tour/edit/TourEdit';
import TourCreate from './components/tour/create/TourCreate';
import { BlogCreateProvider } from './components/blog/context/BlogOperatorContext';
import BlogCreate from './components/blog/create/BlogCreate';
import { CommonProvider } from './context/CommonContext';
import Blogs from './components/blog/list/Blogs';
import { BlogsProvider } from './components/blog/context/BlogsContext';
import BlogEdit from './components/blog/edit/BlogEdit';
import SignIn from './pages/AuthPages/SignIn';
import axios from 'axios';
import PrivateRoute from './components/services/PrivateRoute';
import Reset from './components/common/Reset';

import BookingOperator from './components/book/operator/BookingOperator';
import { BookingProvider } from './components/book/context/BookingContext';
import Bookings from './components/book/list/Bookings';
import { SearchBookingProvider } from './components/book/search/context/SearchBookingContext';
import Booking from './components/book/show/Booking';
import Employee from './employee/Employee';
import ShiftCalendar from './employee/ShiftCalendar';
import ExpenseRequests from './employee/ExpenseRequests';
import CreateBooking from './components/book/create/CreateBooking';
import EditBooking from './components/book/edit/EditBooking';
import BookingCalender from './components/book/list/BookingCalender';
import DirectBookings from './components/book/direct/DirectBookings';
import Chat from './components/chat/Chat';
import AccountingDashboard from './accounting/pages/AccountingDashboard';
import Expenses from './accounting/pages/Expenses';
import Payroll from './accounting/pages/Payroll';
import Revenue from './accounting/pages/Revenue';
import TourPnL from './accounting/pages/TourPnL';

const queryClient = new QueryClient();
export default function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <CommonProvider>
                        {' '}
                        {/* ← Routerの内側に移動 */}
                        <TourOperatorProvider>
                            <ToursProvider>
                                <BlogCreateProvider>
                                    <BlogsProvider>
                                        <BookingProvider>
                                            <SearchBookingProvider>
                                                <ScrollToTop />
                                                <Reset />
                                                <Routes>
                                                    {/* Dashboard Layout */}
                                                    <Route
                                                        element={<AppLayout />}
                                                    >
                                                        <Route
                                                            index
                                                            path="/"
                                                            element={
                                                                <PrivateRoute redirectTo="/signin">
                                                                    <Home />
                                                                </PrivateRoute>
                                                            }
                                                        />

                                                        {/* Others Page */}
                                                        <Route
                                                            path="/profile"
                                                            element={
                                                                <UserProfiles />
                                                            }
                                                        />
                                                        <Route
                                                            path="/calendar"
                                                            element={
                                                                <BookingCalender />
                                                            }
                                                        />
                                                        <Route
                                                            path="/blank"
                                                            element={<Blank />}
                                                        />

                                                        {/* Forms */}
                                                        <Route
                                                            path="/form-elements"
                                                            element={
                                                                <FormElements />
                                                            }
                                                        />

                                                        {/* Tables */}
                                                        <Route
                                                            path="/basic-tables"
                                                            element={
                                                                <BasicTables />
                                                            }
                                                        />

                                                        {/* Ui Elements */}
                                                        <Route
                                                            path="/alerts"
                                                            element={<Alerts />}
                                                        />
                                                        <Route
                                                            path="/avatars"
                                                            element={
                                                                <Avatars />
                                                            }
                                                        />
                                                        <Route
                                                            path="/badge"
                                                            element={<Badges />}
                                                        />
                                                        <Route
                                                            path="/buttons"
                                                            element={
                                                                <Buttons />
                                                            }
                                                        />
                                                        <Route
                                                            path="/images"
                                                            element={<Images />}
                                                        />
                                                        <Route
                                                            path="/videos"
                                                            element={<Videos />}
                                                        />

                                                        {/* Charts */}
                                                        <Route
                                                            path="/line-chart"
                                                            element={
                                                                <LineChart />
                                                            }
                                                        />
                                                        <Route
                                                            path="/bar-chart"
                                                            element={
                                                                <BarChart />
                                                            }
                                                        />

                                                        {/* Tour */}
                                                        <Route
                                                            path="/tours"
                                                            element={
                                                                <PrivateRoute redirectTo="/signin">
                                                                    <Tours />
                                                                </PrivateRoute>
                                                            }
                                                        />
                                                        <Route
                                                            path="/tour/create"
                                                            element={
                                                                <PrivateRoute redirectTo="/signin">
                                                                    <TourCreate />
                                                                </PrivateRoute>
                                                            }
                                                        />
                                                        <Route
                                                            path="/tour/:tourId"
                                                            element={
                                                                <PrivateRoute redirectTo="/signin">
                                                                    <TourEdit />
                                                                </PrivateRoute>
                                                            }
                                                        />

                                                        {/* Blog */}
                                                        <Route
                                                            path="/blog/create"
                                                            element={
                                                                <PrivateRoute redirectTo="/signin">
                                                                    <BlogCreate />
                                                                </PrivateRoute>
                                                            }
                                                        />

                                                        <Route
                                                            path="/blogs"
                                                            element={
                                                                <PrivateRoute redirectTo="/signin">
                                                                    <Blogs />
                                                                </PrivateRoute>
                                                            }
                                                        />
                                                        <Route
                                                            path="/blog/:blogId"
                                                            element={
                                                                <PrivateRoute redirectTo="/signin">
                                                                    <BlogEdit />
                                                                </PrivateRoute>
                                                            }
                                                        />

                                                        {/* chat */}
                                                        <Route
                                                            path="/chat"
                                                            element={
                                                                <PrivateRoute redirectTo="/signin">
                                                                    <Chat />
                                                                </PrivateRoute>
                                                            }
                                                        />

                                                        {/* booking */}
                                                        <Route
                                                            path="/book/registration"
                                                            element={
                                                                <PrivateRoute redirectTo="/signin">
                                                                    <CreateBooking />
                                                                </PrivateRoute>
                                                            }
                                                        />
                                                        <Route
                                                            path="/bookings"
                                                            element={
                                                                <PrivateRoute redirectTo="/signin">
                                                                    <Bookings />
                                                                </PrivateRoute>
                                                            }
                                                        />
                                                        <Route
                                                            path="/booking/:bookingId"
                                                            element={
                                                                <PrivateRoute redirectTo="/signin">
                                                                    <EditBooking />
                                                                </PrivateRoute>
                                                            }
                                                        />
                                                        <Route
                                                            path="/bookings/direct"
                                                            element={
                                                                <PrivateRoute redirectTo="/signin">
                                                                    <DirectBookings />
                                                                </PrivateRoute>
                                                            }
                                                        />
                                                        <Route
                                                            path="/employee"
                                                            element={
                                                                <PrivateRoute redirectTo="/signin">
                                                                    <Employee />
                                                                </PrivateRoute>
                                                            }
                                                        />
                                                        <Route
                                                            path="/employee/shifts"
                                                            element={
                                                                <PrivateRoute redirectTo="/signin">
                                                                    <ShiftCalendar />
                                                                </PrivateRoute>
                                                            }
                                                        />
                                                        <Route
                                                            path="/employee/expense-requests"
                                                            element={
                                                                <PrivateRoute redirectTo="/signin">
                                                                    <ExpenseRequests />
                                                                </PrivateRoute>
                                                            }
                                                        />

                                                        {/* Accounting */}
                                                        <Route
                                                            path="/accounting"
                                                            element={
                                                                <PrivateRoute redirectTo="/signin">
                                                                    <AccountingDashboard />
                                                                </PrivateRoute>
                                                            }
                                                        />
                                                        <Route
                                                            path="/accounting/expenses"
                                                            element={
                                                                <PrivateRoute redirectTo="/signin">
                                                                    <Expenses />
                                                                </PrivateRoute>
                                                            }
                                                        />
                                                        <Route
                                                            path="/accounting/payroll"
                                                            element={
                                                                <PrivateRoute redirectTo="/signin">
                                                                    <Payroll />
                                                                </PrivateRoute>
                                                            }
                                                        />
                                                        <Route
                                                            path="/accounting/revenue"
                                                            element={
                                                                <PrivateRoute redirectTo="/signin">
                                                                    <Revenue />
                                                                </PrivateRoute>
                                                            }
                                                        />
                                                        <Route
                                                            path="/accounting/pnl"
                                                            element={
                                                                <PrivateRoute redirectTo="/signin">
                                                                    <TourPnL />
                                                                </PrivateRoute>
                                                            }
                                                        />
                                                    </Route>

                                                    {/* Auth Layout */}
                                                    <Route
                                                        path="/signin"
                                                        element={<SignIn />}
                                                    />
                                                    <Route
                                                        path="/signup/39ed0du0h0chs0u0023bbd93bmd03"
                                                        element={<SignUp />}
                                                    />

                                                    {/* Fallback Route */}
                                                    <Route
                                                        path="*"
                                                        element={<NotFound />}
                                                    />
                                                </Routes>
                                            </SearchBookingProvider>
                                        </BookingProvider>
                                    </BlogsProvider>
                                </BlogCreateProvider>
                            </ToursProvider>
                        </TourOperatorProvider>
                    </CommonProvider>
                </Router>
            </QueryClientProvider>
        </>
    );
}
