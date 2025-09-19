import { createContext, useContext, useState } from "react";
import { MESSAGES } from "../config/config";

export const CommonContext = createContext()
export const useCommonContext = () =>{
      const context = useContext(CommonContext)
      if (context === undefined) {
            throw new Error('useCommonContext must be used within an CommonProvider');
      }
      return context;
}

export const CommonProvider  = ({children}) =>{
      const [errorFields, setErrorFields] = useState(new Set())
      const [errors, setErrors] = useState([])
      const [errorsMessages, setErrorsMessages] = useState([])
      const [successMessage, setSuccessMessage] = useState({})
      const [isSuccess, setIsSuccess] = useState(false)
      const [errorTitle, setErrorTitle] = useState("")
      const [account, setAccount] = useState(null)

      const resetError = () =>{
            setErrors([])
            setErrorFields(new Set())
            setErrorTitle("")
            setErrorsMessages([])
      }
      const resetAll = () =>{
            setErrors([])
            setErrorFields(new Set())
            setErrorTitle("")
            setErrorsMessages([])
            setIsSuccess(false)
            setSuccessMessage({})
      }

      const setErrorFieldsFn = (errorMsgs) =>{
            setErrorFields(()=>{
                  return Object.entries(errorMsgs).reduce((acc, [title, _])=>{
                        acc.add(title)
                        return acc
                  },new Set())
            })
      }

      const fetchPostError = (error) =>{
            const errorCode = error?.response?.data?.error?.code
            const errorMsgs = error?.response?.data?.error?.details
            if(errorCode === "INTERNAL_SERVER_ERROR"){
                  setErrors(MESSAGES.ERROR.SYSTEM_ERROR)
                  setErrorTitle(MESSAGES.ERROR.SYSTEM_ERROR_TITLE)

            }else if(errorCode === "VALIDATION_ERROR"){
                  setErrorTitle(MESSAGES.ERROR.VALIDATION_ERROR_TITLE)
                  setErrorsMessages(errorMsgs)
                  setErrors(()=>{
                        return Object.entries(errorMsgs).reduce((acc, [title, messages])=>{
                              acc.push(...messages)
                              return acc
                        },[])
                  })
                  setErrorFieldsFn(errorMsgs)
            }
            

            window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
            });
      }

      const value = {
            errorFields,
            setErrorFields,
            errors,
            setErrors,
            errorsMessages,
            setErrorsMessages,
            successMessage,
            setSuccessMessage,
            isSuccess,
            setIsSuccess,
            resetError,
            errorTitle,
            setErrorTitle,
            setErrorFieldsFn,
            fetchPostError,
            account,
            setAccount,
            resetAll
      }


      return (
            <CommonContext.Provider value={value}>
                  {children}
            </CommonContext.Provider>
      )
}