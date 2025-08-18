import { useAppHook } from "../../../shared/hooks/useAppHook";
import { PROFILE_IMAGE } from "../../../constants/constants";
import CourseCard from "../../courses/components/courseCard/CourseCard";
import { Button } from "../../../shared/components/form/Button";
import { Course } from "../../../shared/types/types";

export default function ProfilePage() {
  const { user, navigate, wishlistCourses, enrolledCourses } = useAppHook();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Profile Header */}
      <section className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6 mb-10">
        <img
          src={PROFILE_IMAGE}
          alt={user?.username ? `${user.username}'s avatar` : "Avatar"}
          className="w-24 h-24 rounded-2xl shadow object-cover"
          onError={(e) => (e.currentTarget.src = PROFILE_IMAGE)}
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold">{user?.username ?? "User"}</h1>
          <p className="text-gray-500">{user?.email ?? "No email"}</p>
          <Button
            variant="secondary"
            className="mt-3"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </Button>
        </div>
      </section>

      {/* Learning Progress */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Currently Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course: Course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Favorites Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Favorites</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistCourses.map((course: Course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Career CTA */}
      <section className="bg-white rounded-2xl shadow-md px-8 py-12 text-center">
        <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">
          Course Categories
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">
          Expand your career opportunities with Learning
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Explore a wide variety of courses designed to help you grow your
          skills and achieve your goals.
        </p>
        <Button
          variant="primary"
          className="rounded-xl shadow-md hover:scale-105 transition-transform"
          onClick={() => navigate("/courses")}
        >
          Browse Courses
        </Button>
      </section>
    </div>
  );
}
