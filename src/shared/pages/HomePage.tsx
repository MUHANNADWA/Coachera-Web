import img from "../../assets/1.png";
import Meta from "../components/Meta";
import { Button } from "../components/form/Button";
import { useAppHook } from "../hooks/useAppHook";
import FAQAccordion from "../components/Faq";
import ContactUsSection from "../components/ContactUsSection";
import FeaturesSection from "../components/FeaturesSection";
import HighlightsSection from "../components/HighlightsSection";
import CategoriesSection from "../components/CategoriesSection";
import CoursesView from "../components/CoursesView";

export default function HomePage() {
  const { navigate, user } = useAppHook();

  return (
    <div className="alternate-sections">
      <Meta />

      {/* Welcome Section */}
      <section>
        <div className="py-20 px-6 h-full-s max-w-7xl gap-12 items-center mx-auto flex max-md:text-center ">
          <div className="flex-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Unlock Your Potential with{" "}
              <span className="text-primary">Coachera</span>
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              World-class content, expert mentors, and a global community to
              support your goals.
            </p>
            <div className="flex gap-4 max-md:justify-center">
              <Button
                variant="primary"
                onClick={() => navigate("/get-started")}
              >
                Get Started
              </Button>
              <Button variant="secondary" onClick={() => navigate("/courses")}>
                Browse Courses
              </Button>
            </div>
          </div>
          <div className="flex flex-1/2 justify-center max-md:hidden">
            <img
              src={img}
              alt="Learning Illustration"
              className="w-full max-w-lg md:max-w-xl transition-transform duration-300 ease-in-out hover:scale-[0.98]"
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section>
        <div className="relative h-[50vh] bg-fixed bg-center bg-cover flex items-center justify-center">
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Dive In?
            </h2>
            <p className="mt-3 text-lg md:text-xl">
              Start learning now, your journey awaits.
            </p>
            <Button
              variant="primary"
              className="flex justify-self-center mt-6"
              onClick={() => navigate("/courses")}
            >
              Browse Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <FeaturesSection />

      {/* Highlights */}
      <HighlightsSection />

      {/* Recommended Courses */}
      {user && <CoursesView variant="recommended" />}

      {/* Trending Courses */}
      <CoursesView variant="trending" />

      {/* Popular Courses */}
      <CoursesView variant="popular" />

      {/* Categories */}
      <CategoriesSection />

      {/* FAQ */}
      <FAQAccordion />

      {/* Contact Us */}
      <ContactUsSection />
    </div>
  );
}
