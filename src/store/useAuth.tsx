import { create } from 'zustand';
import { persist } from 'zustand/middleware';


// Definición de la interfaz de estado de autenticación
interface AuthState {
  email: any | null;
  rol: string | null;
  isAuthenticated: boolean;
  login: (email: any, rol: string) => void;
  logout: () => void;
}


// Estado de autenticación usando Zustand
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: null,
      rol: null,  
      isAuthenticated: false,
      login: (email, rol) => {
        set({
          email: email,
          rol: rol,
          isAuthenticated: true,
        });
      },
      logout: () => set({
        email: null,
        rol: null,
        isAuthenticated: false,
      }),
    }),
    {
      name: 'auth-storage', 
    }
  )
);
