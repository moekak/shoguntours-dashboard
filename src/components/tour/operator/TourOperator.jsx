
import { Breadcrumbs, Link, Typography } from '@mui/material';
import Label from "../../form/Label.tsx";
import Select from "../../form/Select.tsx";
import Input from "../../form/input/InputField.tsx";
import TextArea from "../../form/input/TextArea.tsx";
import Radio from "../../form/input/Radio.tsx";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import FormatAlignLeftOutlinedIcon from '@mui/icons-material/FormatAlignLeftOutlined';
import TourItinerarySection from './TourItinerarySection.jsx';
import { useTourOperatorContext } from '../context/TourOperatorContext.jsx';
import Qa from './QA.jsx';
import TourHighlight from './TourHighlight.jsx';
import Review from './Review.jsx';
import HeroImage from './HeroImage.jsx';
import GalleryImage from './galleryImage/GalleryImage.jsx';
import Alert from '../../ui/alert/Alert.tsx';
import Loading from '../../ui/loading/Loading.jsx';
import ErrorMessage from '../../ui/error/ErrorMessage.jsx';
import { useCommonContext } from '../../../context/CommonContext.jsx';

function TourOperator({isPending, handleSubmit, type}) {


      const {errorTitle,errors,errorFields} = useCommonContext()
      const {tour, setTour, regions, categories} = useTourOperatorContext()
      const handleInput = (e)=>{
            setTour({...tour, [e.target.name] : e.target.value})
      }

      const handleSelect = (selectedOption, actionName) =>{
            setTour({...tour, [actionName]: selectedOption})
      }


      return (
            <div className="bg-gray-50 min-h-screen">
                  {/* Main Content */}
                  {isPending && <Loading type={type}/>}
                  <main className="pb-10">
                        <div className="container">
                              {/* Page Header */}
                              <div className="mb-8 sticky">
                                    <Breadcrumbs aria-label="breadcrumb" className='text-xs' sx={{ fontSize: '0.75rem' }}>
                                          <Link underline="hover" color="inherit" href="/">
                                                Tour
                                          </Link>

                                          <Typography sx={{ color: 'text.primary', fontSize: '0.8rem' }}>{type == "create" ? "Create tour" : "Edit tour"}</Typography>
                                    </Breadcrumbs>
                                    <h1 className="text-2xl font-bold text-gray-800 mt-3">{type == "create" ? "Create New Tour" : "Edit a tour"}</h1>
                                    <p className="text-gray-600 my-2">{type == "create" ? "Fill in the details below to create a new tour experience" : "Edit and update your tour experience details below"}</p>
                                    {errors?.length > 0 && (
                                          <Alert
                                                variant="error"
                                                title={errorTitle}
                                                message={errors}
                                                showLink={false}
                                          />
                                    )}
                              </div>

                              {/* Form Sections */}
                              <div className="space-y-6">
                                    {/* Basic Information */}
                                    <div className="bg-white rounded-xl shadow-sm p-6">
                                          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                                <div className="w-8 h-8 bg-[#ecf3ff] rounded-lg flex items-center justify-center mr-3">
                                                      <InfoOutlinedIcon sx={{  color: '#465fff', fontSize: 20  }} />
                                                </div>
                                                Basic Information
                                          </h2>

                                          <div className="space-y-5">
                                                <div>
                                                      <Label required={true} htmlFor="inputToutTitle" error={errorFields?.has("title")}>Tour Title</Label>
                                                      <Input value={tour?.title} name='title' type="text" id="inputToutTitle" placeholder="e.g., Tokyo City Highlights Tour" onChange={(e)=> handleInput(e)} error={errorFields?.has("title")}/>
                                                      <ErrorMessage type="title"/>
                                                </div>
                                                <div>
                                                      <Label required={true} htmlFor="inputToutSubTitle" error={errorFields?.has("subtitle")}>Subtitle</Label>
                                                      <Input value={tour?.subtitle} name='subtitle' type="text" id="inputToutSubTitle" placeholder="e.g., An unforgettable journey through Japan's vibrant capital" error={errorFields?.has("subtitle")} onChange={(e)=> handleInput(e)}/>
                                                      <ErrorMessage type="subtitle"/>
                                                </div>
                                                <div>
                                                      <Label htmlFor="inputBadge" error={errorFields?.has("badge")}>Badge Label</Label>
                                                      <Input value={tour?.badge} name='badge' type="text" id="inputBadge" placeholder="e.g., Best seller" onChange={(e)=> handleInput(e)} error={errorFields?.has("badge")}/>
                                                </div>
                                                <div className='flex justify-between gap-5'>
                                                      <div className="flex-1">
                                                            <Label required={true} error={errorFields?.has("region_id")}>Region</Label>
                                                            <Select
                                                                  defaultValue={tour?.region_id ? tour.region_id.toString() : ""}
                                                                  name="region_id"
                                                                  options={regions}
                                                                  placeholder="Choose a region"
                                                                  className="dark:bg-dark-900"
                                                                  onChange={(selectedOption) => handleSelect(selectedOption, "region_id")}
                                                                  error={errorFields?.has("region_id")}
                                                            />  
                                                            <ErrorMessage type="region_id"/>
                                                      </div>
                                                      <div className="flex-1">
                                                            <Label error={errorFields?.has("category_id")} required={true}>Category</Label>
                                                            <Select
                                                                  defaultValue={tour?.category_id ? tour.category_id.toString() : ""}
                                                                  name="category_id"
                                                                  options={categories}
                                                                  placeholder="Choose a category"
                                                                  className="dark:bg-dark-900"
                                                                  onChange={(selectedOption) => handleSelect(selectedOption, "category_id")}
                                                                  error={errorFields?.has("category_id")}
                                                            /> 
                                                            <ErrorMessage type="category_id"/>
                                                            
                                                      </div>

                                                      <div className='flex  flex-col justify-around'>
                                                            <Label required={true}>Feature</Label>
                                                            <div className="flex flex-wrap items-center gap-8"> 
                                                                  <Radio
                                                                        id="radio1"
                                                                        name="is_featured"
                                                                        value="1"
                                                                        checked={tour.is_featured === "1"}
                                                                        onChange={(selectedOption) => handleSelect(selectedOption, "is_featured")}
                                                                        label="Yes"
                                                                  />
                                                                  <Radio
                                                                        id="radio2"
                                                                        name="is_featured"
                                                                        value="0"
                                                                        checked={tour.is_featured === "0"}
                                                                        onChange={(selectedOption) => handleSelect(selectedOption, "is_featured")}
                                                                        label="No"
                                                                  />
                                                            </div>
                                                      </div>
                                                      <div className='flex flex flex-col justify-around'>
                                                            <Label required={true}>Status</Label>
                                                            <div className="flex flex-wrap items-center gap-8"> 
                                                                  <Radio
                                                                        id="radio3"
                                                                        name="is_published"
                                                                        value="1"
                                                                        checked={tour.is_published === "1"}
                                                                        onChange={(selectedOption) => handleSelect(selectedOption, "is_published")}
                                                                        label="Publish"
                                                                  />
                                                                  <Radio
                                                                        id="radio4"
                                                                        name="is_published"
                                                                        value="0"
                                                                        checked={tour.is_published === "0"}
                                                                        onChange={(selectedOption) => handleSelect(selectedOption, "is_published")}
                                                                        label="Draft"
                                                                  />
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>

                                    {/* Hero Image Section */}
                                    <div className="bg-white rounded-xl shadow-sm p-6">
                                          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                                <div className="w-8 h-8 bg-[#ecf3ff] rounded-lg flex items-center justify-center mr-3">
                                                      <BrokenImageOutlinedIcon sx={{  color: '#465fff', fontSize: 20  }} />
                                                </div>
                                                Hero Image
                                                <span className='text-red-600 text-xs'>*</span>
                                          </h2>
                                          <HeroImage/>
                                          <ErrorMessage type="hero_image"/>
                                    </div>

                                    {/* Overview Section */}
                                    <div className="bg-white rounded-xl shadow-sm p-6">
                                          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                                <div className="w-8 h-8 bg-[#ecf3ff] rounded-lg flex items-center justify-center mr-3">
                                                      <FormatAlignLeftOutlinedIcon sx={{  color: '#465fff', fontSize: 20  }} />
                                                </div>
                                                Overview Section
                                          </h2>

                                          <div className="space-y-5">
                                                <div>
                                                      <Label error={errorFields?.has("overview_title")} required={true} htmlFor="inputOverviewTitle">Overview Title</Label>
                                                      <Input error={errorFields?.has("overview_title")} value={tour.overview_title} name='overview_title' type="text" id="inputOverviewTitle" placeholder="e.g., Experience Tokyo Like Never Before" onChange={(e)=> handleInput(e)}/>
                                                      <ErrorMessage type="overview_title"/>
                                                </div>
                                                <div>
                                                      <Label error={errorFields?.has("overview_description")} required={true}>Overview Description</Label>
                                                      <TextArea
                                                            value={tour.overview_description}
                                                            rows={6}
                                                            name="overview_description"
                                                            placeholder="Describe what makes this tour special..."
                                                            onChange={(value)=> handleSelect(value, "overview_description")}
                                                            error={errorFields?.has("overview_description")}
                                                      />
                                                      <ErrorMessage type="overview_description"/>
                                                </div>
                                          </div>
                                    </div>

                                    {/* QA Section */}
                                    <Qa />

                                    {/* Highlights Section */}
                                    <TourHighlight />

                                    {/* Reviews Section */}
                                    <Review />

                                    {/* Tour Itinerary Section */}
                                    <TourItinerarySection />

                                    {/* gallery */}
                                    <GalleryImage />


                              </div>

                              {/* Fixed Publish Button */}
                              <button 
                                    onClick={handleSubmit}
                                    type="submit" 
                                    className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#e92929] to-[#ff6b6b] text-white rounded-full hover:shadow-lg transition-all font-medium z-50 flex items-center justify-center"
                              >
                                    <i className="fas fa-check text-xl"></i>
                              </button>

                              
                        </div>
                  </main>
            </div>
   
      )
}

export default TourOperator