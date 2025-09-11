import React, { useState } from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import Label from "../form/Label";
import Select from "../form/Select";
import Input from "../form/input/InputField";
import TextArea from "../form/input/TextArea";
import Radio from "../form/input/Radio";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';

const TourCreate = () => {
  const [tours, setTours] = useState([]);
  const [highlights, setHighlights] = useState([
    { title: '', description: '' }
  ]);
  const [activities, setActivities] = useState([
    { title: '', description: '', icon: 'fa-map-marker-alt' }
  ]);
  const [reviews, setReviews] = useState([
    { name: '', rating: '', content: '', date: '' }
  ]);
  const [qa, setQa] = useState([
    { question: '', answer: '' }
  ]);

  const addHighlight = () => {
    setHighlights([...highlights, { title: '', description: '' }]);
  };

  const removeHighlight = (index) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const addActivity = () => {
    setActivities([...activities, { title: '', description: '', icon: 'fa-map-marker-alt' }]);
  };

  const removeActivity = (index) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const addReview = () => {
    setReviews([...reviews, { name: '', rating: '', content: '', date: '' }]);
  };

  const removeReview = (index) => {
    setReviews(reviews.filter((_, i) => i !== index));
  };

  const addQA = () => {
    setQa([...qa, { question: '', answer: '' }]);
  };

  const removeQA = (index) => {
    setQa(qa.filter((_, i) => i !== index));
  };

      const regionOptions = [
            { value: "kanto", label: "Kanto" },
            { value: "kansai", label: "Kansai" },
      ];
      const categoryOptions = [
            { value: "tokuo", label: "Tokyo" },
            { value: "kanakura", label: "Kamakura" },
            { value: "yokohama", label: "Yokohama" },
      ];

  const iconOptions = [
    { icon: 'fa-map-marker-alt', title: '場所' },
    { icon: 'fa-camera', title: '写真撮影' },
    { icon: 'fa-utensils', title: '食事' },
    { icon: 'fa-shopping-bag', title: 'ショッピング' },
    { icon: 'fa-train', title: '交通' },
    { icon: 'fa-museum', title: '博物館' },
    { icon: 'fa-tree', title: '公園' },
    { icon: 'fa-torii-gate', title: '神社' },
    { icon: 'fa-building', title: '建物' },
    { icon: 'fa-hot-tub', title: '温泉' },
    { icon: 'fa-mountain', title: '山' },
    { icon: 'fa-water', title: '海' },
    { icon: 'fa-star', title: '観光地' },
    { icon: 'fa-coffee', title: 'カフェ' },
    { icon: 'fa-bed', title: '宿泊' },
    { icon: 'fa-bus', title: 'バス' },
    { icon: 'fa-ticket-alt', title: 'チケット' },
    { icon: 'fa-clock', title: '時間' }
  ];

      return (
      <div className="bg-gray-50 min-h-screen">
      
            {/* Main Content */}
            <main className="pb-10">
            <div className="container">
            {/* Page Header */}
            <div className="mb-8 sticky">
                  <Breadcrumbs aria-label="breadcrumb" className='text-xs' sx={{ fontSize: '0.75rem' }}>
                        <Link underline="hover" color="inherit" href="/">
                              Tour
                        </Link>

                        <Typography sx={{ color: 'text.primary', fontSize: '0.8rem' }}>Create tour</Typography>
                  </Breadcrumbs>
                  <h1 className="text-2xl font-bold text-gray-800 mt-3">Create New Tour</h1>
                  <p className="text-gray-600 mt-2">Fill in the details below to create a new tour experience</p>
            </div>

            {/* Form Sections */}
            <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                              <InfoOutlinedIcon/>
                              Basic Information
                        </h2>

                        <div className="space-y-5">
                              <div>
                                    <Label htmlFor="inputToutTitle">Tour Title</Label>
                                    <Input name='title' type="text" id="inputToutTitle" placeholder="e.g., Tokyo City Highlights Tour"/>
                              </div>
                              <div>
                                    <Label htmlFor="inputToutSubTitle">Subtitle</Label>
                                    <Input name='subtitle' type="text" id="inputToutSubTitle" placeholder="e.g., An unforgettable journey through Japan's vibrant capital"/>
                              </div>
                              <div>
                                    <Label htmlFor="inputBadge">Badge Label</Label>
                                    <Input name='badge' type="text" id="inputBadge" placeholder="e.g., Best seller"/>
                              </div>
                              <div className='flex justify-between gap-5'>
                                    <div className="flex-1">
                                          <Label>Region</Label>
                                          <Select
                                                name="region_id"
                                                options={regionOptions}
                                                placeholder="Choose a region"
                                                className="dark:bg-dark-900"
                                          /> 
                                    </div>
                                    <div className="flex-1">
                                          <Label>Category</Label>
                                          <Select
                                                name="region_id"
                                                options={categoryOptions}
                                                placeholder="Choose a category"
                                                className="dark:bg-dark-900"
                                          /> 
                                    </div>

                                    <div className='flex-1 flex flex-col justify-around'>
                                          <Label>Feature</Label>
                                          <div className="flex flex-wrap items-center gap-8"> 
                                                <Radio
                                                      id="radio1"
                                                      name="group1"
                                                      value="option1"
                                                      checked
                                                //     checked={selectedValue === "option1"}
                                                //     onChange={handleRadioChange}
                                                      label="Default"
                                                />
                                                <Radio
                                                      id="radio2"
                                                      name="group1"
                                                      value="option2"
                                                //     checked={selectedValue === "option2"}
                                                //     onChange={handleRadioChange}
                                                      label="Selected"
                                                />
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* Hero Image Section */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                              <BrokenImageOutlinedIcon/>
                              Hero Image
                        </h2>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center flex items-center flex-col justify-center hover:border-[#e92929] transition-colors cursor-pointer h-[350px]">
                              <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                              <p className="text-gray-600 font-medium mb-2">Upload main tour image</p>
                              <p className="text-sm text-gray-500">This will be displayed as the main banner image</p>
                              <p className="text-sm text-gray-500 mb-4">Recommended size: 1920x1080px</p>
                              <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm w-fit">
                                    Select Hero Image
                              </button>
                        </div>
                  </div>

                  {/* Overview Section */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                              <div className="w-8 h-8 bg-[#e92929]/10 rounded-lg flex items-center justify-center mr-3">
                                    <i className="fas fa-align-left text-[#e92929]"></i>
                              </div>
                              Overview Section
                        </h2>

                        <div className="space-y-5">
                              <div>
                                    <Label htmlFor="inputOverviewTitle">Overview Title</Label>
                                    <Input name='overview_title' type="text" id="inputOverviewTitle" placeholder="e.g., Experience Tokyo Like Never Before"/>
                              </div>
                              <div>
                                    <Label>Overview Description</Label>
                                    <TextArea
                                          // value={message}
                                          // onChange={(value) => setMessage(value)}
                                          rows={6}
                                          name="overview_description"
                                          placeholder="Describe what makes this tour special..."
                                    />
                                    <p className="text-xs text-gray-500 mt-1">0/500 characters</p>
                              </div>
{/*   

                              <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Overview Description *</label>
                                    <textarea 
                                    rows="4" 
                                    placeholder="Describe what makes this tour special..."
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#e92929] focus:outline-none focus:ring-2 focus:ring-[#e92929]/20 transition-all resize-none"
                                    ></textarea>
                                    <p className="text-xs text-gray-500 mt-1">0/500 characters</p>
                              </div> */}
                        </div>
                  </div>

                  {/* QA Section */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-[#e92929]/10 rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-question-circle text-[#e92929]"></i>
                  </div>
                  QA
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">Add common questions and answers that help customers understand the experience.</p>
                  
                  <div className="space-y-4">
                  {qa.map((item, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start gap-4">
                        <div className="flex-1">
                              <input 
                              type="text" 
                              placeholder="Type a frequently asked question..."
                              className="w-full px-3 py-2 mb-2 rounded-lg border border-gray-300 focus:border-[#e92929] focus:outline-none focus:ring-2 focus:ring-[#e92929]/20 transition-all text-sm font-medium"
                              />
                              <textarea 
                              rows="2" 
                              placeholder="Type your answer here..."
                              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#e92929] focus:outline-none focus:ring-2 focus:ring-[#e92929]/20 transition-all text-sm resize-none"
                              ></textarea>
                        </div>
                        <button 
                              type="button" 
                              onClick={() => removeQA(index)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                              <i className="fas fa-trash"></i>
                        </button>
                        </div>
                        </div>
                  ))}
                  </div>

                  <button 
                  type="button"
                  onClick={addQA}
                  className="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#e92929] hover:text-[#e92929] transition-colors flex items-center justify-center gap-2"
                  >
                  <i className="fas fa-plus"></i>
                  <span className="font-medium">Add QA</span>
                  </button>
                  </div>

                  {/* Highlights Section */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-[#e92929]/10 rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-lightbulb text-[#e92929]"></i>
                  </div>
                  Tour Highlights
                  </h2>

                  <p className="text-sm text-gray-600 mb-4">Add key features and highlights that make this tour special</p>
                  
                  <div className="space-y-4">
                  {highlights.map((highlight, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#e92929]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <i className="fas fa-torii-gate text-[#e92929]"></i>
                        </div>
                        <div className="flex-1">
                              <input 
                              type="text" 
                              placeholder="Highlight title (e.g., Ancient Temples & Shrines)"
                              className="w-full px-3 py-2 mb-2 rounded-lg border border-gray-300 focus:border-[#e92929] focus:outline-none focus:ring-2 focus:ring-[#e92929]/20 transition-all text-sm font-medium"
                              />
                              <textarea 
                              rows="2" 
                              placeholder="Brief description of this highlight..."
                              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#e92929] focus:outline-none focus:ring-2 focus:ring-[#e92929]/20 transition-all text-sm resize-none"
                              ></textarea>
                        </div>
                        <button 
                              type="button" 
                              onClick={() => removeHighlight(index)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                              <i className="fas fa-trash"></i>
                        </button>
                        </div>
                        </div>
                  ))}
                  </div>

                  <button 
                  type="button"
                  onClick={addHighlight}
                  className="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#e92929] hover:text-[#e92929] transition-colors flex items-center justify-center gap-2"
                  >
                  <i className="fas fa-plus"></i>
                  <span className="font-medium">Add Highlight</span>
                  </button>
                  </div>

                  {/* Activities Section */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-[#e92929]/10 rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-route text-[#e92929]"></i>
                  </div>
                  Activities
                  </h2>

                  <div className="space-y-3">
                  {activities.map((activity, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 relative">
                              <div className="w-10 h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-[#e92929] transition-all">
                              <i className={`fas ${activity.icon} text-[#e92929] text-sm`}></i>
                              </div>
                        </div>

                        <div className="flex-1 space-y-3">
                              <div className="grid md:grid-cols-3 gap-3">
                              <div className="md:col-span-2">
                              <input 
                                    type="text" 
                                    placeholder="e.g., Senso-ji Temple Visit"
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#e92929] focus:outline-none focus:ring-2 focus:ring-[#e92929]/20 transition-all text-sm"
                              />
                              </div>
                              </div>
                              <div>
                              <textarea
                              rows="2"
                              placeholder="Brief description of the activity..."
                              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#e92929] focus:outline-none focus:ring-2 focus:ring-[#e92929]/20 transition-all text-sm resize-none"
                              ></textarea>
                              </div>
                        </div>
                        <button 
                              type="button" 
                              onClick={() => removeActivity(index)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                              <i className="fas fa-times"></i>
                        </button>
                        </div>
                        </div>
                  ))}
                  </div>

                  <button 
                  type="button"
                  onClick={addActivity}
                  className="mt-3 text-[#e92929] hover:text-[#d61f1f] text-sm font-medium flex items-center gap-1"
                  >
                  <i className="fas fa-plus-circle"></i>
                  Add activity
                  </button>
                  </div>

                  {/* Reviews Section */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-[#e92929]/10 rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-star text-[#e92929]"></i>
                  </div>
                  Reviews
                  </h2>

                  <div className="space-y-6">
                  {reviews.map((review, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-800">Review #{index + 1}</h3>
                        <button 
                              type="button" 
                              onClick={() => removeReview(index)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                              <i className="fas fa-trash"></i>
                        </button>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Reviewer Name *</label>
                              <input 
                              type="text" 
                              placeholder="e.g., Sarah Johnson"
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#e92929] focus:outline-none focus:ring-2 focus:ring-[#e92929]/20 transition-all"
                              />
                        </div>
                        
                        <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
                              <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#e92929] focus:outline-none focus:ring-2 focus:ring-[#e92929]/20 transition-all">
                              <option value="">Select Rating</option>
                              <option value="5">⭐⭐⭐⭐⭐ (5 stars)</option>
                              <option value="4">⭐⭐⭐⭐ (4 stars)</option>
                              <option value="3">⭐⭐⭐ (3 stars)</option>
                              <option value="2">⭐⭐ (2 stars)</option>
                              <option value="1">⭐ (1 star)</option>
                              </select>
                        </div>
                        </div>

                        <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Review Content *</label>
                        <textarea 
                              rows="3" 
                              placeholder="Share what made this tour amazing..."
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#e92929] focus:outline-none focus:ring-2 focus:ring-[#e92929]/20 transition-all resize-none"
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-1">0/300 characters</p>
                        </div>

                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Review Date</label>
                        <input 
                              type="date" 
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#e92929] focus:outline-none focus:ring-2 focus:ring-[#e92929]/20 transition-all"
                        />
                        </div>
                        </div>
                  ))}

                  <button 
                        type="button"
                        onClick={addReview}
                        className="mt-3 text-[#e92929] hover:text-[#d61f1f] text-sm font-medium flex items-center gap-1"
                  >
                        <i className="fas fa-plus-circle"></i>
                        Add review
                  </button>
                  </div>
                  </div>

                  {/* Tour Details Section */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-[#e92929]/10 rounded-lg flex items-center justify-center mr-3">
                        <i className="fas fa-info-circle text-[#e92929]"></i>
                  </div>
                  Tour Information
                  </h2>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours) *</label>
                        <input 
                        type="number" 
                        placeholder="e.g., 8" 
                        min="1" 
                        max="24"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#e92929] focus:outline-none focus:ring-2 focus:ring-[#e92929]/20 transition-all text-sm"
                        />
                  </div>

                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants *</label>
                        <input 
                        type="number" 
                        placeholder="e.g., 15" 
                        min="1" 
                        max="50"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#e92929] focus:outline-none focus:ring-2 focus:ring-[#e92929]/20 transition-all text-sm"
                        />
                  </div>

                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tour Type *</label>
                        <select className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#e92929] focus:outline-none focus:ring-2 focus:ring-[#e92929]/20 transition-all text-sm">
                        <option>public</option>
                        <option>private</option>
                        </select>
                  </div>

                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Point *</label>
                        <input 
                        type="text" 
                        placeholder="e.g., Hotel lobby or JR Shibuya Station"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#e92929] focus:outline-none focus:ring-2 focus:ring-[#e92929]/20 transition-all text-sm"
                        />
                  </div>

                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adult Price (¥) *</label>
                        <input 
                        type="number" 
                        placeholder="e.g., 12000" 
                        min="0"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#e92929] focus:outline-none focus:ring-2 focus:ring-[#e92929]/20 transition-all text-sm"
                        />
                  </div>

                  <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Child Price (¥)</label>
                        <input 
                        type="number" 
                        placeholder="e.g., 6000" 
                        min="0"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#e92929] focus:outline-none focus:ring-2 focus:ring-[#e92929]/20 transition-all text-sm"
                        />
                  </div>
                  </div>

                  <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Languages Available</label>
                  <div className="flex flex-wrap gap-3">
                        {['English', 'Japanese', 'Chinese', 'Korean', 'Spanish', 'French'].map((language) => (
                        <label key={language} className="flex items-center gap-2 cursor-pointer">
                        <input 
                              type="checkbox" 
                              className="w-4 h-4 text-[#e92929] rounded focus:ring-[#e92929] focus:ring-2"
                        />
                        <span className="text-sm text-gray-700">{language}</span>
                        </label>
                        ))}
                  </div>
                  </div>
                  </div>
            </div>

            {/* Fixed Publish Button */}
            <button 
                  type="submit" 
                  className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#e92929] to-[#ff6b6b] text-white rounded-full hover:shadow-lg transition-all font-medium z-50 flex items-center justify-center"
            >
                  <i className="fas fa-check text-xl"></i>
            </button>
            </div>
            </main>
      </div>
      );
};

export default TourCreate;