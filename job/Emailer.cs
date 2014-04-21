using System;
using System.Configuration;
using System.Net;
using System.Net.Mail;

namespace job
{
    public static class Emailer
    {
        private static readonly string _MailgunServer;
        private static readonly int _MailgunPort;
        private static readonly string _MailgunLogin;
        private static readonly string _MailgunPassword;
        
        static Emailer()
        {
            _MailgunServer = ConfigurationManager.AppSettings["MAILGUN_SMTP_SERVER"];
            _MailgunPort = Int32.Parse(ConfigurationManager.AppSettings["MAILGUN_SMTP_PORT"]);
            _MailgunLogin = ConfigurationManager.AppSettings["MAILGUN_SMTP_LOGIN"];
            _MailgunPassword = ConfigurationManager.AppSettings["MAILGUN_SMTP_PASSWORD"];
        }

        public static void SendEmail(
            string fromEmailAddress, 
            string toEmailAddress,
            string subject,
            string body)
        {
            var mailMessage = new MailMessage(fromEmailAddress, toEmailAddress, subject, body);

            using (var smtpClient = new SmtpClient(_MailgunServer, _MailgunPort))
            {
                smtpClient.EnableSsl = (_MailgunPort == 587);
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential(_MailgunLogin, _MailgunPassword);
                smtpClient.Send(mailMessage);
            }
        }
    }
}
