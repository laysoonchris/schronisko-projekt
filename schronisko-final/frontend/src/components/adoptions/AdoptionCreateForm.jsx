import { useEffect, useState } from "react";

const AdoptionCreateForm = ({ onClose, onSaved }) => {
  const [people, setPeople] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [personId, setPersonId] = useState("");
  const [dogId, setDogId] = useState("");
<<<<<<< Updated upstream
  const [description, setDescription] = useState("");
=======
>>>>>>> Stashed changes

  useEffect(() => {
    fetch("http://localhost:3001/api/people").then(r => r.json()).then(setPeople);
    fetch("http://localhost:3001/api/adoptions/free/list")
      .then(r => r.json())
      .then(setDogs);
  }, []);

  const submit = async e => {
    e.preventDefault();
<<<<<<< Updated upstream
    await fetch("http://localhost:3001/api/adoptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        person_id: personId,
        dog_id: dogId,
        description
      })
    });

=======
    await fetch("http://localhost:3001/api/adoptions/adopt", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        person_id: personId,
        dog_id: dogId
      })
    });
>>>>>>> Stashed changes
    onSaved();
    onClose();
  };

  return (
    <form className="profile-card" onSubmit={submit}>
      <h2>Adoptuj psa</h2>

      <select value={dogId} onChange={e => setDogId(e.target.value)} required>
<<<<<<< Updated upstream
        <option value="">-- Wybierz psa --</option>
=======
        <option value="">Pies</option>
>>>>>>> Stashed changes
        {dogs.map(d => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>

      <select value={personId} onChange={e => setPersonId(e.target.value)} required>
<<<<<<< Updated upstream
        <option value="">-- Wybierz osobe --</option>
=======
        <option value="">Osoba</option>
>>>>>>> Stashed changes
        {people.map(p => (
          <option key={p.id} value={p.id}>
            {p.first_name} {p.last_name}
          </option>
        ))}
      </select>

<<<<<<< Updated upstream
      <input
        placeholder="Proszę podać dodatkowe informacje: warunki zamieszkania, czas na zwierzę oraz swój wiek
        
        "
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

=======
>>>>>>> Stashed changes
      <div className="form-actions">
        <button type="submit">Adoptuj</button>
        <button type="button" onClick={onClose}>Anuluj</button>
      </div>
    </form>
  );
};

export default AdoptionCreateForm;