import React from 'react'

function Loading() {
      return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
                  <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm mx-4 text-center">
                        {/* アニメーション付きアイコン */}
                        <div className="w-16 h-16 mx-auto mb-4 relative">
                              <div className="w-16 h-16 border-4 border-gray-200 border-t-[#e92929] rounded-full animate-spin"></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                    <i className="fas fa-map-marked-alt text-[#e92929] text-xl"></i>
                              </div>
                        </div>
                        
                        {/* メッセージ */}
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Creating Your Tour</h3>
                        <p className="text-gray-600 text-sm mb-4">
                              We're processing your tour details and making it ready for travelers...
                        </p>
                        
                        {/* プログレスバー */}
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                              <div className="bg-gradient-to-r from-[#e92929] to-[#ff6b6b] h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
                        </div>
                        
                        <p className="text-xs text-gray-500">Please don't close this window</p>
                  </div>
            </div>
      )
}

export default Loading