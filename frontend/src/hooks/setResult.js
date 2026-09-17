import { useEffect, useRef } from "react";
import { postServerData } from "../helper/helper";
import * as Action from "../Redux/result_reducer";

export const PushAnswer = (result) => async (dispatch) => {
  try {
    await dispatch(Action.pushResultAction(result));
  } catch (error) {
    console.log(error);
  }
};

export const updateResult = (index) => async (dispatch) => {
  try {
    dispatch(Action.updateResultAction(index));
  } catch (error) {
    console.log(error);
  }
};

export const usePublishResult = (resultData) => {
  const { result, username, email } = resultData;
  const resultDataRef = useRef(resultData);
  resultDataRef.current = resultData;

  useEffect(() => {
    (async () => {
      try {
        if (result.length === 0 && !username)
          throw new Error("Couldn't get Result");
        await postServerData(
          `/api/result`,
          resultDataRef.current,
          (data) => data,
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [result, username, email]);
};
