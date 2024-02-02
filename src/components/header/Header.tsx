import { useEffect, useRef, useState } from "react";
import HeaderAction from "./HeaderAction";
import OptionMenu from "../OptionMenu";
import {
  SlidersHorizontal,
  MagnifyingGlass,
  NotePencil,
  Check,
  SquaresFour,
} from "@phosphor-icons/react";
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
  const [openDisplayMenu, setOpenDisplayMenu] = useState(false);
  const sortRef = useRef(null);
  const viewRef = useRef(null);
  const displayRef = useRef(null);
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

  useEffect(() => {
    const closeMenu = (e) => {
      if (!displayRef.current?.contains(e.target)) {
        setOpenDisplayMenu(false);
      }
    };

    document.addEventListener("mouseup", closeMenu);

    return () => {
      document.removeEventListener("mouseup", closeMenu);
    };
  }, [openDisplayMenu]);

  function changeView(type: "row" | "grid"): void {
    if (display.view !== type) {
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
    <header className="sticky z-10 flex flex-col gap-4 rounded-t-xl bg-background-base-1-light p-4 dark:bg-background-base-1-dark">
      <section className="flex items-center gap-2 rounded-full bg-background-base-3-dark px-4 py-2 focus:outline focus:outline-slate-400 focus:ring-1">
        <MagnifyingGlass className=" text-foreground-base-3-dark" size={20} />
        <input
          className="flex-1 border-none bg-transparent text-foreground-base-1-light outline-none dark:text-foreground-base-1-dark"
          type="text"
          placeholder="Search notes"
        />
      </section>
      <section className="flex items-center justify-between">
        <button onClick={() => setOpenDisplayMenu(true)}>
          <SlidersHorizontal
            className="m-2 text-foreground-base-1-light dark:text-foreground-base-1-dark"
            size={24}
          />
        </button>
        <h1 className="flex-1 text-center text-xl font-semibold text-foreground-base-1-light dark:text-foreground-base-1-dark">
          {countNotes}
          {countNotes < 1 ? ` Note` : ` Notes`}
        </h1>
        <button onClick={() => openNewNotes(true)}>
          <NotePencil
            className="m-2 text-foreground-base-1-light dark:text-foreground-base-1-dark"
            size={24}
          />
        </button>
      </section>
      {openDisplayMenu && (
        <OptionMenu
          getRef={displayRef}
          className={
            "absolute bottom-16 left-4 flex min-w-36 flex-col rounded-md border-[.5px] border-stroke-base-3-light bg-background-base-1-light p-1 shadow-md dark:border-stroke-base-3-dark dark:bg-background-base-1-dark"
          }
        >
          <p className="right px-2 py-1 text-sm text-foreground-base-3-light dark:text-foreground-base-3-dark">
            Sort
          </p>
          <button
            className="flex items-center justify-between gap-1 rounded-md p-2 text-sm text-foreground-base-1-light hover:bg-background-hover-1-light dark:text-foreground-base-1-dark dark:hover:bg-background-hover-1-dark"
            onClick={() => changeView("row")}
          >
            A to Z
            {display.view === "row" && (
              <Check className="flex-shrink-0" size={20} />
            )}
          </button>
          <button
            className="flex items-center justify-between gap-1 rounded-md p-2 text-sm text-foreground-base-1-light hover:bg-background-hover-1-light dark:text-foreground-base-1-dark dark:hover:bg-background-hover-1-dark"
            onClick={() => changeView("grid")}
          >
            Z to A
            {display.view === "grid" && (
              <Check className="flex-shrink-0" size={20} />
            )}
          </button>
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
          <button className="flex flex-wrap items-center gap-1 rounded-md p-2 text-sm text-foreground-base-1-light hover:bg-background-hover-1-light dark:text-foreground-base-1-dark dark:hover:bg-background-hover-1-dark">
            <SquaresFour size={20} />
            <p className="flex-1 text-start">Grid</p>
            <div className="flex items-center">
              <div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-white dark:bg-gray-100">
                <input
                  aria-labelledby="label1"
                  checked
                  type="radio"
                  name="radio"
                  className="absolute h-full w-full cursor-pointer appearance-none rounded-full border border-gray-400 checked:border-none focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2"
                />
                <div className="z-1 hidden h-full w-full rounded-full border-4 border-indigo-700"></div>
              </div>
              <label
                id="label1"
                className="ml-2 text-sm font-normal leading-4 text-gray-800 dark:text-gray-100"
              >
                On
              </label>
            </div>
          </button>
        </OptionMenu>
      )}
    </header>
  );
}

{
  /* <section className="flex items-center justify-between p-4">
        <h1 className="text-xl font-semibold text-foreground-base-1-light dark:text-foreground-base-1-dark">
          {countNotes}
          {countNotes < 1 ? ` Note` : ` Notes`}
        </h1>
        <HeaderAction
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
      </section> */
}