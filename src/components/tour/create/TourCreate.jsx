import  { useEffect} from 'react';
import { useTourOperatorContext } from '../context/TourOperatorContext.jsx';
import { useFetchCreateData } from '../hooks/useFetchCreateData.js';
import { useCreateTour } from '../hooks/useCreateTour.js';
import TourOperator from '../operator/TourOperator.jsx';

const TourCreate = () => {
      const {tour, setTour, setLanguages,setRegions, setCategories} = useTourOperatorContext()
      const {data} = useFetchCreateData()
      const {mutate, isPending} = useCreateTour()
      useEffect(()=>{
            setLanguages(data?.languages)
            setRegions([]);
            setCategories([]);
            data?.regions.forEach((region) => {
                  setRegions(prev => [...prev, { value: region.id, label: region.region }]);
            });
            data?.categories.forEach((category) => {
                  setCategories(prev => [...prev, { value: category.id, label: category.category }]);
            });
      },[data])



      const handleSubmit = () =>{
            mutate(tour)
      }


      return (
            <TourOperator isPending={isPending} handleSubmit={handleSubmit}/>
      );
};

export default TourCreate;