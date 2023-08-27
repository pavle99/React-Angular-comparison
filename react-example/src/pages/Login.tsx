import { useNavigate } from "react-router-dom";
import { useUser } from "../siteContext";
import { useEffect } from "react";

import "../styles/login.css";

function Login() {
  const { user, setUser } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/notes");
  }, [user, navigate]);

  function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    if (!data.get("username") || !data.get("password")) {
      alert("Morate uneti korisnicko ime i lozinku.");
      return;
    }

    const user = {
      username: data.get("username") as string,
      password: data.get("password") as string,
    };

    setUser(user.username);
    localStorage.setItem("user", user.username);

    navigate("/notes");
  }

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <form onSubmit={login} className="login-form">
          <input type="text" placeholder="Korisnicko ime" name="username" className="login-input" />
          <input type="password" placeholder="Sifra" name="password" className="login-input" />
          <button type="submit" className="login-button">
            Prijavi se
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
