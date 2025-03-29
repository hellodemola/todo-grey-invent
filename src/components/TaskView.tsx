import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <div className="flex justify-between items-center my-2 w-full">
      <p className="leading-[1.5em] font-light text-[1.2em]">{title}</p>
      <div className="flex gap-8 justify-between">
        <button onClick={handleEdit}>
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <button onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}
