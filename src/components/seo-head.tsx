import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { SITE_ORIGIN } from "../config/site";
import {
  canonicalUrl,
  getRouteMeta,
  hreflangUrls,
} from "../seo/routesMeta";

const defaultOgImage = `${SITE_ORIGIN}/LOGO-03.svg`;

export default function SeoHead() {
  const { pathname } = useLocation();
  const meta = getRouteMeta(pathname);
  const canonical = canonicalUrl(pathname);
  const alt = hreflangUrls(pathname);
  const ogUrl = canonical;

  return (
    <Helmet prioritizeSeoTags>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="INXORA" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={defaultOgImage} />
      <meta property="og:locale" content="es_PE" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="pt_BR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />

      <link rel="alternate" hrefLang="es" href={alt.es} />
      <link rel="alternate" hrefLang="en" href={alt.en} />
      <link rel="alternate" hrefLang="pt" href={alt.pt} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />
    </Helmet>
  );
}
