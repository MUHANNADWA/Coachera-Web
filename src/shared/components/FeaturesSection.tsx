import React from "react";
import { myFeatures } from "../../features/courses/utils/Utils";

const FeaturesSection: React.FC = () => (
  <section aria-labelledby="features-heading">
    <div className="py-20 px-6 md:px-20 max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-center">
      <h2 id="features-heading" className="sr-only">
        Platform Features
      </h2>
      {myFeatures.map(({ icon: Icon, title, text }) => (
        <div key={title} className="flex flex-col items-center">
          <div className="bg-primary/10 text-primary rounded-2xl p-4 mb-4">
            <Icon className="w-8 h-8" aria-hidden="true" />
          </div>
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-gray-500 text-sm">{text}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturesSection;
