import React, { useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import "../styles/Main.css";
import { useAuth } from "../hooks/useAuth";
import Toast from "./Toast";
import PasswordInput from "./PasswordInput";

export default function Login() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(
    location.state?.registered ? "Account created! Please log in." : null,
  );
  const [notRegisteredEmail, setNotRegisteredEmail] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setNotRegisteredEmail(null);
    const email = emailRef.current?.value;
    const password = passRef.current?.value;
    try {
      await login(email, password);
      navigate("/home", { state: { loggedIn: true } });
    } catch (err) {
      if (err.message === "NOT_REGISTERED") {
        setNotRegisteredEmail(email);
        setError(`No account found for ${email}. Please sign up.`);
      } else {
        setError(err.message || "Something went wrong");
      }
    }
  }

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>
      <h2 className="text-light" style={{ textAlign: "center" }}>
        Login
      </h2>

      <form
        id="form"
        onSubmit={onSubmit}
        style={{ flexDirection: "column", alignItems: "center", gap: "1em" }}
      >
        <input
          className="userid"
          ref={emailRef}
          type="email"
          name="email"
          defaultValue={searchParams.get("email") || ""}
          placeholder="Email*"
          required
        />
        <PasswordInput inputRef={passRef} placeholder="Password*" />
        {notRegisteredEmail && (
          <p style={{ color: "#ff2a66", textAlign: "center" }}>
            No account found for {notRegisteredEmail}.{" "}
            <Link
              to={`/signup?email=${encodeURIComponent(notRegisteredEmail)}`}
            >
              Sign up
            </Link>{" "}
            to continue.
          </p>
        )}
        <div className="start">
          <button className="btn" type="submit">
            Login
          </button>
        </div>
      </form>

      <p className="text-light" style={{ textAlign: "center" }}>
        No account? <Link to="/signup">Sign up</Link>
      </p>

      <Toast message={error} type="error" onClose={() => setError(null)} />
      <Toast message={notice} type="success" onClose={() => setNotice(null)} />
    </div>
  );
}
