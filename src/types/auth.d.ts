interface User {
  id: string;
  email: string;
  name: string
}

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}
