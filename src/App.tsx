import { useEffect, useState } from "react";
import { NOTES_KEY, DISPLAY_KEY } from "./utils/const.js";

import Header from "./components/header/Header";
import EmptyNotes from "./components/EmptyNotes";
import ListNotes from "./components/list-notes/ListNotes.js";
import AddNotes from "./components/AddNotes";
import ViewNotes from "./components/ViewNotes";

export default function App() {
  const [isAddNotesOpen, setIsAddNotesOpen] = useState(false);
  const [isViewNotesOpen, setIsViewNotesOpen] = useState(false);
  const [notesId, setNotesId] = useState();
  const [isDarkMode, _setIsDarkMode] = useState(localStorage.theme);
  const [display, setDisplay] = useState(
    JSON.parse(localStorage.getItem(DISPLAY_KEY)) ?? {
      view: "row",
      sort: "asc",
    },
  );

  const allNotes = Array.from(
    JSON.parse(localStorage.getItem(NOTES_KEY)) ?? [],
  );

  useEffect(() => {
    isDarkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  return (
    <section className="relative flex max-h-dvh min-h-dvh min-w-[320px] max-w-[425px] flex-col-reverse">
      <Header
        allNotes={allNotes}
        // darkMode={isDarkMode}
        // changeMode={setIsDarkMode}
        openNewNotes={setIsAddNotesOpen}
        display={display}
        setDisplay={setDisplay}
      />
      {allNotes.length ? (
        <ListNotes
          openDetail={setIsViewNotesOpen}
          viewNotes={setNotesId}
          display={display}
        />
      ) : (
        <EmptyNotes />
      )}
      {isAddNotesOpen && <AddNotes isOpen={setIsAddNotesOpen} note={notesId} />}
      {isViewNotesOpen && (
        <ViewNotes
          isOpen={setIsViewNotesOpen}
          note={notesId}
          edit={setIsAddNotesOpen}
        />
      )}
    </section>
  );
}
