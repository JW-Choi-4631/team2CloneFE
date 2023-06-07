import React from "react";
import styled from "styled-components";
import * as layout from "../styles/layouts";
import * as style from "../styles/styles";
import * as sVar from "../styles/styleVariables";
import Send from "../icons/Send";
import { useState, useRef, useEffect } from "react";
import { useQueryClient } from "react-query";
import { gptAPI } from "../axios/api";

function MainTextInput({ isLoading, handleSubmit, focusedChat, credit }) {
  const INIT_HEIGHT = "24px";
  const INIT_INPUT_VALUE = "";
  const [inputHeight, setInputHeight] = useState(INIT_HEIGHT);
  const [inputValue, setInputValue] = useState(INIT_INPUT_VALUE);
  const [charCount, setCharCount] = useState([inputValue.length])
  const [lineCount, setLineCount] = useState(1);
  const [creditHeight, setCreditHeight] = useState("125px")
  const textAreaRef = useRef(null);

  useEffect(() => { // 라인 계산 및 textarea 넓이 변경 섹션
    const countLines = () => {
      if (textAreaRef.current) {
        const lineHeight = parseInt(getComputedStyle(textAreaRef.current)["line-height"], 10);
        let lines= Math.trunc(textAreaRef.current.scrollHeight / lineHeight); // 스크롤 포함 높이 / 스크롤을 제외한 높이
        if (lines > lineCount) {
          setCharCount([...charCount, inputValue.length])
          setLineCount(lines)
          setInputHeight(`${lines * 24}px`)
        } else {
          if (charCount[lineCount - 1] > inputValue.length) {
            const filtered = charCount.filter(v => v <= inputValue.length)
            setCharCount([...filtered])
            setLineCount(filtered.length)
            setInputHeight(`${filtered.length * 24}px`)
          }
        }
        if (lines === 1 && creditHeight !== "125px") {
          setCreditHeight("125px")
        } else {
          setCreditHeight(`${125 + (lines - 1) * 25}px`);
        }
      }
    };
    countLines();
  }, [inputValue]);


  const submitHandler = async () => {
    // mutation과 연결되어있기 때문에 비동기처리를 실행하며, 그렇기 때문에 input을 비워주기 위해서는 해당 비동기 처리가 끝나고 나서 setInputValue를 초기화해야 함
    if (focusedChat === null) { // 초점 맞춰진 대화가 없으면 새 대화 시작, 그렇지 않을시 대화 이어나가기
      await handleSubmit(inputValue);
    } else {
      await handleSubmit(inputValue, focusedChat)
    }
    setInputHeight(INIT_HEIGHT);
    setInputValue(INIT_INPUT_VALUE) // InputValue 비워주기
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { // event.nativeEvent.isComposing이 false일 때만 동작 (맨 마지막 글자 재출력 방지)
      event.preventDefault() // 엔터키 쳤을 때의 줄바꿈 막기
      if (!isLoading) {
        submitHandler()
      }
      
    }
  }

  return (
    <>
      <style.CreditContainer style={{bottom: `${creditHeight}`}} credit={credit}>Remaining credits : {credit}</style.CreditContainer>
      <style.MainInputContainer>
        <style.MainInput height={inputHeight} ref={textAreaRef} onKeyDown={handleKeyDown} onChange={(event) => setInputValue(event.target.value)} value={inputValue} placeholder="Send a message..."></style.MainInput>
        <Send isLoading={isLoading} iconColor={sessionStorage.getItem("userHex")} isContent={!!inputValue} handleSubmit={focusedChat === null ? () => submitHandler(inputValue) : () => submitHandler(inputValue, focusedChat)} />
      </style.MainInputContainer>
    </>
  );
}

export default MainTextInput;
