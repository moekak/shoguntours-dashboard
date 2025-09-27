
import BlogTable from './BlogTable'
import { useCommonContext } from '../../../context/CommonContext'
import Alert from '../../ui/alert/Alert'
import { useBlogOperatorContext } from '../context/BlogOperatorContext'

function Blogs() {
      const {successMessage, isSuccess} = useCommonContext()
      const {isBlogOperationSuccess, blogSuccessMessage} = useBlogOperatorContext()
      return (
            <div className="bg-gray-50 min-h-screen">
                  {/* Main Content */}
                  <main className="pb-10">
                        <div className="container">
                              {isSuccess  && (
                                    <div className='mb-4'>
                                          <Alert
                                                variant="success"
                                                title={successMessage?.title}
                                                message={successMessage?.message}
                                          />
                                    </div>
                                    
                              )}
                              {isBlogOperationSuccess  && (
                                    <div className='mb-4'>
                                          <Alert
                                                variant="success"
                                                title={blogSuccessMessage?.title}
                                                message={blogSuccessMessage?.message}
                                          />
                                    </div>

                              )}
                              <BlogTable/>
                              
                        </div>
                  </main>
            </div>
      )
}

export default Blogs