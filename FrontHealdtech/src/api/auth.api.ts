import { mockLoginService } from "../mock/login.mock";
import api from "./interceptors";

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
  email: string;
  rol: string;
  id: string;
  name: string;
}

const useMock = import.meta.env.VITE_USE_MOCK === "true";
console.log("useMock", useMock);
console.log(
  "apiUrl",
  import.meta.env.VITE_API_URL,
  import.meta.env.VITE_USE_MOCK
);
export const authApi = {
  login: async (request: LoginRequest): Promise<AuthResponse> => {
    try {
      if (useMock) {
        console.log("Using mock service");
        return mockLoginService.login(request.email, request.password);
      }
      await api.post<AuthResponse>(
        `/healdtech/session/login`,
        request,
        { withCredentials: true }
      );
      const responseGet = await api.get<AuthResponse>(
        `/healdtech/session/protected`
      );
      const { email, rol, id, name } = responseGet.data;
      
      return { email, rol, id, name };
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },
};
