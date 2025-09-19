import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/config";
import { useCommonContext } from "../../context/CommonContext";
import Alert from "../ui/alert/Alert";
import ErrorMessage from "../ui/error/ErrorMessage"

export default function SignInForm() {
      const navigate = useNavigate()
      const [loginInfo, setLoginInfo] = useState({})
      const [showPassword, setShowPassword] = useState(false);
      const [isChecked, setIsChecked] = useState(false);
      const [isLoading, setIsloading] = useState(false)
      const {errors, errorFields, setErrorFieldsFn, setErrorsMessages, resetError, successMessage, setIsSuccess, setAccount,account, isSuccess} = useCommonContext()

      useEffect(()=>{
            resetError()
      },[])


      const handleSubmit = async() =>{
            setIsloading(true)
            try{
                  const response = await axios.post(API_ENDPOINTS.API.LOGIN, loginInfo);
                  const data = response.data;

                  if(data?.status == "ok" && data?.token){
                        localStorage.setItem("token", data?.token)
                        setAccount({...account, "name" : data?.user?.username, "id": data?.user?.id})
                        setIsSuccess(true)
                        navigate("/")
                  }
                  console.log(data);
            }catch(error){
                  const validationErrors = error?.response?.data?.error?.details
                  if(validationErrors && validationErrors.length> 0){
                        setErrorFieldsFn(validationErrors)
                        setErrorsMessages(validationErrors)
                  }
                  
                  
            }finally{
                  setIsloading(false)
            }

            
            
      }
      return (
            <div className="flex flex-col flex-1">
                  <div className="w-full max-w-md pt-10 mx-auto">
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
                                    <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                                          Sign In
                                    </h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                          Enter your email and password to sign in!
                                    </p>
                              </div>
                              {isSuccess  && (
                                    <div className='mb-4'>
                                          <Alert
                                                variant="success"
                                                title={successMessage?.title}
                                                message={successMessage?.message}
                                          />
                                    </div>
                                    
                              )}
                              <div>
                                    <div>
                                          <div className="space-y-6">
                                                <div>
                                                      <Label required={true} error={errorFields?.has("username")} >Username</Label>
                                                      <Input placeholder="d7dhc9D9" onChange={(e)=> setLoginInfo({...loginInfo, "username" : e.target.value})}  error={errorFields?.has("username")} />
                                                      <ErrorMessage type="username"/>
                                                </div>
                                                <div>
                                                      <Label required={true} error={errorFields?.has("password")}>Password</Label>
                                                      <div className="relative">
                                                            <Input
                                                                  type={showPassword ? "text" : "password"}
                                                                  placeholder="Enter your password"
                                                                  onChange={(e)=> setLoginInfo({...loginInfo, "password" : e.target.value})} 
                                                                  error={errorFields?.has("password")}
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
                                                <div className="flex items-center justify-between">
                                                      <div className="flex items-center gap-3">
                                                            <Checkbox checked={isChecked} onChange={setIsChecked} />
                                                            <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                                                                  Keep me logged in
                                                            </span>
                                                      </div>
                                                </div>
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
                                                                  <span className="truncate">Sign in</span>
                                                            )}
                                                      </button>
                                                </div>
                                                
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}
