import React from "react";

export const NoteForm = (props) => {
  const { onSubmitHandler, title, onChangeHanlder, description } = props;
  return (
    <div className="w-2/5 bg-gray-50	h-full px-6 pt-4 ">
      <h1 className="text-2xl pb-2">New note</h1>
      <p className="text-xs pb-8">
        Put a title and description of a note to create a new
      </p>
      <form className="flex flex-col" onSubmit={onSubmitHandler}>
        <div className="flex flex-col">
          <label htmlFor="" className="text-md mb-2">
            Note title
          </label>
          <input
            type="text"
            className="py-2 rounded mb-4 border border-inherit border-slate-300 pl-1"
            name="title"
            value={title}
            onChange={onChangeHanlder}
            required
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="" className="text-md mb-2">
            Note description
          </label>
          <input
            type="text"
            className="py-2 rounded mb-6 border border-inherit border-slate-300 pl-1"
            name="description"
            value={description}
            onChange={onChangeHanlder}
            required
          />
        </div>
        <button className="bg-green-600 py-3 rounded-md hover:bg-green-700 text-white shadow-md shadow-green-600">
          Save
        </button>
      </form>
    </div>
  );
};
