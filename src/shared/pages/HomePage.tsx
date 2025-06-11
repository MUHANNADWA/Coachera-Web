import { Link } from "react-router-dom";
import img from "../../assets/1.svg";
import CoursesPage from "../../features/courses/pages/CoursesPage";
import RichTextEditor from "../components/RichTextEditor";
import Meta from "../components/Meta";
export default function HomePage() {
  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 bg-white">
        <Meta />
        {/* Text Content */}
        <div className="max-w-xl mb-10 md:mb-0">
          <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">
            Best Learning Platform
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Expand your career opportunities with <br />{" "}
            <span className="text-primary">Learning</span>.
          </h1>
          <Link to="/get-started">
            <button className="bg-primary text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
              Get Started →
            </button>
          </Link>
        </div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <img src={img} alt="Student Illustration" className="w-7/12 h-01/2" />
        </div>
      </section>

      <section className="px-6 md:px-20 py-20 bg-white">
        {/* Text Content */}
        <div className="mb-10 md:mb-0">
          <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">
            Courses Categories
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 leading-tight">
            Expand your career opportunities with Learning
          </h1>
        </div>
        <CoursesPage />
      </section>

      <section className="px-6 md:px-20 py-20 bg-white">
        {/* Text Content */}
        <div className="mb-10 md:mb-0">
          <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">
            Courses Categories
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 leading-tight">
            Expand your career opportunities with Learning
          </h1>
        </div>
        <RichTextEditor />
      </section>
    </>
  );
}
