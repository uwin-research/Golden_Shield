"use client";

import { useProgressData } from "@/hooks/useProgressData";
import { MODULES } from "@/lib/modules";
import { isModuleLessonComplete } from "@/lib/progress";
import { TRAINING_NAV_MODULES } from "@/lib/trainingNavModules";
import Link from "next/link";
import { useEffect } from "react";

type TrainingModuleExplorerProps = {
  currentSlug: string;
  progressRefreshKey?: number | string | boolean;
};

export function TrainingModuleExplorer({ currentSlug, progressRefreshKey }: TrainingModuleExplorerProps) {
  const { progress, updatesAnswered, suspiciousAnswered, reload } = useProgressData();

  useEffect(() => {
    void reload();
  }, [currentSlug, progressRefreshKey, reload]);

  return (
    <nav
      className="mt-10 border-t border-black pt-8"
      aria-labelledby="training-module-explorer-heading"
    >
      <h2 id="training-module-explorer-heading" className="text-lg font-semibold text-[#000080]">
        All modules
      </h2>
      <p className="mt-1 max-w-xl text-sm text-black/75">
        Go to any topic when you like. You can skip ahead or revisit lessons in any order.
      </p>

      <ul className="mt-5 list-none divide-y divide-neutral-200 rounded-lg border border-neutral-300 bg-white p-0">
        {TRAINING_NAV_MODULES.map((mod) => {
          const moduleData = MODULES.find((m) => m.slug === mod.slug);
          const isComplete = moduleData
            ? isModuleLessonComplete(
                moduleData,
                progress[mod.slug],
                !!updatesAnswered,
                !!suspiciousAnswered
              )
            : false;
          const isHere = mod.slug === currentSlug;
          const statusLabel = isComplete ? "Done" : "Not Done";

          return (
            <li key={mod.slug}>
              <Link
                href={`/training/${mod.slug}`}
                className={`grid grid-cols-1 gap-1 px-4 py-3 no-underline transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#000080] sm:grid-cols-[minmax(0,1fr)_5.5rem] sm:items-center sm:gap-4 sm:py-3.5 ${
                  isHere ? "border-l-4 border-l-[#000080] bg-[#f3f4f6]" : ""
                }`}
                style={{ textDecoration: "none" }}
                aria-current={isHere ? "page" : undefined}
              >
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-2 font-semibold leading-snug text-black">
                    <span>{mod.title}</span>
                    {isHere ? (
                      <span className="rounded-full bg-[#FFD700] px-2 py-0.5 text-xs font-bold text-black">
                        You are here
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-0.5 text-sm text-black/65">{mod.purposeLine}</p>
                </div>
                <p className={`text-sm font-medium sm:text-right ${isComplete ? "text-green-800" : "text-black/55"}`}>
                  {statusLabel}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
