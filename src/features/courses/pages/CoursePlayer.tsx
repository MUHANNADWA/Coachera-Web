import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { courses } from '../../../shared/data/sampleData'
import ReactPlayer from 'react-player'
import { ChevronLeftIcon, DocumentTextIcon, ListBulletIcon } from '@heroicons/react/24/outline'

export default function CoursePlayer() {
  const { id } = useParams()
  const course = courses.find(c => c.id === Number(id))
  const [activeTab, setActiveTab] = useState('content')
  const [currentVideo, setCurrentVideo] = useState(0)

  if (!course) return <div>Course not found</div>

  const modules = [
    {
      id: 1,
      title: 'Introduction',
      videos: [
        { id: 1, title: 'Welcome to the Course', duration: '2:45', url: 'https://youtu.be/dQw4w9WgXcQ' },
        { id: 2, title: 'Course Overview', duration: '4:30', url: 'https://youtu.be/dQw4w9WgXcQ' }
      ]
    },
    {
      id: 2,
      title: 'Getting Started',
      videos: [
        { id: 3, title: 'Installation Guide', duration: '6:15', url: 'https://youtu.be/dQw4w9WgXcQ' },
        { id: 4, title: 'First Project Setup', duration: '8:20', url: 'https://youtu.be/dQw4w9WgXcQ' }
      ]
    }
  ]

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex items-center">
          <button className="mr-4 text-gray-600 hover:text-gray-900">
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold">{course.title}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video Player */}
        <div className="flex-1 bg-black flex flex-col">
          <div className="flex-1 relative">
            <ReactPlayer
              url={modules[0].videos[currentVideo].url}
              width="100%"
              height="100%"
              controls
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
          </div>
          
          {/* Video Info */}
          <div className="bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold">{modules[0].videos[currentVideo].title}</h2>
            <div className="flex space-x-4 mt-2">
              <button 
                className={`flex items-center px-3 py-1 rounded ${activeTab === 'content' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('content')}
              >
                <DocumentTextIcon className="h-4 w-4 mr-1" />
                Content
              </button>
              <button 
                className={`flex items-center px-3 py-1 rounded ${activeTab === 'resources' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('resources')}
              >
                <ListBulletIcon className="h-4 w-4 mr-1" />
                Resources
              </button>
            </div>
          </div>
        </div>

        {/* Course Content Sidebar */}
        <div className="w-80 border-l overflow-y-auto">
          <div className="p-4 sticky top-0 bg-white border-b z-10">
            <h3 className="font-semibold">Course Content</h3>
          </div>
          
          {modules.map(module => (
            <div key={module.id} className="border-b">
              <div className="p-4 bg-gray-50">
                <h4 className="font-medium">{module.title}</h4>
              </div>
              
              <ul>
                {module.videos.map((video, index) => (
                  <li 
                    key={video.id}
                    className={`p-4 border-t cursor-pointer hover:bg-gray-50 ${currentVideo === index ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}
                    onClick={() => setCurrentVideo(index)}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                        currentVideo === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className={`text-sm ${currentVideo === index ? 'font-medium text-blue-600' : 'text-gray-700'}`}>
                          {video.title}
                        </p>
                        <p className="text-xs text-gray-500">{video.duration}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}