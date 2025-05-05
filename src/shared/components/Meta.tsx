import { Helmet } from "react-helmet-async";

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
}

const Meta = ({
  title,
  description,
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

Meta.defaultProps = {
  title: "Welcome To Coachera",
  description: "We sell the best products for cheap",
  keywords: "electronics, buy electronics, cheap electronics",
};

export default Meta;