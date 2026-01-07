import { useEffect, useState } from "react";

const AdoptionChangeOwner = ({ dogId, onSaved }) => {
  const [people, setPeople] = useState([]);
  const [personId, setPersonId] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/people")
      .then(r => r.json())
      .then(setPeople);
  }, []);

  const submit = async () => {
    await fetch(`http://localhost:3001/api/adoptions/change-owner/${dogId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(personId)
    });
    onSaved();
  };

  return (
    <>
      <select value={personId} onChange={e => setPersonId(e.target.value)}>
        <option value="">Nowy opiekun</option>
        {people.map(p => (
          <option key={p.id} value={p.id}>
            {p.first_name} {p.last_name}
          </option>
        ))}
      </select>
      <button onClick={submit}>Zmień</button>
    </>
  );
};

export default AdoptionChangeOwner;