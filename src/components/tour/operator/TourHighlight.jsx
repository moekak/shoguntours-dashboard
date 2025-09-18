
import Input from "../../form/input/InputField.tsx";
import TextArea from "../../form/input/TextArea.tsx";
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import { useTourOperatorContext } from "../context/TourOperatorContext.jsx";
import ErrorMessage from "../../ui/error/ErrorMessage.jsx";
import { useCommonContext } from "../../../context/CommonContext.jsx";


function TourHighlight() {
      const {errorFields} = useCommonContext()
      const {setTour, tour} = useTourOperatorContext()
      
      const addHighlight = () => {
            setTour({
                  ...tour,
                  highlights: [...tour.highlights, { title: '', description: '' }]
            });
      };

      const removeHighlight = (index) => {
            setTour({
                  ...tour,
                  highlights: tour.highlights.filter((_, i)=> i !== index)
            })
      };

      const handleInput = (value, index, field) => {
            const updatedHighlights = [...tour.highlights];
            updatedHighlights[index][field] = value;
            
            setTour({
                  ...tour,
                  highlights: updatedHighlights
            });
      }
      return (
            <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#ecf3ff] rounded-lg flex items-center justify-center mr-3">
                              <TipsAndUpdatesOutlinedIcon sx={{  color: '#465fff', fontSize: 20  }} />
                        </div>
                        Tour Highlights
                  </h2>

                  <p className="text-sm text-gray-600 mb-4">Add key features and highlights that make this tour special</p>
                  
                  <div className="space-y-4">
                        {tour?.highlights?.map((_, index) => (
                              <div key={index} className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-start gap-4">
                                          <div className="flex-1">
                                                <div>
                                                      <Input error={errorFields?.has(`highlights.${index}.title`)} value={tour.highlights[index]?.title || ""}  type="text" id="inputTourHightlight" placeholder="Highlight title (e.g., Ancient Temples & Shrines)" onChange={(e)=> handleInput(e.target.value, index, "title")}/>
                                                      <ErrorMessage type={`highlights.${index}.title`}/>
                                                </div>
                                                <div className='mt-2'>
                                                      <TextArea
                                                            value={tour.highlights[index]?.description || ""}
                                                            rows={2}
                                                            name={`highlights[${index}][description]`}
                                                            placeholder="Brief description of this highlight..."
                                                            onChange={(value)=> handleInput(value, index, "description")}
                                                            error={errorFields?.has(`highlights.${index}.description`)}
                                                      />
                                                      <ErrorMessage type={`highlights.${index}.description`}/>
                                                </div>
                                          </div>
                                          <button 
                                                type="button" 
                                                onClick={() => removeHighlight(index)}
                                                className="p-2 text-gray-400 hover:text-[#465fff]"
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
                        className="text-[#465fff] hover:text-[#465fff] text-sm font-medium flex items-center gap-1 mt-3"
                  >
                        <i className="fas fa-plus"></i>
                        <span className="font-medium">Add Highlight</span>
                  </button>
            </div>
      )
}

export default TourHighlight