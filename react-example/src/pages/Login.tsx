import { useNavigate } from "react-router-dom";
import { useUser } from "../siteContext";
import { useEffect } from "react";

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
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <input type="text" placeholder="Username" name="username" />
        <input type="password" placeholder="Password" name="password" />
        <button type="submit">Prijavi se</button>
      </form>
    </div>
  );
}

export default Login;
