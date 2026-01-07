import React from "react";

const FreeDogOption = ({ dog }) => {
  return (
    <option value={dog.id}>
      {dog.name} ({dog.breed})
    </option>
  );
};

export default FreeDogOption;