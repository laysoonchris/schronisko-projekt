import AdoptionActions from "./AdoptionActions";

const AdoptionItem = ({ adoption, onSelect, onSaved }) => {
  const { id, dog_name, first_name, last_name, status } = adoption;

  return (
    <tr onClick={() => onSelect(adoption)}>
      <td>{id}</td>
      <td>{dog_name}</td>
      <td>{first_name ? `${first_name} ${last_name}` : "—"}</td>
      <td>
        <span className={`status status-${status.replace(" ", "-")}`}>
          {status}
        </span>
      </td>
      <td onClick={e => e.stopPropagation()}>
        <AdoptionActions adoption={adoption} onSaved={onSaved} />
      </td>
    </tr>
  );
};

export default AdoptionItem;