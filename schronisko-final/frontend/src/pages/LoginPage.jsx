import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AuthLayout from "../components/layout/AuthLayout";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) throw new Error("Nieprawidłowy email lub hasło");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout title="Logowanie">
      <form onSubmit={submit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {error && <div className="auth-error">{error}</div>}

        <button type="submit">Zaloguj się</button>

        <p className="auth-footer">
          Nie masz konta? <Link to="/register">Zarejestruj się</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;