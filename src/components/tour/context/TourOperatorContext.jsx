import { createContext, useContext, useState } from 'react';
import { useCommonContext } from '../../../context/CommonContext';

export const TourOperatorContext = createContext();
export const useTourOperatorContext = () => {
    const context = useContext(TourOperatorContext);
    if (context === undefined) {
        throw new Error(
            'TourOperatorContext must be used within an TourProvider'
        );
    }
    return context;
};

export const TourOperatorProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTourOperationSuccess, setIsTourOperationSuccess] = useState(false);
    const [tourSuccessMessage, setTourSuccessMessage] = useState({});

    const resetTourOperationMessage = () => {
        setIsTourOperationSuccess(false);
        setTourSuccessMessage({});
    };
    const iconOptions = [
        { icon: 'fa-solid fa-location-dot', title: '場所' },
        { icon: 'fa-camera', title: '写真撮影' },
        { icon: 'fa-utensils', title: '食事' },
        { icon: 'fa-shopping-bag', title: 'ショッピング' },
        { icon: 'fa-train', title: '交通' },
        { icon: 'fa-museum', title: '博物館' },
        { icon: 'fa-tree', title: '公園' },
        { icon: 'fa-torii-gate', title: '神社' },
        { icon: 'fa-building', title: '建物' },
        { icon: 'fa-hot-tub', title: '温泉' },
        { icon: 'fa-mountain', title: '山' },
        { icon: 'fa-water', title: '海' },
        { icon: 'fa-star', title: '観光地' },
        { icon: 'fa-coffee', title: 'カフェ' },
        { icon: 'fa-bed', title: '宿泊' },
        { icon: 'fa-bus', title: 'バス' },
        { icon: 'fa-ticket-alt', title: 'チケット' },
        { icon: 'fa-clock', title: '時間' },
    ];

    const [languages, setLanguages] = useState([]);
    const [regions, setRegions] = useState([]);
    const [categories, setCategories] = useState([]);

    const tourTypes = [
        { value: 'public', label: 'public' },
        { value: 'private', label: 'private' },
    ];

    const ratingOptions = [
        { value: '5', label: '⭐⭐⭐⭐⭐ (5 stars)' },
        { value: '4', label: '⭐⭐⭐⭐ (4 stars)' },
        { value: '3', label: '⭐⭐⭐ (3 stars)' },
        { value: '2', label: '⭐⭐ (2 stars)' },
        { value: '1', label: '⭐ (1 star)' },
    ];

    const [tour, setTour] = useState({
        title: '',
        subtitle: '',
        badge: '',
        region_id: '',
        category_id: '',
        is_featured: '0',
        is_published: '1',
        overview_title: '',
        overview_description: '',
        questions: [
            {
                question: '',
                answer: '',
            },
        ],
        highlights: [
            {
                title: '',
                description: '',
            },
        ],
        reviews: [
            {
                name: '',
                rating: '',
                content: '',
                date: '',
            },
        ],
        itinerary: [
            {
                duration: '',
                max_participants: '',
                tour_type: 'private',
                meeting_point: '',
                adult_price: '',
                child_price: '',
                logistics_fee: '',
                overview_title: '',
                overview_description: '',
                activity: [
                    {
                        activity_description: '',
                        activity_title: '',
                        activity_icon: 'fa-solid fa-location-dot',
                    },
                ],
                itinerary_highlight: [''],
                languages: [],
                image: '',
            },
        ],
        gallery_image: [],
    });

    const resetTour = () => {
        setTour({
            title: '',
            subtitle: '',
            badge: '',
            region_id: '',
            category_id: '',
            is_featured: '0',
            is_published: '1',
            overview_title: '',
            overview_description: '',
            hero_image: '',
            questions: [
                {
                    question: '',
                    answer: '',
                },
            ],
            highlights: [
                {
                    title: '',
                    description: '',
                },
            ],
            reviews: [
                {
                    name: '',
                    rating: '',
                    content: '',
                    date: '',
                },
            ],
            itinerary: [
                {
                    duration: '',
                    max_participants: '',
                    tour_type: 'private',
                    meeting_point: '',
                    adult_price: '',
                    child_price: '',
                    logistics_fee: '',
                    overview_title: '',
                    overview_description: '',
                    activity: [
                        {
                            activity_description: '',
                            activity_title: '',
                            activity_icon: 'fa-solid fa-location-dot',
                        },
                    ],
                    itinerary_highlight: [''],
                    languages: [],
                    image: '',
                },
            ],
            gallery_image: [],
        });
    };

    const value = {
        iconOptions,
        languages,
        tourTypes,
        ratingOptions,
        tour,
        setTour,
        setLanguages,
        regions,
        setRegions,
        categories,
        setCategories,
        resetTour,
        isModalOpen,
        setIsModalOpen,
        isTourOperationSuccess,
        setIsTourOperationSuccess,
        tourSuccessMessage,
        setTourSuccessMessage,
        resetTourOperationMessage,
    };

    return (
        <TourOperatorContext.Provider value={value}>
            {children}
        </TourOperatorContext.Provider>
    );
};
