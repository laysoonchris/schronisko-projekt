const DogActions = ({ dog, adoption, onEdit, onSaved }) => {
  const status = adoption?.status;

  const remove = async () => {
    if (!window.confirm("Usunąć psa?")) return;
    await fetch(`http://localhost:3001/api/dogs/${dog.id}`, {
      method: "DELETE"
    });
    onSaved();
  };

  const returnDog = async () => {
    await fetch(
      `http://localhost:3001/api/adoptions/return/${dog.id}`,
      { method: "PUT" }
    );
    onSaved();
  };

  return (
    <>
      <button onClick={() => onEdit(dog)}>✏️</button>

      {status === "zaadoptowany" && (
        <button onClick={returnDog}>↩ Zwróć</button>
      )}

      <button onClick={remove}>🗑</button>
    </>
  );
};

export default DogActions;