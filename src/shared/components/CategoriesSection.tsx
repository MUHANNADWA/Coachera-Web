import React from "react";
import CategoryCard from "./CategoryCard";
import { categories } from "../../features/courses/utils/Utils";
import { useAppHook } from "../hooks/useAppHook";

const CategoriesSection: React.FC = () => {
  const { navigate } = useAppHook();

  return (
    <section aria-labelledby="categories-heading">
      <div className="py-20 px-6 md:px-20">
        <div className="text-center mb-12">
          <p className="text-primary font-medium uppercase tracking-wide">
            Explore Categories
          </p>
          <h2
            id="categories-heading"
            className="text-4xl font-bold leading-tight mt-2 mb-4">
            Find Your Next Passion
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Courses for all interests and skill levels.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onClick={() => navigate(`/search/${cat.name}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
