import React from "react";
import "../styles/Result.css";
import { Link, Navigate } from "react-router-dom";

import ResultTable from "./ResultTable";
import LogoutButton from "./LogoutButton";
import { useDispatch, useSelector } from "react-redux";
import { resetAllAction } from "../Redux/question_reducer";
import { resetQuizResultAction } from "../Redux/result_reducer";
import {
  attempts_Number,
  earnPoints_Number,
  flagResult,
} from "../helper/helper";
import { usePublishResult } from "../hooks/setResult";

export default function Result() {
  const dispatch = useDispatch();
  const { queue, answers } = useSelector((state) => state.questions);
  const { result, userId, email } = useSelector((state) => state.result);

  const totalPoints = queue.length * 5;
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answers, 5);
  const flag = flagResult(totalPoints, earnPoints);
  const hasCompletedQuiz = queue.length > 0 && result.length >= queue.length;

  usePublishResult(
    {
      result,
      username: userId,
      email,
      attempts,
      points: earnPoints,
      achieved: flag ? "Passed" : "Failed",
    },
    hasCompletedQuiz,
  );

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetQuizResultAction());
  }

  if (!hasCompletedQuiz) {
    return <Navigate to={"/home"} replace />;
  }

  return (
    <div className="container">
      <LogoutButton />
      <h1 className="title text-light">Quiz Application</h1>

      <div className="result flex-center">
        <div className="flex">
          <span>username</span>
          <span className="bold">{userId}</span>
        </div>

        <div className="flex">
          <span>Total Quiz Points : </span>
          <span className="bold">{totalPoints || 0}</span>
        </div>

        <div className="flex">
          <span>Total Questions</span>
          <span className="bold">{queue.length || 0}</span>
        </div>

        <div className="flex">
          <span>Total Attempts : </span>
          <span className="bold">{attempts || 0}</span>
        </div>

        <div className="flex">
          <span>Total Earn Points</span>
          <span className="bold">{earnPoints || 0}</span>
        </div>

        <div className="flex">
          <span>Quiz Result : </span>
          <span
            style={{ color: `${flag ? "#2aff95" : "#ff2a66"}` }}
            className="bold"
          >
            {flag ? "passed" : "failed"}
          </span>
        </div>
      </div>

      <div className="start">
        <Link className="btn" to={"/home"} onClick={onRestart}>
          Restart
        </Link>
      </div>

      <div className="container">
        <h2 className="text-light" style={{ textAlign: "center" }}>
          Your Quiz History
        </h2>
        <ResultTable email={email}></ResultTable>
      </div>
    </div>
  );
}
