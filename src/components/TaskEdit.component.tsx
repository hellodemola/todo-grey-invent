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
    <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
      <input
        defaultValue={title}
        onChange={(e) => setUpdatedTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleEditFunc();
          }
        }}
      />

      <div>
        <button disabled={!updatedTitle} onClick={handleEditFunc}>
          Save
        </button>
        <button onClick={handleCanel}>Cancel</button>
      </div>
    </div>
  );
}
