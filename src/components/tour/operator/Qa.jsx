
import Input from "../../form/input/InputField.tsx";
import TextArea from "../../form/input/TextArea.tsx";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { useTourOperatorContext } from "../context/TourOperatorContext.jsx";
import ErrorMessage from "../../ui/error/ErrorMessage.jsx";

function Qa() {
      const {setTour, tour, errorFields} = useTourOperatorContext()

      const addQA = () => {
            setTour({
                  ...tour,
                  questions: [...tour.questions, { question: '', answer: '' }]
            });
      };

      const removeQA = (index) => {
            setTour({
                  ...tour,
                  questions: tour.questions.filter((_, i)=> i !== index)
            })
      };

      const handleInput = (value, index, field) => {
            const updatedQuestions = [...tour.questions];
            updatedQuestions[index][field] = value;
            
            setTour({
                  ...tour,
                  questions: updatedQuestions
            });
      }

      return (
            <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#ecf3ff] rounded-lg flex items-center justify-center mr-3">
                              <HelpOutlineOutlinedIcon sx={{  color: '#465fff', fontSize: 20  }} />
                        </div>
                        QA
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">Add common questions and answers that help customers understand the experience.</p>
                  
                  <div className="space-y-4">
                        {tour?.questions?.map((_, index) => (
                              <div key={index} className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-start gap-4">

                                          <div className="flex-1">
                                                <div>
                                                      <Input error={errorFields?.has(`questions.${index}.question`)} value={tour.questions[index]?.question || ""} name={`questions[${index}][question]`} type="text" id="inputQA" placeholder="Type a frequently asked question..." onChange={(e)=> handleInput(e.target.value, index, "question")}/>
                                                      <ErrorMessage type={`questions.${index}.question`}/>
                                                </div>
                                                <div className='mt-2'>
                                                      <TextArea
                                                            rows={2}
                                                            value={tour.questions[index]?.answer || ""}
                                                            name={`questions[${index}][answer]`}
                                                            onChange={(value)=> handleInput(value, index, "answer")}
                                                            error={errorFields?.has(`questions.${index}.answer`)}
                                                      />
                                                      <ErrorMessage type={`questions.${index}.answer`}/>
                                                </div>
                                          </div>
                                          <button 
                                                type="button" 
                                                onClick={() => removeQA(index)}
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
                        onClick={addQA}
                        className="text-[#465fff] hover:text-[#465fff] text-sm font-medium flex items-center gap-1 mt-3"
                  >
                        <i className="fas fa-plus"></i>
                        <span className="font-medium">Add QA</span>
                  </button>
            </div>

      )
}

export default Qa