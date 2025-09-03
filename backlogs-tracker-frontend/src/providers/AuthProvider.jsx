import { createContext, useContext, useEffect, useReducer } from "react";
import { loginService, registerService } from "services/auth";
import { addToken, clearToken, clearUser, getTokenObject } from "utils/storage";

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  checkingAuth: true,
  user: null,
};

function reducer(state, action) {
  if (action.type === "verified") {
    return {
      user: action.payload,
      isAuthenticated: action.payload ? true : false,
      checkingAuth: false,
    };
  } else if (action.type === "not_verified") {
    return {
      user: null,
      isAuthenticated: false,
      checkingAuth: false,
    };
  } else if (action.type === "login") {
    if (action.success) {
      return {
        user: action.payload,
        isAuthenticated: true,
        checkingAuth: false,
      };
    } else {
      return { user: null, isAuthenticated: false, checkingAuth: false };
    }
  } else if (action.type === "logout") {
    return {
      user: null,
      isAuthenticated: false,
      checkingAuth: false,
    };
  }
}

const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    function verifyUser() {
      let user = JSON.parse(localStorage.getItem("user"));
      const token = getTokenObject();
      if (
        !(user && token) ||
        !token.expires ||
        new Date(token.expires) < new Date()
      ) {
        dispatch({ type: "not_verified" });
        clearToken();
        clearUser();
        return;
      }
      // Ok
      dispatch({ type: "verified", payload: user });
    }
    verifyUser();
  }, []);

  async function login(username, password) {
    const res = await loginService(username, password);
    dispatch({
      type: "login",
      success: res.ok,
      payload: res.user,
    });

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(res.data?.user));
      addToken(res.data.token);
    }

    return res;
  }

  async function register(username, email, password) {
    return await registerService(username, email, password);
  }

  async function logout() {
    dispatch({ type: "logout" });
    clearToken();
    clearUser();
  }

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
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
