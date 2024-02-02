import { X, CheckCircle } from "@phosphor-icons/react";
import { notesObj } from "../utils/notesType";
import { useEffect, useRef, useState } from "react";

import { NOTES_KEY as key } from "../utils/const";

export default function AddNotes({ isOpen, note }) {
  const textAreaTitleRef = useRef(null);
  const textAreaContentRef = useRef(null);
  const [valueTitle, setValueTitle] = useState(note?.title || "");
  const [valueContent, setValueContent] = useState(note?.content || "");

  const currentDate = new Date().toDateString();

  const allNotes = JSON.parse(localStorage.getItem(key)) ?? [];

  useEffect(() => {
    if (textAreaTitleRef.current) {
      textAreaTitleRef.current.style = "auto";
      textAreaTitleRef.current.style.height =
        textAreaTitleRef.current.scrollHeight + "px";
    }
  }, [valueTitle]);

  useEffect(() => {
    if (textAreaContentRef.current) {
      textAreaContentRef.current.style = "auto";
      textAreaContentRef.current.style.height =
        textAreaContentRef.current.scrollHeight + "px";
    }
  }, [valueContent]);

  function handleAddNotes() {
    console.log("add notes");
    if (note.id) {
      const newNotes: notesObj = {
        id: note.id,
        title: valueTitle,
        content: valueContent,
        date: currentDate,
      };

      const findNotes = allNotes.findIndex((notes) => notes.id === note.id);

      const newNote = allNotes;
      newNote.splice(findNotes, 1, newNotes);
      localStorage.setItem(key, JSON.stringify(newNote));
      setValueTitle("");
      setValueContent("");
      isOpen(false);

      // return;
    }

    const newNotes: notesObj = {
      id: self.crypto.randomUUID(),
      title: valueTitle,
      content: valueContent,
      date: currentDate,
    };

    const value = JSON.parse(localStorage.getItem(key)) ?? [];
    value.push(newNotes);
    localStorage.setItem(key, JSON.stringify(value));
    setValueTitle("");
    setValueContent("");
    isOpen(false);
  }

  function handleClose() {
    setValueTitle("");
    setValueContent("");
    isOpen(false);
  }

  return (
    <>
      <form className="fixed top-6 right-0 bottom-0 left-0 pb-6 bg-background-base-1-light dark:bg-background-base-1-dark rounded-t-2xl overflow-scroll">
        <header className="fixed top-6 bg-background-base-1-light dark:bg-background-base-1-dark flex w-full justify-between items-center p-4 rounded-t-2xl">
          <button type="button" onClick={handleClose}>
            <X
              className="text-foreground-base-1-light dark:text-foreground-base-1-dark"
              size={24}
            />
          </button>
          <h1 className="text-foreground-base-1-light dark:text-foreground-base-1-dark font-semibold">{`${currentDate.slice(0, 3)}, ${currentDate.slice(8, 10)} ${currentDate.slice(4, 7)}`}</h1>
          <button type="submit" onClick={handleAddNotes}>
            <CheckCircle
              className="text-foreground-base-1-light dark:text-foreground-base-1-dark"
              size={24}
            />
          </button>
        </header>
        <section className="mt-14 px-4 flex flex-col gap-2">
          <textarea
            id="title"
            placeholder="Title"
            className="bg-background-base-1-light dark:bg-background-base-1-dark text-2xl font-semibold focus:outline-none resize-none overflow-hidden text-foreground-base-1-light dark:text-foreground-base-1-dark"
            value={valueTitle}
            onChange={(e) => setValueTitle(e.target.value)}
            rows={1}
            ref={textAreaTitleRef}
          />
          <textarea
            id="content"
            placeholder="start writing..."
            className="bg-background-base-1-light dark:bg-background-base-1-dark focus:outline-none resize-none overflow-hidden text-foreground-base-2-light dark:text-foreground-base-2-dark"
            value={valueContent}
            onChange={(e) => setValueContent(e.target.value)}
            rows={1}
            ref={textAreaContentRef}
          />
        </section>
      </form>
    </>
  );
}
