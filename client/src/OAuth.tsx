import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuth = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("/api/code", { code: code })
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        alert("failed to login");
      });
  }, []);

  return <p>Authenticating...</p>;
};

export default OAuth;
