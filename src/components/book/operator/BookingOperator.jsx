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




function BookingOperator() {
      const {serviceProviders,commissionFee} = useBookingContext()
      const [tourId, setTourId] = useState(null)

      // 全ツアー名を取得
      const {data: tour} = useFetchData(API_ENDPOINTS.API.FETCH_REGISTRATION_DATA, "booking")
      // ツアーを選択後毎回、そのツアーIDに紐づいたItineraryを取得
      const {data: itinerary} = useFetchData(`${API_ENDPOINTS.API.FETCH_TOUR_ITINERARY_DATA}/${tourId}`, "itineraryData", tourId, {enabled: !!tourId})


      const {blog,  handleInput, handleSelect} = useBlogOperatorContext()
      const {errorFields, errors, errorTitle, successMessage,isSuccess} = useCommonContext()
      const [isManualSetupOpen, setIsManualSetupOpen] = useState(false)





      return (
            <div className="bg-gray-50 min-h-screen">
                  {/* Main Content */}
                  <main className="pb-10">
                        <div className="container">
                        {/* Page Header */}
                        <div className="mb-8 sticky">
                        <Breadcrumbs aria-label="breadcrumb" className="text-xs" sx={{ fontSize: "0.75rem" }}>
                              <Link underline="hover" color="inherit" href="/">Booking</Link>
                              <Typography sx={{ color: "text.primary", fontSize: "0.8rem" }}>Register New Booking</Typography>
                        </Breadcrumbs>
                        <h1 className="text-2xl font-bold text-gray-800 mt-3">
                              Register New Booking
                        </h1>
                        <p className="text-gray-600 my-2">
                              Share your travel insights and stories with the world
                        </p>
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
                                                <InfoOutlinedIcon sx={{ color: "#465fff", fontSize: 20 }}/>
                                          </div>
                                          Customer Information
                                    </h2>
                                    <div className="space-y-5">
                                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                <div>
                                                      <Label
                                                            required={true}
                                                            htmlFor="tags"
                                                            error={errorFields?.has("tags")}
                                                      >
                                                            First Name
                                                      </Label>
                                                      <Input
                                                            value={blog?.tags}
                                                            name="tags"
                                                            type="text"
                                                            id="tags"
                                                            placeholder="John"
                                                            onChange={(e) => handleInput(e)}
                                                            error={errorFields?.has("tags")}
                                                      />
                                                      <ErrorMessage type="tags" />
                                                </div>

                                                <div>
                                                      <Label
                                                            required={true}
                                                            htmlFor="reading_time"
                                                            error={errorFields?.has("reading_time")}
                                                      >
                                                            Last Name
                                                      </Label>
                                                      <Input
                                                            value={blog?.reading_time}
                                                            name="reading_time"
                                                            type="number"
                                                            id="reading_time"
                                                            placeholder="Smith"
                                                            onChange={(e) => handleInput(e)}
                                                            error={errorFields?.has("reading_time")}
                                                      />
                                                      <ErrorMessage type="reading_time" />
                                                </div>
                                          </div>
                                    </div>
                                    <div className="space-y-5 mt-4">
                                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                {/* email */}
                                                <div>
                                                      <Label
                                                            required={true}
                                                            htmlFor="tags"
                                                            error={errorFields?.has("tags")}
                                                      >
                                                            Email
                                                      </Label>
                                                      <Input
                                                            name="tags"
                                                            type="text"
                                                            id="tags"
                                                            placeholder="your.email@example.com"
                                                            error={errorFields?.has("tags")}
                                                      />
                                                      <ErrorMessage type="email" />
                                                </div>

                                                <div>
                                                      <Label
                                                            required={true}
                                                            htmlFor="reading_time"
                                                            error={errorFields?.has("reading_time")}
                                                      >
                                                            Phone Number
                                                      </Label>
                                                      <Input
                                                            // value={blog?.reading_time}
                                                            name="reading_time"
                                                            type="number"
                                                            id="reading_time"
                                                            placeholder="+8190-1234-5678"
                                                            // onChange={(e) => handleInput(e)}
                                                            // error={errorFields?.has("reading_time")}
                                                      />
                                                      <ErrorMessage type="reading_time" />
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
                                                            // defaultValue={`itinerary.${itineraryIndex}.tour_type`}
                                                            options={tour ?? []}
                                                            placeholder="Select tour type"
                                                            className="dark:bg-dark-900"
                                                            onChange={(tourId)=>{
                                                                  setTourId(tourId)
                                                            }}
                                                            // onChange={(value)=> handleInput(value, itineraryIndex, "tour_type")}
                                                            // error={errorFields?.has(`itinerary.${itineraryIndex}.tour_type`)}
                                                      /> 
                                                </div>
                                                <div>
                                                      <Label required={true}>Tour Itinerary</Label>
                                                      <Select
                                                            // defaultValue={`itinerary.${itineraryIndex}.tour_type`}
                                                            options={itinerary ?? []}
                                                            placeholder="Select tour type"
                                                            className="dark:bg-dark-900"
                                                            // onChange={(value)=> handleInput(value, itineraryIndex, "tour_type")}
                                                            // error={errorFields?.has(`itinerary.${itineraryIndex}.tour_type`)}
                                                      /> 
                                                </div>
                                          </div>
                                          <button 
                                                type="button"
                                                onClick={()=> setIsManualSetupOpen(!isManualSetupOpen)}
                                                // onClick={addQA}
                                                className="text-[#465fff] hover:text-[#465fff] text-sm font-medium flex items-center gap-1 mt-3"
                                          >     {isManualSetupOpen ? (
                                                      <i className="fas fa-minus"></i>
                                                ) :(
                                                      <i className="fas fa-plus"></i>
                                                )}
                                                
                                                <span className="font-medium">Manual Tour Entry</span>
                                          </button>

                                          {/* Manual Tour Entry Section - Shows when "Other" is selected */}
                                          <div className={`border-t border-gray-200  overflow-hidden transition-all duration-300 ${isManualSetupOpen ? 'max-h-[2000px] opacity-100 pt-6' : 'max-h-0 opacity-0 pt-0 m-0'}`}>
                                                <div className="bg-gray-50 p-6 mb-6">
                                                      {/* Tour Name Input */}
                                                      <div className="mb-6">
                                                            <div>
                                                                  <Label required={true} htmlFor="tour_name" error={errorFields?.has("tags")}>Tour Name</Label>
                                                                  <Input
                                                                        value={blog?.tags}
                                                                        name="tour_name"
                                                                        type="text"
                                                                        id="tour_name"
                                                                        placeholder="e.g.,Tokyo Full Day Tour"
                                                                        onChange={(e) => handleInput(e)}
                                                                        error={errorFields?.has("tour_name")}
                                                                  />
                                                                  <ErrorMessage type="tour_name" />
                                                            </div>
                                                      </div>

                                                      {/* Service Provider */}
                                                      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-2 gap-4">
                                                            <div className="mb-6">
                                                                  <Label required={true}>Service Provider</Label>
                                                                  <Select
                                                                        // defaultValue={`itinerary.${itineraryIndex}.tour_type`}
                                                                        options={serviceProviders ?? []}
                                                                        placeholder="Select service provide"
                                                                        className="dark:bg-dark-900"
                                                                        // onChange={(value)=> handleInput(value, itineraryIndex, "tour_type")}
                                                                        // error={errorFields?.has(`itinerary.${itineraryIndex}.tour_type`)}
                                                                  /> 
                                                            </div>
                                                            <div className="mb-6">
                                                                  <Label required={true}>Commission Fee</Label>
                                                                  <Select
                                                                        // defaultValue={`itinerary.${itineraryIndex}.tour_type`}
                                                                        options={commissionFee ?? []}
                                                                        placeholder="Select commission rate"
                                                                        className="dark:bg-dark-900"
                                                                        // onChange={(value)=> handleInput(value, itineraryIndex, "tour_type")}
                                                                        // error={errorFields?.has(`itinerary.${itineraryIndex}.tour_type`)}
                                                                  /> 
                                                            </div>
                                                      </div>


                                                      {/* Save to Database Option */}
                                                      <div className="mb-6">
                                                            <div className='flex  flex-col justify-around'>
                                                                  <Label required={true}>Save this tour to database?</Label>
                                                                  <div className="flex flex-wrap items-center gap-8"> 
                                                                        <Radio
                                                                              id="radio1"
                                                                              name="save_to_db"
                                                                              value="1"
                                                                              checked={blog?.is_featured == "1"}
                                                                              onChange={(selectedOption) => handleSelect(selectedOption, "is_featured")}
                                                                              label="Yes, save for future use"
                                                                        />
                                                                        <Radio
                                                                              id="radio2"
                                                                              name="is_featured"
                                                                              value="0"
                                                                              checked={blog?.is_featured == "0"}
                                                                              onChange={(selectedOption) => handleSelect(selectedOption, "is_featured")}
                                                                              label="No, one-time entry"
                                                                        />
                                                                  </div>
                                                            </div>
            
                                                      </div>
                                                </div>
                                          </div>
                                                
                                          <div>
                                                {/* Additional Tour Details */}
                                                <div className="border-t grid md:grid-cols-2 lg:grid-cols-2 gap-4">
                                                      <div className="mt-6">
                                                            <Label required={true}   htmlFor="inputItineraryDuration">Tour duration (hours)</Label>
                                                            <Input  type="number" id="inputItineraryDuration" placeholder="e.g., 8" min="1"/>
                                                            
                                                      </div>
                                                      <div className="mt-6">
                                                            <Label required={true}    htmlFor="participants">Participants</Label>
                                                            <Input type="number" id="participants" placeholder="e.g., 3" min='1' max='50'/>
                                                
                                                      </div>
                                                </div>
                                                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
                                                      <div className="mt-6">
                                                            <Label required={true}    htmlFor="participants">Total Price</Label>
                                                            <Input type="number" id="participants" placeholder="e.g., 12,000" min='1' />
                                                      </div>
                                                      <div className="mt-6">
                                                            <DatePicker
                                                                  // value={tour.reviews?.[index].date}
                                                                  id="date-picker"
                                                                  label="Tour Date"
                                                                  placeholder="Select a date"
                                                                  // onChange={(dates) => {
                                                                  //       const validDate = new Date(dates);
                                                                  //       if (!isNaN(validDate.getTime())) {
                                                                  //             handleInput(validDate, index, "date");
                                                                  //       }
                                                                  // }}
                                                                  // error={errorFields?.has(`reviews.${index}.date`)}
                                                            />
                                                            {/* <ErrorMessage type={`reviews.${index}.date`}/> */}
                                                      </div>
                                                      
                                                </div>
                                                {/* Notes */}
                                                <div className="mt-6">
                                                      <div>
                                                            <Label >Notes</Label>
                                                            <TextArea
                                                                  // error={errorFields?.has(`itinerary.${itineraryIndex}.overview_description`)}
                                                                  // onChange={(value)=> handleInput(value, itineraryIndex,"overview_description" )} 
                                                                  // value={tour.itinerary[itineraryIndex].overview_description}
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
                        // onClick={handleSubmit}
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
