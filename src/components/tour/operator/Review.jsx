
import Label from "../../form/Label.tsx";
import Select from "../../form/Select.tsx";
import Input from "../../form/input/InputField.tsx";
import TextArea from "../../form/input/TextArea.tsx";
import DatePicker from "../../form/date-picker.tsx";

import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import { useTourOperatorContext } from "../context/TourOperatorContext.jsx";
import ErrorMessage from "../../ui/error/ErrorMessage.jsx";

function Review() {
      const {setTour, ratingOptions, tour,  errorFields} = useTourOperatorContext()

      const addReview = () => {
            setTour({
                  ...tour,
                  reviews: [...tour.reviews,  {name: '', rating: '', content: '', date: '' }]
            });
      };

      const removeReview = (index) => {
            setTour({
                  ...tour,
                  reviews: tour.reviews.filter((_, i)=> i !== index)
            })
      };

      const handleInput = (value, index, field) => {
            const updatedReviews = [...tour.reviews];
            updatedReviews[index][field] = value;
            
            setTour({
                  ...tour,
                  reviews: updatedReviews
            });
      }

      return (
            <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#ecf3ff] rounded-lg flex items-center justify-center mr-3">
                              <RateReviewOutlinedIcon sx={{  color: '#465fff', fontSize: 20  }} />
                        </div>
                        Reviews
                  </h2>

                  <div className="space-y-6">
                        {tour.reviews?.map((_, index) => (
                              <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-4">
                                          <h3 className="text-lg font-medium text-gray-800">Review #{index + 1}</h3>
                                          <button 
                                                type="button" 
                                                onClick={() => removeReview(index)}
                                                className="p-2 text-gray-400 hover:text-[#465fff]"
                                          >
                                                <i className="fas fa-trash"></i>
                                          </button>
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                          <div>
                                                <Label error={errorFields?.has(`reviews.${index}.name`)}  htmlFor="reviewerName">Reviewer Name</Label>
                                                <Input error={errorFields?.has(`reviews.${index}.name`)} value={tour.reviews?.[index].name || ""} onChange={(e) => handleInput(e.target.value, index, "name")} type="text" id="reviewerName" placeholder="e.g., Sarah Johnson"/>
                                                <ErrorMessage type={`reviews.${index}.name`}/>
                                          </div>
                                          
                                          <div>
                                                <Label error={errorFields?.has(`reviews.${index}.rating`)} >Rating</Label>


                                                <Select
                                                      defaultValue={tour.reviews?.[index].rating ? Number(tour.reviews[index].rating) : ""} 
                                                      options={ratingOptions}
                                                      placeholder="Select Rating"
                                                      className="dark:bg-dark-900"
                                                      onChange={(value) => handleInput(value, index, "rating")}
                                                      error={errorFields?.has(`reviews.${index}.rating`)}
                                                /> 
                                                <ErrorMessage type={`reviews.${index}.rating`}/>
                                          </div>
                                    </div>

                                    <div className="mb-4">
                                          <Label error={errorFields?.has(`reviews.${index}.content`)} htmlFor="review_content">Review Content</Label>
                                          <TextArea
                                                value={tour.reviews?.[index].content || ""} 
                                                onChange={(value) => handleInput(value, index, "content")}
                                                rows={3}
                                                id="review_content"
                                                placeholder="Share what made this tour amazing..."
                                                error={errorFields?.has(`reviews.${index}.content`)}
                                          />
                                          <ErrorMessage type={`reviews.${index}.content`}/>
                                          <p className="text-xs text-gray-500 mt-1">0/300 characters</p>
                                    </div>

                                    <div>
                                          <DatePicker
                                                defaultDate={tour.reviews?.[index].date}
                                                id="date-picker"
                                                label="Review Date"
                                                placeholder="Select a date"
                                                onChange={(dates) => {
                                                      const validDate = new Date(dates);
                                                      if (!isNaN(validDate.getTime())) {
                                                            handleInput(validDate, index, "date");
                                                      }
                                                }}
                                                error={errorFields?.has(`reviews.${index}.date`)}
                                          />
                                          <ErrorMessage type={`reviews.${index}.date`}/>
                                    </div>
                              </div>
                        ))}

                        <button 
                              type="button"
                              onClick={addReview}
                              className="text-[#465fff] hover:text-[#465fff] text-sm font-medium flex items-center gap-1 mt-3"
                        >
                              <i className="fas fa-plus"></i>
                              Add review
                        </button>
                  </div>
            </div>
      )
}

export default Review