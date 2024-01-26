import { PencilSimple } from "@phosphor-icons/react";

export default function AddNotesButton({ openAddNotes, selectedNotes }) {
  function addNotes() {
    selectedNotes("");
    openAddNotes(true);
  }

  return (
    <button
      className="fixed p-4 bg-background-base-1-light dark:bg-background-base-1-dark rounded-full bottom-4 right-4 shadow-xl"
      onClick={addNotes}
    >
      <PencilSimple
        className="text-foreground-base-1-light dark:text-foreground-base-1-dark"
        size={24}
        weight="regular"
      />
    </button>
  );
}
