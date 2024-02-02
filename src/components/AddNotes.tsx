import { ArrowLeft, Check } from "@phosphor-icons/react";
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

      return;
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

  function wordCount(words) {
    const count = words.split("").length;
    return count > 1 ? `${count} characters` : `${count} character`;
  }

  return (
    <form className="absolute z-10 flex max-h-dvh min-h-dvh w-full flex-col  overflow-scroll bg-background-base-1-light dark:bg-background-base-1-dark">
      <header className="sticky top-0 flex items-center justify-between bg-background-base-1-light p-4 dark:bg-background-base-1-dark">
        <button type="button" onClick={handleClose}>
          <ArrowLeft
            className="text-foreground-base-1-light dark:text-foreground-base-1-dark"
            size={24}
          />
        </button>
        <button type="submit" onClick={handleAddNotes}>
          <Check
            className="text-foreground-base-1-light dark:text-foreground-base-1-dark"
            size={24}
          />
        </button>
      </header>
      <section className="flex flex-1 flex-col gap-2 p-4">
        <textarea
          id="title"
          placeholder="Title"
          className="resize-none overflow-hidden bg-background-base-1-light text-2xl font-semibold text-foreground-base-1-light focus:outline-none dark:bg-background-base-1-dark dark:text-foreground-base-1-dark"
          value={valueTitle}
          onChange={(e) => setValueTitle(e.target.value)}
          rows={1}
          ref={textAreaTitleRef}
        />
        <div>
          <h1 className="text-sm text-foreground-base-3-light dark:text-foreground-base-3-dark">
            {`${currentDate.slice(0, 3)}, ${currentDate.slice(8, 10)} ${currentDate.slice(4, 7)}`}{" "}
            | {wordCount(valueContent)}
          </h1>
        </div>
        <textarea
          id="content"
          placeholder="start writing..."
          className="resize-none overflow-hidden bg-background-base-1-light text-foreground-base-2-light focus:outline-none dark:bg-background-base-1-dark dark:text-foreground-base-2-dark"
          value={valueContent}
          onChange={(e) => setValueContent(e.target.value)}
          rows={1}
          ref={textAreaContentRef}
        />
      </section>
    </form>
  );
}
