const BASE_URL = 'https://shoguntoursjapan.com/api';

export const API_ENDPOINTS = {
    // TOUR: {
    //       GET_TOURS: `${BASE_URL}/tours`,
    //       GET_ALL_TOURS: `${BASE_URL}/tours/all`,
    //       GET_SPECIFI_CTOUR: `${BASE_URL}/tour`,
    //       TOUR_BOOK: `${BASE_URL}/tour/book`,
    // },
    // BLOG: {
    //       GET_BLOGS: `${BASE_URL}/blogs`,
    //       GET_BLOG: `${BASE_URL}/blog/category`,
    //       GET_SPECIFIC_BLOG: `${BASE_URL}/blog`,
    // },
    URL: {
        DASHBOARD: `${BASE_URL}/dashboard`,
    },
    IMAGE: {
        URL: 'https://shoguntoursjapan.com/storage',
    },
    API: {
        FETCH_CREATE_DATA: `${BASE_URL}/get/create/info`,
        CREATE_TOUR: `${BASE_URL}/tour/store`,
        GET_TOUR: `${BASE_URL}/get/tours`,
        GET_SPECIFIC_TOUR: `${BASE_URL}/get/tour`,
        UPDATE_TOUR: `${BASE_URL}/tour/update`,
        DELETE_TOUR: `${BASE_URL}/tour/destroy`,
        // BLOG
        FETCH_CREATE_BLOG: `${BASE_URL}/dashboard/blog`,
        CREATE_BLOG: `${BASE_URL}/blog/store`,
        GET_BLOG: `${BASE_URL}/dashboard/get/blogs`,
        GET_SPECIFIC_BLOG: `${BASE_URL}/dashboard/get/blog`,
        UPDATE_BLOG: `${BASE_URL}/dashboard/blog/update`,
        DELETE_BLOG: `${BASE_URL}/blog/destroy`,
        // AUTH
        LOGIN: `${BASE_URL}/login`,
        SIGNUP: `${BASE_URL}/signup`,
        AUTH_USER: `${BASE_URL}/user`,
        // Book registration
        FETCH_REGISTRATION_DATA: `${BASE_URL}/dashboard/get/registration/info`,
        FETCH_TOUR_ITINERARY_DATA: `${BASE_URL}/dashboard/get/tourItinerary/info`,
        CREATE_TOUR_BOOKING: `${BASE_URL}/dashboard/create/booking`,
        EDIT_TOUR_BOOKING: `${BASE_URL}/dashboard/edit/booking`,
        CREATE_EXTERNAL_TOURS: `${BASE_URL}/dashboard/create/external/tour`,
        FETCH_TOUR_BOOKINGS: `${BASE_URL}/dashboard/get/bookings`,
        FETCH_TOUR_BOOKING: `${BASE_URL}/dashboard/get/booking`,
        CANCEL_BOKIKING: `${BASE_URL}/dashboard/cancel/booking`,
        FETCH_BOOKING_FOR_CALENDER: `${BASE_URL}/dashboard/get/calender/booking`,
        // Tour Guideのエンドポイント
        CREATE_TOUR_GUIDE: `${BASE_URL}/dashboard/create/guide`,
        FETCH_TOUR_GUIDE: `${BASE_URL}/dashboard/get/employee`,
        // Direct Bookings
        FETCH_DIRECT_BOOKINGS: `${BASE_URL}/dashboard/get/direct/bookings`,
        GENERATE_STRIPE_PAYMENT_LINK: `${BASE_URL}/dashboard/stripe/payment-link`,
    },

    // IMAGE: {
    //       URL: "https://shoguntoursjapan.com/storage"
    // },
    // ERROR_MESSAGE: {
    //       EMAIL: "Please enter a valid email address.",
    //       PHONE: "Please enter a valid phone number.",
    //       FIRST_NAME: "First name is required.",
    //       LAST_NAME: "Last name is required.",
    // }
};

export const MESSAGES = {
    ERROR: {
        SYSTEM_ERROR:
            "We're experiencing technical difficulties. Please try again in a few moments.",
        SYSTEM_ERROR_TITLE: 'System Errors',
        VALIDATION_ERROR_TITLE: 'Validation Errors',
    },
};
