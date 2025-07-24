import {
  AcademicCapIcon,
  UsersIcon,
  BookOpenIcon,
  UserIcon,
  LightBulbIcon,
  HandThumbUpIcon,
  RocketLaunchIcon,
  InformationCircleIcon,
  LockClosedIcon,
  BellIcon,
  WalletIcon,
  ArrowTopRightOnSquareIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  HeartIcon,
  LanguageIcon,
  PaintBrushIcon,
  PhotoIcon,
  RadioIcon,
  UserPlusIcon,
  DevicePhoneMobileIcon,
  XMarkIcon,
  UserGroupIcon,
  ClockIcon,
  EnvelopeIcon,
  CreditCardIcon,
  WrenchScrewdriverIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import { Course } from "../../../shared/types/types";

import {
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  PlayIcon,
} from "@heroicons/react/16/solid";

// ------------------------------------------------------

export const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className="text-yellow-700" />);
  }
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-700" />);
  }
  while (stars.length < 5) {
    stars.push(
      <FaRegStar key={`empty-${stars.length}`} className="text-yellow-700" />
    );
  }

  return stars;
};

// ---------------------------------------------------------------

export const getMaterialIcon = (type: string) => {
  {
    if (type == "ARTICLE") return <DocumentTextIcon />;
    else if (type == "VIDEO") return <PlayIcon />;
    else return <ClipboardDocumentCheckIcon />;
  }
};

// ---------------------------------------------------------------

export const getBreadcrumbs = (course: Course, currentMaterialId: Number) => {
  const paths = location.pathname.split("/").filter(Boolean);
  const breadcrumbs = [{ label: "Home", path: "/" }];
  const module = course?.modules.find((w) => w.id === Number(paths[2]));
  const material = module?.sections
    .flatMap((s) => s.materials)
    .find((v) => v.id === currentMaterialId);

  if (course) {
    breadcrumbs.push({
      label: course.title,
      path: `/courses/${course.id}`,
    });
    if (module) {
      breadcrumbs.push({
        label: module.title,
        path: "#",
      });
      if (material) {
        breadcrumbs.push({
          label: material.title,
          path: "#",
        });
      }
    }
  }

  return breadcrumbs;
};

// ---------------------------------------------------------------

const myImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=906&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?fm=jpg&q=60&w=3000",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?fm=jpg&q=60&w=3000",
  "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?fm=jpg&q=60&w=3000",
  "https://images.unsplash.com/photo-1657819307873-c57e45f65f6d?fm=jpg&q=60&w=3000",
  "https://images.unsplash.com/photo-1720411201674-a9ed01606298?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1714976326729-1ffbddfc1c2e?q=80&w=1032&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
];

export const placeholderImage = (_text: string) =>
  myImages[Math.floor(Math.random() * 9)];
// `https://placehold.co/300x200?text=${text}`;

// ---------------------------------------------------------------

export const SORT_FIELDS = [
  { value: "title", label: "Title" },
  { value: "createdAt", label: "Time Created" },
  { value: "updatedAt", label: "Time Updated" },
  { value: "durationHours", label: "Duration Hours" },
  { value: "price", label: "Price" },
  { value: "rating", label: "Rating" },
];

export const SORT_DIRECTION_FIELDS = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
];

export const ENTITY_TYPES = [
  { value: "skills", label: "Skills" },
  { value: "learning-paths", label: "Learning Paths" },
  { value: "courses", label: "Courses" },
  { value: "reviews", label: "Reviews" },
  { value: "certificates", label: "Certificates" },
  { value: "materials", label: "Materials" },
  { value: "questions", label: "Questions" },
  { value: "students", label: "Students" },
  { value: "categories", label: "Categories" },
  { value: "quizzes", label: "Quizzes" },
  { value: "sections", label: "Sections" },
  { value: "instructors", label: "Instructors" },
];

// ----------------------------------------------------

export const categories = [
  {
    id: 1,
    name: "Health",
    icon: HeartIcon,
    description: "Wellness, fitness, nutrition, and more.",
  },
  {
    id: 2,
    name: "Computer Science",
    icon: ComputerDesktopIcon,
    description: "Programming, algorithms, and data structures.",
  },
  {
    id: 3,
    name: "Sport",
    icon: RadioIcon,
    description: "Athletics, coaching, and sports science.",
  },
  {
    id: 4,
    name: "Art",
    icon: PaintBrushIcon,
    description: "Design, painting, music, and creativity.",
  },
  {
    id: 5,
    name: "Business",
    icon: BriefcaseIcon,
    description: "Entrepreneurship, management, and marketing.",
  },
  {
    id: 6,
    name: "Languages",
    icon: LanguageIcon,
    description: "Learn new languages and cultures.",
  },
];

