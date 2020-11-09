using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SMS.Model.Model;
using System.Data.OracleClient;
using System.Data.SqlClient;
using System.Data;
using SMS.DAO;
using SMS.UTILITY;
using System.Web;

namespace SMS.Model.ViewModel
{
   public class ToolViewModel
    {
        #region Properties
        public List<ToolLocationmaster> liToolLocationmaster { get; set; }
        #endregion

        #region ToolLocationmaster
        public static List<ToolLocationmaster> SaveToolLocationMaster(ToolLocationmaster ToolLocationmaster)
        {
            DataValue dv = new DataValue();

            dv.Add("@LocationID", ToolLocationmaster.LocationID, EnumCommand.DataType.Varchar);
            dv.Add("@LocationName", ToolLocationmaster.LocationName, EnumCommand.DataType.Varchar);
            dv.Add("@LocationCode", ToolLocationmaster.LocationCode, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolLocationmaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@ISACTIVE", ToolLocationmaster.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", ToolLocationmaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", ToolLocationmaster.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", ToolLocationmaster.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", ToolLocationmaster.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", ToolLocationmaster.P_KEY, EnumCommand.DataType.Varchar);
            var ToolLocationinsert = (List<ToolLocationmaster>)SQLHelper.FetchData<ToolLocationmaster>(Common.Queries.SP_LOCATION_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolLocationinsert;
        }
        #endregion
    }
}
