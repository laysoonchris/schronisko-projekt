import React from "react";
import PersonSelectItem from "./PersonSelectItem";

const PersonSelect = ({ url }) => {
  const [people, setPeople] = React.useState([]);

  React.useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setPeople(data));
  }, [url]);

  return (
    <div className="form-group">
      <label htmlFor="person_id">Osoba adoptująca</label>

      <select id="person_id" name="person_id" required>
        <option value="">-- wybierz osobę --</option>

        {people.map(person => (
          <PersonSelectItem key={person.id} person={person} />
        ))}
      </select>
    </div>
  );
};

export default PersonSelect;