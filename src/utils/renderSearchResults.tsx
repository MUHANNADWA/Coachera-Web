import CourseCard from "../features/courses/components/courseCard/CourseCard";
import LearningPathCard from "../features/courses/components/courseCard/LearningPathCard";
import Review from "../features/courses/components/Review";
import CategoryCard from "../shared/components/CategoryCard";
import Skills from "../shared/components/Skills";
import {
  Category,
  Course,
  LearningPath,
  Review as ReviewType,
  Skill,
} from "../shared/types/types";

export const renderSearchResults = (results: any[], entityType: string) => {
  switch (entityType) {
    case "courses":
      return (results as Course[]).map((course) => (
        <CourseCard key={course.id} course={course} />
      ));
    case "skills":
      return <Skills skills={results as Skill[]} />;
    case "learning-paths":
      return (results as LearningPath[]).map((lp) => (
        <LearningPathCard key={lp.id} learningPath={lp} />
      ));
    case "reviews":
      return (results as ReviewType[]).map((review) => (
        <Review key={review.id} review={review} />
      ));
    case "categories":
      return (results as Category[]).map((cat) => (
        <CategoryCard key={cat.id} category={cat} />
      ));
    default:
      return (
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr>
              {Object.keys(results[0] || {}).map((key) => (
                <th key={key} className="border-2 px-4 py-2 capitalize">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((item, index) => (
              <tr key={index} className="border">
                {Object.values(item).map((value, idx) => (
                  <td key={idx} className="border-2 px-4 py-2">
                    {typeof value === "object"
                      ? JSON.stringify(value)
                      : value?.toString() ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
  }
};
