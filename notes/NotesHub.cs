using System;
using Microsoft.AspNet.SignalR;

namespace notes
{
    public class NotesHub : Hub
    {
        public void AddNote(string noteTitle)
        {
            Clients.Others.noteAdded(noteTitle);
        }
    }
}