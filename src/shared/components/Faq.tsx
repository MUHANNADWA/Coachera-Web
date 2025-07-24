import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "./form/Button";
import { faqs } from "../../features/courses/utils/Utils";

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section>
      <div>
        <div className="max-w-3xl mx-auto py-16 px-4">
          <h2 className="text-4xl font-bold text-center mb-8">
            <AcademicCapIcon className="inline w-8 h-8 text-primary mb-1 mr-2 align-middle" />
            Frequently Asked Questions (FAQ)
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const Icon = faq.icon;
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  className="card hover:scale-100! hover:translate-0! border-2 rounded-2xl bg-white dark:bg-dark overflow-hidden">
                  <Button
                    className="w-full dark:bg-dark flex items-center justify-between! px-6 py-4 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${idx}`}>
                    <span className="flex items-center gap-3 text-lg font-medium">
                      <Icon className="w-7 h-7 text-primary" />
                      {faq.question}
                    </span>
                    <span className="ml-4 text-primary text-2xl">
                      {isOpen ? "−" : "+"}
                    </span>
                  </Button>

                  <div
                    id={`faq-panel-${idx}`}
                    className={`px-6 transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 py-4" : "max-h-0 py-0"
                    } overflow-hidden text-gray-700 dark:text-gray-300 text-base`}>
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
