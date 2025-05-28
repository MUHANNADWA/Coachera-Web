import { useParams } from 'react-router-dom'
import { CheckBadgeIcon, ClockIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export default function CourseDetail() {
  const { id } = useParams();
  const { data } = useGetCourseDetailsQuery(Number(id));
  const course: Course = data?.data;

  if (!course) return <Loader />;

  return (
    <div className="container mx-auto py-8 px-4">
      <Meta title={course.title} description={course.description} />
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-6">{course.instructor}</p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-sm">
                <ClockIcon className="h-5 w-5 mr-1" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center text-sm">
                <ChartBarIcon className="h-5 w-5 mr-1" />
                <span>{course.level}</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckBadgeIcon className="h-5 w-5 mr-1" />
                <span>Certificate</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">About This Course</h2>
              <p className="text-gray-700">{course.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">What You'll Learn</h2>
              <ul className="list-['✓'] pl-5 space-y-2">
                <li>Master the fundamentals of the subject</li>
                <li>Build real-world projects</li>
                <li>Get certified upon completion</li>
                <li>Join a community of learners</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Skills You'll gain</h2>
              <ul className="space-y-2">
                <li className="px-3 py-1.5 m-1 inline-block bg-primary text-white rounded-2xl text-xs">Programming</li>
                <li className="px-3 py-1.5 m-1 inline-block bg-primary text-white rounded-2xl text-xs">React</li>
                <li className="px-3 py-1.5 m-1 inline-block bg-primary text-white rounded-2xl text-xs">Web Design</li>
                <li className="px-3 py-1.5 m-1 inline-block bg-primary text-white rounded-2xl text-xs">Javascript</li>
                <li className="px-3 py-1.5 m-1 inline-block bg-primary text-white rounded-2xl text-xs">Frontend</li>
                <li className="px-3 py-1.5 m-1 inline-block bg-primary text-white rounded-2xl text-xs">API</li>
                <li className="px-3 py-1.5 m-1 inline-block bg-primary text-white rounded-2xl text-xs">Jest</li>
                <li className="px-3 py-1.5 m-1 inline-block bg-primary text-white rounded-2xl text-xs">Typescript</li>
                <li className="px-3 py-1.5 m-1 inline-block bg-primary text-white rounded-2xl text-xs">Redux</li>
              </ul>
            </div>
            <CourseModules
              modules={[
                {
                  title: 'Introduction to UX and UI design',
                  duration: '3 hours to complete',
                  description: 'Learn what constitutes successful UI and evaluate existing interfaces for quality.',
                  videos: [
                    { title: 'Introduction to UX', duration: '3' },
                    { title: 'UX vs UI', duration: '5' }
                  ],
                  readings: [
                    { title: 'Read: Design Principles', duration: '7' },
                    { title: 'Read: User-Centered Design', duration: '6' }
                  ],
                  assignments: [
                    { title: 'Assignment: Evaluate a UI', duration: '10' }
                  ],
                  prompts: [
                    { title: 'Discussion: What is good UX?', duration: '4' }
                  ]
                },
                {
                  title: 'Introduction to UX and UI design',
                  duration: '3 hours to complete',
                  description: 'Learn what constitutes successful UI and evaluate existing interfaces for quality.',
                  videos: [
                    { title: 'Introduction to UX', duration: '3' },
                    { title: 'UX vs UI', duration: '5' }
                  ],
                  readings: [
                    { title: 'Read: Design Principles', duration: '7' },
                    { title: 'Read: User-Centered Design', duration: '6' }
                  ],
                  assignments: [
                    { title: 'Assignment: Evaluate a UI', duration: '10' }
                  ],
                  prompts: [
                    { title: 'Discussion: What is good UX?', duration: '4' }
                  ]
                }
              ]}
            />

          </div>

          <div className="md:w-1/3 bg-gray-50 p-6">
            <div className="sticky top-4">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-blue">${course.price}</span>
                  <span className="flex items-center bg-yellow-100 px-2 py-1 rounded text-sm">
                    ★ {course.rating}
                  </span>
                </div>
                <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-500-700 transition mb-2">
                  Enroll Now
                </button>
                <button className="w-full border border-blue text-blue py-3 rounded-lg hover:bg-blue-500-50 transition">
                  Add to Wishlist
                </button>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-bold mb-2">This Course Includes:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckBadgeIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>10 hours on-demand video</span>
                  </li>
                  <li className="flex items-center">
                    <CheckBadgeIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>5 articles</span>
                  </li>
                  <li className="flex items-center">
                    <CheckBadgeIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>Downloadable resources</span>
                  </li>
                  <li className="flex items-center">
                    <CheckBadgeIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>Certificate of completion</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import {
  PlayCircleIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  ChatBubbleOvalLeftIcon,
} from '@heroicons/react/24/outline'
import { useGetCourseDetailsQuery } from '../../../shared/slices/coursesApiSlice'
import Loader from '../../../shared/components/Loader';
import Meta from '../../../shared/components/Meta';
import { Course } from '../../../shared/types/types';

type Item = { title: string; duration: string }

type Module = {
  title: string
  duration: string
  description: string
  videos: Item[]
  readings: Item[]
  assignments: Item[]
  prompts: Item[]
}

type CourseModulesProps = {
  modules: Module[]
}

export function CourseModules({ modules }: CourseModulesProps) {
  return (
    <div className="space-y-6 border rounded-lg shadow p-6 bg-white">
      {modules.map((mod, index) => (
        <ModuleCard key={index} {...mod} />
      ))}
    </div>
  )
}

function ModuleCard({
  title,
  duration,
  description,
  videos,
  readings,
  assignments,
  prompts,
}: Module) {
  const [expanded, setExpanded] = useState(false)

  const renderList = (items: Item[], label: string, Icon: any) =>
    items.length > 0 && (
      <div className="mt-4">
        <h4 className="flex items-center font-medium text-gray-700 mb-2">
          <Icon className="h-5 w-5 mr-2" />
          {label} • {items.length} items • {totalDuration(items)} minutes
        </h4>
        <ul className="ml-7 space-y-2 text-sm text-gray-700 list-disc">
          {items.map((item, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{item.title}</span>
              <span className="text-gray-500">{item.duration} min</span>
            </li>
          ))}
        </ul>
      </div>
    )

  return (
    <div className="">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-gray-500">Module • {duration}</p>
          {expanded && <p className="mt-3 text-gray-700">{description}</p>}
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          {expanded ? 'Hide details' : 'Show module details'}
        </button>
      </div>

      {expanded && (
        <div className="mt-6">
          {renderList(videos, 'Videos', PlayCircleIcon)}
          {renderList(readings, 'Readings', DocumentTextIcon)}
          {renderList(assignments, 'Assignments', ClipboardDocumentListIcon)}
          {renderList(prompts, 'Discussion Prompts', ChatBubbleOvalLeftIcon)}
        </div>
      )}
      <hr />
    </div>
  )
}

function totalDuration(items: Item[]): number {
  return items.reduce((sum, item) => sum + parseInt(item.duration), 0)
}
