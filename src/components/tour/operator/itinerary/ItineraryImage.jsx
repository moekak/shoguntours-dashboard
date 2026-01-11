import React, { useEffect, useState } from 'react';
import { useTourOperatorContext } from '../../context/TourOperatorContext';
import ErrorMessage from '../../../ui/error/ErrorMessage';
import { API_ENDPOINTS } from '../../../../config/config';
import { useCommonContext } from '../../../../context/CommonContext';

function ItineraryImage({ itineraryIndex }) {
    const { errorFields } = useCommonContext();
    const { setTour, tour } = useTourOperatorContext();
    const [preview, setPreview] = useState({});
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const previewUrl = URL.createObjectURL(file);
        setPreview((prev) => ({
            ...prev,
            [itineraryIndex]: previewUrl,
        }));
        handleInput(file, itineraryIndex);
    };

    const handleInput = (value, itineraryIndex) => {
        setTour({
            ...tour,
            itinerary: tour.itinerary.map((item, iIndex) =>
                iIndex === itineraryIndex
                    ? {
                          ...item,
                          image: value,
                      }
                    : item
            ),
        });
    };

    useEffect(() => {
        console.log(preview);
    }, [preview]);
    return (
        <div className="p-3">
            <div
                className={` ${errorFields?.has(`itinerary.${itineraryIndex}.image`) ? 'border-[#e7000b] hover:border-[#e7000b]' : 'border-gray-300 hover:border-[#465fff]'} border-2 border-dashed  rounded-lg p-8 text-center flex items-center flex-col justify-center  transition-colors cursor-pointer h-[350px]   ${!preview[0]?.[itineraryIndex] && !tour?.itinerary[itineraryIndex]?.image ? 'block' : 'hidden'}`}
            >
                <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                <p className="text-gray-600 font-medium mb-2">
                    Upload itinerary image
                </p>
                <p className="text-sm text-gray-500">
                    This will be displayed as the itinerary banner image
                </p>
                <p className="text-sm text-gray-500 mb-4">
                    Recommended size: 1920x1080px
                </p>
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    name={`itinerary_image_${itineraryIndex}`}
                    id={`itinerary_image_${itineraryIndex}`}
                    onChange={handleImageChange}
                />
                <label
                    htmlFor={`itinerary_image_${itineraryIndex}`}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm w-fit" // cursor-pointerを追加
                >
                    Select Itinerary Image
                </label>
            </div>

            <div
                className={`preview_container border-2 border-dashed border-gray-300 rounded-lg p-5 text-center hover:border-[#465fff] transition-colors cursor-pointer h-[350px] ${preview[0]?.[itineraryIndex] || tour?.itinerary[itineraryIndex]?.image ? 'block' : 'hidden'}`}
            >
                <label
                    htmlFor={`itinerary_image_${itineraryIndex}`}
                    className="h-full block cursor-pointer"
                >
                    {!(
                        tour?.itinerary[itineraryIndex]?.image instanceof File
                    ) &&
                        tour?.itinerary[itineraryIndex]?.image && (
                            <img
                                src={`${API_ENDPOINTS.IMAGE.URL}/${tour?.itinerary[itineraryIndex]?.image}`}
                                alt=""
                                className="preview_src h-full w-full object-cover"
                            />
                        )}
                    {preview && (
                        <img
                            src={preview?.[itineraryIndex]}
                            alt=""
                            className="preview_src h-full w-full object-cover"
                        />
                    )}
                </label>
            </div>

            <ErrorMessage type={`itinerary.${itineraryIndex}.image`} />
        </div>
    );
}

export default ItineraryImage;
