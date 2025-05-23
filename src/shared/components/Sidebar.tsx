import {
  VideoCameraIcon,
  DocumentTextIcon,
  BookOpenIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import { Week } from '../types/types';

interface SidebarProps {
  collapsed: boolean;
  toggleCollapse: () => void;
  weeks: Week[];
  currentVideo: number;
  setCurrentVideo: (index: number) => void;
}

export default function Sidebar({ collapsed, toggleCollapse, weeks, currentVideo, setCurrentVideo }: SidebarProps) {

  return (
    <div className={`h-full bg-white pl-8 pr-4 py-4 top-0 left-0 shadow-sm transition-all duration-300 overflow-x-hidden ${collapsed ? 'overflow-y-hidden w-12' : 'overflow-y-scroll w-70'}`}>
      <div className={`flex items-center justify-between bg-white ${!collapsed && 'p-4'}`}>
        {!collapsed && <h1 className="font-bold">Week 1</h1>}
        <button onClick={toggleCollapse} className="text-gray-500 hover:text-gray-700">
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      {/* Course Content Sidebar */}
      <div className={`${collapsed && 'hidden'}`}>
        {weeks.map((week) => (
          <div key={week.id}>
            <h4 className="font-semibold p-2">{week.title}</h4>

            <ul>
              {week.sections.flatMap((section) => section.videos.map((video, index) => (
                <li
                  key={video.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${currentVideo === index ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}
                  onClick={() => setCurrentVideo(index)}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-3 ${currentVideo === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      {/* {index + 1} */}
                      {Math.random() > 0.5 ? <DocumentTextIcon /> : Math.random() > 0.5 ? <VideoCameraIcon /> : <BookOpenIcon />}
                    </div>
                    <div>
                      <p className={`text-sm ${currentVideo === index ? 'font-medium text-blue-600' : 'text-gray-700'}`}>{video.title}</p>
                      <p className="text-xs text-gray-500">{video.duration}</p>
                    </div>
                  </div>
                </li>
              )))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
