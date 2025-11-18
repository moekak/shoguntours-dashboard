import React, { useEffect, useState } from "react";

import { Breadcrumbs, Link, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import ErrorMessage from "../../ui/error/ErrorMessage";
import Select from "../../form/Select";
import Radio from "../../form/input/Radio";
import TextArea from "../../form/input/TextArea";
import { useBlogOperatorContext } from "../../blog/context/BlogOperatorContext";
import { useCommonContext } from "../../../context/CommonContext";
import DatePicker from "../../form/date-picker";
import { useBookingContext } from "../context/BookingContext";
import { useFetchData } from "../../../hooks/useFetchData";
import { API_ENDPOINTS } from "../../../config/config";
import { useCreateBooking } from "../hooks/useCreateBooking";
import Alert from "../../ui/alert/Alert";




function BookingOperator() {
      const {serviceProviders,commissionFee} = useBookingContext()
      const [tourId, setTourId] = useState(null)

      const {mutate} = useCreateBooking()

      // 全ツアー名を取得
      const {data: tour} = useFetchData(API_ENDPOINTS.API.FETCH_REGISTRATION_DATA, "booking")
      // ツアーを選択後毎回、そのツアーIDに紐づいたItineraryを取得
      const {data: itinerary, isLoading: isItineraryLoading} = useFetchData(`${API_ENDPOINTS.API.FETCH_TOUR_ITINERARY_DATA}/${tourId}`, "itineraryData", tourId, {enabled: !!tourId})

      const [bookingData, setBookingData] = useState({})
      const {errorFields, errors, errorTitle} = useCommonContext()
      const [isManualSetupOpen, setIsManualSetupOpen] = useState(false)

      // inputタグの入力処理
      const handleInput = (name,value) =>{
            setBookingData({ ...bookingData, [name]:value });
      }

      // 新しくツアーを作成する際の入力処理
      const handleInputNewTour = (e) =>{
            setBookingData({
                  ...bookingData,
                  new_tour: {
                        ...bookingData.new_tour,
                        [e.target.name]: e.target.value,
                  },
            });

      }

      // selectタグの選択処理
      const handleSelect = (name, value) =>{
            setBookingData({...bookingData, [name]: value})
      }

      //新しくツアーを作成する際の選択処理
      const handleSelectNewTour = (name, value) =>{
            setBookingData({
                  ...bookingData,
                  new_tour: {
                        ...bookingData.new_tour,
                        [name]: value
                  }
            })
      }

      const handleSubmit = () =>{
            mutate(bookingData)
      }


      return (
            <div className="bg-gray-50 min-h-screen">
                  {/* Main Content */}
                  <main className="pb-10">
                        <div className="container">
                              {/* Page Header */}
                              <div className="mb-8 sticky">
                                    <Breadcrumbs
                                          aria-label="breadcrumb"
                                          className="text-xs"
                                          sx={{ fontSize: "0.75rem" }}
                                    >
                                          <Link underline="hover" color="inherit" href="/">
                                          Booking
                                          </Link>
                                          <Typography
                                          sx={{ color: "text.primary", fontSize: "0.8rem" }}
                                          >
                                          Register New Booking
                                          </Typography>
                                    </Breadcrumbs>
                                    <h1 className="text-2xl font-bold text-gray-800 mt-3">
                                          Register New Booking
                                    </h1>
                                    <p className="text-gray-600 my-2">
                                          Share your travel insights and stories with the world
                                    </p>
                                    {errors?.length > 0 && (
                                          <Alert
                                                variant="error"
                                                title={errorTitle}
                                                message={errors}
                                                showLink={false}
                                          />
                                    )}
                                    {/* {errors?.length > 0 && (
                                          <Alert
                                          variant="error"
                                          title={errorTitle}
                                          message={errors}
                                          showLink={true}
                                          linkHref="/tours"
                                          linkText="View all tours"
                                          />
                                          )}
                                          {isSuccess && (
                                          <Alert
                                          variant="success"
                                          title={successMessage?.title}
                                          message={successMessage?.message}
                                          showLink={true}
                                          linkHref="/blogs"
                                          linkText="View all blogs"
                                          />
                                    )} */}
                              </div>

                        {/* customer information */}
                        <div className="space-y-6">
                              {/* Basic Information */}
                              <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                          <div className="w-8 h-8 bg-[#ecf3ff] rounded-lg flex items-center justify-center mr-3">
                                                <InfoOutlinedIcon
                                                      sx={{ color: "#465fff", fontSize: 20 }}
                                                />
                                          </div>
                                          Customer Information
                                    </h2>
                                    <div className="space-y-5">
                                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                <div>
                                                      <Label
                                                            required={true}
                                                            htmlFor="first_name"
                                                            error={errorFields?.has("first_name")}
                                                      >
                                                            First Name
                                                      </Label>
                                                      <Input
                                                            value={bookingData?.first_name}
                                                            name="first_name"
                                                            type="text"
                                                            id="first_name"
                                                            placeholder="John"
                                                            onChange={(e) => handleInput(e.target.name, e.target.value)}
                                                            error={errorFields?.has("first_name")}
                                                      />
                                                      <ErrorMessage type="first_name" />
                                                </div>

                                                <div>
                                                      <Label
                                                            required={true}
                                                            htmlFor="last_name"
                                                            error={errorFields?.has("last_name")}
                                                      >
                                                            Last Name
                                                      </Label>
                                                      <Input
                                                            value={bookingData?.last_name}
                                                            name="last_name"
                                                            id="last_name"
                                                            placeholder="Smith"
                                                            onChange={(e) => handleInput(e.target.name, e.target.value)}
                                                            error={errorFields?.has("last_name")}
                                                      />
                                                      <ErrorMessage type="last_name" />
                                                </div>
                                          </div>
                                    </div>
                                    <div className="space-y-5 mt-4">
                                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                {/* email */}
                                                <div>
                                                      <Label
                                                            htmlFor="email"
                                                            error={errorFields?.has("email")}
                                                      >
                                                            Email
                                                      </Label>
                                                      <Input
                                                            value={bookingData?.email}
                                                            name="email"
                                                            type="text"
                                                            id="email"
                                                            placeholder="your.email@example.com"
                                                            error={errorFields?.has("email")}
                                                            onChange={(e) => handleInput(e.target.name, e.target.value)}
                                                      />
                                                      <ErrorMessage type="email" />
                                                </div>

                                                <div>
                                                      <Label
                                                            required={true}
                                                            htmlFor="phone_number"
                                                            error={errorFields?.has("phone_number")}
                                                      >
                                                            Phone Number
                                                      </Label>
                                                            <Input
                                                            value={bookingData?.phone_number}
                                                            name="phone_number"
                                                            type="text"
                                                            id="phone_number"
                                                            placeholder="+8190-1234-5678"
                                                            onChange={(e) => handleInput(e.target.name, e.target.value)}
                                                            error={errorFields?.has("phone_number")}
                                                      />
                                                      <ErrorMessage type="phone_number" />
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>

                        {/* Tour information */}
                        <div className="space-y-6 mt-5">
                              <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                          <div className="w-8 h-8 bg-[#ecf3ff] rounded-lg flex items-center justify-center mr-3">
                                                <InfoOutlinedIcon sx={{ color: "#465fff", fontSize: 20 }}/>
                                          </div>
                                          Tour Information
                                    </h2>
                                    <div className="space-y-6 ">
                                          {/* Tour Type Select */}
                                          <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-2 gap-4">
                                                <div>
                                                      <Label required={true}>Tour Type</Label>
                                                      <Select
                                                            value={bookingData?.tour_type}
                                                            options={tour ?? []}
                                                            placeholder="Select tour type"
                                                            className="dark:bg-dark-900"
                                                            onChange={(value) => {
                                                                  handleSelect("tour_type", value);
                                                                  setTourId(value);
                                                            }}

                                                      />
                                                </div>
                                                <div>
                                                      <Label required={true}>Tour Itinerary</Label>
                                                      <Select
                                                            options={itinerary ?? []}
                                                            placeholder={isItineraryLoading ? "Loading..." :  itinerary ? "Select tour type" : ""}
                                                            className="dark:bg-dark-900"
                                                            onChange={(value) => {
                                                                  handleSelect("itinerary_id", value)
                                                            }}
                                                            disabled={itinerary == undefined || itinerary.length <= 0}
                                                      />

                                                </div>
                                          </div>
                                          <button
                                                type="button"
                                                onClick={() => setIsManualSetupOpen(!isManualSetupOpen)}
                                                className="text-[#465fff] hover:text-[#465fff] text-sm font-medium flex items-center gap-1 mt-3"
                                          >
                                                {" "}
                                                {isManualSetupOpen ? (
                                                      <i className="fas fa-minus"></i>
                                                ) : (
                                                      <i className="fas fa-plus"></i>
                                                )}
                                                <span className="font-medium">Manual Tour Entry</span>
                                          </button>

                                          {/* Manual Tour Entry Section - Shows when "Other" is selected */}
                                          <div
                                                className={`border-t border-gray-200  overflow-hidden transition-all duration-300 ${
                                                      isManualSetupOpen
                                                      ? "max-h-[2000px] opacity-100 pt-6"
                                                      : "max-h-0 opacity-0 pt-0 m-0"
                                                }`}
                                          >
                                                <div className="bg-gray-50 p-6 mb-6">
                                                      {/* Tour Name Input */}
                                                      <div className="mb-6">
                                                            <div>
                                                            <Label
                                                                  required={true}
                                                                  htmlFor="tour_name"
                                                            >
                                                                  Tour Name
                                                            </Label>
                                                            <Input
                                                                  value={bookingData?.new_tour?.tour_name}
                                                                  name="tour_name"
                                                                  type="text"
                                                                  id="tour_name"
                                                                  placeholder="e.g.,Tokyo Full Day Tour"
                                                                  onChange={(e) => {
                                                                        handleInputNewTour(e)
                                                                  }}
                                                            />
                                                            </div>
                                                      </div>

                                                      {/* Service Provider */}
                                                      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-2 gap-4">
                                                            <div className="mb-6">
                                                            <Label required={true}>Service Provider</Label>
                                                            <Select
                                                                  options={serviceProviders ?? []}
                                                                  placeholder="Select service provide"
                                                                  className="dark:bg-dark-900"
                                                                  onChange={(value) =>{
                                                                        handleSelectNewTour("service_provider", value)
                                                                  }}
                                                            />
                                                            </div>
                                                            <div className="mb-6">
                                                                  <Label required={true}>Commission Fee</Label>
                                                                  <Select
                                                                        options={commissionFee ?? []}
                                                                        placeholder="Select commission rate"
                                                                        className="dark:bg-dark-900"
                                                                        onChange={(value) =>{
                                                                              handleSelectNewTour("commission_fee", value)
                                                                        }}
                                                                  />
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>

                                          <div>
                                                {/* Additional Tour Details */}
                                                <div className="border-t grid md:grid-cols-3 lg:grid-cols-3 gap-4">
                                                      {/* <div className="mt-6">
                                                            <Label required={true} htmlFor="duration">
                                                                  Tour duration (hours)
                                                            </Label>
                                                            <Input
                                                                  type="number"
                                                                  id="duration"
                                                                  placeholder="e.g., 8"
                                                                  min="1"
                                                                  name="duration"
                                                                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                                                                  error={errorFields?.has("duration")}
                                                            />
                                                            <ErrorMessage type="duration" />
                                                      </div> */}
                                                      <div className="mt-6">
                                                            <Label required={true} htmlFor="youth_number" error={errorFields?.has("youth_number")}>
                                                                  Number of youth
                                                            </Label>
                                                            <Input
                                                                  value={bookingData?.youth_number}
                                                                  type="number"
                                                                  id="youth_number"
                                                                  placeholder="e.g., 3"
                                                                  min="1"
                                                                  max="50"
                                                                  name="youth_number"
                                                                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                                                                  error={errorFields?.has("youth_number")}
                                                            />
                                                            <ErrorMessage type="youth_number" />
                                                      </div>
                                                      <div className="mt-6">
                                                            <Label required={true} htmlFor="adult_number" error={errorFields?.has("adult_number")}>
                                                                  Number of adults
                                                            </Label>
                                                            <Input
                                                                  value={bookingData?.adult_number}
                                                                  type="number"
                                                                  id="adult_number"
                                                                  placeholder="e.g., 3"
                                                                  min="1"
                                                                  max="50"
                                                                  name="adult_number"
                                                                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                                                                  error={errorFields?.has("adult_number")}
                                                            />
                                                            <ErrorMessage type="adult_number" />
                                                      </div>
                                                      <div className="mt-6">
                                                            <Label required={true} htmlFor="youth_price" error={errorFields?.has("youth_price")}>
                                                                  Youth price
                                                            </Label>
                                                            <Input
                                                            value={bookingData?.youth_price}
                                                                  type="number"
                                                                  id="youth_price"
                                                                  placeholder="e.g., 12,000"
                                                                  min="1"
                                                                  name="youth_price"
                                                                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                                                                  error={errorFields?.has("youth_price")}
                                                            />
                                                            <ErrorMessage type="youth_price" />
                                                      </div>
                                                </div>
                                                <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-4">
                                                      <div className="mt-6">
                                                            <Label required={true} htmlFor="adult_price" error={errorFields?.has("adult_price")}>
                                                                  Adult price
                                                            </Label>
                                                            <Input
                                                                  value={bookingData?.adult_price}
                                                                  type="number"
                                                                  id="adult_price"
                                                                  placeholder="e.g., 12,000"
                                                                  min="1"
                                                                  name="adult_price"
                                                                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                                                                  error={errorFields?.has("adult_price")}
                                                            />
                                                            <ErrorMessage type="adult_price" />
                                                      </div>
                                                      <div className="mt-6">
                                                            <Label required={true} htmlFor="logistics_fee" error={errorFields?.has("logistics_fee")}>
                                                                  Logistics Fee
                                                            </Label>
                                                            <Input
                                                                  value={bookingData?.logistics_fee}
                                                                  type="number"
                                                                  id="logistics_fee"
                                                                  placeholder="e.g., 12,000"
                                                                  min="1"
                                                                  name="logistics_fee"
                                                                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                                                                  error={errorFields?.has("logistics_fee")}
                                                            />
                                                            <ErrorMessage type="logistics_fee" />
                                                      </div>
                                                      <div className="mt-6">
                                                            <DatePicker
                                                                  defaultDate={bookingData?.tour_date}
                                                                  id="date-picker"
                                                                  label="Tour Date"
                                                                  placeholder="Select a date"
                                                                  onChange={(dates) => {
                                                                        const validDate = new Date(dates);
                                                                        if (!isNaN(validDate.getTime())) {
                                                                              handleInput("tour_date", validDate);
                                                                        }
                                                                  }}
                                                                  error={errorFields?.has(`tour_date`)}
                                                            />
                                                            <ErrorMessage type="tour_date" />
                                                      </div>
                                                </div>
                                                {/* Notes */}
                                                <div className="mt-6">
                                                      <div>
                                                            <Label>Notes</Label>
                                                            <TextArea
                                                                  // error={errorFields?.has(`itinerary.${itineraryIndex}.overview_description`)}
                                                                  onChange={(value)=> handleInput("request", value)}
                                                                  value={bookingData?.request}
                                                                  rows={4}
                                                                  placeholder="Any special requirements or notes about this tour..."
                                                            />
                                                            {/* <ErrorMessage type={`itinerary.${itineraryIndex}.overview_description`}/> */}
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>

                        {/* Fixed Publish Button */}
                        <button
                              onClick={handleSubmit}
                              type="submit"
                              className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#e92929] to-[#ff6b6b] text-white rounded-full hover:shadow-lg transition-all font-medium z-50 flex items-center justify-center"
                        >
                              <i className="fas fa-plus text-xl"></i>
                        </button>
                        </div>
                  </main>
            </div>
      );
}

export default BookingOperator;
