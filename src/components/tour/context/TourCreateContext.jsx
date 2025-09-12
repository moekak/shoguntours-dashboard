import { createContext, useContext, useState } from "react";

export const TourCreateContext = createContext()
export const useTourCreateContext = () =>{
      const context = useContext(TourCreateContext)
      if (context === undefined) {
            throw new Error('TourCreateContext must be used within an TourProvider');
      }
      return context;
}

export const TourCreateProvider  = ({children}) =>{
      const iconOptions = [
            { icon: 'fa-map-marker-alt', title: '場所' },
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
            { icon: 'fa-clock', title: '時間' }
      ];

      const languages = [
            { id: 1, language: 'English' },
            { id: 2, language: 'Japanese' },
            { id: 3, language: 'Chinese' },
            { id: 4, language: 'Korean' }
      ];

      const tourTypes = [
            { value: "public", label: "public" },
            { value: "private", label: "private" },
      ]


      const value = {
            iconOptions,
            languages,
            tourTypes
      }

      return (
            <TourCreateContext.Provider value={value}>
                  {children}
            </TourCreateContext.Provider>
      )
}