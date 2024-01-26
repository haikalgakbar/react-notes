import { FunnelSimple, Moon, Sun } from "@phosphor-icons/react";
import { THEME } from "../utils/const";

export default function Header({
  allNotes,
  darkMode,
  changeMode,
  menuStatus,
  openMenu,
}) {
  function changeTheme() {
    changeMode(!darkMode);

    const theme = darkMode ? "light" : "dark";
    localStorage.setItem(THEME, theme);
  }

  return (
    <header className=" sticky flex w-full p-4 justify-between items-center bg-background-base-1-light dark:bg-background-base-1-dark">
      <h1 className="text-2xl text-foreground-base-1-light dark:text-foreground-base-1-dark font-semibold">
        Notes
      </h1>
      <section className="flex gap-4">
        {darkMode ? (
          <button onClick={changeTheme}>
            <Sun
              className="text-foreground-base-1-light dark:text-foreground-base-1-dark"
              size={24}
            />
          </button>
        ) : (
          <button onClick={changeTheme}>
            <Moon
              className="text-foreground-base-1-light dark:text-foreground-base-1-dark"
              size={24}
            />
          </button>
        )}
        {allNotes.length ? (
          <button
            id="filterBtn"
            onClick={() => {
              openMenu(!menuStatus);
            }}
          >
            <FunnelSimple
              className="text-foreground-base-1-light dark:text-foreground-base-1-dark"
              size={24}
              weight="regular"
            />
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
      </section>
    </header>
  );
}
