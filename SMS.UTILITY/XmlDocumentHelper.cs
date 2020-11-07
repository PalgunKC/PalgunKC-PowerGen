using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;

namespace SMS.UTILITY
{
    public static class XmlDocumentHelper
    {

        public static string ToXmlConvertion<T>(this List<T> LI) 
        {
            System.Xml.XmlDocument xmlDoc = new System.Xml.XmlDocument();
            System.Xml.Serialization.XmlSerializer serializer = new System.Xml.Serialization.XmlSerializer(LI.GetType());
            using (System.IO.MemoryStream ms = new System.IO.MemoryStream())
            {
                serializer.Serialize(ms, LI);
                ms.Position = 0;
                xmlDoc.Load(ms);
            }
            return xmlDoc.InnerXml.ToString();
        }
    }
}
