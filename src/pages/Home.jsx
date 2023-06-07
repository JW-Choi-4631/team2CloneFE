import React, { useEffect } from "react";
import { ReactComponent as Logo } from "../icons/logo.svg"; // logo.svg를 컴포넌트 <Logo />로 사용하기 위한 import
import * as layout from "../styles/layouts";
import GreenBtn from "../components/GreenBtn";
import * as sVar from "../styles/styleVariables";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("Login")) {
      navigate("/");
    }
  });
  return (
    <layout.FlexColumnCenter style={{ height: "100vh", backgroundColor: `${sVar.bgReplColor}` }}>
      <Logo style={{ margin: "10px" }} />
      <p style={{ margin: "4px", fontSize: "15px" }}>Welcome to ChapGPT</p>
      <p style={{ margin: "16px", fontSize: "15px" }}>Log in with your OpenAI account to continue</p>
      <layout.FlexCenter>
        <GreenBtn>Log in</GreenBtn>
        <GreenBtn>Sign up</GreenBtn>
      </layout.FlexCenter>
    </layout.FlexColumnCenter>
  );
}

export default Home;
