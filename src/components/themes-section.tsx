"use client";
import AllPostThemes from "@/lib/all-post-themes";
import { useSelectedTheme } from "@/lib/useSelectedTheme";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

const ThemesSection = () => {
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <aside className="flex flex-col gap-4 p-4">
      {AllPostThemes.map((theme, _) => (
        <div
          onClick={() => {
            setSelectedTheme(theme.name);
          }}
          key={_}
          className="relative rounded-lg hover:border-primary transition-all overflow-hidden border-2 border-border"
        >
          <img src={theme.demoUrl} alt="" />
          <div className="absolute text-xs bottom-0 left-0 text-center w-full bg-background/70 p-3">
            {theme.title}
          </div>
          {selectedTheme && selectedTheme === theme.name && (
            <div className="absolute p-3 bg-background/50 rounded-full border border-border top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <Check />
            </div>
          )}
        </div>
      ))}
    </aside>
  );
};

export default ThemesSection;
