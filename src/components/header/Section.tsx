import { DotsThreeCircle, Moon, Sun, NotePencil } from "@phosphor-icons/react";
import { THEME } from "../../utils/const";

export default function Section({
  allNotes,
  darkMode,
  menuStatus,
  changeMode,
  openMenu,
}) {
  function changeTheme() {
    changeMode(!darkMode);

    const theme = darkMode ? "light" : "dark";
    localStorage.setItem(THEME, theme);
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
      {allNotes.length ? (
        <button
          id="filterBtn"
          onClick={() => {
            openMenu(!menuStatus);
          }}
        >
          <DotsThreeCircle
            className="text-foreground-base-1-light dark:text-foreground-base-1-dark m-2"
            size={24}
            weight="regular"
          />
        </button>
      ) : (
        <button disabled>
          <DotsThreeCircle
            className="text-foreground-disabled-light dark:text-foreground-disabled-dark"
            size={24}
            weight="regular"
          />
        </button>
      )}
      <button onClick={changeTheme}>
        <NotePencil
          className="text-foreground-base-1-light dark:text-foreground-base-1-dark m-2"
          size={24}
        />
      </button>
    </section>
  );
}
