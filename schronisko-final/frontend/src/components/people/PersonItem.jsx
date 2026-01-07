import PersonActions from "./PersonActions";

const PersonItem = ({ person, onEdit, onSelect, onSaved }) => {
  return (
    <tr onClick={() => onSelect(person)}>
      <td>{person.id}</td>
      <td>{person.first_name} {person.last_name}</td>
      <td>{person.email}</td>
      <td>{person.role}</td>
      <td onClick={e => e.stopPropagation()}>
        <PersonActions
          person={person}
          onEdit={onEdit}
          onSaved={onSaved}
        />
      </td>
    </tr>
  );
};

export default PersonItem;