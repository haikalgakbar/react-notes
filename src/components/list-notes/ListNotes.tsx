import { NOTES_KEY } from "../../utils/const";
import { notesObj } from "../../utils/notesType";
import Grids from "./Grids";
import Rows from "./Rows";

export default function ListNotes({ openDetail, viewNotes, display }) {
  const { view, sort } = display;

  const allNotes: notesObj[] = filterNotes(
    JSON.parse(localStorage.getItem(NOTES_KEY)) ?? "",
    sort,
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
        filteredNote = JSON.parse(localStorage.getItem(NOTES_KEY));
        break;
      case "asc":
        filteredNote.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "des":
        filteredNote.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        console.error("Invalid filter type", filterType);
        return notes;
    }

    return filteredNote;
  }

  function render(type) {
    return type === "row" ? (
      <Rows notes={allNotes} openDetail={openDetail} viewNotes={viewNotes} />
    ) : (
      <Grids notes={allNotes} openDetail={openDetail} viewNotes={viewNotes} />
    );
  }

  return render(view);
}
