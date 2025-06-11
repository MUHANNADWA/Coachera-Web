import { useState } from "react";
import { Tab } from "@headlessui/react";
import {
  VideoCameraIcon,
  ClipboardDocumentListIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import { useAppHook } from "../../../shared/hooks/useAppHook";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function StudentProfilePage() {
  const { user } = useAppHook();

  const [student] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    enrolledCourses: [
      { id: 1, title: "React Fundamentals", progress: "75%" },
      { id: 2, title: "Spring Boot Essentials", progress: "40%" },
    ],
    completedAssignments: [
      { title: "React Hooks Quiz", date: "2025-04-20" },
      { title: "Java Basics Task", date: "2025-04-15" },
    ],
    discussions: [
      { topic: "How to use useEffect?", date: "2025-05-12" },
      { topic: "Best practices for REST APIs", date: "2025-05-10" },
    ],
    videosWatched: [
      { title: "Intro to Redux", duration: "12:30" },
      { title: "Java Controllers", duration: "08:45" },
    ],
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center space-x-6">
        <img
          src={student.avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold">{user?.username}</h1>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-2 mt-8 border-b pb-2">
          <Tab
            className={({ selected }) =>
              classNames(
                "flex items-center px-4 py-2 text-sm font-medium rounded",
                selected
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              )
            }>
            <VideoCameraIcon className="h-4 w-4 mr-1" /> Courses
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "flex items-center px-4 py-2 text-sm font-medium rounded",
                selected
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              )
            }>
            <ClipboardDocumentListIcon className="h-4 w-4 mr-1" /> Assignments
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "flex items-center px-4 py-2 text-sm font-medium rounded",
                selected
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              )
            }>
            <ChatBubbleOvalLeftIcon className="h-4 w-4 mr-1" /> Discussions
          </Tab>
        </Tab.List>

        <Tab.Panels className="mt-4">
          <Tab.Panel>
            <ul className="space-y-3">
              {student.enrolledCourses.map((course) => (
                <li key={course.id} className="p-4 border rounded shadow-sm">
                  <div className="font-semibold">{course.title}</div>
                  <div className="text-sm text-gray-500">
                    Progress: {course.progress}
                  </div>
                </li>
              ))}
            </ul>
          </Tab.Panel>

          <Tab.Panel>
            <ul className="space-y-3">
              {student.completedAssignments.map((assignment, idx) => (
                <li key={idx} className="p-4 border rounded shadow-sm">
                  <div className="font-semibold">{assignment.title}</div>
                  <div className="text-sm text-gray-500">
                    Submitted on: {assignment.date}
                  </div>
                </li>
              ))}
            </ul>
          </Tab.Panel>

          <Tab.Panel>
            <ul className="space-y-3">
              {student.discussions.map((post, idx) => (
                <li key={idx} className="p-4 border rounded shadow-sm">
                  <div className="font-semibold">{post.topic}</div>
                  <div className="text-sm text-gray-500">
                    Posted on: {post.date}
                  </div>
                </li>
              ))}
            </ul>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
