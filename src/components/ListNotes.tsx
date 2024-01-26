import { LOCAL_STORAGE_KEY as key } from "../utils/const";
import { notesObj } from "../utils/notesType";

export default function ListNotes({ openDetail, viewNotes, filter }) {
  // const allNotes: notesObj[] = Array.from(
  //   JSON.parse(localStorage.getItem(key)),
  // );

  const allNotes: notesObj[] = filterNotes(
    JSON.parse(localStorage.getItem(key)),
    filter,
  );

  function findNotesId(id) {
    const [result] = allNotes.filter((notes) => notes.id === id);
    viewNotes(result);
    openDetail(true);
  }

  const wordCount = (item) => {
    const count = item.split(" ").length;
    return count === 1 ? `${count} word` : `${count} words`;
  };

  function filterNotes(notes, filterType) {
    let filteredNote = [...notes];

    switch (filterType) {
      case "":
        filteredNote = JSON.parse(localStorage.getItem(key));
        break;
      case "a-z":
        filteredNote.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        filteredNote.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        console.error("Invalid filter type");
        return notes;
    }

    return filteredNote;
  }

  return (
    <section className="h-screen flex flex-col gap-2 p-4 overflow-auto">
      {allNotes.map((note) => (
        <article
          key={note.id}
          className="relative bg-background-base-1-light dark:bg-background-base-1-dark flex flex-col w-full rounded-xl shadow-md hover:bg-background-hover-1-light dark:hover:bg-background-hover-1-dark cursor-pointer"
        >
          <div className="p-4" onClick={() => findNotesId(note.id)}>
            <h1 className="text-lg font-semibold text-foreground-base-1-light dark:text-foreground-base-1-dark">
              {note.title}
            </h1>
            <p className="line-clamp-3 text-foreground-base-2-light dark:text-foreground-base-2-dark">
              {note.content}
            </p>
          </div>
          <div className="flex gap-1.5 justify-start py-2 px-4 border-t border-stroke-base-3-light dark:border-stroke-base-3-dark">
            <p className="text-foreground-base-3-light dark:text-foreground-base-3-dark text-sm">
              {note.date.slice(8, 10)}
              {note.date.slice(3, 7)}
            </p>
            <p className="text-foreground-base-3-light dark:text-foreground-base-3-dark text-sm">
              ·
            </p>
            <p className="text-foreground-base-3-light dark:text-foreground-base-3-dark text-sm">
              {wordCount(note.content)}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
