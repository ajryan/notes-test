using System;
using System.Data.Entity;
using System.Web.Http;
using System.Web.Http.Tracing;
using notes.Data;

namespace notes
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            GlobalConfiguration.Configuration.Services.Replace(typeof(ITraceWriter), new DiagnosticTraceWriter());

            Database.SetInitializer(new NotesInitializer());
        }
    }
}
