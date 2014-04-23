using System;
using System.Net.Http;
using System.Web.Http.Tracing;

namespace notes
{
    public class DiagnosticTraceWriter : ITraceWriter
    {
        public void Trace(
            HttpRequestMessage request,
            string category,
            TraceLevel level,
            Action<TraceRecord> traceAction)
        {
            var record = new TraceRecord(request, category, level);
            traceAction(record);
            WriteTrace(record);
        }

        private void WriteTrace(TraceRecord record)
        {
            string message = String.Format("{0} {1}: {2}",
                record.Request.Method,
                record.Request.RequestUri,
                record.Exception != null? record.Exception.GetBaseException().Message:
                String.IsNullOrEmpty(record.Message) ? "<no message>" : record.Message);

            switch (record.Level)
            {
                case TraceLevel.Error: 
                    System.Diagnostics.Trace.TraceError(message);
                    if (record.Exception != null)
                        System.Diagnostics.Trace.TraceError(record.Exception.StackTrace);
                    break;
                case TraceLevel.Warn: System.Diagnostics.Trace.TraceWarning(message);
                    break;
                default: System.Diagnostics.Trace.TraceInformation(message);
                    break;
            }
        }
    }
}