import { Course } from '../../../shared/types/types'

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={course.image} 
        alt={course.title} 
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{course.instructor}</p>
        <div className="flex justify-between items-center">
          <span className="text-blue font-bold">${course.price}</span>
          <span className="text-yellow-500">★ {course?.rating ?? 0}</span>
        </div>
      </div>
    </div>
  )
}