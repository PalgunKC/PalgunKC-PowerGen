using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using OfficeOpenXml;
using OfficeOpenXml.Style;

namespace SMS.UTILITY
{
    public static class FromExcelToExcel
    {
        public static byte[] ToExcel(this DataTable query)
        {
            byte[] asByteArray;
            using (ExcelPackage pck = new ExcelPackage())
            {
                ExcelWorksheet ws = pck.Workbook.Worksheets.Add("Result");
                ws.Cells[1, 1].LoadFromDataTable(query, true);
                //ws.Cells[1, 1].Value = new DateTime(2019, 3, 7);
                //ws.Cells[1, 1].Style.Numberformat.Format = "dd/mm/yyyy";
                int colNumber = 1;

                foreach (DataColumn col in query.Columns)
                {
                    if (col.DataType == typeof(DateTime))
                    {
                        ws.Column(colNumber).Style.Numberformat.Format = "dd/MM/yyyy";
                    }
                    colNumber++;
                }

                //ws.Cells.AutoFitColumns();
                ws.Cells[ws.Dimension.Address].AutoFitColumns();




                asByteArray = pck.GetAsByteArray();
            }
            return asByteArray;
        }

        public static DataTable getDataTableFromExcel(this string path)
        {
            using (var pck = new OfficeOpenXml.ExcelPackage())
            {
                using (var stream = System.IO.File.OpenRead(path))
                {
                    pck.Load(stream);
                }
                var ws = pck.Workbook.Worksheets.First();
                DataTable tbl = new DataTable();
                bool hasHeader = true; // adjust it accordingly( i've mentioned that this is a simple approach)
                foreach (var firstRowCell in ws.Cells[1, 1, 1, ws.Dimension.End.Column])
                {
                    tbl.Columns.Add(hasHeader ? firstRowCell.Text : string.Format("Column {0}", firstRowCell.Start.Column));
                }
                var startRow = hasHeader ? 2 : 1;
                for (var rowNum = startRow; rowNum <= ws.Dimension.End.Row; rowNum++)
                {
                    var wsRow = ws.Cells[rowNum, 1, rowNum, ws.Dimension.End.Column];
                    var row = tbl.NewRow();
                    foreach (var cell in wsRow)
                    {
                        row[cell.Start.Column - 1] = cell.Text;
                    }
                    tbl.Rows.Add(row);
                }
                return tbl;
            }
        }
    }
}
