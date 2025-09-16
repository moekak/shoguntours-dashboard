import { useEffect } from 'react';
import { Table,TableBody, TableCell,TableHeader, TableRow,} from "../../ui/table";
import { useFetchTour } from '../hooks/useFetchTour';
import { API_ENDPOINTS } from '../../../config/config';
import ActionDropdown from './ActionDropDown';
import { useToursContext } from '../context/ToursContext';
import SearchTour from './SearchTour';
import TourTableSkeleton from '../../skelton/TourTableSkeleton';
import { useNavigate } from 'react-router';


export default function TourTable() {
      
      const {data, isLoading} = useFetchTour()
      const {setTours, setOriginalTours, tours} = useToursContext()
      const navigate = useNavigate()


      const handleAction = (action, tourId) => {
            switch(action) {
                  case 'view':
                        alert(`View details for tour ${tourId}`);
                        break;
                  case 'edit':
                        navigate(`/tour/${tourId}`)
                        break;
                  case 'delete':
                        if (confirm(`Are you sure you want to delete tour ${tourId}?`)) {
                              alert(`Tour ${tourId} deleted`);
                        }
                        break;
                  default:
                  break;
            }
      };

      useEffect(()=>{

            if(data !== undefined){
                  console.log(data);
                  
                  setOriginalTours(data?.tours)
                  setTours(data?.tours)
            }
            
      },[data])

      if(isLoading){
            return <TourTableSkeleton/>
      }

      return (
            <div className="space-y-6">
                  {/* Filter Section */}
                  <SearchTour categories={data?.categories} regions={data?.regions}/>
                  {/* Table Section */}
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                        <div className="max-w-full overflow-x-auto">
                              <Table>
                                    {/* Table Header */}
                                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                          <TableRow>
                                                <TableCell
                                                      isHeader
                                                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                                >
                                                      Tour
                                                </TableCell>
                                                <TableCell
                                                      isHeader
                                                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                                >
                                                      Category
                                                </TableCell>
                                                <TableCell
                                                      isHeader
                                                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                                >
                                                      Price
                                                </TableCell>
                                                <TableCell
                                                      isHeader
                                                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                                >
                                                      Itinerary
                                                </TableCell>
                                                <TableCell
                                                      isHeader
                                                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                                >
                                                      Bookings
                                                </TableCell>
                                                <TableCell
                                                      isHeader
                                                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                                >
                                                      Actions
                                                </TableCell>
                                          </TableRow>
                                    </TableHeader>

                                    {/* Table Body */}
                                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                          {data?.tours.map((tour) => (
                                                      <TableRow key={tour.id}>
                                                            <TableCell className="px-5 py-4 sm:px-6 text-start">
                                                                  <div className="flex items-center gap-3">
                                                                        <div className="w-10 h-10 overflow-hidden">
                                                                              <img
                                                                                    width={40}
                                                                                    height={40}
                                                                                    src={`${API_ENDPOINTS.IMAGE.URL}/${tour?.hero_image}}`}
                                                                                    alt={tour?.title}
                                                                              />
                                                                        </div>
                                                                        <div>
                                                                              <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                                                    {tour?.title}
                                                                              </span>
                                                                              <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                                                    {tour?.subtitle}
                                                                              </span>
                                                                        </div>
                                                                  </div>
                                                            </TableCell>
                                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                                  <span className='inline-flex px-2 py-1 text-xs font-medium rounded-full bg-[#e92929]/10 text-[#e92929]'>
                                                                  {tour?.category?.category}
                                                                  </span>
                                                            </TableCell>
                                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                                  {`￥${tour?.minimum_price.toLocaleString()}~`}
                                                            </TableCell>
                                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                                  <div className="flex -space-x-2">
                                                                        {tour?.itineraries?.length}
                                                                  </div>
                                                            </TableCell>
                                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                                  dd
                                                            </TableCell>
                                                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                                  <ActionDropdown tourId={tour?.id} onAction={handleAction} />
                                                            </TableCell>
                                                      </TableRow>
                                                ))}
                                    </TableBody>
                              </Table>
                        </div>
                  </div>
            </div>
      );
}