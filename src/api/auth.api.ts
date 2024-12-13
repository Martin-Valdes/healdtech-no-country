import { mockLoginService } from "../mock/login.mock";
import api from './interceptors';


interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface AuthResponse {
  
  email: string,
  rol: string
}

const useMock = import.meta.env.VITE_USE_MOCK === "true";
console.log('useMock', useMock);
console.log('apiUrl', import.meta.env.VITE_API_URL, import.meta.env.VITE_USE_MOCK);
export const authApi = {
  login: async (request: LoginRequest): Promise<AuthResponse> => {
    try {
      if (useMock) {
        console.log("Using mock service");
        return mockLoginService.login(request.email, request.password);
      }
      console.log("Using real API");
      const response = await api.post<AuthResponse>(
        `/healdtech/session/login`,
        request,
        { withCredentials: true } 
      );
      const responseGet = await api.get<AuthResponse>(
        `/healdtech/session/protected`,
      );
      console.log(responseGet);
  
      const { email, rol } = responseGet.data;
      return  {email, rol} ;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },
};

