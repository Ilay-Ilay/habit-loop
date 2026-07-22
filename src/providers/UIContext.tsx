import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Habit } from "../types/types";

export type ThemeType = "light" | "dark" | "system";

type UIContextType = {
  theme: ThemeType;
  setTheme: Dispatch<SetStateAction<ThemeType>>;
  toggleHiddenHabit: (id: number) => void;
  hiddenHabits: Set<number>;
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  selectedHabit: Habit | null;
  setSelectedHabit: Dispatch<SetStateAction<Habit | null>>;
};

export const UIContext = createContext<UIContextType | null>(null);

export function useUI() {
  const context = useContext(UIContext);
  if (!context) throw new Error("UIContext should be used with UIProvider");
  return context;
}
