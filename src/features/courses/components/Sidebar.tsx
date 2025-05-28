import {
  VideoCameraIcon,
  DocumentTextIcon,
  BookOpenIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import { Module } from '../../../shared/types/types';
import { CurrentVideo } from '../types';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { toggleSidebar } from '../courseSidebarSlice';
import { useState } from 'react';

interface SidebarProps {
  module: Module;
  currentVideo: CurrentVideo;
  setCurrentVideo: (currentVideo: CurrentVideo) => void;
}

export default function Sidebar({ module, currentVideo, setCurrentVideo }: SidebarProps) {
  const dispatch = useAppDispatch();
  const toggleCollapse = () => dispatch(toggleSidebar());
  const { collapsed } = useAppSelector((state) => state.sidebar);

  const [collapsedSections, setCollapsedSections] = useState<Set<number>>(new Set());
  const toggleSectionCollapse = (sectionId: number) => {
    setCollapsedSections(prev => {
      const newSet = new Set(prev);
      newSet.has(sectionId) ?
        newSet.delete(sectionId) :
        newSet.add(sectionId);
      return newSet;
    });
  };

  const isCurrentVideo = (sectionId: number, videoId: number) =>
    sectionId === currentVideo.sectionId && videoId === currentVideo.videoId;

  return (
    <div className={`h-full pl-8 pr-4 py-4 top-0 left-0 shadow-sm transition-all duration-300 overflow-x-hidden ${collapsed ? 'overflow-y-hidden w-12' : 'overflow-y-scroll w-70'}`}>
      <div className={`flex items-center justify-between transition-all duration-300 ${!collapsed ? 'p-4' : 'ml-[-20px]'}`}>
        {!collapsed && <h1 className="font-bold">{module.title}</h1>}
        <button onClick={toggleCollapse} className="text-gray-500 hover:text-gray-700">
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      {/* Course Content */}
      {!collapsed && module.sections.map((section) => (
        <div key={section.id}>
          <button onClick={() => toggleSectionCollapse(section.id)} className="cursor-pointer w-full">
            <h4 className="hover:bg-primary-light font-semibold p-2"><hr />{section.title}<hr /></h4>
          </button>

          {!collapsedSections.has(section.id) && (
            <ul>
              {section.videos.map((video) => (
                <li
                  key={video.id}
                  className={`p-4 cursor-pointer hover:bg-primary-light ${isCurrentVideo(section.id, video.id) ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}
                  onClick={() => setCurrentVideo({ sectionId: section.id, videoId: video.id })}
                >
                  <div className="flex items-center relative">
                    <div className={`w-4 h-4 flex items-center justify-center mr-5 before:absolute before:top-[3] before:left-[-10] before:w-7 before:h-7 before:rounded-lg [&>*:first-child]:z-45 ${isCurrentVideo(section.id, video.id) ? 'before:bg-blue-500 text-white' : 'before:bg-gray-200 text-gray-600'}`}>
                      {Math.random() > 0.5 ? <DocumentTextIcon /> : Math.random() > 0.5 ? <VideoCameraIcon /> : <BookOpenIcon />}
                    </div>
                    <div>
                      <p className={`text-sm ${isCurrentVideo(section.id, video.id) ? 'font-medium text-blue-600' : 'text-gray-700'}`}>{video.title}</p>
                      <p className="text-xs text-gray-500">{video.duration}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}