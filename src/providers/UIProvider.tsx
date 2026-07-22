import { useEffect, useState } from "react";
import { UIContext, type ThemeType } from "./UIContext";
import type { Habit } from "../types/types";

type UIProviderType = {
  children: React.ReactNode;
};

function UIProvider({ children }: UIProviderType) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  const [theme, setTheme] = useState<ThemeType>(() => {
    const storage = localStorage.getItem("theme");

    if (storage) {
      return storage as ThemeType;
    }

    return "system";
  });
  const [hiddenHabits, setHiddenHabits] = useState<Set<number>>(new Set());

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;

    const resolvedTheme =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;

    root.classList.toggle("dark", resolvedTheme === "dark");
  }, [theme]);

  const toggleHiddenHabit = (id: number) => {
    setHiddenHabits((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  return (
    <UIContext.Provider
      value={{
        theme,
        setTheme,
        hiddenHabits,
        toggleHiddenHabit,
        selectedDate,
        setSelectedDate,
        selectedHabit,
        setSelectedHabit,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export default UIProvider;
