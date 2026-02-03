"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import useObserver from "@/hooks/useSectionObserver";
import { cn } from "@/lib/utils";

export default function MobileTocSticky({
  headings,
}: {
  headings: (string | null)[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { highlightedSection } = useObserver();

  const sections = headings
    .map((heading, index) => ({ id: `sec${index + 1}`, title: heading }))
    .filter((section) => section.title !== null);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <div className="sticky top-[77px] z-40 md:hidden">
      {/* TOC header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between bg-slate-50 px-4 py-4",
          !isOpen && "border-b border-slate-200"
        )}
      >
        <span className="text-sm font-medium text-[#042B59]">
          Inhaltsverzeichnis
        </span>
        <ChevronDown
          className={cn(
            "h-6 w-6 text-[#042B59] transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Expanded dropdown */}
      {isOpen && (
        <div className="h-[calc(100vh-77px-57px)] overflow-y-auto bg-slate-50">
          <nav className="flex flex-col px-4">
            {sections.map((section) => (
              <Link
                key={section.id}
                href={`#${section.id}`}
                onClick={handleLinkClick}
                className={cn(
                  "border-b border-slate-200 py-4 text-base transition-colors",
                  highlightedSection === section.id
                    ? "font-bold text-primary"
                    : "text-[#042B59] hover:text-primary"
                )}
              >
                {section.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
