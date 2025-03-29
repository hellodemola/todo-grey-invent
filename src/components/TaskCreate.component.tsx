import { useState } from "react";

export default function TaskCreateComp({
  handleEdit,
  handleCanel,
}: {
  handleEdit: (update: string) => void;
  handleCanel: () => void;
}) {
  const [updatedTitle, setUpdatedTitle] = useState<string>("");
  return (
    <div className="my-4">
      <input
        autoFocus
        onChange={(e) => setUpdatedTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && updatedTitle) {
            handleEdit(updatedTitle);
          }
        }}
        className="border rounded-md w-full my-4 p-2"
      />

      <div className="flex gap-4">
        <button
          disabled={!updatedTitle}
          onClick={() => handleEdit(updatedTitle)}
          className="bg-[blue] border cursor-pointer p-2 px-4 w-full rounded-md"
        >
          Save
        </button>
        <button
          onClick={handleCanel}
          className="border-[grey] cursor-pointer border p-2 px-4 w-full rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
