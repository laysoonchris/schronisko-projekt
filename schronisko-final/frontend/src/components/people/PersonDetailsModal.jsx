const PersonDetailsModal = ({ person, onClose, onProfile }) => {
  return (
    <div className="modal">
      <div className="profile-card">
        <h2>{person.first_name} {person.last_name}</h2>

        <p><strong>Email:</strong> {person.email}</p>
        <p><strong>Telefon:</strong> {person.phone_number}</p>
        <p><strong>Rola:</strong> {person.role}</p>

        <div className="form-actions">
          <button onClick={onProfile}>Pełny profil</button>
          <button onClick={onClose}>Zamknij</button>
        </div>
      </div>
    </div>
  );
};

export default PersonDetailsModal;