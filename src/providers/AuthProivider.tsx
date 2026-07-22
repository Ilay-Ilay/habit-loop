import { useEffect, useState } from "react";

import { AuthContext } from "./AuthContext";

import type { Session } from "@supabase/supabase-js";

import LoadingSpinner from "../components/pages/LoadingSpinner";
import { supabase } from "../types/supabase-client";

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRecovery, setRecovery] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setRecovery(true);
      }
      if (event === "SIGNED_OUT") {
        setRecovery(false);
      }

      setSession(session);

      setIsLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);

      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider
      value={{ isLoading, session, isRecovery, setRecovery }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
