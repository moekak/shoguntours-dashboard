const BASE_URL = "https://kido-portfolio.tokyo/api";

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
            URL: "https://shoguntoursjapan.com/storage"
      },
      API: {
            FETCH_CREATE_DATA: `${BASE_URL}/get/create/info`,
            CREATE_TOUR: `${BASE_URL}/tour/store`,
            GET_TOUR: `${BASE_URL}/get/tours`,
            GET_SPECIFIC_TOUR: `${BASE_URL}/get/tour`,
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
}

export const MESSAGES = {
      ERROR : {
            SYSTEM_ERROR : "We're experiencing technical difficulties. Please try again in a few moments.",
            SYSTEM_ERROR_TITLE : "System Errors",
            VALIDATION_ERROR_TITLE : "Validation Errors"
      }
}
