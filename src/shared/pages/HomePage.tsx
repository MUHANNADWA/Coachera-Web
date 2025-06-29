import img from "../../assets/1.svg";
import Meta from "../components/Meta";
import { Button } from "../components/Button";
import { useAppHook } from "../hooks/useAppHook";
export default function HomePage() {
  const { navigate } = useAppHook();

  return (
    <div>
      <section className="h-screen bg-gradient-to-tr from-[#0f766e] via-[#0e9488] to-[#22d3ee] text-white flex items-center mt-[-100px] px-6 md:px-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Boost your <span className="text-white/90">skillset</span> with us
            </h1>
            <p className="mb-6 text-white/80">
              The art of creating joy: how to use empathy and creativity to
              design customer experiences that bring happiness.
            </p>
            <div className="space-x-4">
              <Button variant="primaryInverted" className="inline">
                Get Started
              </Button>
              <Button variant="secondaryInverted" className="inline">
                Learn More
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {/* Mock cards */}
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
              <p className="text-white">React Development</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
              <p className="text-white">50+ Instructors</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
              <p className="text-white">Audio Session</p>
            </div>
          </div>
        </div>
      </section>

      <section className="h-full-s flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20">
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
          <Button variant="primary" onClick={() => navigate("/get-started")}>
            Get Started →
          </Button>
        </div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <img src={img} alt="Student Illustration" className="w-7/12 h-01/2" />
        </div>
      </section>

      <section className="px-6 md:px-20 py-20 bg-white">
        <div className="mb-10 md:mb-0">
          <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">
            Courses Categories
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 leading-tight">
            Expand your career opportunities with Learning
          </h1>
        </div>
      </section>
    </div>
  );
}
