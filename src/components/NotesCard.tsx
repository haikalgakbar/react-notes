import { DotsThree } from "@phosphor-icons/react";

import React from "react";

export default function NotesCard({ detailNotes, close }) {
  return (
    <article
      className="bg-white flex flex-col w-full rounded-xl shadow-md"
      onClick={close(true)}
    >
      <div className="p-4">
        <h1 className="text-lg font-semibold">{detailNotes.title}</h1>
        <p className="line-clamp-3 text-[#424242]">{detailNotes.content}</p>
      </div>
      <div className="flex justify-between py-2 px-4 border-t">
        <div className="flex gap-1.5">
          <p className="text-[#616161] text-sm">
            {detailNotes.date.slice(8, 10)}
            {detailNotes.date.slice(3, 7)}
          </p>
          <p className="text-[#616161] text-sm">·</p>
          <p className="text-[#616161] text-sm">
            {Math.fround(detailNotes.content.split(" ").length / 238).toFixed(
              1,
            )}{" "}
            min read
          </p>
        </div>
        <DotsThree size={24} color="#616161" />
      </div>
    </article>
  );
}
