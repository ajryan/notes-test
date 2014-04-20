using System;
using System.Data.Entity;
using notes.Models;

namespace notes
{
    public class NotesInitializer : CreateDatabaseIfNotExists<NotesContext>
    {
        protected override void Seed(NotesContext context)
        {
            context.Notes.Add(new Note {Title = "First note", Text = "This is the first note"});
            context.SaveChanges();
        }
    }
}