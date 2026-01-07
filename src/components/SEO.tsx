import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOConfig } from '../utils/seoHelper';

interface SEOProps extends SEOConfig {
  children?: React.ReactNode;
  schema?: Record<string, any> | Record<string, any>[];
}

/**
 * Reusable SEO component that manages meta tags, Open Graph, and schema markup
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  canonical,
  type = 'website',
  schema,
  children,
}) => {
  const fullTitle = `${title} | Makario - Premium Makhana & Organic Products`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="charset" content="UTF-8" />
      <meta name="language" content="en-IN, hi-IN" />
      <meta name="author" content="Makario - Premium Makhana & Organic Products" />
      <meta httpEquiv="content-language" content="en-IN" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage || 'https://makario.in/og-image.jpg'} />
      <meta property="og:site_name" content="Makario" />
      <meta property="og:url" content={canonical || 'https://makario.in'} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage || 'https://makario.in/og-image.jpg'} />

      {/* Mobile & Accessibility */}
      <meta name="theme-color" content="#1a5f1a" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Canonical Link */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Alternate Links for Language Variants */}
      <link rel="alternate" hrefLang="en-IN" href={canonical || 'https://makario.in'} />
      <link rel="alternate" hrefLang="hi-IN" href={canonical || 'https://makario.in'} />

      {/* Favicon & Icons */}
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* Robots Meta */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* Schema Markup - Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {typeof schema === 'string' ? schema : JSON.stringify(schema)}
        </script>
      )}

      {children}
    </Helmet>
  );
};

export default SEO;
