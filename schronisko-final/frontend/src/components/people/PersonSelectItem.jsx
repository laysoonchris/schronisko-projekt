import React from "react";

const PersonSelectItem = ({ person }) => {
  return (
    <option value={person.id}>
      {person.first_name} {person.last_name} ({person.email})
    </option>
  );
};

export default PersonSelectItem;