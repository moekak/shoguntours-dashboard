import React, { useEffect, useState } from 'react';
import { useTourOperatorContext } from '../context/TourOperatorContext';
import { API_ENDPOINTS } from '../../../config/config';
import { FILE } from 'react-dnd-html5-backend/dist/NativeTypes';
import { useCommonContext } from '../../../context/CommonContext';

function HeroImage() {
    const { errorFields } = useCommonContext();
    const { setTour, tour } = useTourOperatorContext();
    const [preview, setPreview] = useState('');
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const previewUrl = URL.createObjectURL(file);
        setTour({ ...tour, hero_image: file });
        setPreview(previewUrl);
    };

    useEffect(() => {
        console.log(tour);
    }, [tour]);
    return (
        <>
            <div
                className={` ${errorFields?.has('hero_image') ? 'border-[#e7000b] hover:border-[#e7000b]' : 'border-gray-300 hover:border-[#465fff]'} border-2 border-dashed  rounded-lg p-8 text-center flex items-center flex-col justify-center  transition-colors cursor-pointer h-[350px]  ${preview == '' && tour?.hero_image == '' ? 'block' : 'hidden'}`}
            >
                <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                <p className="text-gray-600 font-medium mb-2">
                    Upload main tour image
                </p>
                <p className="text-sm text-gray-500">
                    This will be displayed as the main banner image
                </p>
                <p className="text-sm text-gray-500 mb-4">
                    Recommended size: 1920x1080px
                </p>
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    name="hero_image"
                    id="hero_image_input"
                    onChange={handleImageChange}
                />
                <label
                    htmlFor="hero_image_input"
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm w-fit" // cursor-pointerを追加
                >
                    Select Hero Image
                </label>
            </div>

            <div
                className={`preview_container border-2 border-dashed border-gray-300 rounded-lg p-5 text-center hover:border-[#465fff] transition-colors cursor-pointer h-[350px] ${preview !== '' || tour?.hero_image !== '' ? 'block' : 'hidden'}`}
            >
                <label
                    htmlFor="hero_image_input"
                    className="h-full block cursor-pointer"
                >
                    {!(tour.hero_image instanceof File) && tour.hero_image && (
                        <img
                            src={`${API_ENDPOINTS.IMAGE.URL}/${tour?.hero_image}`}
                            alt=""
                            className="preview_src h-full w-full object-cover"
                        />
                    )}
                    {preview && (
                        <img
                            src={preview}
                            alt=""
                            className="preview_src h-full w-full object-cover"
                        />
                    )}
                </label>
            </div>
        </>
    );
}

export default HeroImage;
