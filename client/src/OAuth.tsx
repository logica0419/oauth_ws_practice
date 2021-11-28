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

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/code", false);
    xhr.addEventListener("load", function () {
      if (xhr.status < 300) {
        navigate("/");
      } else {
        alert("failed to login");
      }
    });
    xhr.send(buffer);
  }, []);

  return <p>Authenticating...</p>;
};

export default OAuth;
