import  { useEffect, useState} from 'react';
import TourOperator from '../operator/TourOperator.jsx';
import { useTourOperatorContext } from '../context/TourOperatorContext.jsx';
import { useFetchSpecificTour } from '../hooks/useFetchSpecificTour.js';
import { useParams } from 'react-router';
import TableSkelton from '../../skelton/TableSkelton.jsx';

import { useEditTour } from '../hooks/useEditTour.js';

const TourEdit = () => {
      
      const {tour, setTour, setLanguages, setRegions, setCategories} = useTourOperatorContext()
      const {tourId} = useParams()
      const [isInitialized, setIsInitialized] = useState(false);

      const {data, isLoading, error} = useFetchSpecificTour(tourId)
      const {mutate, isPending} = useEditTour()


      useEffect(()=>{
            if (!data?.tour) return 
            const tour = data?.tour
            
            setLanguages(data?.languages)
            setRegions([]);
            setCategories([]);
            if (data?.regions) {
                  const regionOptions = data.regions.map((region) => ({
                        value: region.id,
                        label: region.region
                  }));
                  setRegions(regionOptions);
            }
            if (data?.categories) {
                  const categoryOptions = data.categories.map((category) => ({
                        value: category.id,
                        label: category.category
                  }));
                  setCategories(categoryOptions);
            }
            
            setTour(
                  {
                        title: tour?.title,
                        subtitle: tour?.subtitle,
                        badge: tour?.badge,
                        region_id: tour?.region_id,
                        category_id: tour?.category_id,
                        is_featured: "0",
                        is_published: tour?.is_published == 0 ? "0" : "1",
                        hero_image: tour?.hero_image,
                        overview_title: tour?.overview_title,
                        overview_description: tour?.overview_description,
                        questions: tour?.tour_questions?.map((question)=>{
                              return {question: question.question, answer: question.answer}
                        }),
                        highlights: tour?.tour_highlights?.map((highlight)=>{
                              return {title: highlight.title, description: highlight.description}
                        }),
                        reviews:  tour?.tour_reviews?.map((review)=>{
                              return {name: review.name, rating: review.rating, content: review.content, date: review.date}
                        }),
                        itinerary : tour?.itineraries?.map((itinerary)=>{
                              return {
                                    duration: itinerary?.duration,
                                    max_participants:itinerary?.max_participants,
                                    tour_type: itinerary?.tour_type,
                                    meeting_point: itinerary?.meeting_point,
                                    adult_price: itinerary?.adult_price,
                                    child_price: itinerary?.child_price,
                                    overview_title: itinerary?.overview_title,
                                    overview_description: itinerary?.overview_description,
                                    activity: itinerary?.itinerary_activities.map((activity)=>{
                                          return {
                                                activity_description: activity?.activity_description,
                                                activity_title: activity?.activity_title,
                                                activity_icon: activity?.activity_icon,
                                          }
                                    }),
                                    itinerary_highlight:  itinerary?.itinerary_highlights.map((highlight)=>{
                                          return highlight?.itinerary_highlight
                                    }),
                                    languages: itinerary?.itinerary_languages.map((language)=>{
                                          return language.language.id
                                    }),
                                    image: itinerary?.image
                              }
                        }),
                        gallery_image: tour?.tour_gallery_images.map((image)=>{
                              return image?.gallery_image
                        })
                  }
            )
            setTimeout(() => setIsInitialized(true), 0);
            
      },[data])

      const handleSubmit = () =>{
            console.log(tour);
            
            mutate(tour)
      }

      if(isLoading || tour.region_id == undefined || !isInitialized){
            return <TableSkelton/>
      }

      
      return (
            <TourOperator isPending={isPending} handleSubmit={handleSubmit} type="edit"/>
      );
};

export default TourEdit;