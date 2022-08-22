import React from "react";
import { Note } from "./Note";

export const NoteList = (props) => {
  const { notes, handlerCloseNote } = props;
  return (
    <div className="w-3/5 bg-white h-full px-6 pt-4">
      <h1 className="text-2xl pb-2">Note list</h1>
      <p className="text-xs pb-8">
        It is your saves notes, complete o delete using the actions
      </p>
      <ul>
        {notes.map((note) => {
          return (
            <Note
              key={note.id}
              handlerCloseNote={handlerCloseNote}
              note={note}
            />
          );
        })}
      </ul>
    </div>
  );
};