// ----------------------------------------------------
export const myFeatures = [
  {
    icon: UserIcon,
    title: "Expert Instructors",
    text: "Learn from real-world professionals.",
  },
  {
    icon: BookOpenIcon,
    title: "Diverse Courses",
    text: "Topics for every learner.",
  },
  {
    icon: UsersIcon,
    title: "Global Community",
    text: "Learn with others around the world.",
  },
  {
    icon: AcademicCapIcon,
    title: "Certificates",
    text: "Showcase your progress.",
  },
];

// --------------------------------------------------------

export const highlights = [
  {
    icon: LightBulbIcon,
    title: "Interactive Lessons",
    text: "Quizzes, projects, and real-world tasks.",
  },
  {
    icon: HandThumbUpIcon,
    title: "Personalized Support",
    text: "Mentorship and community support.",
  },
  {
    icon: RocketLaunchIcon,
    title: "Career Advancement",
    text: "Grow and achieve your professional goals.",
  },
];

// ------------------------------------------------

export const profileSidebar = [
  {
    label: "View public profile",
    icon: ArrowTopRightOnSquareIcon,
    action: () => {},
  },
  {
    label: "Information",
    icon: InformationCircleIcon,
    action: () => {},
  },
  { label: "Photo", icon: PhotoIcon, action: () => {} },
  {
    label: "Account Settings",
    icon: Cog6ToothIcon,
    action: () => {},
  },
  { label: "Payment methods", icon: WalletIcon, action: () => {} },
  { label: "Privacy", icon: LockClosedIcon, action: () => {} },
  {
    label: "Notification Preferences",
    icon: BellIcon,
    action: () => {},
  },
];

// -------------------------------------------------

export const faqs = [
  {
    icon: UserPlusIcon,
    question: "How do I create an account?",
    answer:
      "Simply click the Sign Up button, fill in your details, and verify your email using the code we send. That’s it — you’re ready to learn!",
  },
  {
    icon: BookOpenIcon,
    question: "How do I enroll in a course?",
    answer:
      'Find a course you like, click on it, and press "Enroll Now". For paid courses, you’ll be directed to the payment page. Once enrolled, the course appears in your "My Courses" section.',
  },
  {
    icon: HeartIcon,
    question: "What is the Wishlist / Favorites feature?",
    answer:
      "If you’re interested in a course but not ready to enroll, click the heart icon to add it to your Favorites. You can revisit it anytime from your Wishlist.",
  },
  {
    icon: DevicePhoneMobileIcon,
    question: "Can I access my courses from multiple devices?",
    answer:
      "Yes! Coachera is responsive and cloud-synced. Access your account and courses from any device — web, tablet, or mobile.",
  },
  {
    icon: XMarkIcon,
    question: "Can I remove a course from my Favorites?",
    answer:
      "Absolutely. Just click the filled heart icon on the course to remove it from your Favorites list.",
  },
  {
    icon: UserGroupIcon,
    question: "Who are the instructors on Coachera?",
    answer:
      "Our instructors are industry professionals and certified educators with real-world experience. You can view their bios on each course page.",
  },
  {
    icon: ClockIcon,
    question: "Is there a time limit to complete a course?",
    answer:
      "Most courses are self-paced unless otherwise stated. Learn at your own convenience and progress anytime.",
  },
  {
    icon: EnvelopeIcon,
    question: "I didn’t receive my verification code. What should I do?",
    answer:
      'If the email hasn’t arrived within a minute, click "Resend Code" on the verification page. Also, check your spam or promotions folder.',
  },
  {
    icon: AcademicCapIcon,
    question: "Can I get a certificate after completing a course?",
    answer:
      "Yes! Upon successful completion, you’ll receive a digital certificate to download or share.",
  },
  {
    icon: CreditCardIcon,
    question: "What payment methods are supported?",
    answer:
      "We support most major credit and debit cards. Secure payments are handled through trusted gateways.",
  },
  {
    icon: WrenchScrewdriverIcon,
    question: "I found a bug. How can I report it?",
    answer:
      "We’d love your feedback! Please use the Contact Us form or email us at support@coachera.com.",
  },
  {
    icon: ArrowPathIcon,
    question: "How do I reset my password?",
    answer:
      'Go to the Login page, click "Forgot Password?", and follow the instructions to reset it via email OTP verification.',
  },
];

// --------------------------------------------------------------
