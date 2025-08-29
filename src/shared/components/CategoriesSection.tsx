import React, { useMemo } from "react";
import CategoryCard from "./CategoryCard";
import { useAppHook } from "../hooks/useAppHook";
// ✅ صحّح المسار حسب مشروعك
import { Category } from "../types/types";

// خريطة أيقونات افتراضية بحسب الاسم (اختياري)
import {
  CpuChipIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";
import { useGetCategoriesQuery } from "../../features/courses/api/categoriesApiSlice";

const iconByName: Record<string, React.ComponentType<any>> = {
  AI: CpuChipIcon,
  Web: GlobeAltIcon,
  Business: BriefcaseIcon,
  Data: CircleStackIcon,
};

const descByName: Record<string, string> = {
  AI: "Machine learning, deep learning, and more.",
  Web: "Frontend, backend, and full‑stack development.",
  Business: "Management, finance, marketing, and strategy.",
  Data: "Data analysis, visualization, and engineering.",
};

const CategoriesSection: React.FC = () => {
  const { navigate } = useAppHook();

  const { data, isLoading, isError, error } = useGetCategoriesQuery({
    page: 0,
    size: 8,
    sortBy: "id",
    sortDirection: "desc",
  });

  const categories: Category[] = useMemo(() => {
    const list = (data?.data?.content ?? []) as Array<{
      id: number | string;
      name: string;
      icon: string | null;
    }>;

    // @ts-ignore
    return list.map((c) => ({
      id: c.id,
      name: c.name,
      icon: iconByName[c.name] ?? undefined,
      description: descByName[c.name],
    })) as Category[];
  }, [data]);

  return (
    <section aria-labelledby="categories-heading">
      <div className="py-20 px-6 md:px-20">
        <div className="text-center mb-12">
          <p className="text-primary font-medium uppercase tracking-wide">
            Explore Categories
          </p>
          <h2
            id="categories-heading"
            className="text-4xl font-bold leading-tight mt-2 mb-4"
          >
            Find Your Next Passion
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Courses for all interests and skill levels.
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="consect p-4 animate-pulse rounded-2xl h-32"
              >
                <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
                <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && !isLoading && (
          <div className="consect p-6 max-w-3xl mx-auto text-center">
            <p className="text-danger font-semibold">
              Failed to load categories
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {/* @ts-ignore */}
              {error?.data?.message || "Please try again later."}
            </p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && categories.length === 0 && (
          <div className="consect p-6 max-w-3xl mx-auto text-center">
            <p className="text-gray-600 dark:text-gray-300">
              No categories found.
            </p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !isError && categories.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onClick={() => navigate(`/search/${cat.name}?type=categories`)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
