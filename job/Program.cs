using System;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using Microsoft.WindowsAzure.Jobs;
using notes.Data;

namespace job
{
    class Program
    {
        static void Main(string[] args)
        {
            WriteLine("JOB INITIALIZING");

            // run job listener on background thread
            // so we can also run our count loop
            var host = new JobHost();
            host.RunOnBackgroundThread();
            
            RunNoteCountLoop();
        }

        public static void ProcessQueueMessage(
            [QueueInput("webjobsqueue")] string noteTitle)
        {
            WriteLine("Sending an SMS. New note title: " + noteTitle);
            Emailer.SendEmail(
                "ryan.aidan@gmail.com",
                "3013286768@tmomail.net",
                "New note: " + noteTitle,
                "A new note was posted at http://notes-test.azurewebsites.net/");
        }

        private static void RunNoteCountLoop()
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
                    : new NotesContext(String.Format("Data Source={0}\\App_Data\\Notes.mdf", wwwRootPath));

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
