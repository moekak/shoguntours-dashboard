import React, { useState } from 'react';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ActivityItem from './itinerary/ActivityItem';
import HighlightItem from './itinerary/HighlightItem';
import { useTourOperatorContext } from '../context/TourOperatorContext';
import Label from '../../form/Label';
import Input from '../../form/input/InputField';
import Select from '../../form/Select';
import Checkbox from '../../form/input/Checkbox';
import TextArea from '../../form/input/TextArea';
import ItineraryImage from './itinerary/ItineraryImage';
import ErrorMessage from '../../ui/error/ErrorMessage';
import { useCommonContext } from '../../../context/CommonContext';



// メインコンポーネント
const TourItinerarySection = () => {

      const {errorFields} = useCommonContext()
      const {setTour, tourTypes,tour,  languages} = useTourOperatorContext()

      const addItinerary = () => {
            setTour({
                  ...tour,
                  itinerary: [...tour.itinerary,  {
                        duration: "",
                        max_participants: "",
                        tour_type: "private",
                        meeting_point: "",
                        adult_price: "",
                        child_price: "",
                        logistics_fee: "",
                        overview_title: "",
                        overview_description: "",
                        activity: [
                              {
                                    activity_icon: "",
                                    activity_title: "",
                                    activity_icon: 'fa-solid fa-location-dot'
                              }
                        ],
                        itinerary_highlight: [""],
                        languages: []
                  }]
            });
      };

      const removeItinerary = (index) => {
            setTour({
                  ...tour,
                  itinerary: tour.itinerary.filter((_, i)=> i !== index)
            })
      };

      const handleInput = (value, index, field) => {
            const updatedItinerary = [...tour.itinerary];
            updatedItinerary[index][field] = value;
            
            setTour({
                  ...tour,
                  itinerary: updatedItinerary
            });
      }


      // アクティビティ関連の関数
      const addActivity = (index) => {
            setTour({
                  ...tour,
                  itinerary: tour.itinerary.map((item, i) => 
                        i === index 
                        ? {
                              ...item,
                              activity: [
                                    ...item.activity,
                                    {
                                    activity_icon: 'fa-solid fa-location-dot',
                                    activity_title: ""
                                    }
                              ]
                        }
                        : item
                  )
            });
      };

            // ハイライト関連の関数
      const addHighlight = (itineraryIndex) => {
            setTour({
                  ...tour,
                  itinerary: tour.itinerary.map((item, i) => 
                        i === itineraryIndex 
                        ? {
                              ...item,
                              itinerary_highlight: [
                                    ...item.itinerary_highlight, ""
                              ]
                        }
                        : item
                  )
            });
      };


      const handleLanguageChange = (itineraryIndex, language, isChecked) => {
            setTour({
                  ...tour,
                  itinerary: tour.itinerary.map((item, iIndex) => 
                        iIndex === itineraryIndex 
                        ? {
                              ...item,
                              languages: isChecked 
                              ? [...item.languages, language]  // 言語を追加
                              : item.languages.filter(lang => lang !== language)  // 言語を削除
                        }
                        : item
                  )
            });
      };


      return (
            <div className="space-y-6" id="itinerary-section">
                  <div id="itinerary-wrapper">
                        {tour?.itinerary?.map((itinerary, itineraryIndex) => (
                              <div key={itineraryIndex} className="itinerary-item mt-8">
                                    <div className="bg-white rounded-xl shadow-sm p-6 relative">
                                          <div className="absolute top-6 right-6">
                                                <button
                                                      type="button"
                                                      onClick={() => removeItinerary(itineraryIndex)}
                                                      className="p-2 text-gray-400 hover:text-[#465fff]"
                                                      title="Delete this itinerary"
                                                >
                                                      <DeleteOutlineIcon />
                                                </button>
                                          </div>
                                          
                                          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                                <div className="w-8 h-8 bg-[#ecf3ff] rounded-lg flex items-center justify-center mr-3">
                                                      <RouteOutlinedIcon sx={{  color: '#465fff', fontSize: 20  }} />
                                                </div>
                                                Tour Itinerary & Details #{itineraryIndex + 1}
                                          </h2>

                                          {/* Tour Basic Details */}
                                          <div className="border border-gray-200 rounded-lg overflow-hidden">
                                                <div className="bg-gray-50 p-4 border-b border-gray-200">
                                                      <h5 className="font-semibold text-gray-800 flex items-center">
                                                            <InfoOutlinedIcon sx={{ color: '#9ca3af', fontSize: 18, marginRight: 1 }} />
                                                            Tour Information
                                                      </h5>
                                                </div>

                                                <div className="m-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                      <div>
                                                            <Label required={true}  error={errorFields?.has(`itinerary.${itineraryIndex}.duration`)} htmlFor="inputItineraryDuration">Duration (hours)</Label>
                                                            <Input error={errorFields?.has(`itinerary.${itineraryIndex}.duration`)}  onChange={(e)=> handleInput(e.target.value, itineraryIndex, "duration")} value={tour.itinerary[itineraryIndex].duration} type="number" id="inputItineraryDuration" placeholder="e.g., 8"/>
                                                            <ErrorMessage type={`itinerary.${itineraryIndex}.duration`}/>
                                                      </div>
                                                      <div>
                                                            <Label required={true}  error={errorFields?.has(`itinerary.${itineraryIndex}.max_participants`)}  htmlFor="participants">Max Participants</Label>
                                                            <Input error={errorFields?.has(`itinerary.${itineraryIndex}.max_participants`)}  onChange={(e)=> handleInput(e.target.value, itineraryIndex, "max_participants")} value={tour.itinerary[itineraryIndex].max_participants} type="number" id="participants" placeholder="e.g., 15" min='1' max='50'/>
                                                            <ErrorMessage type={`itinerary.${itineraryIndex}.max_participants`}/>
                                                      </div>
                                                      <div>
                                                            <Label required={true}  error={errorFields?.has(`itinerary.${itineraryIndex}.tour_type`)}>Tour Type</Label>
                                                            <Select
                                                                  defaultValue={`itinerary.${itineraryIndex}.tour_type`}
                                                                  options={tourTypes}
                                                                  placeholder="Select tour type"
                                                                  className="dark:bg-dark-900"
                                                                  onChange={(value)=> handleInput(value, itineraryIndex, "tour_type")}
                                                                  error={errorFields?.has(`itinerary.${itineraryIndex}.tour_type`)}
                                                            /> 
                                                            <ErrorMessage type={`itinerary.${itineraryIndex}.tour_type`}/>
                                                      </div>
                                                      <div>
                                                            <Label required={true}  error={errorFields?.has(`itinerary.${itineraryIndex}.meeting_point`)} htmlFor="meeting_point">Meeting Point</Label>
                                                            <Input error={errorFields?.has(`itinerary.${itineraryIndex}.meeting_point`)} onChange={(e)=> handleInput(e.target.value, itineraryIndex, "meeting_point")} value={tour.itinerary[itineraryIndex].meeting_point} type="text" id="meeting_point" placeholder="e.g., Hotel lobby or JR Shibuya Station"/>
                                                            <ErrorMessage type={`itinerary.${itineraryIndex}.meeting_point`}/>
                                                      </div>
                                                      <div>
                                                            <Label required={true} error={errorFields?.has(`itinerary.${itineraryIndex}.adult_price`)} htmlFor="adult_price">Adult Price (¥)</Label>
                                                            <Input error={errorFields?.has(`itinerary.${itineraryIndex}.adult_price`)} onChange={(e)=> handleInput(e.target.value, itineraryIndex, "adult_price")} value={tour.itinerary[itineraryIndex].adult_price} type="number" id="adult_price" placeholder="e.g., 12000"/>
                                                            <ErrorMessage type={`itinerary.${itineraryIndex}.adult_price`}/>
                                                      </div>
                                                      <div>
                                                            <Label htmlFor="child_price">Child Price (¥)</Label>
                                                            <Input onChange={(e)=> handleInput(e.target.value, itineraryIndex, "child_price")} value={tour.itinerary[itineraryIndex].child_price} type="number" id="child_price" placeholder="e.g., 6000"/>
                                                      </div>
                                                      <div>
                                                            <Label required={true} error={errorFields?.has(`itinerary.${itineraryIndex}.logistics_fee`)} htmlFor="logistics_fee">Logistics fee (¥)</Label>
                                                            <Input error={errorFields?.has(`itinerary.${itineraryIndex}.logistics_fee`)} onChange={(e)=> handleInput(e.target.value, itineraryIndex, "logistics_fee")} value={tour.itinerary[itineraryIndex].logistics_fee} type="number" id="logistics_fee" placeholder="e.g., 12000"/>
                                                            <ErrorMessage type={`itinerary.${itineraryIndex}.logistics_fee`}/>
                                                      </div>
                                                      <div>
                                                            <Label htmlFor="language" error={errorFields?.has(`itinerary.${itineraryIndex}.languages`)} required={true}>Languages Available</Label>
                                                            <div className="flex items-center gap-4 mt-4">
                                                                  {languages?.map((language, index)=>(
                                                                        <div className="flex items-center gap-3" key={`language-${itineraryIndex}-${index}`}>
                                                                              <Checkbox 
                                                                                    checked={tour?.itinerary[itineraryIndex]?.languages?.includes(language.id)}
                                                                                    label={language.language} 
                                                                                    onChange={(value) =>handleLanguageChange(itineraryIndex, language.id, value)}
                                                                              />
                                                                        </div>
                                                                  ))}
                                                            </div> 
                                                            <ErrorMessage type={`itinerary.${itineraryIndex}.languages`}/>
                                                      </div>
                                                </div>
                                          </div>

                                          {/* Overview Section */}
                                          <div className="mt-8">
                                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                                      <div className="bg-gray-50 p-4 border-b border-gray-200">
                                                            <h5 className="font-semibold text-gray-800">Overview</h5>
                                                      </div>
                                                      <div className="p-8">
                                                            <div className="space-y-5">
                                                                  <div>
                                                                        <Label error={errorFields?.has(`itinerary.${itineraryIndex}.overview_title`)} htmlFor="overviewTitle">Overview Title</Label>
                                                                        <Input error={errorFields?.has(`itinerary.${itineraryIndex}.overview_title`)}  onChange={(e)=> handleInput(e.target.value, itineraryIndex,"overview_title" )} value={tour.itinerary[itineraryIndex].overview_title} name='title' type="text" id="overviewTitle" placeholder="e.g., Experience Tokyo Like Never Before"/>
                                                                        <ErrorMessage type={`itinerary.${itineraryIndex}.overview_title`}/>
                                                                  </div>
                                                                  <div>
                                                                        <Label error={errorFields?.has(`itinerary.${itineraryIndex}.overview_description`)}>Overview Description</Label>
                                                                        <TextArea
                                                                              error={errorFields?.has(`itinerary.${itineraryIndex}.overview_description`)}
                                                                              onChange={(value)=> handleInput(value, itineraryIndex,"overview_description" )} 
                                                                              value={tour.itinerary[itineraryIndex].overview_description}
                                                                              rows={4}
                                                                              placeholder="Describe what makes this tour special..."
                                                                        />
                                                                        <ErrorMessage type={`itinerary.${itineraryIndex}.overview_description`}/>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>

                                          {/* Activities Section */}
                                          <div className="mt-8">
                                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                                      <div className="bg-gray-50 p-4 border-b border-gray-200">
                                                            <h5 className="font-semibold text-gray-800">Itinerary Item</h5>
                                                      </div>
                                                      <div className="p-8">
                                                            <div>
                                                                  <label className="block text-sm font-medium text-gray-700 mb-2">Activities</label>
                                                                  <div className="space-y-3">
                                                                        {itinerary?.activity.map((activity, activityIndex) => (
                                                                              <ActivityItem
                                                                                    key={`activity-${itineraryIndex}-${activityIndex}`}
                                                                                    activityIndex={activityIndex}
                                                                                    itineraryIndex={itineraryIndex}
                                                                                    
                                                                              />
                                                                        ))}
                                                                  </div>
                                                                  <button
                                                                        type="button"
                                                                        onClick={() => addActivity(itineraryIndex)}
                                                                        className="text-[#465fff] hover:text-[#465fff] text-sm font-medium flex items-center gap-1 mt-3"
                                                                  >
                                                                        <i className="fas fa-plus"></i>
                                                                        Add activity
                                                                  </button>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>

                                          {/* Image Upload Section */}
                                          <div className="border border-gray-200 rounded-lg overflow-hidden mt-8">
                                                <div className="bg-gray-50 p-4 border-b border-gray-200">
                                                      <h5 className="font-semibold text-gray-800">Main Image for this Itinerary</h5>
                                                </div>
                                                <ItineraryImage itineraryIndex={itineraryIndex} />
                                          </div>

                                          {/* Highlights Section */}
                                          <div className="border border-gray-200 rounded-lg overflow-hidden mt-8">
                                                <div className="bg-gray-50 p-4 border-b border-gray-200">
                                                      <h5 className="font-semibold text-gray-800">Activity Highlights</h5>
                                                </div>
                                                <div className="m-8 space-y-2">
                                                      {itinerary.itinerary_highlight.map((_, highlightIndex) => (
                                                            <HighlightItem
                                                                  key={`highlight-${itineraryIndex}-${highlightIndex}`}
                                                                  itineraryIndex={itineraryIndex}
                                                                  highlightIndex={highlightIndex}
                                                                  
                                                            />
                                                      ))}
                                                      <button
                                                            type="button"
                                                            onClick={() => addHighlight(itineraryIndex)}
                                                            className="text-[#465fff] hover:text-[#465fff] text-sm font-medium flex items-center gap-1 mt-3"
                                                      >
                                                            <i className="fas fa-plus"></i>
                                                            Add highlight
                                                      </button>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        ))}
                  </div>

                  {/* Add New Itinerary Button */}
                  <button
                        type="button"
                        onClick={addItinerary}
                        className="w-full py-4 border-2 border-dashed border-[#465fff] rounded-xl text-[#465fff]  transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                        <AddCircleOutlineIcon />
                        <span>Add New Tour Itinerary & Details</span>
                  </button>
            </div>
      );
};

export default TourItinerarySection;