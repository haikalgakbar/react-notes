import { useEffect, useRef, useState } from "react";
import { LOCAL_STORAGE_KEY } from "./utils/const.js";
import { Check } from "@phosphor-icons/react";

import Header from "./components/header/Header";
import AddNotesButton from "./components/AddNotesButton";
import EmptyNotes from "./components/EmptyNotes";
import ListNotes from "./components/ListNotes";
import AddNotes from "./components/AddNotes";
import ViewNotes from "./components/ViewNotes";
import BottomSheet from "./template/BottomSheet";
import OptionMenu from "./components/OptionMenu.js";

export default function App() {
  const [isAddNotesOpen, setIsAddNotesOpen] = useState(false);
  const [isViewNotesOpen, setIsViewNotesOpen] = useState(false);
  // const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [notesId, setNotesId] = useState();
  const [isDarkMode, setIsDarkMode] = useState(localStorage.theme);
  const [filter, setFilter] = useState("");

  // const menuRef = useRef(null);

  const allNotes =
    Array.from(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))) || [];

  useEffect(() => {
    isDarkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  // useEffect(() => {
  //   const closeMenu = (e) => {
  //     if (!menuRef.current?.contains(e.target)) {
  //       setIsOptionOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", closeMenu);

  //   return () => {
  //     document.removeEventListener("mousedown", closeMenu);
  //   };
  // }, [isOptionOpen]);

  return (
    <section className="flex flex-col-reverse max-w-[425px] max-h-dvh">
      <Header
        allNotes={allNotes}
        darkMode={isDarkMode}
        changeMode={setIsDarkMode}
        // menuStatus={isOptionOpen}
        // openMenu={setIsOptionOpen}
        filter={filter}
        setFilter={setFilter}
      />
      {/* {isOptionOpen && (
        <OptionMenu getRef={menuRef}>
          <p className="px-2 py-1 text-sm text-foreground-base-3-light dark:text-foreground-base-3-dark">
            Sort by
          </p>
          <button
            className="flex gap-1 rounded-md hover:bg-background-hover-1-light dark:hover:bg-background-hover-1-dark items-center text-foreground-base-1-light dark:text-foreground-base-1-dark p-2 text-sm"
            onClick={() => {
              if (filter.includes("a-z")) return setFilter("");
              setFilter("a-z");
            }}
          >
            {filter.includes("a-z") && (
              <Check className="flex-shrink-0" size={20} />
            )}
            A-Z
          </button>
          <button
            className="flex gap-1 rounded-md hover:bg-background-hover-1-light dark:hover:bg-background-hover-1-dark items-center text-foreground-base-1-light dark:text-foreground-base-1-dark p-2 text-sm"
            onClick={() => {
              if (filter.includes("z-a")) return setFilter("");
              setFilter("z-a");
            }}
          >
            {filter.includes("z-a") && (
              <Check className="flex-shrink-0" size={20} />
            )}
            Z-A
          </button>
        </OptionMenu>
      )} */}
      {allNotes.length ? (
        <ListNotes
          openDetail={setIsViewNotesOpen}
          viewNotes={setNotesId}
          filter={filter}
        />
      ) : (
        <EmptyNotes />
      )}
      {/* <AddNotesButton
        openAddNotes={setIsAddNotesOpen}
        selectedNotes={setNotesId}
      /> */}
      {isAddNotesOpen && (
        <BottomSheet>
          <AddNotes isOpen={setIsAddNotesOpen} note={notesId} />
        </BottomSheet>
      )}
      {isViewNotesOpen && (
        <BottomSheet>
          <ViewNotes
            isOpen={setIsViewNotesOpen}
            note={notesId}
            edit={setIsAddNotesOpen}
          />
        </BottomSheet>
      )}
    </section>
    // <h1>Hello</h1>
  );
}

// const notes: notesObj[] = [
//   {
//     id: "1",
//     title: "Lactose intolerant🥛🚫",
//     content:
//       "I can't drink milk. I know, it sounds weird, but I'm lactose intolerant. That means my body can't digest the sugar in milk, and it makes me feel sick. I hate it. I love ice cream and cheese, but I can't have them without taking pills or risking a stomach ache. Sometimes I wish I was normal, like everyone else who can enjoy dairy products without any problems. But I guess I have to accept myself the way I am, and find other ways to get calcium and protein in my diet.",
//     date: currentDate,
//   },
//   {
//     id: "2",
//     title: "Lactose intolerant🥛🚫",
//     content:
//       "I can't drink milk. I know, it sounds weird, but I'm lactose intolerant. That means my body can't digest the sugar in milk, and it makes me feel sick. I hate it. I love ice cream and cheese, but I can't have them without taking pills or risking a stomach ache. Sometimes I wish I was normal, like everyone else who can enjoy dairy products without any problems. But I guess I have to accept myself the way I am, and find other ways to get calcium and protein in my diet.",
//     date: currentDate,
//   },
// ];

// <div
//   ref={menuRef}
//   className="absolute flex flex-col p-1 top-12 right-4 bg-background-base-1-light dark:bg-background-base-1-dark shadow-md border-[.5px] rounded-md border-stroke-base-3-light dark:border-stroke-base-3-dark z-10 min-w-32"
// >
//   <p className="px-2 py-1 text-sm text-foreground-base-3-light dark:text-foreground-base-3-dark">
//     Sort by
//   </p>
//   <button
//     className="flex gap-1 rounded-md hover:bg-background-hover-1-light dark:hover:bg-background-hover-1-dark items-center text-foreground-base-1-light dark:text-foreground-base-1-dark p-2 text-sm"
//     onClick={() => {
//       if (filter.includes("a-z")) return setFilter("");
//       setFilter("a-z");
//     }}
//   >
//     {filter.includes("a-z") && (
//       <Check className="flex-shrink-0" size={20} />
//     )}
//     A-Z
//   </button>
//   <button
//     className="flex gap-1 rounded-md hover:bg-background-hover-1-light dark:hover:bg-background-hover-1-dark items-center text-foreground-base-1-light dark:text-foreground-base-1-dark p-2 text-sm"
//     onClick={() => {
//       if (filter.includes("z-a")) return setFilter("");
//       setFilter("z-a");
//     }}
//   >
//     {filter.includes("z-a") && (
//       <Check className="flex-shrink-0" size={20} />
//     )}
//     Z-A
//   </button>
// </div>
