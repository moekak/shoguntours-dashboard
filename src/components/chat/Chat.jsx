import React from 'react'
import { Send, Plus, Smile, Image, Mic, Phone, Video, MoreHorizontal, Search, Settings } from 'lucide-react';

function Chat() {
return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg">
              <Settings className="w-5 h-5" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations"
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {/* Active Conversation */}
          <div className="px-4 py-4 bg-blue-50 border-r-4 border-blue-500 hover:bg-blue-100 cursor-pointer">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mr-4 flex-shrink-0"></div>
                <div className="absolute bottom-0 right-3 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">Sarah Chen</h3>
                  <span className="text-xs text-gray-500">2:45 PM</span>
                </div>
                <p className="text-sm text-gray-600 truncate">Perfect! Let's meet at the coffee shop</p>
              </div>
            </div>
          </div>

          {/* Other Conversations */}
          <div className="px-4 py-4 hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mr-4 flex-shrink-0"></div>
                <div className="absolute bottom-0 right-3 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">Alex Johnson</h3>
                  <span className="text-xs text-gray-500">1:20 PM</span>
                </div>
                <p className="text-sm text-gray-600 truncate">Thanks for the document review!</p>
              </div>
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center ml-2">
                <span className="text-xs text-white font-medium">3</span>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full mr-4 flex-shrink-0"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">Emma Wilson</h3>
                  <span className="text-xs text-gray-500">11:30 AM</span>
                </div>
                <p className="text-sm text-gray-600 truncate">See you at the team meeting</p>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full mr-4 flex-shrink-0"></div>
                <div className="absolute bottom-0 right-3 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">Michael Park</h3>
                  <span className="text-xs text-gray-500">Yesterday</span>
                </div>
                <p className="text-sm text-gray-600 truncate">Great presentation today!</p>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mr-4 flex-shrink-0"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">Lisa Rodriguez</h3>
                  <span className="text-xs text-gray-500">Yesterday</span>
                </div>
                <p className="text-sm text-gray-600 truncate">Let's catch up soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-6 flex items-center">
          <div className="relative">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mr-4"></div>
            <div className="absolute bottom-0 right-3 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900">Sarah Chen</h1>
            <p className="text-sm text-green-500 font-medium">Active now</p>
          </div>
          <div className="flex space-x-2">
            <button className="p-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Date Separator */}
            <div className="flex justify-center">
              <span className="px-4 py-2 bg-white rounded-full text-xs text-gray-500 border border-gray-200">Today</span>
            </div>

            {/* Other person's message */}
            <div className="flex justify-start">
              <div className="flex max-w-xs lg:max-w-md">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                <div className="space-y-1">
                  <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
                    <p className="text-gray-900">Hey! How's your day going?</p>
                  </div>
                  <p className="text-xs text-gray-500 ml-3">2:30 PM</p>
                </div>
              </div>
            </div>

            {/* Own message */}
            <div className="flex justify-end">
              <div className="flex max-w-xs lg:max-w-md flex-row-reverse">
                <div className="space-y-1">
                  <div className="bg-blue-500 rounded-2xl rounded-br-md px-4 py-3 shadow-sm">
                    <p className="text-white">Pretty good! Just finished a big project. How about you?</p>
                  </div>
                  <p className="text-xs text-gray-500 mr-3 text-right">2:32 PM</p>
                </div>
              </div>
            </div>

            {/* Other person's message */}
            <div className="flex justify-start">
              <div className="flex max-w-xs lg:max-w-md">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                <div className="space-y-1">
                  <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
                    <p className="text-gray-900">That's awesome! Congratulations 🎉</p>
                  </div>
                  <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
                    <p className="text-gray-900">Want to celebrate with coffee?</p>
                  </div>
                  <p className="text-xs text-gray-500 ml-3">2:35 PM</p>
                </div>
              </div>
            </div>

            {/* Own message */}
            <div className="flex justify-end">
              <div className="flex max-w-xs lg:max-w-md flex-row-reverse">
                <div className="space-y-1">
                  <div className="bg-blue-500 rounded-2xl rounded-br-md px-4 py-3 shadow-sm">
                    <p className="text-white">Perfect! Let's meet at the coffee shop</p>
                  </div>
                  <div className="bg-blue-500 rounded-2xl rounded-br-md px-4 py-3 shadow-sm">
                    <p className="text-white">How about 4 PM?</p>
                  </div>
                  <p className="text-xs text-gray-500 mr-3 text-right">2:45 PM</p>
                </div>
              </div>
            </div>

            {/* Typing indicator */}
            <div className="flex justify-start">
              <div className="flex max-w-xs lg:max-w-md">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-4">
              <button className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
                <Plus className="w-5 h-5" />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full px-4 py-3 pr-16 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <button className="p-1 text-gray-500 hover:text-gray-700 rounded">
                    <Smile className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-gray-700 rounded">
                    <Image className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
                <Mic className="w-5 h-5" />
              </button>
              <button className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat