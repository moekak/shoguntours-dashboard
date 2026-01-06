import { Modal, Box, IconButton } from '@mui/material'
import { useBookingContext } from '../context/BookingContext'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'
import Label from '../../form/Label'
import Input from '../../form/input/InputField'
import Select from '../../form/Select'
import { usePostMutation } from '../../../hooks/usePostMutation'
import { API_ENDPOINTS } from '../../../config/config'
import { useCommonContext } from '../../../context/CommonContext'
import Alert from '../../ui/alert/Alert'

function ManualTourEntryModal() {
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 800,
        maxHeight: '90vh',
        bgcolor: 'background.paper',
        borderRadius: '12px',
        boxShadow: 24,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    }
    const {
        openModal,
        setOpenModal,
        modalErrors,
        modalErrorTitle,
        errorFields,
    } = useCommonContext()
    const [newTour, setNewTour] = useState([])

    //外部ツアー登録成功処理
    const onSuccess = (data) => {
        setTourType(data.data.tourData ?? [])
        setNewTour([])
    }

    const { serviceProviders, commissionFee, setTourType } = useBookingContext()
    const { mutate, isPending } = usePostMutation(
        API_ENDPOINTS.API.CREATE_EXTERNAL_TOURS,
        { onSuccess: onSuccess, isModal: true }
    )

    // 入力処理
    const handleChange = (name, value) => {
        setNewTour({ ...newTour, [name]: value })
    }

    // モーダル閉じる
    const handleClose = () => {
        setOpenModal(false)
    }

    // 外部ツアー作成処理
    const handleSubmit = () => {
        mutate(newTour)
    }

    return (
        <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="manual-tour-modal"
            disabled={isPending}
        >
            <Box sx={modalStyle}>
                {/* Modal Header */}
                <div className="bg-white p-6 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#ecf3ff] rounded-lg flex items-center justify-center">
                            <InfoOutlinedIcon
                                sx={{ color: '#465fff', fontSize: 24 }}
                            />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            Manual Tour Entry
                        </h2>
                    </div>
                    <IconButton
                        disabled={isPending}
                        onClick={handleClose}
                        size="small"
                        sx={{
                            color: 'gray',
                            '&:hover': {
                                bgcolor: '#f3f4f6',
                                color: '#374151',
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>

                {/* Modal Body - Scrollable */}
                <div className="overflow-y-auto flex-1 p-6">
                    {modalErrors?.length > 0 && (
                        <div className="mb-3">
                            <Alert
                                variant="error"
                                title={modalErrorTitle}
                                message={modalErrors}
                                showLink={false}
                            />
                        </div>
                    )}
                    <div className="space-y-6">
                        {/* Tour Name Input */}
                        <div>
                            <Label
                                required={true}
                                htmlFor="tour_name"
                                error={errorFields?.has('tour_name')}
                            >
                                Tour Name
                            </Label>
                            <Input
                                value={newTour?.tour_name}
                                name="tour_name"
                                type="text"
                                id="tour_name"
                                placeholder="e.g.,Tokyo Full Day Tour"
                                error={errorFields?.has('tour_name')}
                                onChange={(e) => {
                                    handleChange('tour_name', e.target.value)
                                }}
                            />
                        </div>

                        {/* Service Provider & Commission Fee */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label
                                    required={true}
                                    error={errorFields?.has('service_provider')}
                                >
                                    Service Provider
                                </Label>
                                <Select
                                    defaultValue={newTour?.service_provider}
                                    options={serviceProviders ?? []}
                                    placeholder="Select service provider"
                                    className="dark:bg-dark-900"
                                    error={errorFields?.has('service_provider')}
                                    onChange={(value) => {
                                        handleChange('service_provider', value)
                                    }}
                                />
                            </div>
                            <div>
                                <Label
                                    required={true}
                                    error={errorFields?.has('commission_fee')}
                                >
                                    Commission Fee
                                </Label>
                                <Select
                                    defaultValue={newTour?.commission_fee}
                                    options={commissionFee ?? []}
                                    placeholder="Select commission rate"
                                    className="dark:bg-dark-900"
                                    error={errorFields?.has('commission_fee')}
                                    onChange={(value) => {
                                        handleChange('commission_fee', value)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="bg-gray-50 p-6 border-t border-gray-200 flex justify-end gap-3">
                    <button
                        disabled={isPending}
                        type="button"
                        onClick={handleClose}
                        className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isPending}
                        type="button"
                        onClick={handleSubmit}
                        className="px-6 py-2.5 bg-gradient-to-r from-[#465fff] to-[#6b7fff] text-white rounded-lg hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
                    >
                        {isPending ? 'Saving Tour' : 'Save Tour'}
                        <i
                            className={`fas fa-sync-alt text-sm transition-transform duration-500 ${isPending ? 'animate-spin' : ''}`}
                        ></i>
                    </button>
                </div>
            </Box>
        </Modal>
    )
}

export default ManualTourEntryModal
