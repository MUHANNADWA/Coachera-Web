import { Material } from "../../../shared/types/types"; // Adjust path as needed

interface ArticlePageProps {
  material: Material;
}

export default function ArticlePage({ material }: ArticlePageProps) {
  const article = material.article;
  if (!article) return <p>No article found.</p>;

  return (
    <div className="p-4">
      <h1 className="consect p-4  text-2xl mb-4 font-semibold">
        {material.title}
      </h1>
      <p className="consect p-4 ">{article}</p>
    </div>
  );
}
