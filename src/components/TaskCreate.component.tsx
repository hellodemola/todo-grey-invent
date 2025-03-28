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
    <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
      <input onChange={(e) => setUpdatedTitle(e.target.value)} />

      <div>
        <button
          disabled={!updatedTitle}
          onClick={() => handleEdit(updatedTitle)}
        >
          Save
        </button>
        <button onClick={handleCanel}>Cancel</button>
      </div>
    </div>
  );
}
