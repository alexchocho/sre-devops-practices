import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { NoteForm } from "../components/NoteForm";
import { NoteList } from "../components/NoteList";
export const Notes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
  });

  const { title, description } = formValues;

  const onChangeHanlder = (event) => {
    const { target } = event;
    const { name, value } = target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let inputTitle = title.trim();
    let inputDescription = description.trim();
    if (inputTitle.length > 0) {
      if (inputDescription.length > 0) {
        const newNota = {
          id: new Date().getUTCMilliseconds(),
          title: inputTitle,
          description: inputDescription,
          close: false,
        };
        let newNotes = [...notes, newNota];
        setNotes(newNotes);
        setFormValues({
          title: "",
          description: "",
        });
      } else {
        Swal.fire("Error", "Need a description", "error");
      }
    } else {
      Swal.fire("Error", "Need a title", "error");
    }
  };

  const handlerCloseNote = (note) => {
    //Primera forma (saco el objeto, recorro el vector y actualizo el objeto)
    // const updateNote = { ...note, close: true };
    // let newNotes = notes.map((nt) => {
    //   if (note.id === nt.id) {
    //     return updateNote;
    //   }
    //   return nt;
    // });
    // setNotes(newNotes);

    //Segunda forma (accedo al estado actual desde setNotes y barro el vector)
    // setNotes((actual) =>
    //   actual.map((nt) => {
    //     if (note.id === nt.id) {
    //       nt.close = true;
    //     }
    //     return nt;
    //   })
    // );

    //Tercera forma (con el estado actual y barro el vector)

    setNotes(
      notes.map((nt) => {
        if (note.id === nt.id) {
          nt.close = true;
        }
        return nt;
      })
    );
  };

  //comprobar que se tenga token en el localstorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex flex-row h-screen ">
      <NoteForm
        onSubmitHandler={onSubmitHandler}
        title={title}
        onChangeHanlder={onChangeHanlder}
        description={description}
      />
      <NoteList notes={notes} handlerCloseNote={handlerCloseNote} />
    </div>
  );
};
