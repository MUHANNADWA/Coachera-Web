// ArticlePage.tsx
// Renders Markdown content (GFM) safely with ReactMarkdown.

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// Optional: if you want to allow inline raw HTML inside Markdown, import rehype-raw
// import rehypeRaw from "rehype-raw";
// Optional: make external links open in new tabs
import rehypeExternalLinks from "rehype-external-links";

import { Material } from "../../../shared/types/types";

interface ArticlePageProps {
  material: Material;
}

export default function ArticlePage({ material }: ArticlePageProps) {
  const article = material.article?.trim();
  if (!article) return <p className="p-4">No article found.</p>;

  return (
    <div className="p-4">
      <h1 className="consect p-4 text-2xl mb-4 font-semibold">
        {material.title}
      </h1>

      {/* Use prose for nice typography */}
      <article className="prose dark:prose-invert max-w-none consect p-4">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            // If you want to render raw HTML inside markdown, uncomment rehypeRaw *and*
            // ensure the content is trusted / sanitized.
            // rehypeRaw,
            [
              rehypeExternalLinks,
              { target: "_blank", rel: ["noopener", "noreferrer"] },
            ],
          ]}
        >
          {article}
        </ReactMarkdown>
      </article>
    </div>
  );
}
