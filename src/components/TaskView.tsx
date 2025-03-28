export function TaskViewComp({
  title,
  handleDelete,
  handleEdit,
}: {
  title: string;
  handleEdit: () => void;
  handleDelete: () => void;
}) {
  return (
    <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
      <p>{title}</p>
      <div>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
