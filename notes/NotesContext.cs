using System;
using System.Data.Entity;
using notes.Models;

namespace notes
{
    public class NotesContext : DbContext
    {
        public DbSet<Note> Notes { get; set; }
    }
}