import { useEffect, useState } from "react";
import DogForm from "./DogForm";
import DogDetails from "./DogDetails";
import DogActions from "./DogActions";

const DogItem = ({ dog, adoption, onEdit, onSelect, onSaved }) => {
  const status = adoption?.status ?? "—";

  return (
    <tr onClick={() => onSelect(dog)}>
      <td>{dog.id}</td>
      <td>{dog.name}</td>
      <td>{dog.breed}</td>
      <td>{dog.age}</td>
      <td>
        <span className={`status status-${status.replace(" ", "-")}`}>
          {status}
        </span>
      </td>
      <td onClick={e => e.stopPropagation()}>
        <DogActions
          dog={dog}
          adoption={adoption}
          onEdit={onEdit}
          onSaved={onSaved}
        />
      </td>
    </tr>
  );
};

const DogTable = () => {
  const [dogs, setDogs] = useState([]);
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingDog, setEditingDog] = useState(null);
  const [selectedDog, setSelectedDog] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const [dogsRes, adoptionsRes] = await Promise.all([
        fetch("http://localhost:3001/api/dogs"),
        fetch("http://localhost:3001/api/adoptions")
      ]);

      setDogs(await dogsRes.json());
      setAdoptions(await adoptionsRes.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const getAdoptionForDog = (dogId) =>
    adoptions.find(a => a.dog_id === dogId);

  return (
    <div className="person-list">
      <div className="person-toolbar">
        <h2>Psy</h2>
        <button onClick={() => setEditingDog({})}>+ Dodaj psa</button>
      </div>

      {editingDog && (
        <DogForm
          dog={editingDog.id ? editingDog : null}
          onClose={() => setEditingDog(null)}
          onSaved={load}
        />
      )}

      {selectedDog && (
        <DogDetails
          dog={selectedDog}
          adoption={getAdoptionForDog(selectedDog.id)}
          onClose={() => setSelectedDog(null)}
        />
      )}

      {loading && <p>Ładowanie…</p>}

      {!loading && (
        <table className="person-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imię</th>
              <th>Rasa</th>
              <th>Wiek</th>
              <th>Status</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {dogs.map(d => (
              <DogItem
                key={d.id}
                dog={d}
                adoption={getAdoptionForDog(d.id)}
                onEdit={setEditingDog}
                onSelect={setSelectedDog}
                onSaved={load}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DogTable;