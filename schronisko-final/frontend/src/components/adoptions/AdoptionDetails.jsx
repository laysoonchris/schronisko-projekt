import { useState } from "react";

const AdoptionDetails = ({ adoption, onClose, onSaved }) => {
  const [description, setDescription] = useState(adoption.description ?? "");

  const save = async () => {
    await fetch(`http://localhost:3001/api/adoptions/${adoption.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...adoption,
        description
      })
    });
    onSaved();
    onClose();
  };

  return (
    <div className="modal">
      <div className="profile-card">
        <h2>Szczegóły adopcji</h2>

        <p><strong>Pies:</strong> {adoption.dog_name}</p>
        <p><strong>Status:</strong> {adoption.status}</p>

        <textarea
          placeholder="Opis"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <div className="form-actions">
          <button onClick={save}>Zapisz</button>
          <button onClick={onClose}>Zamknij</button>
        </div>
      </div>
    </div>
  );
};

export default AdoptionDetails;