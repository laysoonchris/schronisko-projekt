import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;
  if (!user) return null;

  return (
    <main className="profile-wrapper">
      <section className="profile-card">
        <h1>Mój profil</h1>

        <div className="profile-row">
          <span>Imię</span>
          <strong>{user.first_name}</strong>
        </div>

        <div className="profile-row">
          <span>Nazwisko</span>
          <strong>{user.last_name}</strong>
        </div>

        <div className="profile-row">
          <span>Email</span>
          <strong>{user.email}</strong>
        </div>

        <div className="profile-row">
          <span>Telefon</span>
          <strong>{user.phone_number}</strong>
        </div>

        <div className="profile-row">
          <span>Rola</span>
          <strong className={`role ${user.role}`}>
            {user.role === "admin" ? "Administrator" : "Użytkownik"}
          </strong>
        </div>

        <div className="profile-row"><span>Zweryfikowan'a/y</span><strong>{user.verified ? "✅" : "❌"}</strong></div>
      </section>

      {/* 🔽 Sekcja tylko dla USERA */}
      {user.role === "user" && (
        <section className="profile-card">
          <h2>Moje adopcje</h2>
          <p>Tu będzie lista Twoich zgłoszeń adopcyjnych.</p>
        </section>
      )}

      {/* 🔽 Sekcja tylko dla ADMINA */}
      {user.role === "admin" && (
        <section className="profile-card admin">
          <h2>Panel administratora</h2>
          <ul>
            <li>Zarządzanie psami</li>
            <li>Zarządzanie użytkownikami</li>
            <li>Zarządzanie adopcjami</li>
          </ul>
        </section>
      )}
    </main>
  );
};

export default ProfilePage;
