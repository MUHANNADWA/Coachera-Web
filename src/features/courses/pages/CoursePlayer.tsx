import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { courses } from '../../../shared/data/sampleData'
import { DocumentTextIcon, ListBulletIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import Sidebar from '../../../shared/components/Sidebar'
import Breadcrumb from '../../../shared/components/Breadcrumb'
import NotFound from '../../../shared/pages/NotFound'
import { Week } from '../../../shared/types/types'
import VideoPlayer from '../../../shared/components/VideoPlayer'

export default function CoursePlayer() {
  const { id } = useParams()
  const course = courses.find(c => c.id === Number(id))
  const [activeTab, setActiveTab] = useState('content')
  const [currentVideo, setCurrentVideo] = useState(0)

  const [collapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed')
    return saved === 'true'
  })

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', String(collapsed))
  }, [collapsed])

  if (!course) return <NotFound />

  const weeks: Week[] = [
    {
      id: 1,
      title: 'Introduction',
      sections: [{
        id: 1,
        title: 'section1',
        videos: [
          { id: 1, title: 'Welcome to the Course', duration: '2:45', url: 'https://eu3-proxy.yewtu.be/videoplayback?expire=1747946959&ei=bzkvaMvDHdmY6dsP0O3dyAY&ip=2001%3A470%3Ac8e7%3A29e7%3A8e66%3A2cf9%3Aaa3a%3A35a8&id=o-ACsaeNNAivPjVGuFNVIywpvgkuQ26BsdPX9PCoGhqAWY&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1747925359%2C&mh=du&mm=31%2C26&mn=sn-4g5ednkl%2Csn-5hnekn7s&ms=au%2Conr&mv=m&mvi=1&pl=48&rms=au%2Cau&initcwndbps=368750&bui=AecWEAaBDAp-DcbvOuOJ5ffGVKans5ldplyJePjcnOvWlPAP0s4AEp06KHc7f-wnwU0ZbGdhWGhP5oTW&spc=wk1kZttEKv_laTiNy71PzmErScRG1CV6KAlECPt8lTnxk9gGPkKeX3bWJ773KvfK4x_JKRnSmu4C3jvxYRfJGe8V&vprv=1&svpuc=1&mime=video%2Fmp4&ns=s7DoSEUKdP6RmwMONI3zkvMQ&rqh=1&gir=yes&clen=110839311&ratebypass=yes&dur=4803.883&lmt=1725395842223359&mt=1747925138&fvip=3&fexp=51355912&c=WEB&sefc=1&txp=4438434&n=hzd2MutQSM2GJA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRgIhALxlg9XXCnJ3-e6mYE7sEB3_ChmPj0uZhXminkYzgk5DAiEAq2BLfHL-Ur7tPBxKxuTun-sHf0VWSmiLzSLVFhnC-gw%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=ACuhMU0wRQIhAMNxKCNbaVctk9XC-Y8hw7vYciyGBszXb3dkRUsqHEBCAiBT_9WGRxZ5DByqeXz587R9A5e5kgsBIcHJiiBrF9igzw%3D%3D&pot=Mp4BfDDd0_a-NbJ8cl4BGUgcQxGhpz0UXteR220R8dQ6HHZ9p9ylRueK-45rTKDluvJvxHgUvZfFefdw76IK4kbrBMR5ok4-o17934GYj5zuZ8qL5JDvfW41ETzz9GL8tG93cm72rbUgdzzLGkiAN6Qv8cPLv4zAM6QJFxnAEqLkJNRdxafMnikNsollGU9vH8SPZ1MEGOlYVzMKk1MkJg8%3D&cver=2.20250222.10.00&alr=no&host=rr1---sn-4g5ednkl.googlevideo.com' },
          { id: 2, title: 'Course Introduction', duration: '2:45', url: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.mp4' },
          { id: 3, title: 'Course Overview', duration: '4:30', url: 'https://youtu.be/dQw4w9WgXcQ' }
        ]
      }],
    },
    {
      id: 2,
      title: 'Getting Started',
      sections: [{
        id: 1,
        title: 'section1',
        videos: [
          { id: 3, title: 'Installation Guide', duration: '6:15', url: 'https://youtu.be/dQw4w9WgXcQ' },
          { id: 4, title: 'First Project Setup', duration: '8:20', url: 'https://youtu.be/dQw4w9WgXcQ' }
        ]
      }]
    }
  ]

  const allVideos = weeks.flatMap(m => m.sections.flatMap(s => s.videos))
  const video = allVideos[currentVideo]

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        weeks={weeks}
        currentVideo={currentVideo}
        setCurrentVideo={setCurrentVideo}
        collapsed={collapsed}
        toggleCollapse={() => setSidebarCollapsed(prev => !prev)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col mx-8">
        {/* Header */}
        <div className="bg-white flex items-center my-4">
          <Breadcrumb items={getBreadcrumbs()} />
        </div>

        {/* Video Player */}
        <div className="relative w-full" style={{ paddingTop: '400px' }}>
          <VideoPlayer src={video.url} />
        </div>

        {/* Video Info Tabs */}
        <div className="bg-white m-4">
          <h1 className="text-2xl mb-4 font-semibold">{video.title}</h1>
          <hr />
          <div className="flex space-x-4 my-2">
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
            <button
              className={`flex items-center px-3 py-1 rounded ${activeTab === 'comments' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('comments')}
            >
              <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
              comments
            </button>
          </div>
          <hr />
        </div>
      </div>
    </div>
  )
}


const getBreadcrumbs = () => {
  const paths = location.pathname.split('/').filter(Boolean)
  const breadcrumbs = [{ label: 'Home', path: '/' }]

  const courseId = Number(paths[1])
  const lessonId = Number(paths[3])

  const course = courses.find(c => c.id === courseId)

  if (course) {
    breadcrumbs.push({
      label: course.title,
      path: `/courses/${course.id}`
    })

    const allWeeks = [
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

    const week = allWeeks.find(m =>
      m.videos.some(v => v.id === lessonId)
    )

    const video = week?.videos.find(v => v.id === lessonId)

    if (week) {
      breadcrumbs.push({
        label: week.title,
        path: ''
      })
    }

    if (video) {
      breadcrumbs.push({
        label: video.title,
        path: ''
      })
    }
  }

  return breadcrumbs
}
