interface User {
  id: string;
  email: string;
  name: string
}

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
  rememberedEmail: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}
