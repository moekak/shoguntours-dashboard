import React, { useState } from 'react';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ActivityItem from './itinerary/ActivityItem';
import HighlightItem from './itinerary/HighlightItem';
import { useTourCreateContext } from '../context/TourCreateContext';
import Label from '../../form/Label';
import Input from '../../form/input/InputField';
import Select from '../../form/Select';
import Checkbox from '../../form/input/Checkbox';
import TextArea from '../../form/input/TextArea';



// メインコンポーネント
const TourItinerarySection = () => {
      const {iconOptions, languages, tourTypes} = useTourCreateContext()


      const [itineraries, setItineraries] = useState([
            {
                  id: 0,
                  duration: '',
                  max_participants: '',
                  tour_type: 'public',
                  meeting_point: '',
                  adult_price: '',
                  child_price: '',
                  languages: [],
                  overview_title: '',
                  overview_description: '',
                  activities: [
                        {
                              activity_title: '',
                              activity_description: '',
                              activity_icon: 'fa-map-marker-alt'
                        }
                  ],
                  itinerary_highlights: ['']
            }
      ]);

      // 新しい旅程を追加
      const addItinerary = () => {
            const newItinerary = {
                  id: itineraries.length,
                  duration: '',
                  max_participants: '',
                  tour_type: 'public',
                  meeting_point: '',
                  adult_price: '',
                  child_price: '',
                  languages: [],
                  overview_title: '',
                  overview_description: '',
                  activities: [
                        {
                              activity_title: '',
                              activity_description: '',
                              activity_icon: 'fa-map-marker-alt'
                        }
                  ],
                  itinerary_highlights: ['']
            };
            setItineraries([...itineraries, newItinerary]);
      };

  // 旅程を削除
  const removeItinerary = (index) => {
    if (itineraries.length > 1) {
      setItineraries(itineraries.filter((_, i) => i !== index));
    }
  };

  // 旅程の基本情報を更新
  const updateItinerary = (index, field, value) => {
    const updated = itineraries.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setItineraries(updated);
  };

  // 言語の選択/解除
  const toggleLanguage = (itineraryIndex, languageId) => {
    const updated = itineraries.map((item, i) => {
      if (i === itineraryIndex) {
        const languages = item.languages.includes(languageId)
          ? item.languages.filter(id => id !== languageId)
          : [...item.languages, languageId];
        return { ...item, languages };
      }
      return item;
    });
    setItineraries(updated);
  };

  // アクティビティ関連の関数
  const addActivity = (itineraryIndex) => {
    const updated = itineraries.map((item, i) => 
      i === itineraryIndex ? {
        ...item,
        activities: [...item.activities, {
          activity_title: '',
          activity_description: '',
          activity_icon: 'fa-map-marker-alt'
        }]
      } : item
    );
    setItineraries(updated);
  };

  const removeActivity = (itineraryIndex, activityIndex) => {
    const updated = itineraries.map((item, i) => 
      i === itineraryIndex ? {
        ...item,
        activities: item.activities.filter((_, ai) => ai !== activityIndex)
      } : item
    );
    setItineraries(updated);
  };

  const updateActivity = (itineraryIndex, activityIndex, activityData) => {
    const updated = itineraries.map((item, i) => 
      i === itineraryIndex ? {
        ...item,
        activities: item.activities.map((activity, ai) => 
          ai === activityIndex ? activityData : activity
        )
      } : item
    );
    setItineraries(updated);
  };

  // ハイライト関連の関数
  const addHighlight = (itineraryIndex) => {
    const updated = itineraries.map((item, i) => 
      i === itineraryIndex ? {
        ...item,
        itinerary_highlights: [...item.itinerary_highlights, '']
      } : item
    );
    setItineraries(updated);
  };

  const removeHighlight = (itineraryIndex, highlightIndex) => {
    const updated = itineraries.map((item, i) => 
      i === itineraryIndex ? {
        ...item,
        itinerary_highlights: item.itinerary_highlights.filter((_, hi) => hi !== highlightIndex)
      } : item
    );
    setItineraries(updated);
  };

  const updateHighlight = (itineraryIndex, highlightIndex, value) => {
    const updated = itineraries.map((item, i) => 
      i === itineraryIndex ? {
        ...item,
        itinerary_highlights: item.itinerary_highlights.map((highlight, hi) => 
          hi === highlightIndex ? value : highlight
        )
      } : item
    );
    setItineraries(updated);
  };

      return (
            <div className="space-y-6" id="itinerary-section">
                  <div id="itinerary-wrapper">
                        {itineraries.map((itinerary, itineraryIndex) => (
                              <div key={itinerary.id} className="itinerary-item mt-8">
                                    <div className="bg-white rounded-xl shadow-sm p-6 relative">
                                          <div className="absolute top-6 right-6">
                                                <button
                                                      type="button"
                                                      onClick={() => removeItinerary(itineraryIndex)}
                                                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
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
                                                            <Label htmlFor="inputItineraryDuration">Duration (hours)</Label>
                                                            <Input name={`itinerary[${itineraryIndex}][duration]`} type="number" id="inputItineraryDuration" placeholder="e.g., 8"/>
                                                      </div>
                                                      <div>
                                                            <Label htmlFor="participants">Max Participants</Label>
                                                            <Input name={`itinerary[${itineraryIndex}][max_participants]`} type="text" id="participants" placeholder="e.g., 15" min='1' max='50'/>
                                                      </div>
                                                      <div>
                                                            <Label>Rating</Label>
                                                            <Select
                                                                  name={`itinerary[${itineraryIndex}][tour_type]`}
                                                                  options={tourTypes}
                                                                  placeholder="Select tour type"
                                                                  className="dark:bg-dark-900"
                                                            /> 
                                                      </div>
                                                      <div>
                                                            <Label htmlFor="meeting_point">Meeting Point</Label>
                                                            <Input name={`itinerary[${itineraryIndex}][meeting_point]`} type="text" id="meeting_point" placeholder="e.g., Hotel lobby or JR Shibuya Station"/>
                                                      </div>
                                                      <div>
                                                            <Label htmlFor="adult_price">Adult Price (¥)</Label>
                                                            <Input name={`itinerary[${itineraryIndex}][adult_price]`} type="number" id="adult_price" placeholder="e.g., 12000"/>
                                                      </div>
                                                      <div>
                                                            <Label htmlFor="child_price">Child Price (¥)</Label>
                                                            <Input name={`itinerary[${itineraryIndex}][child_price]`} type="number" id="child_price" placeholder="e.g., 6000"/>
                                                      </div>
                                                      <div>
                                                            <Label htmlFor="language">Languages Available</Label>
                                                            <div className="flex items-center gap-4 mt-4">
                                                                  {languages.map((language, index)=>(
                                                                        <div className="flex items-center gap-3">
                                                                              <Checkbox key={`activity-${index}`} label={language.language}/>
                                                                        </div>
                                                                  ))}
                                                            </div> 
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
                                                                        <Label htmlFor="overviewTitle">Overview Title</Label>
                                                                        <Input name='title' type="text" id="overviewTitle" placeholder="e.g., Experience Tokyo Like Never Before"/>
                                                                  </div>
                                                                  <div>
                                                                        <Label>Overview Description</Label>
                                                                        <TextArea
                                                                              // value={message}
                                                                              // onChange={(value) => setMessage(value)}
                                                                              rows={4}
                                                                              placeholder="Describe what makes this tour special..."
                                                                        />
                                                                        <p className="text-xs text-gray-500 mt-1">0/500 characters</p>
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
                                                                        {itinerary.activities.map((activity, activityIndex) => (
                                                                              <ActivityItem
                                                                                    key={activityIndex}
                                                                                    activity={activity}
                                                                                    activityIndex={activityIndex}
                                                                                    itineraryIndex={itineraryIndex}
                                                                                    onRemove={(index) => removeActivity(itineraryIndex, index)}
                                                                                    onUpdate={(index, data) => updateActivity(itineraryIndex, index, data)}
                                                                              />
                                                                        ))}
                                                                  </div>
                                                                  <button
                                                                        type="button"
                                                                        onClick={() => addActivity(itineraryIndex)}
                                                                        className="mt-3 text-[#e92929] hover:text-[#d61f1f] text-sm font-medium flex items-center gap-1"
                                                                  >
                                                                        <AddCircleOutlineIcon fontSize="small" />
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
                                                <div className="m-8 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center flex items-center flex-col justify-center hover:border-[#e92929] transition-colors cursor-pointer h-[350px]">
                                                      <CloudUploadIcon sx={{ fontSize: 48, color: '#9ca3af', marginBottom: 2 }} />
                                                      <p className="text-gray-600 font-medium mb-2">Upload itinerary image</p>
                                                      <p className="text-sm text-gray-500">This will be displayed as the itinerary banner image</p>
                                                      <p className="text-sm text-gray-500 mb-4">Recommended size: 1920x1080px</p>
                                                      <label className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm cursor-pointer">
                                                            Select Itinerary Image
                                                            <input type="file" className="hidden" accept="image/*" />
                                                      </label>
                                                </div>
                                          </div>

                                          {/* Highlights Section */}
                                          <div className="border border-gray-200 rounded-lg overflow-hidden mt-8">
                                                <div className="bg-gray-50 p-4 border-b border-gray-200">
                                                      <h5 className="font-semibold text-gray-800">Activity Highlights</h5>
                                                </div>
                                                <div className="m-8 space-y-2">
                                                      {itinerary.itinerary_highlights.map((highlight, highlightIndex) => (
                                                            <HighlightItem
                                                                  key={highlightIndex}
                                                                  highlight={highlight}
                                                                  index={highlightIndex}
                                                                  onRemove={(index) => removeHighlight(itineraryIndex, index)}
                                                                  onUpdate={(index, value) => updateHighlight(itineraryIndex, index, value)}
                                                            />
                                                      ))}
                                                      <button
                                                            type="button"
                                                            onClick={() => addHighlight(itineraryIndex)}
                                                            className="text-[#e92929] hover:text-[#d61f1f] text-sm font-medium flex items-center gap-1 mt-3"
                                                      >
                                                            <AddCircleOutlineIcon fontSize="small" />
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
                        className="w-full py-4 border-2 border-dashed border-[#e92929] rounded-xl text-[#e92929] hover:bg-[#e92929]/5 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                        <AddCircleOutlineIcon />
                        <span>Add New Tour Itinerary & Details</span>
                  </button>
            </div>
      );
};

export default TourItinerarySection;