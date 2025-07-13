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

export const placeholderImage = (text: string) =>
  `https://placehold.co/300x200?text=${text}`;

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
