import { useState } from "react";

export default function TaskEditComp({
  title,
  handleEdit,
  handleCanel,
}: {
  title: string;
  handleEdit: (update: string) => void;
  handleCanel: () => void;
}) {
  const [updatedTitle, setUpdatedTitle] = useState<string>();
  const handleEditFunc = () => {
    if (!updatedTitle) return;
    return handleEdit(updatedTitle);
  };
  return (
    <div className="lg:flex justify-between items-center my-2 w-full">
      <input
        defaultValue={title}
        onChange={(e) => setUpdatedTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleEditFunc();
          }
        }}
        className="border lg:w-100 p-1"
      />

      <div className="flex lg:gap-8 gap-4 lg:justify-between">
        <button disabled={!updatedTitle} onClick={handleEditFunc}>
          Save
        </button>
        <button onClick={handleCanel}>Cancel</button>
      </div>
    </div>
  );
}
