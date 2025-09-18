import React from 'react'
import { useTourOperatorContext } from '../../tour/context/TourOperatorContext'
import { useCommonContext } from '../../../context/CommonContext'

function ErrorMessage({type}) {
      const {errorsMessages} = useCommonContext()
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