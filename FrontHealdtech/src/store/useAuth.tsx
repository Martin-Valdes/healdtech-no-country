import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Login } from '../pages/login2';


interface AuthState {
  id: any | null;
  email: any | null;
  rol: string | null;
  isAuthenticated: boolean;
  login: (email: any, rol: string, id: any ) => void;
  logout: () => void;
}


// Estado de autenticación usando Zustand
export const useAuthStore = create<AuthState>()(
  persist(
    devtools((set) => ({
      id: null,
      email: null,
      rol: null,  
      isAuthenticated: false,
      login: (email, rol, id) => {
        set({
          id:id,
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
    })),
    {
      name: 'auth-storage', 
    }
    
  )
);
