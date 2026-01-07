import { useEffect, useState } from "react";

const empty = { name: "", breed: "", age: "" };

const DogForm = ({ dog, onClose, onSaved }) => {
  const isEdit = !!dog?.id;
  const [form, setForm] = useState(empty);

  useEffect(() => {
    setForm(isEdit ? dog : empty);
  }, [dog, isEdit]);

  const submit = async e => {
    e.preventDefault();

    const url = isEdit
      ? `http://localhost:3001/api/dogs/${dog.id}`
      : "http://localhost:3001/api/dogs";

    const method = isEdit ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        age: Number(form.age)
      })
    });

    onSaved();
    onClose();
  };

  return (
    <form className="profile-card" onSubmit={submit}>
      <h2>{isEdit ? "Edytuj psa" : "Dodaj psa"}</h2>

      <input
        placeholder="Imię"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        placeholder="Rasa"
        value={form.breed}
        onChange={e => setForm({ ...form, breed: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Wiek"
        value={form.age}
        onChange={e => setForm({ ...form, age: e.target.value })}
        required
      />

      <div className="form-actions">
        <button type="submit">Zapisz</button>
        <button type="button" onClick={onClose}>Anuluj</button>
      </div>
    </form>
  );
};

export default DogForm;