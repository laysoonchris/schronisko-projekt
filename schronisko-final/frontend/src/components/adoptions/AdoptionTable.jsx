import { useEffect, useState } from "react";
import AdoptionItem from "./AdoptionItem";
import AdoptionCreateForm from "./AdoptionCreateForm";
import AdoptionDetails from "./AdoptionDetails";

const AdoptionTable = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/adoptions");
      setAdoptions(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = adoptions.filter(a =>
    filter === "all" ? true : a.status === filter
  );

  return (
    <div className="person-list">
      <div className="person-toolbar">
        <h2>Adopcje</h2>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">Wszystkie</option>
          <option value="wolny">Wolne</option>
          <option value="w trakcie">W trakcie</option>
          <option value="zaadoptowany">Zaadoptowane</option>
        </select>
        <button onClick={() => setShowCreate(true)}>+ Adoptuj psa</button>
      </div>

      {showCreate && (
        <AdoptionCreateForm
          onClose={() => setShowCreate(false)}
          onSaved={load}
        />
      )}

      {selected && (
        <AdoptionDetails
          adoption={selected}
          onClose={() => setSelected(null)}
          onSaved={load}
        />
      )}

      {loading && <p>Ładowanie…</p>}

      {!loading && (
        <table className="person-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Pies</th>
              <th>Osoba</th>
              <th>Status</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <AdoptionItem
                key={a.id}
                adoption={a}
                onSelect={setSelected}
                onSaved={load}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdoptionTable;