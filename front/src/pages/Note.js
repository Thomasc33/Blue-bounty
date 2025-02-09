import React from 'react'
import { useNavigate } from 'react-router-dom'
import noteService from "../services/note.service"
import '../css/Note.css'

function NotePage(props) {
    let note = JSON.parse(localStorage.getItem('ToEdit'));
    const nav = useNavigate()

    console.log(note)

    const saveButtonClick = async () => {
        let title = document.getElementById('titleInput').value;
        let text = document.getElementById('noteText').value;
        if (note) {
            //logic for saving
            await noteService.edit(note.id, note.author, note.authorID, title, text) //sql injection is prevented in the note.service.js file
        } else {
            //logic for adding
            await noteService.add(localStorage.username, localStorage.uid, title, text)
        }
        nav('/')
    }

    const deleteButtonClick = async () => {
        if (note) {
            //logic for deleting
            await noteService.delete(note.id)
        } //no else needed, returns to home if not saved and no note anyways
        nav('/')
    }

    const commentButtonClick = async () => {
        let commentBox = document.getElementById('comment')
        commentBox.showModal()
    }

    const commentBoxSave = async () => {
        let commentBox = document.getElementById('comment')
        let commentInput = document.getElementById('commentInput')
        commentBox.close()
        if (!commentInput.value || commentInput.value === '') return
        if (!note) return
        await noteService.addComment(note.id, commentInput.value, localStorage.getItem('uid'))
    }

    const shareButtonClick = async () => {
        let shareBox = document.getElementById('share')
        shareBox.showModal()
    }

    const shareBoxSave = async () => {
        let shareBox = document.getElementById('share')
        let shareInput = document.getElementById('shareInput')
        shareBox.close()
        if (!shareInput.value || shareInput.value === '') return
        if (!note) return
        await noteService.addCollaborators(note.id, shareInput.value)
    }

    return (
        <div className="NoteForm">
            <div className="form-group">
                <h1>Title</h1>
                <div className="col-md-4">
                    <input id="titleInput" name="titleInput" type="text" placeholder="First Note" className="form-control input-md" defaultValue={note ? note.title : null} />
                </div>
            </div>

            <div className="form-group">
                <h1>Note Text</h1>
                <div className="col-md-4">
                    <textarea className="form-control" id="noteText" name="noteText" defaultValue={note ? note.text : null}></textarea>
                </div>
            </div>

            <div className="form-group">
                <div className="buttons">
                    <button onClick={saveButtonClick}>Save</button>
                    <button onClick={deleteButtonClick}>Delete</button>
                    {note ? <>
                        <button onClick={commentButtonClick}>Comment</button>
                        <button onClick={shareButtonClick}>Share</button>
                    </> : null}

                </div>
            </div>
            <dialog id='share'>
                <p>Enter users to share with, seperated by commas</p>
                <input id='shareInput' type='text' />
                <button onClick={shareBoxSave}>Save</button>
            </dialog>
            <dialog id='comment'>
                <p>Enter your comment, then click save to save it</p>
                <input id='commentInput' type='text' />
                <button onClick={commentBoxSave}>Save</button>
            </dialog>
        </div>

    )
}



export default NotePage;