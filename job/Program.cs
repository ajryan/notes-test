using System;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using notes.Data;

namespace job
{
    class Program
    {
        static void Main(string[] args)
        {
            int noteCount = 0;
            while (true)
            {
                WriteLine("Note count job running...");
                WriteLine("Current directory is: " + Environment.CurrentDirectory);

                string wwwRootPath = Environment.GetEnvironmentVariable("WEBROOT_PATH");
                WriteLine("WEBROOT_PATH is: " + wwwRootPath);

                NotesContext context = String.IsNullOrEmpty(wwwRootPath)
                    ? new NotesContext()
                    : new NotesContext(String.Format("Data Source={0}\\Notes.mdf", wwwRootPath));

                using (context)
                {
                    int noteDiff = context.Notes.Count() - noteCount;
                    
                    WriteLine(
                        String.Format("{0} new notes; {1} total notes", noteDiff, noteCount));
                    
                    noteCount += noteDiff;
                }
                WriteLine("Note count job done.");

                // TODO: could retrieve this from azure appSettings
                Thread.Sleep(TimeSpan.FromMinutes(30.0d));
            }
        }

        static void WriteLine(string message)
        {
            Trace.WriteLine(message);
            Console.WriteLine(message);
        }
    }
}
