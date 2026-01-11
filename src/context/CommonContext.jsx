import { createContext, useContext, useState } from 'react';
import { MESSAGES } from '../config/config';
import { useNavigate } from 'react-router';

export const CommonContext = createContext();
export const useCommonContext = () => {
    const context = useContext(CommonContext);
    if (context === undefined) {
        throw new Error(
            'useCommonContext must be used within an CommonProvider'
        );
    }
    return context;
};

export const CommonProvider = ({ children }) => {
    const navigate = useNavigate();
    const [errorFields, setErrorFields] = useState(new Set());
    const [errors, setErrors] = useState([]);
    const [errorsMessages, setErrorsMessages] = useState([]);
    const [modalErrors, setModalErrors] = useState([]);
    const [modalErrorsMessages, setModalErrorsMessages] = useState([]);
    const [successMessage, setSuccessMessage] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorTitle, setErrorTitle] = useState('');
    const [modalErrorTitle, setModalErrorTitle] = useState('');
    const [account, setAccount] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const resetError = () => {
        setErrors([]);
        setErrorFields(new Set());
        setErrorTitle('');
        setModalErrorTitle('');
        setErrorsMessages([]);
        setModalErrorsMessages([]);
        setModalErrors([]);
    };
    const resetAll = () => {
        setErrors([]);
        setErrorFields(new Set());
        setErrorTitle('');
        setModalErrorTitle('');
        setErrorsMessages([]);
        setIsSuccess(false);
        setSuccessMessage({});
    };

    const setErrorFieldsFn = (errorMsgs) => {
        setErrorFields(() => {
            return Object.entries(errorMsgs).reduce((acc, [title, _]) => {
                acc.add(title);
                return acc;
            }, new Set());
        });
    };

    const internalServerError = () => {
        console.log('22');

        setErrors(MESSAGES.ERROR.SYSTEM_ERROR);
        setErrorTitle(MESSAGES.ERROR.SYSTEM_ERROR_TITLE);
        setOpenModal(false);
    };

    const fetchPostError = (error, isModal = false) => {
        const errorCode = error?.response?.data?.error?.code;
        const errorMsgs = error?.response?.data?.error?.details;
        if (errorCode === 'INTERNAL_SERVER_ERROR') {
            internalServerError();
        } else if (errorCode === 'VALIDATION_ERROR') {
            if (isModal) {
                setModalErrorTitle(MESSAGES.ERROR.VALIDATION_ERROR_TITLE);
                setModalErrorsMessages(errorMsgs);
                setModalErrors(() => {
                    return Object.entries(errorMsgs).reduce(
                        (acc, [title, messages]) => {
                            acc.push(...messages);
                            return acc;
                        },
                        []
                    );
                });
            } else {
                setErrorTitle(MESSAGES.ERROR.VALIDATION_ERROR_TITLE);
                setErrorsMessages(errorMsgs);
                setErrors(() => {
                    return Object.entries(errorMsgs).reduce(
                        (acc, [title, messages]) => {
                            acc.push(...messages);
                            return acc;
                        },
                        []
                    );
                });
            }

            setErrorFieldsFn(errorMsgs);
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // postでfetchした際の共通成功処理
    const fetchPostSuccess = (data, options = {}) => {
        resetError();
        setSuccessMessage(data?.message);
        setIsSuccess(true);
        setOpenModal(false);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        if (options?.redirect !== false) {
            // デフォルトで遷移する
            navigate(options?.url);
        }
        setTimeout(() => {
            setIsSuccess(false);
            setSuccessMessage({});
        }, 5000);
    };

    const value = {
        errorFields,
        setErrorFields,
        errors,
        setErrors,
        errorsMessages,
        setErrorsMessages,
        successMessage,
        setSuccessMessage,
        isSuccess,
        setIsSuccess,
        resetError,
        errorTitle,
        setErrorTitle,
        modalErrorTitle,
        setModalErrorTitle,
        modalErrorsMessages,
        modalErrors,
        setModalErrors,
        setModalErrorsMessages,
        setErrorFieldsFn,
        fetchPostError,
        account,
        setAccount,
        resetAll,
        openModal,
        setOpenModal,
        fetchPostSuccess,
        internalServerError,
    };

    return (
        <CommonContext.Provider value={value}>
            {children}
        </CommonContext.Provider>
    );
};
