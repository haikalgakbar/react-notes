import { DotsThreeVertical, ArrowLeft } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

import { NOTES_KEY as key } from "../utils/const";

export default function ViewNotes({ isOpen, note, edit }) {
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const menuRef = useRef(null);

  const allNotes = JSON.parse(localStorage.getItem(key)) ?? [];

  function deleteNotes(id) {
    const findNotes = allNotes.findIndex((notes) => notes.id === id);
    const newNotes = allNotes;
    newNotes.splice(findNotes, 1);
    localStorage.setItem(key, JSON.stringify(newNotes));
    isOpen(false);
  }

  function editNotes() {
    edit(true);
    isOpen(false);
  }

  function wordCount(words) {
    const count = words.split("").length;
    return count > 1 ? `${count} characters` : `${count} character`;
  }

  useEffect(() => {
    const closeMenu = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setIsOptionOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  });

  return (
    <>
      <section className="absolute z-10 flex max-h-dvh min-h-dvh w-full flex-col overflow-scroll bg-background-base-1-light dark:bg-background-base-1-dark">
        <header className="sticky top-0 flex items-center justify-between bg-background-base-1-light p-4 dark:bg-background-base-1-dark">
          <button type="button" onClick={() => isOpen(false)}>
            <ArrowLeft
              className="text-foreground-base-1-light dark:text-foreground-base-1-dark"
              size={24}
            />
          </button>
          <button onClick={() => setIsOptionOpen(true)}>
            <DotsThreeVertical
              className="text-foreground-base-1-light dark:text-foreground-base-1-dark"
              size={24}
            />
          </button>
          {isOptionOpen && (
            <div
              ref={menuRef}
              className="absolute right-4 top-8 rounded-md border-[.5px] border-stroke-base-3-light bg-background-base-1-light shadow-md dark:border-stroke-base-3-dark dark:bg-background-base-1-dark"
            >
              <div className="flex flex-col p-1">
                <button
                  className="rounded-md px-12 py-2 pl-0 hover:bg-background-hover-1-light dark:hover:bg-background-hover-1-dark"
                  onClick={editNotes}
                >
                  <div className="ml-2 w-min text-foreground-base-1-light dark:text-foreground-base-1-dark">
                    Edit
                  </div>
                </button>
                <button
                  className="rounded-md px-12 py-2 pl-0 hover:bg-background-hover-1-light dark:hover:bg-background-hover-1-dark"
                  onClick={() => {
                    deleteNotes(note.id);
                  }}
                >
                  <div className="ml-2 w-min text-foreground-base-1-light dark:text-foreground-base-1-dark">
                    Delete
                  </div>
                </button>
              </div>
            </div>
          )}
        </header>
        <section className="flex flex-1 flex-col gap-2 p-4">
          <h1 className="text-2xl font-semibold text-foreground-base-1-light dark:text-foreground-base-1-dark">
            {note.title}
          </h1>
          <div className="flex gap-2">
            <h1 className="text-sm text-foreground-base-3-light dark:text-foreground-base-3-dark">
              {`${note.date.slice(0, 3)}, ${note.date.slice(8, 10)} ${note.date.slice(4, 7)}`}
            </h1>
            <h1 className="text-sm text-foreground-base-3-light dark:text-foreground-base-3-dark">
              |
            </h1>
            <h1 className="text-sm text-foreground-base-3-light dark:text-foreground-base-3-dark">
              {wordCount(note.content)}
            </h1>
          </div>
          <p className="mt-2 text-foreground-base-2-light dark:text-foreground-base-2-dark">
            {note.content}
          </p>
        </section>
      </section>
    </>
  );
}
