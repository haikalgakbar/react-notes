import { useEffect, useRef, useState } from "react";
import Section from "./Section";
import OptionMenu from "../OptionMenu";
import { Check } from "@phosphor-icons/react";

export default function Header({
  allNotes,
  darkMode,
  changeMode,
  filter,
  setFilter,
}) {
  // const [filter, setFilter] = useState("");
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const menuRef = useRef(null);

  const countNotes = allNotes.length;

  useEffect(() => {
    const closeMenu = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setIsOptionOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, [isOptionOpen]);

  return (
    <header className="sticky bg-background-base-3-light dark:bg-background-base-3-dark z-10">
      <section className="flex m-2 p-4 mt-0 justify-between items-center bg-background-base-1-light dark:bg-background-base-1-dark rounded-xl">
        <h1 className="text-xl text-foreground-base-1-light dark:text-foreground-base-1-dark font-semibold">
          {countNotes}
          {countNotes < 1 ? ` Note` : ` Notes`}
        </h1>
        <Section
          allNotes={allNotes}
          darkMode={darkMode}
          changeMode={changeMode}
          menuStatus={isOptionOpen}
          openMenu={setIsOptionOpen}
        />
        {isOptionOpen && (
          <OptionMenu getRef={menuRef}>
            <p className="px-2 py-1 text-sm text-foreground-base-3-light dark:text-foreground-base-3-dark">
              Sort by
            </p>
            <button
              className="flex gap-1 rounded-md hover:bg-background-hover-1-light dark:hover:bg-background-hover-1-dark items-center text-foreground-base-1-light dark:text-foreground-base-1-dark p-2 text-sm justify-between"
              onClick={() => {
                if (filter.includes("a-z")) return setFilter("");
                setFilter("a-z");
              }}
            >
              A-Z
              {filter.includes("a-z") && (
                <Check className="flex-shrink-0" size={20} />
              )}
            </button>
            <button
              className="flex gap-1 rounded-md hover:bg-background-hover-1-light dark:hover:bg-background-hover-1-dark items-center text-foreground-base-1-light dark:text-foreground-base-1-dark p-2 text-sm justify-between"
              onClick={() => {
                if (filter.includes("z-a")) return setFilter("");
                setFilter("z-a");
              }}
            >
              Z-A
              {filter.includes("z-a") && (
                <Check className="flex-shrink-0" size={20} />
              )}
            </button>
          </OptionMenu>
        )}
      </section>
    </header>
  );
}
