import { createContext, useContext, useState } from "react";

export const BookingContext = createContext()
export const useBookingContext = () =>{
      const context = useContext(BookingContext)
      if (context === undefined) {
            throw new Error('useBookingContext must be used within an BookingProvider');
      }
      return context;
}

export const BookingProvider  = ({children}) =>{
      const [booking,setBooking] = useState({})
      const [tour, setTour] = useState([])
      const [tourItinerary, setTourItinerary] = useState([])
      const serviceProviders = [
            { value: "GetYourGuide", label: "GetYourGuide" },
            { value: "ViaTor", label: "ViaTor" },
            { value: "Direct Booking", label: "Direct Booking" },
      ]
      const commissionFee = [
            { value: "5", label: "5%" },
            { value: "10", label: "10%" },
            { value: "15", label: "15%" },
            { value: "20", label: "20%" },
            { value: "25", label: "25%" },
            { value: "30", label: "30%" },
            { value: "35", label: "35%" },
            { value: "40", label: "45%" },
            { value: "50", label: "50%" },
      ]
      const value = {
            booking,
            setBooking,
            tour,
            setTour,
            tourItinerary,
            setTourItinerary,
            serviceProviders,
            commissionFee
      }


      return (
            <BookingContext.Provider value={value}>
                  {children}
            </BookingContext.Provider>
      )
}