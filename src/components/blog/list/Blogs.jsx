
import BlogTable from './BlogTable'
import { useCommonContext } from '../../../context/CommonContext'
import Alert from '../../ui/alert/Alert'

function Blogs() {
      const {successMessage, isSuccess} = useCommonContext()
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
                              <BlogTable/>
                              
                        </div>
                  </main>
            </div>
      )
}

export default Blogs