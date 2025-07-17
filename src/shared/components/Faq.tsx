import {
  UserPlusIcon, // for account creation
  BookOpenIcon, // for enroll in course
  HeartIcon, // for wishlist/favorites
  DevicePhoneMobileIcon, // for multi-device access
  XMarkIcon, // for remove from favorites
  UserGroupIcon, // for instructors
  ClockIcon, // for time limit
  EnvelopeIcon, // for verification code
  AcademicCapIcon, // for certificate
  CreditCardIcon, // for payment methods
  WrenchScrewdriverIcon, // for bug report
  ArrowPathIcon, // for reset password
} from "@heroicons/react/24/outline";
import { useState } from "react";

const faqs = [
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

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section>
      <div className="max-w-3xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-8">
          <AcademicCapIcon className="inline w-8 h-8 text-primary mb-1 mr-2 align-middle" />
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const Icon = faq.icon;
            return (
              <div
                key={idx}
                className="card hover:scale-100! hover:translate-0! border rounded-lg bg-white">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  aria-expanded={openIndex === idx}
                  aria-controls={`faq-panel-${idx}`}>
                  <span className="flex items-center gap-3 text-lg font-medium">
                    <Icon className="w-7 h-7 text-primary" />
                    {faq.question}
                  </span>
                  <span className="ml-4 text-primary text-2xl">
                    {openIndex === idx ? "−" : "+"}
                  </span>
                </button>
                {openIndex === idx && (
                  <div
                    id={`faq-panel-${idx}`}
                    className="px-6 pb-4 text-gray-700 text-base">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
