import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PersonDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [person, setPerson] = useState(null);
  const [adoptions, setAdoptions] = useState([]);
  const [loadingPerson, setLoadingPerson] = useState(true);
  const [loadingAdoptions, setLoadingAdoptions] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/api/people/${id}`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setPerson(data);
        setLoadingPerson(false);
      })
      .catch(() => setLoadingPerson(false));

    fetch(`http://localhost:3001/api/adoptions/person/${id}`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setAdoptions(data);
        setLoadingAdoptions(false);
      })
      .catch(() => setLoadingAdoptions(false));
  }, [id]);

  if (loadingPerson) return null;
  if (!person) return <p>Nie znaleziono użytkownika</p>;

  return (
    <main className="profile-wrapper split">
      <button className="back-button" onClick={() => navigate("/admin/people")}>
        ←
      </button>

      <section className="profile-card">
        <h1>Profil użytkownika</h1>
        <div className="profile-row"><span>ID</span><strong>{person.id}</strong></div>
        <div className="profile-row"><span>Imię</span><strong>{person.first_name}</strong></div>
        <div className="profile-row"><span>Nazwisko</span><strong>{person.last_name}</strong></div>
        <div className="profile-row"><span>Email</span><strong>{person.email}</strong></div>
        <div className="profile-row"><span>Telefon</span><strong>{person.phone_number}</strong></div>
        <div className="profile-row"><span>Rola</span><strong>{person.role}</strong></div>
        <div className="profile-row"><span>Zweryfikowan'a/y</span><strong>{person.verified ? "✅" : "❌"}</strong></div>
      </section>

      <section className="profile-card">
        <h2>Adopcje</h2>

        {loadingAdoptions && <p>Ładowanie…</p>}
        {!loadingAdoptions && adoptions.length === 0 && <p>Brak adopcji</p>}

        {adoptions.map(a => (
          <div key={a.id} className="adoption-item">
            <strong>ID:</strong> {a.id}<br />
            <strong>Pies:</strong> {a.name} ({a.breed}, {a.age} lat)
          </div>
        ))}
      </section>
    </main>
  );
};

export default PersonDetailsPage;