import React from "react";

export const Note = (props) => {
  const { handlerCloseNote, note } = props;
  return (
    <div
      key={note.id}
      className="flex flex-row bg-gray-100 rounded-md px-2 my-3 py-2 justify-between items-center	"
    >
      <div>
        <p className="text-xs">Title</p>
        <h1 className="text-xl">{note.title}</h1>
        <p className="text-xs">Description</p>
        <p>{note.description}</p>
      </div>

      {note.close ? (
        <p className="text-green-600 text-sm">Cerrada</p>
      ) : (
        <button
          className="bg-green-600 py-2 px-3 h-3/5 rounded-md text-white hover:bg-green-700"
          onClick={() => handlerCloseNote(note)}
        >
          Close
        </button>
      )}
    </div>
  );
};
