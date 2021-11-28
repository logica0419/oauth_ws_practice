import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PostCodeRequest } from "./pb/rest/code";

const OAuth = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    const codeData = PostCodeRequest.create({ code: code });
    const buffer = PostCodeRequest.encode(codeData).finish();

    axios
      .post("/api/code", new Uint8Array(buffer))
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        alert("failed to get Access Token");
      });
  }, []);

  return <p>Authenticating...</p>;
};

export default OAuth;
