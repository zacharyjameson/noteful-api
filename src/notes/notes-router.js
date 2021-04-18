const path = require("path");
const express = require("express");
const xss = require("xss");
const NoteService = require("./notes-service");

const notesRouter = express.Router();
const jsonParser = express.json();

const serializeNote = (note) => {
    
}