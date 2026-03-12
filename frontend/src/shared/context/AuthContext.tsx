import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@/modules/auth/types";
import { STORAGE_KEYS } from "@/app/config/constants";
import * as authService from "@/modules/auth/services/authService";
import type { LoginInput, SignupInput, SetupAdminInput } from "@/modules/auth/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isReady: boolean;
}

interface AuthContextValue extends AuthState {
  login: (input: LoginInput) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  setupAdmin: (input: SetupAdminInput) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readStored(): { user: User | null; token: string | null } {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.accessToken);
    const rawUser = localStorage.getItem(STORAGE_KEYS.user);
    const user = rawUser ? (JSON.parse(rawUser) as User) : null;
    return { token, user };
  } catch {
    return { token: null, user: null };
  }
}

function persist(token: string, user: User) {
  localStorage.setItem(STORAGE_KEYS.accessToken, token);
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
}

function clearStorage() {
  localStorage.removeItem(STORAGE_KEYS.accessToken);
  localStorage.removeItem(STORAGE_KEYS.user);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isReady: false,
  });

  useEffect(() => {
    const { token, user } = readStored();
    setState((s) => ({ ...s, user, token, isReady: true }));
  }, []);

  useEffect(() => {
    const handler = () => {
      clearStorage();
      setState((s) => ({ ...s, user: null, token: null }));
    };
    window.addEventListener("auth:logout", handler);
    return () => window.removeEventListener("auth:logout", handler);
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const { accessToken, user } = await authService.login(input);
    persist(accessToken, user);
    setState({ user, token: accessToken, isReady: true });
  }, []);

  const signup = useCallback(async (input: SignupInput) => {
    const { accessToken, user } = await authService.signup(input);
    persist(accessToken, user);
    setState({ user, token: accessToken, isReady: true });
  }, []);

  const setupAdmin = useCallback(async (input: SetupAdminInput) => {
    const { accessToken, user } = await authService.setupAdmin(input);
    persist(accessToken, user);
    setState({ user, token: accessToken, isReady: true });
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // ignore
    } finally {
      clearStorage();
      setState((s) => ({ ...s, user: null, token: null }));
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      login,
      signup,
      setupAdmin,
      logout,
    }),
    [state, login, signup, setupAdmin, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
