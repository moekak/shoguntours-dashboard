import React, { useEffect, useState } from 'react'
import { useTourOperatorContext } from '../../context/TourOperatorContext'
import ErrorMessage from '../../../ui/error/ErrorMessage'
import { API_ENDPOINTS } from '../../../../config/config'

function GalleryImageComponent({index, height}) {
      const [isOpen, setIsOpen] = useState(false)
      const [previews, setPreviews] = useState([])
      const {setTour, tour,errorFields} = useTourOperatorContext()
      const handleImageChange = (e) => {
            const file = e.target.files[0];
            const previewUrl = URL.createObjectURL(file);
            setPreviews({...previews, [index]: previewUrl})
            setIsOpen(!isOpen)
            setTour({
                  ...tour,
                  gallery_image: (() => {
                        const newArray = [...tour.gallery_image];
                        newArray[index] = file;  // 存在しないindexでも自動的に配列が拡張される
                        return newArray;
                  })()
            });
      };


      
      return (
            <div className="relative">
                  <label  htmlFor={`gallery-input-${index}`} style={{ height: `${height}px` }} className={`${!isOpen && (tour?.gallery_image?.[index] == "" || tour?.gallery_image?.[index] == undefined)  ? "flex": "hidden"} ${errorFields?.has(`gallery_image.${index}`) ? "border-[#e7000b] hover:border-[#e7000b]" :"border-gray-300 hover:border-[#465fff]"} upload-container border-2 border-dashed  rounded-lg  transition-colors cursor-pointer items-center justify-center`}>
                        <div className="text-center">
                              <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                              <p className="text-sm text-gray-600">Upload Image {index + 1}</p>
                              <p className="text-xs text-gray-500">400x{height}px recommended</p>
                        </div>
                  </label>
                  <img style={{ height: `${height}px` }} src={previews?.[index] ?? `${API_ENDPOINTS.IMAGE.URL}/${tour?.gallery_image?.[index]}`} className={`w-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${isOpen || tour?.gallery_image?.[index] ? "block" : "hidden"}`}/>
                  <input type="file" id={`gallery-input-${index}`} accept="image/*" className="hidden" onChange={handleImageChange} />
                  <button type="button" id="remove-{{$index + 1}}" className="hidden absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full items-center justify-center hover:bg-red-600 transition-colors">
                        <i className="fas fa-times text-sm"></i>
                  </button>
                  <ErrorMessage type={`gallery_image.${index}`}/>
            </div>
      )
}

export default GalleryImageComponent