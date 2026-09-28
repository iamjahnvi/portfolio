import React, { createContext, useContext, useState, useEffect } from "react";

interface VisitorContextType { count: number | null; isLoading: boolean; }
const VisitorContext = createContext<VisitorContextType | undefined>(undefined);
const API = "https://page-views-api.ratneshc.com";

export function VisitorProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const site = ((import.meta as ImportMeta & { env: { VITE_PAGE_VIEWS_SITE?: string } }).env.VITE_PAGE_VIEWS_SITE || window.location.hostname).replace(/^https?:\/\//, "").replace(/\/$/, "");
    if (!site || site === "localhost" || site === "127.0.0.1") { setIsLoading(false); return; }

    const script = document.createElement("script");
    script.src = `${API}/script`;
    script.defer = true;
    script.dataset.site = site;
    script.dataset.path = "/";
    document.head.appendChild(script);

    let cancelled = false;
    const fetchCount = async () => {
      try {
        const params = new URLSearchParams({ site, path: "/" });
        const response = await fetch(`${API}/api/v1/views?${params}`);
        if (!response.ok) throw new Error(`Visitor count unavailable (${response.status})`);
        const data: { views?: number } = await response.json();
        if (!cancelled && typeof data.views === "number") setCount(data.views);
      } catch {
        if (!cancelled) setCount(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    void fetchCount();
    return () => { cancelled = true; script.remove(); };
  }, []);

  return <VisitorContext.Provider value={{ count, isLoading }}>{children}</VisitorContext.Provider>;
}

export function useVisitor() {
  const context = useContext(VisitorContext);
  if (context === undefined) throw new Error("useVisitor must be used within a VisitorProvider");
  return context;
}
