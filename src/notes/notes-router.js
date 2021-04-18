const path = require("path");
const express = require("express");
const xss = require("xss");
const NoteService = require("./notes-service");
const nodemon = require("nodemon");

const noteRouter = express.Router();
const jsonParser = express.json();

const serializeNote = (note) => ({
  id: note.id,
  note_name: note.note_name,
  content: note.content,
  folder_id: note.folder_id,
});

noteRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    NoteService.getAllNotes(knexInstance)
      .then((notes) => {
        res.json(notes.map(serializeNote));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { note_name, content, folder_id } = req.body;
    const newNote = { note_name, content, folder_id };

    for (const [key, value] of Object.entries(newNote))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });
    const knexInstance = req.app.get("db");
    NoteService.insertNote(knexInstance, newNote)
      .then((note) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${note.id}`))
          .json(serializeNote(note));
      })
      .catch(next);
  });

noteRouter
  .route("/:note_id")
  .all((req, res, next) => {
    const knexInstance = req.app.get("db");

    NoteService.getById(knexInstance, req.params.note_id)
      .then((note) => {
        if (!note) {
          return res.status(404).json({
            error: { message: `Folder doesn't exist` },
          });
        }
        res.note = note;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeNote(res.note));
  })
  .delete((req, res, next) => {
    const knexInstance = req.app.get("db");
    NoteService.deleteFolder(knexInstance, req.params.note_id)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { note_name, content, folder_id } = req.body;
    const noteToUpdate = { note_name, content, folder_id };

    const numberOfValues = Object.values(articleToUpdate).filter(Boolean)
      .length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'note_name', 'content', or 'folder_id'`,
        },
      });
    }

    NoteService.updateNote(req.app.get("db"), req.params.note_id, noteToUpdate)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = noteRouter;
