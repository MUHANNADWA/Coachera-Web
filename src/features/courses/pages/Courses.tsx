import { useState, useEffect } from 'react'
import CourseCard from '../components/CourseCard'
import { Course } from '../../../shared/types/types'
import axios from 'axios'

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://api.example.com/courses')
        setCourses(response.data)
      } catch (error) {
        console.error('Error fetching courses:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCourses()
  }, [])

  if (loading) return <div className="text-center py-10">Loading...</div>

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">All Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}