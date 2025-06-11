import { courses } from "../../../shared/data/sampleData";
import { Course } from "../../../shared/types/types";
import CourseCard from "../../courses/components/CourseCard";

export default function DashboardPage() {
  const enrolledCourses = courses.slice(0, 2);
  const wishlistCourses = courses.slice(2, 4);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">My Learning DashboardPage</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Currently Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses.map((course: Course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md p-4 flex">
              <img
                src={course.image}
                alt={course.title}
                className="w-32 h-24 object-cover rounded mr-4"
              />
              <div>
                <h3 className="font-bold">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {course.instructor}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: "30%" }}></div>
                </div>
                <p className="text-sm mt-1">30% complete</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Wishlist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
