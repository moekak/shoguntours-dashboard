import React, { useState } from 'react'
import IconSelector from './IconSelector';
import CloseIcon from '@mui/icons-material/Close';
import Label from '../../../form/Label';
import Input from '../../../form/input/InputField';
import TextArea from '../../../form/input/TextArea';
import { useTourOperatorContext } from '../../context/TourOperatorContext';
import ErrorMessage from '../../../ui/error/ErrorMessage';
import { useCommonContext } from '../../../../context/CommonContext';

function ActivityItem({ activityIndex, itineraryIndex}) {
      const {setTour, tour} = useTourOperatorContext()
      const {errorFields} = useCommonContext()

      const removeActivity = (itineraryIndex, activityIndex) => {
            console.log(tour.itinerary[itineraryIndex].activity);
            
            setTour({
                  ...tour,
                  itinerary: tour.itinerary.map((item, index) => 
                        index === itineraryIndex 
                              ? {
                                    ...item,
                                    activity: item.activity.filter((_, i) => i !== activityIndex)
                              }
                              : item
                  )
            });
      };


      const handleInput = (value, itineraryIndex, activityIndex, field) => {
            setTour({
                  ...tour,
                  itinerary: tour.itinerary.map((item, iIndex) => 
                        iIndex === itineraryIndex 
                        ? {
                              ...item,
                              activity: item.activity.map((act, aIndex) => 
                                    aIndex === activityIndex 
                                    ? { ...act, [field]: value }
                                    : act
                              )
                        }
                        : item
                  )
            });
      };

      return (
            <div className="activity-item">
                  <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-start gap-3">
                              <IconSelector
                                    selectedIcon={tour.itinerary[itineraryIndex].activity[activityIndex].activity_icon}
                                    itineraryIndex={itineraryIndex}
                                    activityIndex={activityIndex}
                                    
                              />

                              <div className="flex-1 space-y-3">
                                    <div>
                                          <Input error={errorFields?.has(`itinerary.${itineraryIndex}.activity.${activityIndex}.activity_title`)} onChange={(e)=> handleInput(e.target.value, itineraryIndex, activityIndex, "activity_title")} value={tour.itinerary[itineraryIndex].activity[activityIndex].activity_title || ""} name='title' type="text" id="overviewTitle" placeholder="e.g., Senso-ji Temple Visit"/>
                                          <ErrorMessage type={`itinerary.${itineraryIndex}.activity.${activityIndex}.activity_title`}/>
                                    </div>
                                    <div>
                                          <TextArea
                                                error={errorFields?.has(`itinerary.${itineraryIndex}.activity.${activityIndex}.activity_description`)}
                                                onChange={(value)=> handleInput(value, itineraryIndex, activityIndex, "activity_description")}
                                                value={tour.itinerary[itineraryIndex].activity[activityIndex].activity_description || ""}
                                                rows={2}
                                                placeholder="Brief description of the activity..."
                                          />
                                          <ErrorMessage type={`itinerary.${itineraryIndex}.activity.${activityIndex}.activity_description`}/>
                                    </div>
                              </div>
                              <button
                                    type="button"
                                    onClick={() => removeActivity(itineraryIndex, activityIndex)}
                                    className="p-2 text-gray-400 hover:text-[#465fff]"
                              >
                                    <CloseIcon fontSize="small" />
                              </button>
                        </div>
                  </div>
            </div>
      );
}

export default ActivityItem