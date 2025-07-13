import { useState } from "react";
import {
  VideoCameraIcon,
  ClipboardDocumentListIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import { useAppHook } from "../../../shared/hooks/useAppHook";
import { PROFILE_IMAGE } from "../../../constants/constants";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function StudentProfilePage() {
  const { user } = useAppHook();

  const [student] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar: PROFILE_IMAGE,
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
          className="w-24 h-24 rounded-2xl"
        />
        <div>
          <h1 className="text-3xl font-bold">{user?.username}</h1>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>
    </div>
  );
}
