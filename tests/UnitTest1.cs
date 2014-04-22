using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using notes.Models;

namespace tests
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            var note = new Note {Title = "title", Text = "text"};
            Assert.IsNotNull(note);
        }
    }
}
