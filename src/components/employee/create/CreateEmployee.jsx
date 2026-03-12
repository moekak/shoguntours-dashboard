import { Modal } from '@components/ui/modal';
import Button from '@components/ui/button/Button';
import Input from '@components/form/input/InputField';
import Label from '@components/form/Label';
import { useCommonContext } from '@/context/CommonContext';
import { usePostMutation } from '@/hooks/usePostMutation';
import { useState } from 'react';
import { API_ENDPOINTS } from '@/config/config';
import Alert from '@/components/ui/alert/Alert';
import { useQueryClient } from '@tanstack/react-query';

function CreateEmployee() {
    const queryClient = useQueryClient();
    const { openModal, setOpenModal, modalErrors, modalErrorTitle } =
        useCommonContext();
    const [guideInformation, setGuideInformation] = useState({
        first_name: '',
        last_name: '',
        phone: '',
    });

    const onSuccess = () => {
        resetFields();
        queryClient.invalidateQueries({ queryKey: ['employee'] });
    };

    const resetFields = () => {
        setGuideInformation({
            first_name: '',
            last_name: '',
            phone: '',
        });
    };

    const { mutate, isPending } = usePostMutation(
        API_ENDPOINTS.API.CREATE_TOUR_GUIDE,
        {
            isModal: true,
            onSuccess: onSuccess,
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(guideInformation);
    };
    return (
        <Modal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            className="max-w-[700px] m-4"
        >
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Create Guide Information
                    </h4>
                </div>

                {modalErrors?.length > 0 && (
                    <div className="mb-3 mt-10">
                        <Alert
                            variant="error"
                            title={modalErrorTitle}
                            message={modalErrors}
                            showLink={false}
                        />
                    </div>
                )}
                <form className="flex flex-col">
                    <div className="custom-scrollbar  overflow-y-auto px-2 pb-3">
                        <div className="mt-4">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                <div>
                                    <Label>FirstName</Label>
                                    <Input
                                        type="text"
                                        placeholder="John"
                                        value={guideInformation.first_name}
                                        onChange={(e) =>
                                            setGuideInformation({
                                                ...guideInformation,
                                                first_name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <Label>LastName</Label>
                                    <Input
                                        type="text"
                                        placeholder="Smith"
                                        value={guideInformation.last_name}
                                        onChange={(e) =>
                                            setGuideInformation({
                                                ...guideInformation,
                                                last_name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="py-3">
                            <Label>PhoneNumber</Label>
                            <Input
                                type="text"
                                placeholder="+09 363 398 46"
                                value={guideInformation.phone}
                                onChange={(e) =>
                                    setGuideInformation({
                                        ...guideInformation,
                                        phone: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => setOpenModal(false)}
                        >
                            Close
                        </Button>
                        <button
                            onClick={handleSubmit}
                            className={`${isPending ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-[#e92929] text-white hover:bg-[#d61f1f] cursor-pointer'} px-6 py-3 items-center justify-center flex rounded-lg font-medium transition-colors whitespace-nowrap`}
                        >
                            {isPending ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    <span className="truncate">
                                        Processing...
                                    </span>
                                </>
                            ) : (
                                <span className="truncate">
                                    Save Information
                                </span>
                            )}
                        </button>
                        {/* <Button size="sm" onClick={(e) => handleSubmit(e)}>
                            Save Information
                        </Button> */}
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default CreateEmployee;
