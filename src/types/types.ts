import type { Database } from "./supabase";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

export type Habit = Database["public"]["Tables"]["habits"]["Row"];
export type HabitInsert = Database["public"]["Tables"]["habits"]["Insert"];
export type HabitUpdate = Database["public"]["Tables"]["habits"]["Update"];

export type HabitLog = Database["public"]["Tables"]["habit_logs"]["Row"];
export type HabitLogInsert =
  Database["public"]["Tables"]["habit_logs"]["Insert"];
export type HabitLogUpdate =
  Database["public"]["Tables"]["habit_logs"]["Update"];

export type HabitsOutletContext = {
  habits: Habit[];
  logsMap: Map<string, HabitLog>;
};
