import { createContext, useContext, useState } from "react";

export const TourOperatorContext = createContext()
export const useTourOperatorContext = () =>{
      const context = useContext(TourOperatorContext)
      if (context === undefined) {
            throw new Error('TourOperatorContext must be used within an TourProvider');
      }
      return context;
}

export const TourOPeratorProvider  = ({children}) =>{
      const [errors, setErrors] = useState([])
      const [errorsMessages, setErrorsMessages] = useState([])
      const [errorTitle, setErrorTitle] = useState("")
      const [errorFields, setErrorFields] = useState(new Set())
      const [isSuccess, setIsSuccess] = useState(false)
      const [isModalOpen, setIsModalOpen] = useState(false)
      const [successMessage, setSuccessMessage] = useState({})
      const iconOptions = [
            { icon: 'fa-solid fa-location-dot', title: '場所' },
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


      const [languages, setLanguages] = useState([])
      const [regions, setRegions] = useState([])
      const [categories, setCategories] = useState([])

      const tourTypes = [
            { value: "public", label: "public" },
            { value: "private", label: "private" },
      ]

      const ratingOptions = [
            { value: "5", label: "⭐⭐⭐⭐⭐ (5 stars)" },
            { value: "4", label: "⭐⭐⭐⭐ (4 stars)" },
            { value: "3", label: "⭐⭐⭐ (3 stars)" },
            { value: "2", label: "⭐⭐ (2 stars)" },
            { value: "1", label: "⭐ (1 star)" },
      ]

      const [tour,setTour] = useState(
            {
                  title:  "",
                  subtitle: "",
                  badge: "",
                  region_id: "",
                  category_id: "",
                  is_featured: "0",
                  is_published: "1",
                  overview_title: "",
                  overview_description: "",
                  questions: [
                        {
                              question: "",
                              answer: ""
                        }
                  ],
                  highlights: [
                        {
                              title: "",
                              description: ""
                        }
                  ],
                  reviews: [
                        {
                              name: "",
                              rating: "",
                              content: "",
                              date: ""
                        }
                  ],
                  itinerary: [
                        {
                              duration: "",
                              max_participants: "",
                              tour_type: "private",
                              meeting_point: "",
                              adult_price: "",
                              child_price: "",
                              overview_title: "",
                              overview_description: "",
                              activity: [
                                    {
                                          activity_description: "",
                                          activity_title: "",
                                          activity_icon: 'fa-solid fa-location-dot'
                                    }
                              ],
                              itinerary_highlight: [""],
                              languages: [],
                              image: ""
                        }
                  ],
                  gallery_image : []
            }
      )





      const formatTourData = (tourData)=>{
            const formData = new FormData()
            formData.append("title", tourData.badge)
            formData.append("subtitle", tourData.subtitle)
            formData.append("badge", tourData.badge)
            formData.append("region_id", tourData.region_id)
            formData.append("category_id", tourData.category_id)
            formData.append("is_featured", tourData.is_featured)
            formData.append("is_published", tourData.is_published)
            formData.append("overview_title", tourData.overview_title)
            formData.append("overview_description", tourData.overview_description)
            formData.append('questions', JSON.stringify(tourData.questions));
            formData.append('highlights', JSON.stringify(tourData.highlights));
            formData.append('reviews', JSON.stringify(tourData.reviews));
            formData.append('itinerary', JSON.stringify(tourData.itinerary));
            formData.append('itinerary', JSON.stringify(tourData.itinerary));
            if (tourData.hero_image instanceof File) {
                  formData.append('hero_image', tourData.hero_image);
            }
            // gallery_imageが配列の場合
            if (tourData.gallery_image && Array.isArray(tourData.gallery_image)) {
                  tourData.gallery_image.forEach((image, index) => {
                        if (image instanceof File) {
                              formData.append(`gallery_image[${index}]`, image);
                        }
                  });
            }
            
            return formData
      }


      const resetTour = () =>{
            setTour(
                  {
                  title: "",
                  subtitle: "",
                  badge: "",
                  region_id: "",
                  category_id: "",
                  is_featured: "0",
                  is_published: "1",
                  overview_title: "",
                  overview_description: "",
                  hero_image: "",
                  questions: [
                        {
                              question: "",
                              answer: ""
                        }
                  ],
                  highlights: [
                        {
                              title: "",
                              description: ""
                        }
                  ],
                  reviews: [
                        {
                              name: "",
                              rating: "",
                              content: "",
                              date: ""
                        }
                  ],
                  itinerary: [
                        {
                              duration: "",
                              max_participants: "",
                              tour_type: "private",
                              meeting_point: "",
                              adult_price: "",
                              child_price: "",
                              overview_title: "",
                              overview_description: "",
                              activity: [
                                    {
                                          activity_description: "",
                                          activity_title: "",
                                          activity_icon: 'fa-solid fa-location-dot'
                                    }
                              ],
                              itinerary_highlight: [""],
                              languages: [],
                              image: ""
                        }
                  ],
                  gallery_image : []
            }
            )
      }


      const resetError = () =>{
            setErrors([])
            setErrorFields(new Set())
            setErrorTitle("")
      }
      const value = {
            iconOptions,
            languages,
            tourTypes,
            ratingOptions,
            tour,
            setTour,
            setLanguages,
            regions,
            setRegions,
            categories,
            setCategories,
            formatTourData,
            errors,
            setErrors,
            errorFields,
            setErrorFields,
            errorTitle,
            setErrorTitle,
            resetTour,
            resetError,
            isSuccess,
            setIsSuccess,
            errorsMessages,
            setErrorsMessages,
            successMessage,
            setSuccessMessage,
            isModalOpen,
            setIsModalOpen
      }




      return (
            <TourOperatorContext.Provider value={value}>
                  {children}
            </TourOperatorContext.Provider>
      )
}