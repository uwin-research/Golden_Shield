"use client";

import { useProgressData } from "@/hooks/useProgressData";
import { MODULES } from "@/lib/modules";
import { isModuleLessonComplete, type ModuleProgress } from "@/lib/progress";
import { TRAINING_NAV_MODULES, type TrainingNavModule } from "@/lib/trainingNavModules";
import Link from "next/link";
import { useEffect, useMemo } from "react";

type TrainingModuleExplorerProps = {
  currentSlug: string;
  progressRefreshKey?: number | string | boolean;
};

function isModuleComplete(
  mod: TrainingNavModule,
  progress: ModuleProgress,
  updatesAnswered: boolean,
  suspiciousAnswered: boolean
): boolean {
  const moduleData = MODULES.find((m) => m.slug === mod.slug);
  return moduleData
    ? isModuleLessonComplete(moduleData, progress[mod.slug], updatesAnswered, suspiciousAnswered)
    : false;
}

function pickSuggestedNext(
  currentSlug: string,
  progress: ModuleProgress,
  updatesAnswered: boolean,
  suspiciousAnswered: boolean
): TrainingNavModule {
  const idx = TRAINING_NAV_MODULES.findIndex((m) => m.slug === currentSlug);
  if (idx === -1) {
    const firstIncomplete = TRAINING_NAV_MODULES.find(
      (m) => !isModuleComplete(m, progress, updatesAnswered, suspiciousAnswered)
    );
    return firstIncomplete ?? TRAINING_NAV_MODULES[0];
  }
  return TRAINING_NAV_MODULES[(idx + 1) % TRAINING_NAV_MODULES.length];
}

export function TrainingModuleExplorer({ currentSlug, progressRefreshKey }: TrainingModuleExplorerProps) {
  const { progress, updatesAnswered, suspiciousAnswered, reload } = useProgressData();

  useEffect(() => {
    void reload();
  }, [currentSlug, progressRefreshKey, reload]);

  const suggested = useMemo(
    () => pickSuggestedNext(currentSlug, progress, !!updatesAnswered, !!suspiciousAnswered),
    [currentSlug, progress, updatesAnswered, suspiciousAnswered]
  );

  const orderedMods = useMemo(
    () => [suggested, ...TRAINING_NAV_MODULES.filter((m) => m.slug !== suggested.slug)],
    [suggested]
  );

  return (
    <nav
      className="mt-10 border-t border-black pt-8"
      aria-labelledby="training-learn-next-heading"
    >
      <h2 id="training-learn-next-heading" className="text-lg font-semibold text-[#000080]">
        Which module would you like to learn next?
      </h2>
      <p className="mt-1 max-w-xl text-sm text-black/75">
        Tap any row to open that lesson. One idea is highlighted below as a gentle suggestion—you can still choose any
        module you prefer.
      </p>

      <ul className="mt-5 list-none divide-y divide-neutral-200 rounded-lg border border-neutral-300 bg-white p-0">
        {orderedMods.map((mod) => {
          const isComplete = isModuleComplete(mod, progress, !!updatesAnswered, !!suspiciousAnswered);
          const isHere = mod.slug === currentSlug;
          const isSuggested = mod.slug === suggested.slug && !isHere;
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
                    {isSuggested ? (
                      <span className="rounded-full bg-[#cce5ff] px-2 py-0.5 text-xs font-bold text-[#000080]">
                        Suggested next
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
