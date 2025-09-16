import React from 'react'
import { useTourOperatorContext } from '../../tour/context/TourOperatorContext'

function ErrorMessage({type}) {
      const {errorsMessages} = useTourOperatorContext()
      const errorMsgs = errorsMessages[type]

      return (
            <>
                  {errorMsgs && errorMsgs.map((error)=>{
                        return <small className='text-red-600 text-xs'>{error}</small>
                  })}
            </>                     
            
      )
}

export default ErrorMessage