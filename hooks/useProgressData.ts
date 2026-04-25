import { getStoredProgress, getUpdatesAnswer, getSuspiciousAnswer } from "@/lib/progress";
import type { ModuleProgress } from "@/lib/progress";
import { useCallback, useEffect, useState } from "react";

export function useProgressData() {
  const [progress, setProgress] = useState<ModuleProgress>({});
  const [updatesAnswered, setUpdatesAnswered] = useState<"yes" | "no" | null>(null);
  const [suspiciousAnswered, setSuspiciousAnswered] = useState<string | null>(null);

  const reload = useCallback(() => {
    void Promise.all([getStoredProgress(), getUpdatesAnswer(), getSuspiciousAnswer()]).then(
      ([p, u, s]) => {
        setProgress(p);
        setUpdatesAnswered(u);
        setSuspiciousAnswered(s);
      }
    );
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { progress, updatesAnswered, suspiciousAnswered, reload };
}
