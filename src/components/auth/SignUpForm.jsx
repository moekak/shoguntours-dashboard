import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { useCommonContext } from "../../context/CommonContext";
import { API_ENDPOINTS } from "../../config/config";
import axios from "axios";
import Alert from "../ui/alert/Alert";
import ErrorMessage from "../ui/error/ErrorMessage";

export default function SignUpForm() {
      const navigate = useNavigate()
      const [showPassword, setShowPassword] = useState(false);
      const [signupInfo, setSignupInfo] = useState({})
      const [isLoading, setIsloading] = useState(false)
      const {setErrors, errors, errorFields, setErrorFieldsFn, setErrorsMessages, resetError, setSuccessMessage, setIsSuccess} = useCommonContext()


      useEffect(()=>{
            resetError()
      },[])

      useEffect(()=>{
            console.log(signupInfo);
            
      },[signupInfo])

      const handleSubmit = async() =>{
            setErrors([])
            setIsloading(true)
            try{
                  const response = await axios.post(API_ENDPOINTS.API.SIGNUP, signupInfo, {
                        headers: {
                              'Content-Type': 'multipart/form-data',
                        },
                  });

                  const data = response.data;
                  if(data?.status == "ok"){
                        setSuccessMessage(data?.message)
                        setIsSuccess(true)

                        setTimeout(()=>{
                              setSuccessMessage("")
                              setIsSuccess(false)
                        },4000)
                        navigate("/signin")

                  }
                  console.log(data);
            }catch(error){
                  const validationErrors = error?.response?.data?.error?.details
                  setErrorFieldsFn(validationErrors)
                  setErrorsMessages(validationErrors)
                  console.log(error);
                  
            }finally{
                  setIsloading(false)
            }

            
            
      }

      return (
            <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
                  <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
                        <Link
                              to="/"
                              className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                              <ChevronLeftIcon className="size-5" />
                              Back to dashboard
                        </Link>
                  </div>
                  <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                        <div>
                              <div className="mb-5 sm:mb-8">
                                    <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">Sign Up</h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Enter your email and password to sign up!</p>
                              </div>
                              {errors?.length > 0 && (
                                    <Alert
                                          variant="error"
                                          title="Please correct the errors below"
                                          message={errors}
                                          showLink={false}
                                    />
                              )}
                              <div>
                                    <div className="space-y-5">
                                          <div>
                                                <Label required={true} error={errorFields?.has("username")}>Username</Label>
                                                <Input
                                                      type="text"
                                                      id="username"
                                                      name="username"
                                                      placeholder="Enter your username"
                                                      error={errorFields?.has("username")}
                                                      onChange={(e)=> setSignupInfo({...signupInfo, "username" : e.target.value})} 
                                                />
                                                <ErrorMessage type="username"/>
                                          </div>
                                          <div>
                                                <Label required={true} error={errorFields?.has("password")}>Password</Label>
                                                <div className="relative">
                                                      <Input
                                                            placeholder="Enter your password"
                                                            type={showPassword ? "text" : "password"}
                                                            error={errorFields?.has("password")}
                                                            onChange={(e)=> setSignupInfo({...signupInfo, "password" : e.target.value})} 
                                                      />
                                                      <span
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                                      >
                                                            {showPassword ? (
                                                                  <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                                            ) : (
                                                                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                                            )}
                                                      </span>
                                                      <ErrorMessage type="password"/>
                                                </div>
                                          </div>
                                          {/* <!-- Button --> */}
                                          <div>
                                                <button onClick={handleSubmit} className={`${isLoading ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"} flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600`}>
                                                      {isLoading ? (
                                                            <>
                                                                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                  </svg>
                                                                  <span className="truncate">Processing..</span>
                                                            </>
                                                      ) : (
                                                            <span className="truncate">Sign up</span>
                                                      )}
                                                </button>
                                          </div>
                                    </div>
                                    <div className="mt-5">
                                          <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                                                Already have an account? {""}
                                                <Link
                                                      to="/signin"
                                                      className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                                                >
                                                      Sign In
                                                </Link>
                                          </p>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}
