import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';


interface AuthState {
  id: any | null;
  email: any | null;
  rol: string | null;
  name: string | null;
  isAuthenticated: boolean;
  login: (email: any, rol: string, id: any, name: string) => void;
  logout: () => void;
}


// Estado de autenticación usando Zustand
export const useAuthStore = create<AuthState>()(
  persist(
    devtools((set) => ({
      id: null,
      email: null,
      rol: null,
      name: null,
      isAuthenticated: false,
      login: (email, rol, id, name ) => {
        set({
          id:id,
          email: email,
          rol: rol,
          name: name, 
          isAuthenticated: true,
        });
      },
      logout: () => set({
        email: null,
        rol: null,
        isAuthenticated: false,
      }),
    })),
    {
      name: 'auth-storage', 
    }
    
  )
);
