import { useEffect, useRef } from "react";
import { postServerData } from "../helper/helper";
import * as Action from "../Redux/result_reducer";

export const updateResult = (index) => async (dispatch) => {
  try {
    dispatch(Action.updateResultAction(index));
  } catch (error) {
    console.log(error);
  }
};

const PUBLISHED_KEY = "quizResultPublished";

export const usePublishResult = (resultData, enabled = true) => {
  const { result, username, email } = resultData;
  const resultDataRef = useRef(resultData);
  resultDataRef.current = resultData;

  useEffect(() => {
    if (!enabled) return;
    if (localStorage.getItem(PUBLISHED_KEY)) return;
    if (result.length === 0 && !username) return;
    localStorage.setItem(PUBLISHED_KEY, "1");
    postServerData(`/api/result`, resultDataRef.current, (data) => data).catch(
      (error) => console.log(error),
    );
  }, [result, username, email, enabled]);
};
