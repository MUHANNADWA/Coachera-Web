import img from "../../assets/1.svg";
import Meta from "../components/Meta";
import { Button } from "../components/Button";
import { useAppHook } from "../hooks/useAppHook";
import {
  IconUserStar,
  IconBook2,
  IconUsersGroup,
  IconCertificate,
  IconBulb,
  IconHeartHandshake,
  IconRocket,
} from "@tabler/icons-react";

export default function HomePage() {
  const { navigate } = useAppHook();

  return (
    <div>
      <Meta />
      {/* Hero Section */}
      <section className="min-h-[80vh] bg-white text-gray-900 flex items-center px-6 md:px-20 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center w-full">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Unlock Your Potential with{" "}
              <span className="text-primary">Coachera</span>
            </h1>
            <p className="mb-8 text-gray-700 text-lg md:text-xl">
              Discover world-class courses, expert instructors, and a vibrant
              community. Start your learning journey today and achieve your
              goals with us.
            </p>
            <div className="space-x-4">
              <Button
                variant="primary"
                className="inline"
                onClick={() => navigate("/get-started")}>
                Get Started
              </Button>
              <Button
                variant="secondary"
                className="inline"
                onClick={() => navigate("/courses")}>
                Browse Courses
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={img}
              alt="Learning Illustration"
              className="w-10/12 md:w-8/12"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <span className="bg-primary/10 text-primary rounded-2xl p-4 mb-4">
                <IconUserStar size={36} />
              </span>
              <h3 className="font-semibold text-lg mb-2">Expert Instructors</h3>
              <p className="text-gray-500 text-sm">
                Learn from industry leaders and passionate educators.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="bg-primary/10 text-primary rounded-2xl p-4 mb-4">
                <IconBook2 size={36} />
              </span>
              <h3 className="font-semibold text-lg mb-2">Diverse Courses</h3>
              <p className="text-gray-500 text-sm">
                Explore a wide range of topics and skills for every learner.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="bg-primary/10 text-primary rounded-2xl p-4 mb-4">
                <IconUsersGroup size={36} />
              </span>
              <h3 className="font-semibold text-lg mb-2">Global Community</h3>
              <p className="text-gray-500 text-sm">
                Join a supportive network of learners and professionals.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="bg-primary/10 text-primary rounded-2xl p-4 mb-4">
                <IconCertificate size={36} />
              </span>
              <h3 className="font-semibold text-lg mb-2">Certificates</h3>
              <p className="text-gray-500 text-sm">
                Earn certificates to showcase your achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights / Categories Section */}
      <section className="bg-gray-50 py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">
            Why Choose Coachera?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Empowering You to Succeed
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform is designed to help you learn, grow, and connect.
            Whether you're upskilling for your career or exploring new
            interests, Coachera LMS is your trusted partner in lifelong
            learning.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="card p-6 flex flex-col items-center">
            <span className="text-primary mb-4">
              <IconBulb size={32} />
            </span>
            <h4 className="font-semibold text-lg mb-2">Interactive Lessons</h4>
            <p className="text-gray-500 text-sm text-center">
              Engage with hands-on projects, quizzes, and real-world scenarios.
            </p>
          </div>
          <div className="card p-6 flex flex-col items-center">
            <span className="text-primary mb-4">
              <IconHeartHandshake size={32} />
            </span>
            <h4 className="font-semibold text-lg mb-2">Personalized Support</h4>
            <p className="text-gray-500 text-sm text-center">
              Get guidance from mentors and connect with peers in our forums.
            </p>
          </div>
          <div className="card p-6 flex flex-col items-center">
            <span className="text-primary mb-4">
              <IconRocket size={32} />
            </span>
            <h4 className="font-semibold text-lg mb-2">Career Advancement</h4>
            <p className="text-gray-500 text-sm text-center">
              Access resources and tools to help you land your dream job.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
