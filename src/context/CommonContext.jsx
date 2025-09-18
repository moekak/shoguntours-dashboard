import { createContext, useContext, useState } from "react";

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

      const resetError = () =>{
            setErrors([])
            setErrorFields(new Set())
            setErrorTitle("")
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
            setErrorTitle
      }


      return (
            <CommonContext.Provider value={value}>
                  {children}
            </CommonContext.Provider>
      )
}