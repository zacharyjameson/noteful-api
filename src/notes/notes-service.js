const NoteService = {
    getAllNotes(knex) {
      return knex.select("*").from("noteful_notes");
    },
  
    insertNote(knex, newFolder) {
      return knex
        .insert(newFolder)
        .into("noteful_notes")
        .returning("*")
        .then((rows) => {
          return rows[0];
        });
    },
  
    getById(knex, id) {
      return knex.from("noteful_notes").select("*").where("id", id).first();
    },
  
    deleteNote(knex, id) {
      return knex("noteful_notes").where({ id }).delete();
    },
  
    updateNote(knex, id, newFolderFields) {
      return knex("noteful_notes").where({ id }).update(newNotesFields);
    },
  };
  
  module.exports = NoteService;
  