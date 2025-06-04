import { Course } from '../../../shared/types/types'
import { FaRegHeart } from 'react-icons/fa'
import renderStars from '../utils/RenderStars'
import { Link } from 'react-router-dom'

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link to={`/courses/${course.id}`} className="bg-white rounded-2xl relative shadow-sm hover:shadow-lg transition-all hover:scale-105 duration-300 w-full overflow-hidden">
      <img
        src={course.image ?? `https://placehold.co/300x200?text=${course.title}`}
        alt={course.title}
        className="h-40 w-full object-cover rounded-t-2xl"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">{course.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{course.instructor}</p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-emerald-600 font-bold text-lg">${course.price ?? 0}</span>
          <button className="text-emerald-400 hover:text-emerald-600">
            <FaRegHeart size={18} />
          </button>
        </div>

        <div className="flex items-center mt-2 text-sm">
          <span className="text-gray-800 font-semibold mr-1">
            {course.rating?.toFixed(1) ?? '0.0'}
          </span>
          <div className="flex space-x-0.5">{renderStars(course.rating ?? 0)}</div>
          <span className="ml-2 text-gray-500">({course.ratingCount ?? 0})</span>
        </div>
      </div>
      <div>
        <span className="text-sm absolute  top-2 right-2 text-primary bg-primary-light border-primary border-1 p-2 rounded-2xl">{course.categories?.[0]}</span>
      </div>
    </Link>
  )
}
