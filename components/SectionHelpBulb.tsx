"use client";

import { Lightbulb, X } from "lucide-react";
import type { ReactNode } from "react";

export type SectionHelpOpenSetter = (id: string | null) => void;

type TriggerProps = {
  helpId: string;
  openHelpId: string | null;
  setOpenHelpId: SectionHelpOpenSetter;
  /** Used in screen reader copy */
  sectionLabel: string;
};

export function SectionHelpBulbTrigger({
  helpId,
  openHelpId,
  setOpenHelpId,
  sectionLabel,
}: TriggerProps) {
  const open = openHelpId === helpId;
  return (
    <button
      type="button"
      onClick={() => setOpenHelpId(open ? null : helpId)}
      data-open={open}
      aria-expanded={open}
      aria-controls={`section-help-panel-${helpId}`}
      className="settings-help-bulb-btn relative mt-0.5 inline-flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-2 border-black bg-[#fffbeb] text-[#92400e] hover:bg-[#fef3c7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000080] focus-visible:ring-offset-2"
    >
      <span className="sr-only">
        Tips and help for this section: {sectionLabel}. Opens a short guide, including how to find Settings on your
        phone.
      </span>
      <Lightbulb className="pointer-events-none" strokeWidth={2} width={40} height={40} aria-hidden />
    </button>
  );
}

function SectionHelpDefaultBody({ headingId }: { headingId: string }) {
  return (
    <>
      <p id={headingId} className="mb-3 pr-14 text-lg font-semibold text-[#000080] sm:pr-16">
        Can&apos;t find Settings?
      </p>
      <div className="space-y-4 text-base text-black">
        <div>
          <p className="font-medium">iPhone:</p>
          <ul className="mt-1 list-inside list-disc space-y-1">
            <li>Swipe down from the middle of the Home Screen to search.</li>
            <li>Type: Settings.</li>
            <li>If you don&apos;t see it, swipe right to open the App Library, then search.</li>
          </ul>
        </div>
        <div>
          <p className="font-medium">Android:</p>
          <ul className="mt-1 list-inside list-disc space-y-1">
            <li>Swipe down and tap the gear icon (Settings), or use the search bar and type Settings.</li>
          </ul>
        </div>
      </div>
    </>
  );
}

type PanelProps = TriggerProps;

export function SectionHelpPanel({ helpId, openHelpId, setOpenHelpId, sectionLabel }: PanelProps) {
  if (openHelpId !== helpId) return null;
  const panelId = `section-help-panel-${helpId}`;
  const headingId = `section-help-heading-${helpId}`;

  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={headingId}
      className="relative mb-6 rounded-xl border-2 border-black bg-white p-4 pt-4 pr-14 pb-4 pl-4 shadow-md sm:pr-16"
    >
      <button
        type="button"
        onClick={() => setOpenHelpId(null)}
        className="absolute right-2 top-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border-2 border-black bg-[#f5f5f5] text-black hover:bg-[#e8e8e8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000080] focus-visible:ring-offset-2"
        aria-label={`Close tips for ${sectionLabel}`}
      >
        <X className="h-7 w-7" strokeWidth={2.5} aria-hidden />
      </button>
      <SectionHelpDefaultBody headingId={headingId} />
    </div>
  );
}

type TitleRowProps = TriggerProps & {
  title: string;
  headingClassName: string;
  /** Use h2 (default) or h3 for step cards */
  headingLevel?: "h2" | "h3";
};

export function SectionTitleWithHelp({
  helpId,
  title,
  openHelpId,
  setOpenHelpId,
  headingClassName,
  sectionLabel,
  headingLevel = "h2",
}: TitleRowProps) {
  const H = headingLevel;
  return (
    <>
      <div className="mb-6 flex min-h-[52px] items-start justify-between gap-3">
        <H className={`${headingClassName} flex-1 min-w-0 pr-2`}>{title}</H>
        <SectionHelpBulbTrigger
          helpId={helpId}
          openHelpId={openHelpId}
          setOpenHelpId={setOpenHelpId}
          sectionLabel={sectionLabel}
        />
      </div>
      <SectionHelpPanel
        helpId={helpId}
        openHelpId={openHelpId}
        setOpenHelpId={setOpenHelpId}
        sectionLabel={sectionLabel}
      />
    </>
  );
}

/** Compact header for step-only lessons (e.g. Step 1 + bulb). */
export function SectionStepHeaderWithHelp({
  helpId,
  stepNumber,
  openHelpId,
  setOpenHelpId,
  sectionLabel,
}: {
  helpId: string;
  stepNumber: number;
  openHelpId: string | null;
  setOpenHelpId: SectionHelpOpenSetter;
  sectionLabel: string;
}) {
  const label = `Step ${stepNumber}`;
  return (
    <>
      <div className="mb-4 flex min-h-[52px] items-start justify-between gap-3">
        <h3 className="flex-1 min-w-0 pr-2 text-xl font-bold text-[#000080]">{label}</h3>
        <SectionHelpBulbTrigger
          helpId={helpId}
          openHelpId={openHelpId}
          setOpenHelpId={setOpenHelpId}
          sectionLabel={sectionLabel}
        />
      </div>
      <SectionHelpPanel
        helpId={helpId}
        openHelpId={openHelpId}
        setOpenHelpId={setOpenHelpId}
        sectionLabel={sectionLabel}
      />
    </>
  );
}

/** Title row without a heading element (e.g. intro paragraph + bulb). */
export function SectionIntroRowWithHelp({
  helpId,
  children,
  openHelpId,
  setOpenHelpId,
  sectionLabel,
}: {
  helpId: string;
  children: ReactNode;
  openHelpId: string | null;
  setOpenHelpId: SectionHelpOpenSetter;
  sectionLabel: string;
}) {
  return (
    <>
      <div className="mb-4 flex min-h-[52px] items-start justify-between gap-3">
        <div className="flex-1 min-w-0 pr-2">{children}</div>
        <SectionHelpBulbTrigger
          helpId={helpId}
          openHelpId={openHelpId}
          setOpenHelpId={setOpenHelpId}
          sectionLabel={sectionLabel}
        />
      </div>
      <SectionHelpPanel
        helpId={helpId}
        openHelpId={openHelpId}
        setOpenHelpId={setOpenHelpId}
        sectionLabel={sectionLabel}
      />
    </>
  );
}
