import { Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router'
import ComponentCard from '../../common/ComponentCard'
import BasicTableOne from '../../tables/BasicTables/BasicTableOne'
import TourTable from './TourTable'

function Tours() {
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
                              <TourTable/>
                              
                        </div>
                  </main>
            </div>
      )
}

export default Tours