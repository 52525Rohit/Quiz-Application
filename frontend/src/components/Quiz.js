import React, { useEffect, useState, useCallback, useRef } from "react";
import Questions from "./Questions";

import { MoveNextQuestion, MovePrevQuestion } from "../hooks/FetchQuestion";
import { updateResult } from "../hooks/setResult";

import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const QUESTION_TIME = 20;
const TIMER_KEY = "quizTimer";

function loadStoredTimer() {
  try {
    return JSON.parse(localStorage.getItem(TIMER_KEY));
  } catch {
    return null;
  }
}

export default function Quiz() {
  const [check, setChecked] = useState(undefined);
  const [activeIndex, setActiveIndex] = useState(
    () => loadStoredTimer()?.activeIndex ?? 0,
  );
  const [deadline, setDeadline] = useState(
    () => loadStoredTimer()?.deadline ?? Date.now() + QUESTION_TIME * 1000,
  );
  const [timeLeft, setTimeLeft] = useState(() => {
    const dl = loadStoredTimer()?.deadline ?? Date.now() + QUESTION_TIME * 1000;
    return Math.max(0, Math.round((dl - Date.now()) / 1000));
  });

  const result = useSelector((state) => state.result.result);
  const { queue, trace } = useSelector((state) => state.questions);
  const dispatch = useDispatch();
  const isLocked = trace < activeIndex;
  const handledDeadlineRef = useRef(null);

  const advanceActiveQuestion = useCallback(() => {
    if (result[activeIndex] === undefined) {
      dispatch(updateResult({ trace: activeIndex, checked: check }));
    }
    setActiveIndex((i) => i + 1);
    setDeadline(Date.now() + QUESTION_TIME * 1000);
    setTimeLeft(QUESTION_TIME);
    setChecked(undefined);
  }, [result, activeIndex, dispatch, check]);

  const onNext = useCallback(() => {
    if (trace >= queue.length) return;
    if (trace === activeIndex) {
      advanceActiveQuestion();
    }
    dispatch(MoveNextQuestion());
  }, [trace, queue.length, activeIndex, advanceActiveQuestion, dispatch]);

  function onPrev() {
    if (trace > 0) {
      dispatch(MovePrevQuestion());
    }
  }

  function onChecked(check) {
    setChecked(check);
  }

  useEffect(() => {
    localStorage.setItem(TIMER_KEY, JSON.stringify({ activeIndex, deadline }));
  }, [activeIndex, deadline]);

  useEffect(() => {
    if (queue.length === 0) return;
    if (activeIndex >= queue.length) {
      localStorage.removeItem(TIMER_KEY);
      return;
    }
    if (timeLeft <= 0) {
      if (handledDeadlineRef.current === deadline) return;
      handledDeadlineRef.current = deadline;
      if (trace === activeIndex) {
        onNext();
      } else {
        advanceActiveQuestion();
      }
      return;
    }
    const id = setTimeout(() => {
      setTimeLeft(Math.max(0, Math.round((deadline - Date.now()) / 1000)));
    }, 1000);
    return () => clearTimeout(id);
  }, [
    timeLeft,
    activeIndex,
    queue.length,
    trace,
    deadline,
    onNext,
    advanceActiveQuestion,
  ]);

  if (queue.length > 0 && result.length >= queue.length) {
    return <Navigate to={"/result"}>replace="true"</Navigate>;
  }

  return (
    <div className="container">
      <LogoutButton />
      <div className="header-row">
        <h1 className="title text-light">Quiz Application</h1>
        {!isLocked && (
          <div className={`timer-badge ${timeLeft <= 5 ? "urgent" : ""}`}>
            {timeLeft}
          </div>
        )}
      </div>

      <Questions onChecked={onChecked} locked={isLocked} />

      <div className="grid">
        {trace > 0 ? (
          <button className="btn prev" onClick={onPrev}>
            Prev
          </button>
        ) : (
          <div></div>
        )}
        <button className="btn next" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}
