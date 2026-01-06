import { useEffect, useRef, useState } from 'react'
import { useTourOperatorContext } from '../context/TourOperatorContext.jsx'
import { useFetchCreateData } from '../hooks/useFetchCreateData.js'
import { useCreateTour } from '../hooks/useCreateTour.js'
import TourOperator from '../operator/TourOperator.jsx'
import TableSkelton from '../../skelton/TableSkelton.jsx'
import { useNavigate } from 'react-router'

const TourCreate = () => {
    const { tour, setLanguages, setRegions, setCategories, resetTour } =
        useTourOperatorContext()
    const { data, isLoading } = useFetchCreateData()
    const [isInitialized, setIsInitialized] = useState(false)
    const { mutate, isPending } = useCreateTour()
    useEffect(() => {
        // マウント時に即座にリセット
        resetTour()
        setTimeout(() => setIsInitialized(true), 0)
        return () => {
            console.log('TourCreate アンマウントされました！')
        }
    }, [])

    useEffect(() => {
        if (!data || data == undefined) return

        setLanguages(data?.languages)
        setRegions([])
        setCategories([])
        if (data?.regions) {
            const regionOptions = data.regions.map((region) => ({
                value: region.id,
                label: region.region,
            }))
            setRegions(regionOptions)
        }
        if (data?.categories) {
            const categoryOptions = data.categories.map((category) => ({
                value: category.id,
                label: category.category,
            }))
            setCategories(categoryOptions)
        }
    }, [data])

    const handleSubmit = (e) => {
        e.preventDefault()
        mutate(tour)
    }

    if (isLoading || !isInitialized) {
        return <TableSkelton />
    }

    return (
        <TourOperator
            isPending={isPending}
            handleSubmit={handleSubmit}
            type="create"
        />
    )
}

export default TourCreate
