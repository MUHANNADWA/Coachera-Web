import CourseCard from "../features/courses/components/courseCard/CourseCard";
import Skills from "../shared/components/Skills";
import { Course, Skill } from "../shared/types/types";

export const renderSearchResults = (results: any[], entityType: string) => {
  switch (entityType) {
    case "courses":
      return (results as Course[]).map((course) => (
        <CourseCard key={course.id} course={course} />
      ));
    case "skills":
      return <Skills skills={results as Skill[]} />;
    default:
      return (
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr>
              {Object.keys(results[0] || {}).map((key) => (
                <th key={key} className="border px-4 py-2 capitalize">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((item, index) => (
              <tr key={index} className="border">
                {Object.values(item).map((value, idx) => (
                  <td key={idx} className="border px-4 py-2">
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
