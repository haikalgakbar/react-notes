import { useEffect, useRef, useState } from "react";
import OptionMenu from "../OptionMenu";
import {
  SlidersHorizontal,
  MagnifyingGlass,
  NotePencil,
  SquaresFour,
  Rows,
  SortAscending,
  SortDescending,
} from "@phosphor-icons/react";
import { DISPLAY_KEY } from "../../utils/const";

export default function Header({
  allNotes,
  // darkMode,
  // changeMode,
  openNewNotes,
  display,
  setDisplay,
}) {
  const { view, sort } = display;
  const [openDisplayMenu, setOpenDisplayMenu] = useState(false);
  const [viewFilter, setViewFilter] = useState(view);
  const [sortFilter, setSortFilter] = useState(sort);
  const displayRef = useRef(null);
  const countNotes = allNotes.length;

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

  // function changeSort(type: "asc" | "des" | ""): void {
  //   if (display.sort === type) {
  //     setDisplay({ ...display, sort: "" });
  //     localStorage.setItem(
  //       DISPLAY_KEY,
  //       JSON.stringify({ ...display, sort: "" }),
  //     );
  //   } else {
  //     setDisplay({ ...display, sort: type });
  //     localStorage.setItem(
  //       DISPLAY_KEY,
  //       JSON.stringify({ ...display, sort: type }),
  //     );
  //   }
  // }

  // console.log(view);
  // console.log(viewFilter);

  function isRadioSortSelected(value: string): boolean {
    return value === sortFilter;
  }

  function handleSortRadioOnClick(e) {
    setSortFilter(e.currentTarget.value);
  }

  function isRadioViewSelected(value: string): boolean {
    return value === viewFilter;
  }

  function handleViewRadioOnClick(e) {
    const target = e.currentTarget.value;

    setViewFilter(target);
    setDisplay({ ...display, view: target });
    localStorage.setItem(
      DISPLAY_KEY,
      JSON.stringify({ ...display, view: target }),
    );
  }

  return (
    <header className="sticky z-10 flex w-full flex-col gap-4 rounded-t-xl bg-background-base-1-light p-4 dark:bg-background-base-1-dark">
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
        <h1 className="flex-1 text-center text-sm text-foreground-base-1-light dark:text-foreground-base-1-dark">
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
            "minw absolute bottom-16 left-4 flex min-w-48 flex-col rounded-md border-[.5px] border-stroke-base-3-light bg-background-base-1-light p-1 shadow-md dark:border-stroke-base-3-dark dark:bg-background-base-1-dark"
          }
        >
          <fieldset className="flex flex-col">
            <legend className="w-full flex-1 px-2 py-1 text-sm text-foreground-base-3-light dark:text-foreground-base-3-dark">
              Sort
            </legend>
            <div className="flex items-center justify-between gap-1 rounded-md p-2 text-sm text-foreground-base-1-light hover:bg-background-hover-1-light dark:text-foreground-base-1-dark dark:hover:bg-background-hover-1-dark">
              <SortAscending size={20} />
              <label
                className="flex-1 text-start hover:cursor-pointer"
                htmlFor="asc"
              >
                A to Z
              </label>
              <input
                type="radio"
                name="asc"
                id="asc"
                value="asc"
                checked={isRadioSortSelected("asc")}
                onChange={(e) => handleSortRadioOnClick(e)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-1 rounded-md p-2 text-sm text-foreground-base-1-light hover:cursor-pointer hover:bg-background-hover-1-light dark:text-foreground-base-1-dark dark:hover:bg-background-hover-1-dark">
              <SortDescending size={20} />
              <label
                className="flex-1 text-start hover:cursor-pointer"
                htmlFor="des"
              >
                Z to A
              </label>
              <input
                type="radio"
                name="des"
                id="des"
                value="des"
                checked={isRadioSortSelected("des")}
                onChange={(e) => handleSortRadioOnClick(e)}
              />
            </div>
          </fieldset>
          <fieldset className="flex flex-col">
            <legend className="w-full flex-1 px-2 py-1 text-sm text-foreground-base-3-light dark:text-foreground-base-3-dark">
              View
            </legend>
            <div className="flex items-center justify-between gap-1 rounded-md p-2 text-sm text-foreground-base-1-light hover:bg-background-hover-1-light dark:text-foreground-base-1-dark dark:hover:bg-background-hover-1-dark">
              <label
                className="flex flex-1 flex-row gap-1 text-start hover:cursor-pointer"
                htmlFor="row"
              >
                <Rows size={20} />
                Row
              </label>
              <input
                type="radio"
                name="row"
                id="row"
                value="row"
                checked={isRadioViewSelected("row")}
                onChange={(e) => handleViewRadioOnClick(e)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-1 rounded-md p-2 text-sm text-foreground-base-1-light hover:cursor-pointer hover:bg-background-hover-1-light dark:text-foreground-base-1-dark dark:hover:bg-background-hover-1-dark">
              <label
                className="flex flex-1 flex-row gap-1 text-start hover:cursor-pointer"
                htmlFor="grid"
              >
                <SquaresFour size={20} />
                Grid
              </label>
              <input
                type="radio"
                name="grid"
                id="grid"
                value="grid"
                checked={isRadioViewSelected("grid")}
                onChange={(e) => handleViewRadioOnClick(e)}
              />
            </div>
          </fieldset>
        </OptionMenu>
      )}
    </header>
  );
}

{
  /* <fieldset className="flex flex-col">
<legend className="w-full flex-1 px-2 py-1 text-sm text-foreground-base-3-light dark:text-foreground-base-3-dark">
  View
</legend>
<button
  className="flex items-center justify-between gap-1 rounded-md p-2 text-sm text-foreground-base-1-light hover:bg-background-hover-1-light dark:text-foreground-base-1-dark dark:hover:bg-background-hover-1-dark"
  // onClick={(e) => e.preventDefault()}
>
  <Rows size={20} />
  <label
    className="flex-1 text-start hover:cursor-pointer"
    htmlFor="row"
  >
    Row
  </label>
  <input
    type="radio"
    name="row"
    id="row"
    value="row"
    checked={isRadioSelected("row")}
    onChange={(e) => handleRadioOnClick(e)}
  />
</button>
<button
  className="flex flex-wrap items-center gap-1 rounded-md p-2 text-sm text-foreground-base-1-light hover:cursor-pointer hover:bg-background-hover-1-light dark:text-foreground-base-1-dark dark:hover:bg-background-hover-1-dark"
  // onClick={(e) => handleRadioOnClick(e)}
>
  <SquaresFour size={20} />
  <label
    className="flex-1 text-start hover:cursor-pointer"
    htmlFor="grid"
  >
    Grid
  </label>
  <input
    type="radio"
    name="grid"
    id="grid"
    value="grid"
    checked={isRadioSelected("grid")}
    onChange={(e) => handleRadioOnClick(e)}
  />
</button>
</fieldset> */
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
