import { useEffect, useState } from "react";

const empty = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  role: "user"
};

const PersonForm = ({ person, onClose, onSaved }) => {
  const isEdit = !!person?.id;
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(isEdit ? {
      first_name: person.first_name,
      last_name: person.last_name,
      email: person.email,
      phone_number: person.phone_number,
      role: person.role
    } : empty);
  }, [isEdit, person]);

  const submit = async e => {
    e.preventDefault();
    if (saving) return;

    setSaving(true);

    const url = isEdit
      ? `http://localhost:3001/api/people/${person.id}`
      : "http://localhost:3001/api/people";

    const method = isEdit ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    onSaved();
    onClose();
  };

  return (
    <form className="profile-card" onSubmit={submit}>
      <h2>{isEdit ? "Edytuj użytkownika" : "Dodaj użytkownika"}</h2>

      <input value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} placeholder="Imię" required />
      <input value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} placeholder="Nazwisko" required />
      <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" required />
      <input value={form.phone_number} onChange={e => setForm({ ...form, phone_number: e.target.value })} placeholder="Telefon" />

      <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <div className="form-actions">
        <button type="submit" disabled={saving}>Zapisz</button>
        <button type="button" onClick={onClose}>Anuluj</button>
      </div>
    </form>
  );
};

export default PersonForm;