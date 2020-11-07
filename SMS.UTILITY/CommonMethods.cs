using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Web;
using Microsoft.Office.Interop.Excel;
using System.ComponentModel;

namespace SMS.UTILITY
{
    public abstract class CommonMethods
    {
        public static void Log(string logMessage)
        {
            try
            {
                // Create a writer and open the file:  strFilePath = Server.MapPath("~/TmpExcelFileUpload/") + filename;
                StreamWriter log;
                string path = System.Web.HttpContext.Current.Server.MapPath("~/TmpExcelFileUpload/logfile.txt");
                if (!File.Exists(path))
                {
                    log = new StreamWriter(path);
                }
                else
                {
                    log = File.AppendText(path);
                }
                log.Write("\r\nLog Entry : ");
                log.WriteLine("{0} {1}", DateTime.Now.ToLongTimeString(),
                DateTime.Now.ToLongDateString());
                // log.WriteLine(" :");
                log.WriteLine(" :{0}", logMessage);
                log.WriteLine("-------------------------------");
                // Close the stream:  
                log.Close();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //public static void ExportAsExcel<T>(List<T> list, string filename) where T : new()
        //{
        //    var fileName = filename;
        //    ResultArgs resultArgs = new ResultArgs();
        //    FileInfo file = new FileInfo("test");
        //    if (list.Count > 0)
        //    {
        //        using (var package = new OfficeOpenXml.ExcelPackage(file))
        //        {
        //            var worksheet = package.Workbook.Worksheets.FirstOrDefault(x => x.Name == "Attempts");
        //            worksheet = package.Workbook.Worksheets.Add("Assessment Attempts");
        //            //worksheet.Row(1).Height = 20;
        //            worksheet.TabColor = System.Drawing.Color.Gold;
        //            worksheet.DefaultRowHeight = 12;
        //            worksheet.Row(1).Height = 20;
        //            worksheet.Column(1).AutoFit();
        //            package.Workbook.Properties.Title = "Attempts";
        //            PropertyDescriptorCollection properties = TypeDescriptor.GetProperties(typeof(T));
        //            int i = 1;
        //            foreach (PropertyDescriptor prop in properties)
        //            {
        //                worksheet.Cells[1, i].Value = prop.Name;
        //                //XcelApp.Cells[1, i] = prop.Name;
        //                i++;
        //                //table.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
        //            }
        //            HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        //            HttpContext.Current.Response.AddHeader("content-disposition", string.Format("attachment;  filename={0}", filename + "xlsx"));
        //            HttpContext.Current.Response.BinaryWrite(package.GetAsByteArray());
        //        }
        //    }
        //    if (list.Count > 0)
        //    {
        //        Microsoft.Office.Interop.Excel.Application XcelApp = new Microsoft.Office.Interop.Excel.Application();
        //        XcelApp.Application.Workbooks.Add(Type.Missing);
        //        PropertyDescriptorCollection properties = TypeDescriptor.GetProperties(typeof(T));
        //        int i = 1;
        //        foreach (PropertyDescriptor prop in properties)
        //        {
        //            XcelApp.Cells[1, i] = prop.Name;
        //            i++;
        //            //table.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
        //        }
        //        int j = 2;
        //        i = 1;
        //        foreach (var item in list)
        //        {
        //            foreach (PropertyDescriptor prop1 in properties)
        //            {
        //                string header = prop1.Name;
        //                XcelApp.Cells[j, i] = list[0];
        //                i++;
        //            }
        //            j++;
        //        }
        //        //foreach (var item in list)
        //        //{
        //        //    XcelApp.Cells[1, i] = "tst";
        //        //    i = i++;
        //        //}
        //        //for (int i = 1; i < list.Count + 1; i++)
        //        //{
        //        //    //XcelApp.Cells[1, i] ;
        //        //}
        //        //for (int i = 0; i < list.Count; i++)
        //        //{
        //        //    for (int j = 0; j < list.Count; j++)
        //        //    {
        //        //        //XcelApp.Cells[i + 2, j + 1] = list[i].Cells[j].Value.ToString();
        //        //    }
        //        //}
        //        XcelApp.Columns.AutoFit();
        //        XcelApp.Visible = true;
        //    }
        //    //return resultArgs;
        //}
    }
}
