import { useEffect, useState } from "react"

import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from 'react-spring'
import uuid from "react-uuid";//npm i react-uuid

import Main from "./Main";
import Sidebar from "./Sidebar";
import '../../styles/notes_module_styles.css'

import useWindowDimensions from "../dashboard/hooks/useWindowDimensions";


const NotesModule = () =>{

    var root = document.querySelector(":root");

    // For window snapping
    const { height, width } = useWindowDimensions();
    var rightBound = width - (width * 0.60) - 38 + 4;
    var bottomBound = height - (height * 0.70) - 18 - 50 + 4;
    var leftBound = 30;
    var topBound = 15;

    // Get the x and y values to use it for maximizing the window
    var xVal = 0;
    var yVal = 0;

    // For Dragging
    const [{ x, y }, notePos] = useSpring(() => ({ x: 0, y: 0 }));
    const bindNotePos = useDrag((state) => {
        xVal = state.offset[0];
        yVal = state.offset[1];
        notePos.set({
            x: xVal,
            y: yVal
        });
        // console.log("x: " + xVal + ", y: " + yVal);
    }, {
        from: () => {
            return [x.get(), y.get()];
        },
        bounds: () => {
            return {left: -leftBound, right: rightBound, top: -topBound, bottom: bottomBound};
        },
    });


    // For minimize and maximize button
    const [noteIsMinimized,  setNoteIsMininimized] = useState(true);
    const minmaxNote = () => {

      if(noteIsMinimized === true){

        root.style.setProperty('--notesModule-L1-window-width', "calc(100% - 4px)")
        root.style.setProperty('--notesModule-L1-window-height', "calc(100% - 49px)")

        root.style.setProperty('--border-radius', "0")
        root.style.setProperty('--border-radius-b', "0")

        root.style.setProperty('--top', `${-yVal}px`)
        root.style.setProperty('--left', `${-xVal}px`)

        root.style.setProperty('--notes-display-b', "none")

        notePos.set({
            x: xVal,
            y: yVal
          });

          setNoteIsMininimized(false)
      }
      else{

        root.style.setProperty('--notesModule-L1-window-width', "60%")
        root.style.setProperty('--notesModule-L1-window-height', "70%")

        root.style.setProperty('--border-radius', "7px")
        root.style.setProperty('--border-radius-b', "7px 7px 0 0")

        root.style.setProperty('--top', "15px")
        root.style.setProperty('--left', "30px")

        root.style.setProperty('--notes-display-b', "block")

        setNoteIsMininimized(true)
      }
    }

    // For close or exit button
    const closeNote = () => {
      root.style.setProperty('--notesModule-L1-window-width', "60%")
      root.style.setProperty('--notesModule-L1-window-height', "70%")

      root.style.setProperty('--notesModule-L1-display', "none")
      root.style.setProperty('--notes-display-b', "none")

      root.style.setProperty('--border-radius', "7px")
      root.style.setProperty('--border-radius-b', "7px 7px 0 0")

      root.style.setProperty('--top', "15px")
      root.style.setProperty('--left', "30px")

      setNoteIsMininimized(true)
    }


  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };


  return (
    <>
    <animated.div className="notes_L1_draggable_area"
    {...bindNotePos()} style={{
        x, y
    }} />
    <animated.div className="notes_L1_window" id="notes_L1_window"
    style={{
        x, y
    }}>
        <div className="notes_L1_window_topbar" id="notes_L1_window_topbar">Notes
            <div>
                <span id="dashboard_L1_minmax" className="material-symbols-outlined" onClick={minmaxNote}>web_asset</span>
                <span id="dashboard_L1_close" className="material-symbols-outlined" onClick={closeNote}>close</span>
            </div>
        </div>

        {/* <div className="container"> */}
            <div className="App">
                <Sidebar
                    notes={notes}
                    onAddNote={onAddNote}
                    onDeleteNote={onDeleteNote}
                    activeNote={activeNote}
                    setActiveNote={setActiveNote}
                />
                <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
            </div>
        {/* </div> */}
    </animated.div>
    </>
  );
}

export default NotesModule;
