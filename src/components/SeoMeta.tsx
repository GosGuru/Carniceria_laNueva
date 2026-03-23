import { useEffect } from "react";

interface SeoMetaProps {
  title: string;
  description: string;
  canonicalPath: string;
  image?: string;
  keywords?: string;
  ogType?: string;
  jsonLd?: Record<string, unknown>;
}

type ManagedNode = {
  cleanup: () => void;
};

function upsertMeta(attribute: "name" | "property", key: string, content: string): ManagedNode {
  let created = false;
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
    created = true;
  }

  const previousContent = element.getAttribute("content");
  element.setAttribute("content", content);

  return {
    cleanup: () => {
      if (!element) {
        return;
      }

      if (created) {
        element.remove();
        return;
      }

      if (previousContent === null) {
        element.removeAttribute("content");
      } else {
        element.setAttribute("content", previousContent);
      }
    },
  };
}

function upsertCanonical(href: string): ManagedNode {
  let created = false;
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
    created = true;
  }

  const previousHref = element.getAttribute("href");
  element.setAttribute("href", href);

  return {
    cleanup: () => {
      if (!element) {
        return;
      }

      if (created) {
        element.remove();
        return;
      }

      if (previousHref === null) {
        element.removeAttribute("href");
      } else {
        element.setAttribute("href", previousHref);
      }
    },
  };
}

function upsertJsonLd(jsonLd: Record<string, unknown>): ManagedNode {
  const selector = 'script[data-seo-jsonld="true"]';
  let element = document.head.querySelector<HTMLScriptElement>(selector);

  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.setAttribute("data-seo-jsonld", "true");
    document.head.appendChild(element);
  }

  const previousText = element.textContent;
  element.textContent = JSON.stringify(jsonLd);

  return {
    cleanup: () => {
      if (!element) {
        return;
      }

      if (previousText === null) {
        element.remove();
      } else {
        element.textContent = previousText;
      }
    },
  };
}

export function SeoMeta({
  title,
  description,
  canonicalPath,
  image,
  keywords,
  ogType = "product",
  jsonLd,
}: SeoMetaProps) {
  useEffect(() => {
    const previousTitle = document.title;
    const canonicalUrl = `${window.location.origin}${canonicalPath}`;

    document.title = title;

    const managedNodes: ManagedNode[] = [
      upsertMeta("name", "description", description),
      upsertMeta("property", "og:title", title),
      upsertMeta("property", "og:description", description),
      upsertMeta("property", "og:url", canonicalUrl),
      upsertMeta("property", "og:type", ogType),
      upsertCanonical(canonicalUrl),
    ];

    if (image) {
      managedNodes.push(upsertMeta("property", "og:image", image));
    }

    if (keywords) {
      managedNodes.push(upsertMeta("name", "keywords", keywords));
    }

    if (jsonLd) {
      managedNodes.push(upsertJsonLd(jsonLd));
    }

    return () => {
      document.title = previousTitle;
      managedNodes.forEach((managedNode) => managedNode.cleanup());
    };
  }, [title, description, canonicalPath, image, keywords, ogType, jsonLd]);

  return null;
}
