const PersonActions = ({ person, onEdit, onSaved }) => {
  const remove = async () => {
    if (!window.confirm("Usunąć użytkownika?")) return;

    await fetch(`http://localhost:3001/api/people/${person.id}`, {
      method: "DELETE"
    });

    onSaved();
  };

  return (
    <>
      <button title="Edytuj" onClick={() => onEdit(person)}>✏️</button>
      <button title="Usuń" onClick={remove}>🗑</button>
    </>
  );
};

export default PersonActions;