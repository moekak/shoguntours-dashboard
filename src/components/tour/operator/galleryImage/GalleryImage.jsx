import React, { useState } from 'react';
import GalleryImageComponent from './GalleryImageComponent';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';

function GalleryImage() {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-[#ecf3ff] rounded-lg flex items-center justify-center mr-3">
                    <BrokenImageOutlinedIcon
                        sx={{ color: '#465fff', fontSize: 20 }}
                    />
                </div>
                Tour Gallery
            </h2>

            <p className="text-sm text-gray-600 mb-4">
                Upload multiple images to showcase different aspects of your
                tour
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-[1100px] mx-auto">
                {/* Column 1 */}
                <div className="space-y-4">
                    {/* Image 1 - Large */}
                    <GalleryImageComponent index={0} height={500} />
                    {/* Image 2 - Medium */}
                    <GalleryImageComponent index={1} height={300} />
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                    {/* Image 3 - Medium */}
                    <GalleryImageComponent index={2} height={300} />
                    {/* Image 4 - Large */}
                    <GalleryImageComponent index={3} height={500} />
                </div>

                {/* Column 3 */}
                <div className="space-y-4">
                    {/* Image 5 - Square */}
                    <GalleryImageComponent index={4} height={400} />
                    {/* <!-- Image 6 - Square --> */}
                    <GalleryImageComponent index={5} height={400} />
                </div>
            </div>
        </div>
    );
}

export default GalleryImage;
