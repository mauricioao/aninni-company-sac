/**
 * JSON-LD Generator
 * Generates appropriate JSON-LD data based on the page type and provided content
 * Generates JSON-LD data that search engines like Google, Bing, and DuckDuckGo can use to better understand the content of the page.
 * This can improve the page's visibility in search engine results and provide users with additional information about the page.
 */
import { absoluteUrl } from "./absoluteUrl";
import { getLocaleUrlCTM } from "./i18nUtils";
import removeEmptyKeys from "./removeEmptyKeys";
import trailingSlashChecker from "./trailingSlashChecker";
import social from "@/config/social.json";

// This component dynamically generates appropriate JSON-LD data based on the page type
export type JSONLDProps = {
  canonical?: string; // Canonical URL of the page, used to determine page type
  title?: string; // Title of the page
  description?: string; // Description of the page
  image?: string; // Image URL for blog posts, case studies, or team members
  categories?: string[]; // Categories or tags for blog posts or case studies
  author?: string; // Author for blog posts or case studies
  pageType?: string; // Page type

  [key: string]: any;
};

export default function JsonLdGenerator(content: JSONLDProps, Astro: any) {
  let {
    canonical = "/",
    title = "",
    description = "",
    image = "",
    pageType = "",
    lang = "en", // Default language (should be dynamically set)
    alternateLangs = [], // Array of alternate language URLs
    config,
  } = content || {};

  // Generate JSON-LD data dynamically based on page type
  let jsonLdData: Record<string, any> = {
    "@context": "https://schema.org",
  };

  switch (pageType) {
    default:
      jsonLdData["@type"] = "WebPage";
      jsonLdData.name = title;
      jsonLdData.description = description;
      jsonLdData.image = image;
      jsonLdData.url = canonical;

      if (lang) {
        jsonLdData.inLanguage = lang;
      }
  }

  // Add site metadata to `isPartOf` of jsonLdData.
  // Use the search-engine brand, decoupled from the visible `config.site.title`.
  const seoBrand = config.site.seoBrand || config.site.title;

  jsonLdData["isPartOf"] = {
    "@type": "WebSite",
    name: seoBrand,
    description: config.site.description,
    url: trailingSlashChecker(Astro.url.origin),
  };

  // Add alternate languages if provided
  if (alternateLangs.length > 0) {
    jsonLdData.alternateLanguage = alternateLangs
      .filter((alt: any) => Astro.currentLocale !== alt.languageCode)
      .map((alt: any) => ({
        "@type": "WebPage",
        url: getLocaleUrlCTM(canonical, alt.languageCode),
        inLanguage: alt.languageCode,
      }));
  }

  // Add `publisher` to jsonLdData.
  // Use the search-engine brand for the Organization name (crawler-facing).
  jsonLdData.publisher = {
    "@type": "Organization",
    name: seoBrand,
    url: trailingSlashChecker(Astro.url.origin),
    sameAs: social.main.filter((item: any) => item.enable).map((item: any) => item.url),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(config.site.logo, Astro),
    },
  };

  if (config.settings?.contactInfo?.phone || config.settings?.contactInfo?.email) {
    const extractText = (str: string) => str ? str.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') : undefined;
    jsonLdData.publisher.contactPoint = removeEmptyKeys({
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: extractText(config.settings.contactInfo.phone),
      email: extractText(config.settings.contactInfo.email),
    });
  }

  // Utility to remove empty or undefined keys
  return removeEmptyKeys(jsonLdData);
}
