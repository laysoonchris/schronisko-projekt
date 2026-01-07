import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonItem from "./PersonItem";
import PersonForm from "./PersonForm";
import PersonDetailsModal from "./PersonDetailsModal";

const PersonTable = () => {
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingPerson, setEditingPerson] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/people");
      setPeople(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="person-list">
      <div className="person-toolbar">
        <h2>Użytkownicy</h2>
        <button onClick={() => setEditingPerson({})}>+ Dodaj</button>
      </div>

      {editingPerson && (
        <PersonForm
          person={editingPerson.id ? editingPerson : null}
          onClose={() => setEditingPerson(null)}
          onSaved={load}
        />
      )}

      {selectedPerson && (
        <PersonDetailsModal
          person={selectedPerson}
          onClose={() => setSelectedPerson(null)}
          onProfile={() => navigate(`/profile/${selectedPerson.id}`)}
        />
      )}

      {loading && <p>Ładowanie…</p>}

      {!loading && (
        <table className="person-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imię i nazwisko</th>
              <th>Email</th>
              <th>Rola</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {people.map(p => (
              <PersonItem
                key={p.id}
                person={p}
                onEdit={setEditingPerson}
                onSelect={setSelectedPerson}
                onSaved={load}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PersonTable;