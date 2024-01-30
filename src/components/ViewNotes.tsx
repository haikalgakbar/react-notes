import { DotsThree, ArrowLeft } from "@phosphor-icons/react";
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
      <section className="fixed top-8 right-0 bottom-0 left-0 pb-6 bg-background-base-1-light dark:bg-background-base-1-dark rounded-t-2xl overflow-scroll transition-all duration-500 ease-in-out">
        <header className="fixed top-6 bg-background-base-1-light dark:bg-background-base-1-dark flex w-full justify-between items-center p-4 rounded-t-2xl">
          <button type="button" onClick={() => isOpen(false)}>
            <ArrowLeft
              className="text-foreground-base-1-light dark:text-foreground-base-1-dark"
              size={24}
            />
          </button>
          <h1 className="text-foreground-base-1-light dark:text-foreground-base-1-dark font-semibold">{`${note.date.slice(0, 3)}, ${note.date.slice(8, 10)} ${note.date.slice(4, 7)}`}</h1>
          <button onClick={() => setIsOptionOpen(true)}>
            <DotsThree
              className="text-foreground-base-1-light dark:text-foreground-base-1-dark"
              size={24}
            />
          </button>
          {isOptionOpen && (
            <div
              ref={menuRef}
              className="absolute top-8 right-4 bg-background-base-1-light dark:bg-background-base-1-dark shadow-md border-[.5px] rounded-md border-stroke-base-3-light dark:border-stroke-base-3-dark"
            >
              <div className="flex flex-col p-1">
                <button
                  className="px-12 py-2 pl-0 rounded-md hover:bg-background-hover-1-light dark:hover:bg-background-hover-1-dark"
                  onClick={editNotes}
                >
                  <div className="w-min ml-2 text-foreground-base-1-light dark:text-foreground-base-1-dark">
                    Edit
                  </div>
                </button>
                <button
                  className="px-12 py-2 pl-0 rounded-md hover:bg-background-hover-1-light dark:hover:bg-background-hover-1-dark"
                  onClick={() => {
                    deleteNotes(note.id);
                  }}
                >
                  <div className="w-min ml-2 text-foreground-base-1-light dark:text-foreground-base-1-dark">
                    Delete
                  </div>
                </button>
              </div>
            </div>
          )}
        </header>
        <section className="mt-14 px-4 flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-foreground-base-1-light dark:text-foreground-base-1-dark">
            {note.title}
          </h1>
          <p className="text-foreground-base-2-light dark:text-foreground-base-2-dark">
            {note.content}
          </p>
        </section>
      </section>
    </>
  );
}
