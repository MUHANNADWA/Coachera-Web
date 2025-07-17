import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className="text-primary-dark" />);
  }
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-primary-dark" />);
  }
  while (stars.length < 5) {
    stars.push(
      <FaRegStar key={`empty-${stars.length}`} className="text-primary-dark" />
    );
  }

  return stars;
};

// ---------------------------------------------------------------

import {
  PlayIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  UsersIcon,
  BookOpenIcon,
  UserIcon,
  LightBulbIcon,
  HandThumbUpIcon,
  RocketLaunchIcon,
} from "@heroicons/react/16/solid";
export const getMaterialIcon = (type: string) => {
  {
    if (type == "ARTICLE") return <DocumentTextIcon />;
    else if (type == "VIDEO") return <PlayIcon />;
    else return <ClipboardDocumentCheckIcon />;
  }
};

// ---------------------------------------------------------------

import { Course } from "../../../shared/types/types";

export const getBreadcrumbs = (course: Course, currentMaterialId: Number) => {
  const paths = location.pathname.split("/").filter(Boolean);
  const breadcrumbs = [{ label: "Home", path: "/" }];
  const module = course?.modules.find((w) => w.id === Number(paths[2]));
  const material = module?.sections
    .flatMap((s) => s.materials)
    .find((v) => v.id === currentMaterialId);

  if (course) {
    breadcrumbs.push({
      label: course.title,
      path: `/courses/${course.id}`,
    });
    if (module) {
      breadcrumbs.push({
        label: module.title,
        path: "#",
      });
      if (material) {
        breadcrumbs.push({
          label: material.title,
          path: "#",
        });
      }
    }
  }

  return breadcrumbs;
};

// ---------------------------------------------------------------

const myImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=906&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?fm=jpg&q=60&w=3000",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?fm=jpg&q=60&w=3000",
  "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?fm=jpg&q=60&w=3000",
  "https://images.unsplash.com/photo-1657819307873-c57e45f65f6d?fm=jpg&q=60&w=3000",
  "https://images.unsplash.com/photo-1720411201674-a9ed01606298?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1714976326729-1ffbddfc1c2e?q=80&w=1032&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
];

export const placeholderImage = (text: string) =>
  myImages[Math.floor(Math.random() * 9)];
// `https://placehold.co/300x200?text=${text}`;

// ---------------------------------------------------------------

export const SORT_FIELDS = [
  { value: "title", label: "Title" },
  { value: "createdAt", label: "Time Created" },
  { value: "updatedAt", label: "Time Updated" },
  { value: "durationHours", label: "Duration Hours" },
  { value: "price", label: "Price" },
  { value: "rating", label: "Rating" },
];

export const SORT_DIRECTION_FIELDS = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
];

export const ENTITY_TYPES = [
  { value: "skills", label: "Skills" },
  { value: "learning-paths", label: "Learning Paths" },
  { value: "courses", label: "Courses" },
  { value: "reviews", label: "Reviews" },
  { value: "certificates", label: "Certificates" },
  { value: "materials", label: "Materials" },
  { value: "questions", label: "Questions" },
  { value: "students", label: "Students" },
  { value: "categories", label: "Categories" },
  { value: "quizzes", label: "Quizzes" },
  { value: "sections", label: "Sections" },
  { value: "instructors", label: "Instructors" },
];

// ----------------------------------------------------

import * as h from "@heroicons/react/24/outline";

export const categories = [
  {
    id: 1,
    name: "Health",
    icon: h.HeartIcon,
    description: "Wellness, fitness, nutrition, and more.",
  },
  {
    id: 2,
    name: "Computer Science",
    icon: h.ComputerDesktopIcon,
    description: "Programming, algorithms, and data structures.",
  },
  {
    id: 3,
    name: "Sport",
    icon: h.RadioIcon,
    description: "Athletics, coaching, and sports science.",
  },
  {
    id: 4,
    name: "Art",
    icon: h.PaintBrushIcon,
    description: "Design, painting, music, and creativity.",
  },
  {
    id: 5,
    name: "Business",
    icon: h.BriefcaseIcon,
    description: "Entrepreneurship, management, and marketing.",
  },
  {
    id: 6,
    name: "Languages",
    icon: h.LanguageIcon,
    description: "Learn new languages and cultures.",
  },
];

// ----------------------------------------------------
export const myFeatures = [
  {
    icon: UserIcon,
    title: "Expert Instructors",
    text: "Learn from real-world professionals.",
  },
  {
    icon: BookOpenIcon,
    title: "Diverse Courses",
    text: "Topics for every learner.",
  },
  {
    icon: UsersIcon,
    title: "Global Community",
    text: "Learn with others around the world.",
  },
  {
    icon: AcademicCapIcon,
    title: "Certificates",
    text: "Showcase your progress.",
  },
];

// --------------------------------------------------------

export const highlights = [
  {
    icon: LightBulbIcon,
    title: "Interactive Lessons",
    text: "Quizzes, projects, and real-world tasks.",
  },
  {
    icon: HandThumbUpIcon,
    title: "Personalized Support",
    text: "Mentorship and community support.",
  },
  {
    icon: RocketLaunchIcon,
    title: "Career Advancement",
    text: "Grow and achieve your professional goals.",
  },
];
