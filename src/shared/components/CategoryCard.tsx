import React from "react";
import { Button } from "./Button";

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    description: string;
  };
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const Icon = category.icon;
  return (
    <Button
      className="card group relative flex flex-col items-center transition-transform"
      onClick={onClick}
      aria-label={`Explore category: ${category.name}`}
      tabIndex={0}
      type="button">
      <div className="flex flex-col items-center justify-center w-full h-40 bg-primary/5">
        <span className="flex items-center justify-center rounded-full bg-primary/10 text-primary mb-2 p-4 group-hover:bg-primary/20 transition-all">
          <Icon className="w-12 h-12" aria-hidden="true" />
        </span>
      </div>
      <div className="flex-1 flex flex-col justify-between p-6 w-full text-left">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 min-h-[48px]">
          {category.description}
        </p>
        <span className="inline-block mt-auto text-primary font-semibold group-hover:underline group-hover:underline-offset-4 transition-all">
          Explore
        </span>
      </div>
    </Button>
  );
};

export default CategoryCard;
