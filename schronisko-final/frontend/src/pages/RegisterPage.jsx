import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";

const RegisterPage = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Błąd rejestracji");
      }

      setSuccess(true);
      setTimeout(() => navigate("/login"), 1200);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout title="Rejestracja">
      <form onSubmit={submit} className="auth-form">
        <input placeholder="Imię" required
          onChange={e => setForm({ ...form, first_name: e.target.value })} />

        <input placeholder="Nazwisko" required
          onChange={e => setForm({ ...form, last_name: e.target.value })} />

        <input placeholder="Numer telefonu" required
          onChange={e => setForm({ ...form, phone_number: e.target.value })} />

        <input type="email" placeholder="Email" required
          onChange={e => setForm({ ...form, email: e.target.value })} />

        <input type="password" placeholder="Hasło" required
          onChange={e => setForm({ ...form, password: e.target.value })} />

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">Konto utworzone 🎉</div>}

        <button type="submit">Zarejestruj się</button>

        <p className="auth-footer">
          Masz konto? <Link to="/login">Zaloguj się</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;