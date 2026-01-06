import { createContext, useContext, useState } from 'react'

export const ToursContext = createContext()
export const useToursContext = () => {
    const context = useContext(ToursContext)
    if (context === undefined) {
        throw new Error('useToursContext must be used within an TourProvider')
    }
    return context
}

export const ToursProvider = ({ children }) => {
    const [tours, setTours] = useState([])
    const [originalTours, setOriginalTours] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedRegions, setSelectedRegions] = useState('all')
    const [selectedStatus, setSelectedStatus] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')

    const filter = () => {
        if (!originalTours || originalTours.length === 0) {
            return
        }
        let filtered = [...originalTours]
        const term = searchTerm.toLowerCase()

        if (searchTerm !== '') {
            filtered = filtered.filter((data) => {
                return (
                    data?.title.toLowerCase().includes(term) ||
                    data?.subtitle.toLowerCase().includes(term) ||
                    data?.category.category.toLowerCase().includes(term) ||
                    data?.overview_title.toLowerCase().includes(term) ||
                    data?.overview_description.toLowerCase().includes(term)
                )
            })
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter((data) => {
                return data?.category_id == selectedCategory
            })
        }

        if (selectedRegions !== 'all') {
            filtered = filtered.filter((data) => {
                return data?.region_id == selectedRegions
            })
        }

        if (selectedStatus !== 'all') {
            filtered = filtered.filter((data) => {
                return data?.is_published == selectedStatus
            })
        }

        console.log(filtered)
        setTours(filtered)
    }

    const value = {
        tours,
        setTours,
        originalTours,
        setOriginalTours,
        selectedCategory,
        setSelectedCategory,
        selectedRegions,
        setSelectedRegions,
        searchTerm,
        setSearchTerm,
        filter,
        selectedStatus,
        setSelectedStatus,
    }

    return (
        <ToursContext.Provider value={value}>{children}</ToursContext.Provider>
    )
}
