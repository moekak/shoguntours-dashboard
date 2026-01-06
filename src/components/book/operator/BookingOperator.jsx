import React, { useEffect, useState } from 'react'

import { Breadcrumbs, Link, Typography } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Label from '../../form/Label'
import Input from '../../form/input/InputField'
import ErrorMessage from '../../ui/error/ErrorMessage'
import Select from '../../form/Select'
import Radio from '../../form/input/Radio'
import TextArea from '../../form/input/TextArea'
import { useCommonContext } from '../../../context/CommonContext'
import { useFetchData } from '../../../hooks/useFetchData'
import { API_ENDPOINTS } from '../../../config/config'
import { useCreateBooking } from '../hooks/useCreateBooking'
import Alert from '../../ui/alert/Alert'
import ManualTourEntryModal from './ManualTourEntryModal'
import { useBookingContext } from '../context/BookingContext'
import DatePicker from '../../form/date-picker'
import { usePostMutation } from '../../../hooks/usePostMutation'

function BookingOperator() {
    const [tourId, setTourId] = useState(null)

    const onSuccess = (data) => {
        // setTourType(data.data.tourData ?? [])
        // setNewTour([])
    }
    const { mutate } = usePostMutation(API_ENDPOINTS.API.CREATE_TOUR_BOOKING, {
        onSuccess: onSuccess,
        redirect: true,
        url: '/bookings',
    })

    // 全ツアー名を取得
    const { data: tour } = useFetchData(
        API_ENDPOINTS.API.FETCH_REGISTRATION_DATA,
        'booking'
    )
    // ツアーを選択後毎回、そのツアーIDに紐づいたItineraryを取得
    const { data: itinerary, isLoading: isItineraryLoading } = useFetchData(
        `${API_ENDPOINTS.API.FETCH_TOUR_ITINERARY_DATA}/${tourId}`,
        'itineraryData',
        tourId,
        { enabled: !!tourId }
    )

    const [bookingData, setBookingData] = useState({})
    const {
        errorFields,
        errors,
        errorTitle,
        setOpenModal,
        successMessage,
        isSuccess,
    } = useCommonContext()
    const { setTourType, tourType } = useBookingContext()

    // 入力処理
    const handleChange = (name, value) => {
        setBookingData({ ...bookingData, [name]: value })
    }

    // 複数フィールド一度更新用
    const handleMultipleChange = (updates) => {
        setBookingData((prev) => ({ ...prev, ...updates }))
    }

    // 予約作成処理
    const handleSubmit = () => {
        mutate(bookingData)
    }

    useEffect(() => {
        if (!tour) return
        setTourType(tour)
    }, [tour])

    return (
        <div className="bg-gray-50">
            {/* Main Content */}
            <main className="pb-10">
                <div className="container">
                    {/* Page Header */}
                    <div className="mb-8 sticky">
                        <Breadcrumbs
                            aria-label="breadcrumb"
                            className="text-xs"
                            sx={{ fontSize: '0.75rem' }}
                        >
                            <Link underline="hover" color="inherit" href="/">
                                Booking
                            </Link>
                            <Typography
                                sx={{
                                    color: 'text.primary',
                                    fontSize: '0.8rem',
                                }}
                            >
                                Register New Booking
                            </Typography>
                        </Breadcrumbs>
                        <h1 className="text-2xl font-bold text-gray-800 mt-3">
                            Register New Booking
                        </h1>
                        <p className="text-gray-600 my-2">
                            Share your travel insights and stories with the
                            world
                        </p>
                        {errors?.length > 0 && (
                            <Alert
                                variant="error"
                                title={errorTitle}
                                message={errors}
                                showLink={false}
                            />
                        )}
                        {isSuccess && (
                            <div className="mb-4">
                                <Alert
                                    variant="success"
                                    title={successMessage?.title}
                                    message={successMessage?.message}
                                />
                            </div>
                        )}
                    </div>

                    {/* customer information */}
                    <div className="space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#ecf3ff] rounded-lg flex items-center justify-center mr-3">
                                    <InfoOutlinedIcon
                                        sx={{ color: '#465fff', fontSize: 20 }}
                                    />
                                </div>
                                Customer Information
                            </h2>
                            <div className="space-y-5">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div>
                                        <Label
                                            required={true}
                                            htmlFor="first_name"
                                            error={errorFields?.has(
                                                'first_name'
                                            )}
                                        >
                                            First Name
                                        </Label>
                                        <Input
                                            value={bookingData?.first_name}
                                            name="first_name"
                                            type="text"
                                            id="first_name"
                                            placeholder="John"
                                            onChange={(e) =>
                                                handleChange(
                                                    e.target.name,
                                                    e.target.value
                                                )
                                            }
                                            error={errorFields?.has(
                                                'first_name'
                                            )}
                                        />
                                        <ErrorMessage type="first_name" />
                                    </div>

                                    <div>
                                        <Label
                                            required={true}
                                            htmlFor="last_name"
                                            error={errorFields?.has(
                                                'last_name'
                                            )}
                                        >
                                            Last Name
                                        </Label>
                                        <Input
                                            value={bookingData?.last_name}
                                            name="last_name"
                                            id="last_name"
                                            placeholder="Smith"
                                            onChange={(e) =>
                                                handleChange(
                                                    e.target.name,
                                                    e.target.value
                                                )
                                            }
                                            error={errorFields?.has(
                                                'last_name'
                                            )}
                                        />
                                        <ErrorMessage type="last_name" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-5 mt-4">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* email */}
                                    <div>
                                        <Label
                                            htmlFor="email"
                                            error={errorFields?.has('email')}
                                        >
                                            Email
                                        </Label>
                                        <Input
                                            value={bookingData?.email}
                                            name="email"
                                            type="text"
                                            id="email"
                                            placeholder="your.email@example.com"
                                            error={errorFields?.has('email')}
                                            onChange={(e) =>
                                                handleChange(
                                                    e.target.name,
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <ErrorMessage type="email" />
                                    </div>

                                    <div>
                                        <Label
                                            htmlFor="phone_number"
                                            error={errorFields?.has(
                                                'phone_number'
                                            )}
                                        >
                                            Phone Number
                                        </Label>
                                        <Input
                                            value={bookingData?.phone_number}
                                            name="phone_number"
                                            type="text"
                                            id="phone_number"
                                            placeholder="+8190-1234-5678"
                                            onChange={(e) =>
                                                handleChange(
                                                    e.target.name,
                                                    e.target.value
                                                )
                                            }
                                            error={errorFields?.has(
                                                'phone_number'
                                            )}
                                        />
                                        <ErrorMessage type="phone_number" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tour information */}
                    <div className="space-y-6 mt-5">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#ecf3ff] rounded-lg flex items-center justify-center mr-3">
                                    <InfoOutlinedIcon
                                        sx={{ color: '#465fff', fontSize: 20 }}
                                    />
                                </div>
                                Tour Information
                            </h2>
                            <div className="space-y-6 ">
                                {/* Tour Type Select */}
                                <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-2 gap-4">
                                    <div>
                                        <Label required={true}>Tour Type</Label>
                                        <Select
                                            value={bookingData?.tour_type}
                                            options={tourType ?? []}
                                            placeholder="Select tour type"
                                            className="dark:bg-dark-900"
                                            onChange={(value, option) => {
                                                handleMultipleChange({
                                                    tour_type: value,
                                                    tour_source: option.type,
                                                    itinerary_id: '',
                                                })

                                                setTourId(value)
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <Label required={true}>
                                            Tour Itinerary
                                        </Label>
                                        <Select
                                            value={bookingData?.itinerary_id}
                                            options={itinerary ?? []}
                                            placeholder={
                                                isItineraryLoading
                                                    ? 'Loading...'
                                                    : itinerary
                                                    ? 'Select tour type'
                                                    : ''
                                            }
                                            className="dark:bg-dark-900"
                                            onChange={(value) => {
                                                handleChange(
                                                    'itinerary_id',
                                                    value
                                                )
                                            }}
                                            disabled={
                                                itinerary == undefined ||
                                                itinerary.length <= 0
                                            }
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setOpenModal(true)}
                                    className="text-[#465fff] mb-3 hover:text-[#3d51e6] text-sm font-medium flex items-center gap-2 mt-3 transition-colors"
                                >
                                    <i className="fas fa-plus"></i>
                                    <span className="font-medium">
                                        Manual Tour Entry
                                    </span>
                                </button>
                            </div>
                            <div>
                                {/* Additional Tour Details */}
                                <div className="border-t grid md:grid-cols-3 lg:grid-cols-3 gap-4">
                                    <div className="mt-6">
                                        <Label
                                            required={true}
                                            htmlFor="youth_number"
                                            error={errorFields?.has(
                                                'youth_number'
                                            )}
                                        >
                                            Number of youth
                                        </Label>
                                        <Input
                                            value={bookingData?.youth_number}
                                            type="number"
                                            id="youth_number"
                                            placeholder="e.g., 3"
                                            min="1"
                                            max="50"
                                            name="youth_number"
                                            onChange={(e) =>
                                                handleChange(
                                                    e.target.name,
                                                    e.target.value
                                                )
                                            }
                                            error={errorFields?.has(
                                                'youth_number'
                                            )}
                                        />
                                        <ErrorMessage type="youth_number" />
                                    </div>
                                    <div className="mt-6">
                                        <Label
                                            required={true}
                                            htmlFor="adult_number"
                                            error={errorFields?.has(
                                                'adult_number'
                                            )}
                                        >
                                            Number of adults
                                        </Label>
                                        <Input
                                            value={bookingData?.adult_number}
                                            type="number"
                                            id="adult_number"
                                            placeholder="e.g., 3"
                                            min="1"
                                            max="50"
                                            name="adult_number"
                                            onChange={(e) =>
                                                handleChange(
                                                    e.target.name,
                                                    e.target.value
                                                )
                                            }
                                            error={errorFields?.has(
                                                'adult_number'
                                            )}
                                        />
                                        <ErrorMessage type="adult_number" />
                                    </div>
                                    <div className="mt-6">
                                        <Label
                                            required={true}
                                            htmlFor="youth_price"
                                            error={errorFields?.has(
                                                'youth_price'
                                            )}
                                        >
                                            Youth price
                                        </Label>
                                        <Input
                                            value={bookingData?.youth_price}
                                            type="number"
                                            id="youth_price"
                                            placeholder="e.g., 12,000"
                                            min="1"
                                            name="youth_price"
                                            onChange={(e) =>
                                                handleChange(
                                                    e.target.name,
                                                    e.target.value
                                                )
                                            }
                                            error={errorFields?.has(
                                                'youth_price'
                                            )}
                                        />
                                        <ErrorMessage type="youth_price" />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-4">
                                    <div className="mt-6">
                                        <Label
                                            required={true}
                                            htmlFor="adult_price"
                                            error={errorFields?.has(
                                                'adult_price'
                                            )}
                                        >
                                            Adult price
                                        </Label>
                                        <Input
                                            value={bookingData?.adult_price}
                                            type="number"
                                            id="adult_price"
                                            placeholder="e.g., 12,000"
                                            min="1"
                                            name="adult_price"
                                            onChange={(e) =>
                                                handleChange(
                                                    e.target.name,
                                                    e.target.value
                                                )
                                            }
                                            error={errorFields?.has(
                                                'adult_price'
                                            )}
                                        />
                                        <ErrorMessage type="adult_price" />
                                    </div>
                                    <div className="mt-6">
                                        <Label
                                            required={true}
                                            htmlFor="logistics_fee"
                                            error={errorFields?.has(
                                                'logistics_fee'
                                            )}
                                        >
                                            Logistics Fee
                                        </Label>
                                        <Input
                                            value={bookingData?.logistics_fee}
                                            type="number"
                                            id="logistics_fee"
                                            placeholder="e.g., 12,000"
                                            min="1"
                                            name="logistics_fee"
                                            onChange={(e) =>
                                                handleChange(
                                                    e.target.name,
                                                    e.target.value
                                                )
                                            }
                                            error={errorFields?.has(
                                                'logistics_fee'
                                            )}
                                        />
                                        <ErrorMessage type="logistics_fee" />
                                    </div>
                                    <div className="mt-6">
                                        <Label
                                            htmlFor="other_fee"
                                            error={errorFields?.has(
                                                'other_fee'
                                            )}
                                        >
                                            Other Fees
                                        </Label>
                                        <Input
                                            value={bookingData?.other_fee ?? 0}
                                            type="number"
                                            id="other_fee"
                                            placeholder="e.g., 12,000"
                                            name="other_fee"
                                            onChange={(e) =>
                                                handleChange(
                                                    e.target.name,
                                                    e.target.value
                                                )
                                            }
                                            error={errorFields?.has(
                                                'other_fee'
                                            )}
                                        />
                                        <ErrorMessage type="other_fee" />
                                    </div>
                                    <div className="mt-6">
                                        <DatePicker
                                            defaultDate={bookingData?.tour_date}
                                            id="date-picker"
                                            label="Tour Date"
                                            placeholder="Select a date"
                                            onChange={(dates) => {
                                                const validDate = new Date(
                                                    dates
                                                )
                                                if (
                                                    !isNaN(validDate.getTime())
                                                ) {
                                                    handleChange(
                                                        'tour_date',
                                                        validDate
                                                    )
                                                }
                                            }}
                                            error={errorFields?.has(
                                                `tour_date`
                                            )}
                                        />
                                        <ErrorMessage type="tour_date" />
                                    </div>
                                </div>
                                {/* Notes */}
                                <div className="mt-6">
                                    <div>
                                        <Label>Notes</Label>
                                        <TextArea
                                            // error={errorFields?.has(`itinerary.${itineraryIndex}.overview_description`)}
                                            onChange={(value) =>
                                                handleChange('request', value)
                                            }
                                            value={bookingData?.request}
                                            rows={4}
                                            placeholder="Any special requirements or notes about this tour..."
                                        />
                                        {/* <ErrorMessage type={`itinerary.${itineraryIndex}.overview_description`}/> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Manual Tour Entry Modal */}
                    <ManualTourEntryModal />

                    {/* Fixed Publish Button */}
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#e92929] to-[#ff6b6b] text-white rounded-full hover:shadow-lg transition-all font-medium z-50 flex items-center justify-center"
                    >
                        <i className="fas fa-plus text-xl"></i>
                    </button>
                </div>
            </main>
        </div>
    )
}

export default BookingOperator
