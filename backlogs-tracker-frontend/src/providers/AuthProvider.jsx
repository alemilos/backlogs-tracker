import { createContext, useContext, useReducer } from "react";
import { loginService, registerService } from "services/auth";

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
};

function reducer(state, action) {
  if (action.type === "login") {
    if (action.success) {
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    } else {
      return { user: null, isAuthenticated: false };
    }
  }
}

const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(reducer, initialState);

  async function login(username, password) {
    const res = await loginService(username, password);
    dispatch({
      type: "login",
      success: res.ok,
      payload: res.user,
    });

    return res;
  }

  async function register(username, email, password) {
    return await registerService(username, email, password);
  }

  return (
    <AuthContext.Provider value={{ auth, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth can be used only within an AuthProvider");
  }
  return context;
}

export default AuthProvider;
