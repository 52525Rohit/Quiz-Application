import { useEffect } from "react";
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

  useEffect(() => {
    (async () => {
      try {
        if (result !== [] && !username) throw new Error("Couldn't get Result");
        await postServerData(
          `${process.env.REACT_APP_API_URL}/api/result`,
          resultData,
          (data) => data,
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [username, email]);
};
