import { useEffect, useState } from "react";

export interface HeatDay {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface HeatmapData {
  /** Weekday-aligned cells (leading/trailing nulls pad partial weeks). */
  days: (HeatDay | null)[];
  total: number;
  live: boolean;
}

function toISODate(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function clampLevel(v: unknown): 0 | 1 | 2 | 3 | 4 {
  const n = typeof v === "number" ? Math.round(v) : 0;
  if (n <= 0) return 0;
  if (n === 1) return 1;
  if (n === 2) return 2;
  if (n === 3) return 3;
  return 4;
}

/**
 * Honest fallback: a real date-aligned grid for the last 53 weeks with
 * zero counts, so the section never shows fabricated activity.
 */
function buildEmptyHeatmap(): HeatmapData {
  const days: (HeatDay | null)[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(start.getDate() - 370);

  // Pad so the first column starts on Sunday.
  const leading = start.getDay();
  for (let i = 0; i < leading; i++) days.push(null);

  const cursor = new Date(start);
  while (cursor <= today) {
    days.push({ date: toISODate(cursor), count: 0, level: 0 });
    cursor.setDate(cursor.getDate() + 1);
  }

  // Pad the trailing partial week.
  while (days.length % 7 !== 0) days.push(null);

  return { days, total: 0, live: false };
}

/** Live GitHub contributions for the last year (public API, no auth). */
export function useGithubHeatmap(user: string): HeatmapData {
  const [heatmap, setHeatmap] = useState<HeatmapData>(() => buildEmptyHeatmap());

  useEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad status"))))
      .then((d) => {
        const contribs = d?.contributions ?? [];
        if (cancelled || contribs.length === 0) return;
        // Pad so the first column starts on Sunday.
        const firstDow = new Date(contribs[0].date).getDay();
        const days: (HeatDay | null)[] = Array(firstDow).fill(null).concat(
          contribs.map((c: any) => ({
            date: String(c.date).slice(0, 10),
            count: typeof c.count === "number" ? c.count : 0,
            level: clampLevel(c.level),
          })),
        );
        while (days.length % 7 !== 0) days.push(null);
        const total =
          d?.total?.lastYear ?? contribs.reduce((a: number, c: any) => a + (c.count || 0), 0);
        setHeatmap({ days, total, live: true });
      })
      .catch(() => {
        if (!cancelled) setHeatmap(buildEmptyHeatmap());
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  return heatmap;
}
