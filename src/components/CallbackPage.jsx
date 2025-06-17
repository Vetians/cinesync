import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createSession, getUserAccount } from "../api/tmdb";
import { useAuth } from "../context/useAuth";

const CallbackPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const token = params.get("request_token");
  const hasRun = useRef(false);

  useEffect(() => {
    if (!token || hasRun.current) return;

    hasRun.current = true;

    const handleLogin = async () => {
      try {
        const sessionId = await createSession(token);
        const user = await getUserAccount(sessionId);
        login(sessionId, user);
        navigate("/");
      } catch (error) {
        console.error("Login Failed", error);
      }
    };

    handleLogin();
  }, [token, login, navigate]);

  return <div>Loading...</div>;
};

export default CallbackPage;