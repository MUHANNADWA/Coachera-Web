import { Helmet } from "react-helmet-async";

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
}

const Meta = ({
  title = "Coachera",
  description = "Discover over 1000 courses, and meet the best teachers",
  keywords,
  canonicalUrl
}: MetaProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};

export default Meta;