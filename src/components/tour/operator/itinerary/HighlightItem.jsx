import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Input from '../../../form/input/InputField';
import { useTourOperatorContext } from '../../context/TourOperatorContext';
import ErrorMessage from '../../../ui/error/ErrorMessage';

function HighlightItem({ itineraryIndex, highlightIndex}) {
      const {setTour, tour, errorFields} = useTourOperatorContext()
      const removeHighlight = (itineraryIndex, highlightIndex) => {
            setTour({
                  ...tour,
                  itinerary: tour.itinerary.map((item, index) => 
                        index === itineraryIndex 
                              ? {
                                    ...item,
                                    itinerary_highlight: item.itinerary_highlight.filter((_, i) => i !== highlightIndex)
                              }
                              : item
                  )
            });
      };

      const handleInput = (value, itineraryIndex, highlightIndex) => {
            setTour({
                  ...tour,
                  itinerary: tour.itinerary.map((item, iIndex) => 
                        iIndex === itineraryIndex 
                        ? {
                              ...item,
                              itinerary_highlight: item.itinerary_highlight.map((act, hIndex) => 
                                    hIndex === highlightIndex 
                                    ? value
                                    : act
                              )
                        }
                        : item
                  )
            });
      };
      return (
            <div className="flex items-center gap-2">
                  <div className='w-full'>
                  <Input  error={errorFields?.has(`itinerary.${itineraryIndex}.itinerary_highlight.${highlightIndex}`)} onChange={(e)=> handleInput(e.target.value, itineraryIndex, highlightIndex)} value={tour.itinerary[itineraryIndex].itinerary_highlight[highlightIndex]}  type="text" id="inputOverviewTitle" placeholder="e.g., Tokyo's oldest Buddhist temple"/>
                        <ErrorMessage type={`itinerary.${itineraryIndex}.itinerary_highlight.${highlightIndex}`}/>
                  </div>
                  <button
                        type="button"
                        onClick={() => removeHighlight(itineraryIndex, highlightIndex)}
                        className="p-2 text-gray-400 hover:text-[#465fff]"
                  >
                        <CloseIcon fontSize="small" />
                  </button>
            </div>
      );
}

export default HighlightItem