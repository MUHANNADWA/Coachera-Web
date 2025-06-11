import { Material } from "../../../shared/types/types"; // Adjust path as needed

interface ArticlePageProps {
  material: Material;
}

export default function ArticlePage({ material }: ArticlePageProps) {
  const article = material.article;
  if (!article) return <p>No article found.</p>;

  return (
    <div>
      <h1 className="text-2xl mb-4 font-semibold">{material.title}</h1>
      <hr className="mb-4" />
      <p>{article}</p>
    </div>
  );
}
