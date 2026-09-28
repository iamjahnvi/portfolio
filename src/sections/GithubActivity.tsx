import { useEffect, useMemo, useState } from "react";
import { Shell, SectionHeader } from "@/components/Layout";
import { useGithubHeatmap, type HeatDay } from "@/hooks/useGithubHeatmap";
import { useTheme } from "@/components/theme-provider";
import { site } from "@/config/site";
import { ExternalLink } from "lucide-react";

// GitHub's official contribution scale (dark + light themes) —
// same 5 steps github.com uses, so the graph reads exactly like the profile.
const DARK_LEVELS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
const LIGHT_LEVELS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

function formatDayLabel(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatTooltip(count: number, iso: string): string {
  const label = formatDayLabel(iso);
  if (count === 0) return `No contributions on ${label}`;
  return `${count} contribution${count === 1 ? "" : "s"} on ${label}`;
}

interface HoverTip {
  text: string;
  x: number;
  y: number;
  below: boolean;
}

export function GithubActivity() {
  const username = site.github.username;
  const heatmap = useGithubHeatmap(username);
  const { theme } = useTheme();
  const isLight = theme === "light";
  const greens = isLight ? LIGHT_LEVELS : DARK_LEVELS;
  // GitHub's 1px cell border (barely-there, per theme) + hover ring.
  const cellBorder = isLight ? "rgba(27,31,35,0.06)" : "rgba(255,255,255,0.05)";
  const [hover, setHover] = useState<HoverTip | null>(null);

  // Hide the tooltip on scroll so it never floats stale or clipped.
  useEffect(() => {
    const hide = () => setHover(null);
    window.addEventListener("scroll", hide, true);
    return () => window.removeEventListener("scroll", hide, true);
  }, []);

  const handleCellEnter = (day: HeatDay) => (e: React.MouseEvent<HTMLSpanElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const centerX = r.left + r.width / 2;
    // Clamp horizontally so the tooltip never runs off-screen.
    const x = Math.min(Math.max(centerX, 130), window.innerWidth - 130);
    // Flip below the cell when there is no room above (top rows).
    const below = r.top < 70;
    setHover({
      text: formatTooltip(day.count, day.date),
      x,
      y: below ? r.bottom + 10 : r.top - 10,
      below,
    });
  };

  const handleCellLeave = () => setHover(null);

  // Month labels pinned to the week column where each month starts.
  const monthLabels = useMemo(() => {
    const numCols = Math.ceil(heatmap.days.length / 7);
    const labels: { col: number; name: string }[] = [];
    for (let c = 0; c < numCols; c++) {
      const day = heatmap.days[c * 7];
      if (!day) continue;
      const d = new Date(`${day.date}T00:00:00`);
      if (d.getDate() <= 7) {
        labels.push({
          col: c,
          name: d.toLocaleDateString("en-US", { month: "short" }),
        });
      }
    }
    return { labels, numCols };
  }, [heatmap.days]);

  return (
    <div id="github">
      <SectionHeader
        title="GitHub Activity"
        anchorId="github"
        aside={
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
          >
            <span>@{username}</span>
            <ExternalLink size={12} />
          </a>
        }
      />
      <Shell className="px-6 py-6 sm:px-8">
        <div className="onyx-scroll overflow-x-auto pb-2">
          <div className="min-w-[640px]">
            {/* Month labels at the top */}
            <div className="relative mb-1.5 h-3.5 pr-8 font-mono text-[10px] text-[var(--soft)]">
              {monthLabels.labels.map((m, i) => (
                <span
                  key={`${m.name}-${i}`}
                  className="absolute"
                  style={{ left: `${(m.col / monthLabels.numCols) * 100}%` }}
                >
                  {m.name}
                </span>
              ))}
            </div>

            {/* Heatmap Grid */}
            <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
              {heatmap.days.map((day, i) =>
                day === null ? (
                  <span key={i} className="size-[10px]" />
                ) : (
                  <span
                    key={i}
                    onMouseEnter={handleCellEnter(day)}
                    onMouseLeave={handleCellLeave}
                    className={`size-[10px] cursor-pointer rounded-[2px] transition-transform duration-150 hover:scale-125 hover:outline hover:outline-2 hover:outline-offset-1 ${isLight ? "hover:outline-black/30" : "hover:outline-white/40"}`}
                    style={{
                      backgroundColor: greens[day.level],
                      boxShadow: `inset 0 0 0 1px ${cellBorder}`,
                    }}
                  />
                ),
              )}
            </div>

            {/* Info and stats at the bottom */}
            <div className="mt-2.5 flex items-center justify-between font-mono text-[11px] text-[var(--muted)]">
              <span>
                {heatmap.live
                  ? `${heatmap.total} contributions in the last year`
                  : "Live GitHub data unavailable right now"}
              </span>
              <span className="flex items-center gap-1.5">
                Less
                {greens.map((g) => (
                  <span
                    key={g}
                    className="size-[10px] rounded-[2px]"
                    style={{
                      backgroundColor: g,
                      boxShadow: `inset 0 0 0 1px ${cellBorder}`,
                    }}
                  />
                ))}
                More
              </span>
            </div>
          </div>
        </div>
      </Shell>

      {/* Viewport-fixed tooltip (like github.com) — never clipped by the scroll container. */}
      {hover && (
        <div
          className="pointer-events-none fixed z-[200] whitespace-nowrap rounded-md bg-[#1f2328] px-3 py-1.5 font-mono text-[12px] font-medium text-white shadow-xl ring-1 ring-white/15"
          style={{
            left: hover.x,
            top: hover.y,
            transform: hover.below ? "translate(-50%, 0)" : "translate(-50%, -100%)",
          }}
        >
          {hover.text}
        </div>
      )}
    </div>
  );
}

export default GithubActivity;
