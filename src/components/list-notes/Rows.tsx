export default function Rows({ notes, openDetail, viewNotes }) {
  function findNotesId(id) {
    const [result] = notes.filter((note) => note.id === id);
    viewNotes(result);
    openDetail(true);
  }

  const wordCount = (word) => {
    const count = word.split(" ").length;
    return count === 1 ? `${count} word` : `${count} words`;
  };

  return (
    <section className="flex flex-col gap-2 overflow-scroll p-4">
      {notes.map((note) => (
        <article
          key={note.id}
          className="flex cursor-pointer flex-col rounded-xl bg-background-base-1-light shadow-md hover:bg-background-hover-1-light dark:bg-background-base-1-dark dark:hover:bg-background-hover-1-dark"
        >
          <div className="p-4" onClick={() => findNotesId(note.id)}>
            <h1 className="text-md font-semibold text-foreground-base-1-light dark:text-foreground-base-1-dark">
              {note.title}
            </h1>
            <p className="line-clamp-3 text-sm text-foreground-base-2-light dark:text-foreground-base-2-dark">
              {note.content}
            </p>
          </div>
          <div className="flex justify-start gap-1.5 border-t border-stroke-base-3-light px-4 py-2 dark:border-stroke-base-3-dark">
            <p className="text-sm text-foreground-base-3-light dark:text-foreground-base-3-dark">
              {note.date.slice(8, 10)}
              {note.date.slice(3, 7)}
            </p>
            <p className="text-sm text-foreground-base-3-light dark:text-foreground-base-3-dark">
              ·
            </p>
            <p className="text-sm text-foreground-base-3-light dark:text-foreground-base-3-dark">
              {wordCount(note.content)}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
