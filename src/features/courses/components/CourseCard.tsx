import { Course } from "../../../shared/types/types";
import { placeholderImage, renderStars } from "../utils/Utils";
import { Button } from "../../../shared/components/Button";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useState } from "react";
import { useAppHook } from "../../../shared/hooks/useAppHook";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const [isFav, setFav] = useState(false);
  const { navigate } = useAppHook();

  return (
    <div className="cursor-pointer bg-white rounded-2xl relative hover:shadow-md transition-all hover:scale-105 duration-300 w-full border border-gray-300">
      <img
        onClick={() => navigate(`/courses/${course.id}`)}
        src={course.image ?? placeholderImage(course.title)}
        alt={course.title}
        className="h-40 w-full object-cover rounded-t-2xl"
      />
      <div className="p-4" onClick={() => navigate(`/courses/${course.id}`)}>
        <h3 className="font-semibold text-lg text-gray-800">{course.title}</h3>
        <p className="flex text-sm text-gray-500 mt-1 gap-1">
          {course.instructor ?? "Abo Mahmoud Org"}
        </p>

        <div className="text-emerald-600 font-bold text-lg mt-2">
          ${course.price ?? 0}
        </div>

        <div className="flex items-center justify-between mt-2 text-sm">
          <div className="flex gap-2 items-center text-gray-800 font-semibold">
            {course.rating?.toFixed(1) ?? "0.0"}
            <span className="flex gap-0.5">
              {renderStars(course.rating ?? 0)}
            </span>
            <span className="text-gray-500">({course.ratingCount ?? 0})</span>
          </div>
        </div>
      </div>
      <div>
        <span
          onClick={() => navigate(`/search/${course.categories?.[0]}`)}
          className="text-sm absolute top-2 right-2 text-primary bg-primary-light border-primary border-1 p-2 rounded-2xl">
          {course.categories?.[0]}
        </span>
        <Button
          type="button"
          onClick={() => setFav(!isFav)}
          className="inline absolute bottom-4 right-4 text-primary hover:text-emerald-600">
          {!isFav ? (
            <IconHeart
              size={36}
              className="bg-primary-light p-2 rounded-full"
            />
          ) : (
            <IconHeartFilled
              size={36}
              className="bg-primary-light p-2 rounded-full"
            />
          )}
        </Button>
      </div>
    </div>
  );
}
