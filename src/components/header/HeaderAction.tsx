import {
  SortAscending,
  SortDescending,
  SquaresFour,
  FunnelSimple,
  Rows,
  Moon,
  Sun,
  NotePencil,
} from "@phosphor-icons/react";
import { THEME_KEY } from "../../utils/const";
import { DISPLAY_KEY } from "../../utils/const";

export default function Section({
  allNotes,
  darkMode,
  changeMode,
  openView,
  setOpenView,
  openSort,
  setOpenSort,
  openNewNotes,
}) {
  const { view, sort } = JSON.parse(localStorage.getItem(DISPLAY_KEY)) ?? "";

  function changeTheme() {
    changeMode(!darkMode);

    const theme = darkMode ? "light" : "dark";
    localStorage.setItem(THEME_KEY, theme);
  }

  function iconSort() {
    switch (true) {
      case sort === "asc":
        return (
          <SortAscending
            className="text-foreground-base-1-light dark:text-foreground-base-1-dark m-2"
            size={24}
            weight="regular"
          />
        );
      case sort === "des":
        return (
          <SortDescending
            className="text-foreground-base-1-light dark:text-foreground-base-1-dark m-2"
            size={24}
            weight="regular"
          />
        );
      default:
        return (
          <FunnelSimple
            className="text-foreground-base-1-light dark:text-foreground-base-1-dark m-2"
            size={24}
            weight="regular"
          />
        );
    }
  }

  function iconView() {
    switch (true) {
      case view === "row":
        return (
          <Rows
            className="text-foreground-base-1-light dark:text-foreground-base-1-dark m-2"
            size={24}
            weight="regular"
          />
        );
      case view === "grid":
        return (
          <SquaresFour
            className="text-foreground-base-1-light dark:text-foreground-base-1-dark m-2"
            size={24}
            weight="regular"
          />
        );
      default:
        return (
          <Rows
            className="text-foreground-base-1-light dark:text-foreground-base-1-dark m-2"
            size={24}
            weight="regular"
          />
        );
    }
  }

  return (
    <section className="flex gap-1">
      {darkMode ? (
        <button onClick={changeTheme}>
          <Sun
            className="text-foreground-base-1-light dark:text-foreground-base-1-dark m-2"
            size={24}
          />
        </button>
      ) : (
        <button onClick={changeTheme}>
          <Moon
            className="text-foreground-base-1-light dark:text-foreground-base-1-dark m-2"
            size={24}
          />
        </button>
      )}
      <button
        onClick={() => {
          setOpenView(!openView);
        }}
      >
        {iconView()}
      </button>
      {allNotes.length ? (
        <button
          id="filterBtn"
          onClick={() => {
            setOpenSort(!openSort);
          }}
        >
          {iconSort()}
        </button>
      ) : (
        <button disabled>
          <FunnelSimple
            className="text-foreground-disabled-light dark:text-foreground-disabled-dark"
            size={24}
            weight="regular"
          />
        </button>
      )}
      <button onClick={() => openNewNotes(true)}>
        <NotePencil
          className="text-foreground-base-1-light dark:text-foreground-base-1-dark m-2"
          size={24}
        />
      </button>
    </section>
  );
}
