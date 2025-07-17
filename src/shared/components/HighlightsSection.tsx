import React from "react";
import { highlights } from "../../features/courses/utils/Utils";

const HighlightsSection: React.FC = () => (
  <section aria-labelledby="highlights-heading">
    <div className="py-20 px-6 md:px-20">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <p className="text-primary font-medium uppercase tracking-wide">
          Why Choose Coachera?
        </p>
        <h2
          id="highlights-heading"
          className="text-4xl font-bold leading-tight mt-2 mb-4">
          Empowering You to Succeed
        </h2>
        <p className="text-gray-600">
          Upskill, grow, and achieve more — wherever you are.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {highlights.map(({ icon: Icon, title, text }) => (
          <div key={title} className="text-center">
            <div className="text-primary mb-4">
              <Icon className="w-8 h-8 mx-auto" aria-hidden="true" />
            </div>
            <h4 className="font-semibold text-lg mb-2">{title}</h4>
            <p className="text-sm text-gray-500">{text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HighlightsSection;
