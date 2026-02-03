import { useEffect, useState } from "react";

export default function useObserver() {
  useEffect(() => {
    const options = {
      root: document,
      rootMargin: "-50% 0px",
      threshold: 0,
    };

    // Only observe sections with an ID
    const sections = document.querySelectorAll("section[id]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(onObserve, options);
    sections.forEach((section) => {
      observer.observe(section);
    });
    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const [highlightedSection, setHighlightedSection] = useState("sec1");

  function onObserve(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const { id } = entry.target;
        setHighlightedSection(id);
      }
    });
  }
  return { highlightedSection };
}
