import { useEffect, useRef, useState } from "react";
import Section from "./Section";
import OptionMenu from "../OptionMenu";
import { Check } from "@phosphor-icons/react";
import { DISPLAY_KEY } from "../../utils/const";

export default function Header({
  allNotes,
  darkMode,
  changeMode,
  openNewNotes,
  display,
  setDisplay,
}) {
  const [openSortMenu, setOpenSortMenu] = useState(false);
  const [openViewMenu, setOpenViewMenu] = useState(false);
  const sortRef = useRef(null);
  const viewRef = useRef(null);
  const countNotes = allNotes.length;

  useEffect(() => {
    const closeMenu = (e) => {
      if (!viewRef.current?.contains(e.target)) {
        setOpenViewMenu(false);
      }
    };

    document.addEventListener("mouseup", closeMenu);

    return () => {
      document.removeEventListener("mouseup", closeMenu);
    };
  }, [openViewMenu]);

  useEffect(() => {
    const closeMenu = (e) => {
      if (!sortRef.current?.contains(e.target)) {
        setOpenSortMenu(false);
      }
    };

    document.addEventListener("mouseup", closeMenu);

    return () => {
      document.removeEventListener("mouseup", closeMenu);
    };
  }, [openSortMenu]);

  function changeView(type: "row" | "grid"): void {
    if (display.view !== type) {
      console.log("isinde");
      setDisplay({ ...display, view: type });
      localStorage.setItem(
        DISPLAY_KEY,
        JSON.stringify({ ...display, view: type }),
      );
    }
  }

  function changeSort(type: "asc" | "des" | ""): void {
    if (display.sort === type) {
      setDisplay({ ...display, sort: "" });
      localStorage.setItem(
        DISPLAY_KEY,
        JSON.stringify({ ...display, sort: "" }),
      );
    } else {
      setDisplay({ ...display, sort: type });
      localStorage.setItem(
        DISPLAY_KEY,
        JSON.stringify({ ...display, sort: type }),
      );
    }
  }

  return (
    <header className="sticky z-10 bg-background-base-3-light dark:bg-background-base-3-dark">
      <section className="m-2 mt-0 flex items-center justify-between rounded-xl bg-background-base-1-light p-4 dark:bg-background-base-1-dark">
        <h1 className="text-xl font-semibold text-foreground-base-1-light dark:text-foreground-base-1-dark">
          {countNotes}
          {countNotes < 1 ? ` Note` : ` Notes`}
        </h1>
        <Section
          allNotes={allNotes}
          darkMode={darkMode}
          changeMode={changeMode}
          openView={openViewMenu}
          setOpenView={setOpenViewMenu}
          openSort={openSortMenu}
          setOpenSort={setOpenSortMenu}
          openNewNotes={openNewNotes}
        />
        {openViewMenu && (
          <OptionMenu
            getRef={viewRef}
            className={
              "absolute bottom-16 right-16 flex min-w-36 flex-col rounded-md border-[.5px] border-stroke-base-3-light bg-background-base-1-light p-1 shadow-md dark:border-stroke-base-3-dark dark:bg-background-base-1-dark"
            }
          >
            <p className="right px-2 py-1 text-sm text-foreground-base-3-light dark:text-foreground-base-3-dark">
              View
            </p>
            <button
              className="flex items-center justify-between gap-1 rounded-md p-2 text-sm text-foreground-base-1-light hover:bg-background-hover-1-light dark:text-foreground-base-1-dark dark:hover:bg-background-hover-1-dark"
              onClick={() => changeView("row")}
            >
              Row
              {display.view === "row" && (
                <Check className="flex-shrink-0" size={20} />
              )}
            </button>
            <button
              className="flex items-center justify-between gap-1 rounded-md p-2 text-sm text-foreground-base-1-light hover:bg-background-hover-1-light dark:text-foreground-base-1-dark dark:hover:bg-background-hover-1-dark"
              onClick={() => changeView("grid")}
            >
              Grid
              {display.view === "grid" && (
                <Check className="flex-shrink-0" size={20} />
              )}
            </button>
          </OptionMenu>
        )}
        {openSortMenu && (
          <OptionMenu
            getRef={sortRef}
            className={
              "absolute bottom-16 right-4 flex min-w-36 flex-col rounded-md border-[.5px] border-stroke-base-3-light bg-background-base-1-light p-1 shadow-md dark:border-stroke-base-3-dark dark:bg-background-base-1-dark"
            }
          >
            <p className="px-2 py-1 text-sm text-foreground-base-3-light dark:text-foreground-base-3-dark">
              Sort
            </p>
            <button
              className="flex items-center justify-between gap-1 rounded-md p-2 text-sm text-foreground-base-1-light hover:bg-background-hover-1-light dark:text-foreground-base-1-dark dark:hover:bg-background-hover-1-dark"
              onClick={() => changeSort("asc")}
            >
              Ascending
              {display.sort === "asc" && (
                <Check className="flex-shrink-0" size={20} />
              )}
            </button>
            <button
              className="flex items-center justify-between gap-1 rounded-md p-2 text-sm text-foreground-base-1-light hover:bg-background-hover-1-light dark:text-foreground-base-1-dark dark:hover:bg-background-hover-1-dark"
              onClick={() => changeSort("des")}
            >
              Descending
              {display.sort === "des" && (
                <Check className="flex-shrink-0" size={20} />
              )}
            </button>
          </OptionMenu>
        )}
      </section>
    </header>
  );
}
