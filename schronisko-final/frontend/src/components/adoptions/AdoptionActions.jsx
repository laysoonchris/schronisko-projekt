const AdoptionActions = ({ adoption, onSaved }) => {
  const { id, status, dog_id } = adoption;

  const changeStatus = async status => {
    await fetch(`http://localhost:3001/api/adoptions/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    onSaved();
  };

  const returnDog = async () => {
    await fetch(`http://localhost:3001/api/adoptions/return/${dog_id}`, {
      method: "PUT"
    });
    onSaved();
  };

  return (
    <>
      {status === "wolny" && (
        <button onClick={() => changeStatus("w trakcie")}>W trakcie</button>
      )}
      {status === "w trakcie" && (
        <button onClick={() => changeStatus("zaadoptowany")}>Zatwierdź</button>
      )}
      {status === "zaadoptowany" && (
        <button onClick={returnDog}>Zwróć</button>
      )}
    </>
  );
};

export default AdoptionActions;