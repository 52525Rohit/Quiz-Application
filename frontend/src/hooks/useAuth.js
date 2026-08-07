import { useDispatch } from "react-redux";
import { postServerData } from "../helper/helper";
import { setUserId } from "../Redux/result_reducer";

export function useAuth() {
  const dispatch = useDispatch();

  async function login(email, password) {
    const data = await postServerData(
      `${process.env.REACT_APP_API_URL}/api/login`,
      {
        email,
        password,
      },
    );
    if (data.error) throw new Error(data.error);
    dispatch(setUserId({ fullName: data.fullName, email: data.email }));
  }

  async function signup(fullName, email, password, confirmPassword) {
    const data = await postServerData(
      `${process.env.REACT_APP_API_URL}/api/signup`,
      {
        fullName,
        email,
        password,
        confirmPassword,
      },
    );
    if (data.error) throw new Error(data.error);
  }

  return { login, signup };
}
