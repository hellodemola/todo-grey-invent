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
    <div className="lg:flex justify-between items-center lg:my-2 w-full">
      <p className="lg:leading-[1.5em] leading-normal font-light text-[1.2em]">
        {title}
      </p>
      <div className="flex lg:gap-8 gap-4 lg:justify-between">
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
