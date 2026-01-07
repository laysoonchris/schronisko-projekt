import React from "react";
import FreeDogOption from "./FreeDogOption";

const FreeDogsSelect = ({ url }) => {
  const [dogs, setDogs] = React.useState([]);

  React.useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setDogs(data));
  }, [url]);

  return (
    <div className="form-group">
      <label htmlFor="dog_id">Pies do adopcji</label>

      <select id="dog_id" name="dog_id" required>
        <option value="">-- wybierz psa --</option>

        {dogs.map(dog => (
          <FreeDogOption key={dog.id} dog={dog} />
        ))}
      </select>
    </div>
  );
};

export default FreeDogsSelect;