using System;
using System.Data.Entity;
using notes.Models;

namespace notes.Data
{
    public class NotesContext : DbContext
    {
        public NotesContext()
        {
        }

        public NotesContext(string connectionString)
            : base(connectionString)
        {
        }

        public DbSet<Note> Notes { get; set; }
    }
}