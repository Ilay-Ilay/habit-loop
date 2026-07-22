import type { Session } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

export type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
  isRecovery: boolean;
  setRecovery: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<null | AuthContextType>(null);

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Auth context must be used with auth provider");
  return context;
}
