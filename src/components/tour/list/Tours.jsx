import {Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router'
import TourTable from './TourTable'
import { useTourOperatorContext } from '../context/TourOperatorContext'
import Alert from '../../ui/alert/Alert'

function Tours() {
      const {isSuccess, successMessage} = useTourOperatorContext(9)
      return (
            <div className="bg-gray-50 min-h-screen">
                  {/* Main Content */}
                  <main className="pb-10">
                        <div className="container">
                              {/* Page Header */}
                              <div className="mb-8 sticky">
                                    <Breadcrumbs aria-label="breadcrumb" className='text-xs' sx={{ fontSize: '0.75rem' }}>
                                          <Link underline="hover" color="inherit" href="/">
                                                Tour
                                          </Link>

                                          <Typography sx={{ color: 'text.primary', fontSize: '0.8rem' }}>Tour List</Typography>
                                    </Breadcrumbs>
                              
                              </div>
                              {isSuccess  && (
                                    <div className='mb-4'>
                                          <Alert
                                                variant="success"
                                                title={successMessage?.title}
                                                message={successMessage?.message}
                                                // showLink={true}
                                                // linkHref="/tours"
                                                // linkText="View all tours"
                                          />
                                    </div>
                                    
                              )}
                              <TourTable/>
                              
                        </div>
                  </main>
            </div>
      )
}

export default Tours