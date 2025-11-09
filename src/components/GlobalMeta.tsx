import { Helmet } from "react-helmet-async";

const GlobalMeta = () => {
  return (
    <Helmet>
      {/* Global Meta Tags that should appear on all pages */}
      <meta name="author" content="Makario - Bihar Makhana" />
      <meta name="publisher" content="Makario" />
      <meta name="copyright" content="© 2025 Makario. All rights reserved." />
      <meta name="language" content="English" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Geo Tags for Bihar, India */}
      <meta name="geo.region" content="IN-BR" />
      <meta name="geo.placename" content="Bihar, India" />
      <meta name="geo.position" content="25.0961;85.3131" />
      <meta name="ICBM" content="25.0961, 85.3131" />
    </Helmet>
  );
};

export default GlobalMeta;