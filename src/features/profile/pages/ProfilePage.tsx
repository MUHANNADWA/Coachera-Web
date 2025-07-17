import { useAppHook } from "../../../shared/hooks/useAppHook";
import { PROFILE_IMAGE } from "../../../constants/constants";
import CourseCard from "../../courses/components/courseCard/CourseCard";
import {
  useGetCourseDetailsQuery,
  useGetEnrolledCoursesQuery,
} from "../../courses/apiSlices/coursesApiSlice";
import { useGetWishlistQuery } from "../../courses/apiSlices/wishlistApiSlice";
import { Course } from "../../../shared/types/types";
import { Button } from "../../../shared/components/Button";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
import { coursesApiSlice } from "../../courses/apiSlices/coursesApiSlice";
import { useDispatch } from "react-redux";

function EnrolledCourseCard({
  course,
  progress = 0,
}: {
  course: Course;
  progress?: number;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex hover:shadow-lg transition-shadow">
      <img
        src={course.image}
        alt={course.title}
        className="w-32 h-24 object-cover rounded-2xl mr-4"
        onError={(e) => (e.currentTarget.src = PROFILE_IMAGE)}
      />
      <div className="flex-1">
        <h3 className="font-bold text-lg mb-1">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
        <div className="w-full bg-gray-200 rounded-2xl h-2.5">
          <div
            className="bg-primary h-2.5 rounded-2xl transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-sm mt-1">{progress}% complete</p>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { user, navigate, dispatch } = useAppHook();

  const {
    data: enrolled,
    isLoading: enrolledLoading,
    isError: enrolledError,
  } = useGetEnrolledCoursesQuery({});

  const {
    data: wishlist,
    isLoading: wishlistLoading,
    isError: wishlistError,
  } = useGetWishlistQuery({});

  const enrolledCourses: Course[] = enrolled?.data ?? [];
  const [favCourses, setFavCourses] = useState<Course[]>([]);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!wishlist?.data) return;
      setFavLoading(true);
      try {
        const promises = wishlist.data.map((item: any) =>
          dispatch(
            coursesApiSlice.endpoints.getCourseDetails.initiate(item.courseId)
          ).unwrap()
        );
        const result = await Promise.all(promises);
        setFavCourses(result);
      } catch (err) {
        console.error("Failed to fetch favorite courses", err);
      } finally {
        setFavLoading(false);
      }
    };
    fetchFavorites();
  }, [wishlist, dispatch]);

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
            onClick={() => navigate("/edit-profile")}>
            Edit Profile
          </Button>
        </div>
      </section>

      {/* Learning Progress */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Currently Learning</h2>
        {enrolledLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} height={120} />
            ))}
          </div>
        ) : enrolledError ? (
          <p className="text-red-500">Failed to load enrolled courses.</p>
        ) : enrolledCourses.length === 0 ? (
          <div className="text-center text-gray-500">
            <img
              src="/empty-learning.svg"
              alt="No courses"
              className="mx-auto mb-4 w-32"
            />
            No enrolled courses found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map((course: Course) => (
              <EnrolledCourseCard
                key={course.id}
                course={course}
                progress={30}
              />
            ))}
          </div>
        )}
      </section>

      {/* Favorites Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Favorites</h2>
        {wishlistLoading || favLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} height={180} />
            ))}
          </div>
        ) : wishlistError ? (
          <p className="text-red-500">Failed to load wishlist.</p>
        ) : favCourses.length === 0 ? (
          <div className="text-center text-gray-500">
            <img
              src="/empty-favorites.svg"
              alt="No favorites"
              className="mx-auto mb-4 w-32"
            />
            You have no courses in your wishlist.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>

      {/* Career CTA */}
      <section className="bg-white rounded-2xl shadow-md px-8 py-12 text-center">
        <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">
          Course Categories
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
          Expand your career opportunities with Learning
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Explore a wide variety of courses designed to help you grow your
          skills and achieve your goals.
        </p>
        <Button
          variant="primary"
          className="rounded-xl shadow-md hover:scale-105 transition-transform"
          onClick={() => navigate("/courses")}>
          Browse Courses
        </Button>
      </section>
    </div>
  );
}
