const DogDetails = ({ dog, adoption, onClose }) => {
  return (
    <div className="modal">
      <div className="profile-card">
        <h2>Pies #{dog.id}</h2>

        <p><strong>Imię:</strong> {dog.name}</p>
        <p><strong>Rasa:</strong> {dog.breed}</p>
        <p><strong>Wiek:</strong> {dog.age}</p>

        <hr />

        <p><strong>Status:</strong> {adoption?.status ?? "brak"}</p>
        <p>
          <strong>Opiekun:</strong>{" "}
          {adoption?.first_name
            ? `${adoption.first_name} ${adoption.last_name}`
            : "—"}
        </p>
        <p><strong>Data:</strong> {adoption?.adoption_date ?? "—"}</p>

        <button onClick={onClose}>Zamknij</button>
      </div>
    </div>
  );
};

export default DogDetails;