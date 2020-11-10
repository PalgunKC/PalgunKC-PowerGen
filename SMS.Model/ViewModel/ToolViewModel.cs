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
        public List<ToolVendorMaster> liToolVendorMaster { get; set; }
        public List<Partmaster> liPartmaster { get; set; }
        public List<Statemaster> liStateMaster { get; set; }
        public List<Citymaster> liCityMaster { get; set; }
        #endregion

        #region ToolLocationmaster
        public static List<ToolLocationmaster> SaveToolLocationMaster(ToolLocationmaster ToolLocationmaster)
        {
            DataValue dv = new DataValue();

            dv.Add("@LocationID", ToolLocationmaster.LocationID, EnumCommand.DataType.Varchar);
            dv.Add("@LocationName", ToolLocationmaster.LocationName, EnumCommand.DataType.Varchar);
            dv.Add("@LocationStation", ToolLocationmaster.LocationStation, EnumCommand.DataType.Varchar);
            dv.Add("@LocationRow", ToolLocationmaster.LocationRow, EnumCommand.DataType.Varchar);
            dv.Add("@LocationColumn", ToolLocationmaster.LocationColumn, EnumCommand.DataType.Varchar);
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

        #region ToolVendorMaster
        public static List<ToolVendorMaster> SaveToolVendorMaster(ToolVendorMaster ToolVendorMaster)
        {
            DataValue dv = new DataValue();

            dv.Add("@VendorId", ToolVendorMaster.VendorId, EnumCommand.DataType.Varchar);
            dv.Add("@VendorName", ToolVendorMaster.VendorName, EnumCommand.DataType.Varchar);
            dv.Add("@VendorCode", ToolVendorMaster.VendorCode, EnumCommand.DataType.Varchar);

            dv.Add("@VendorAddress", ToolVendorMaster.VendorAddress, EnumCommand.DataType.Varchar);
            dv.Add("@VendorLocation", ToolVendorMaster.VendorLocation, EnumCommand.DataType.Varchar);
            dv.Add("@Pincode", ToolVendorMaster.Pincode, EnumCommand.DataType.Varchar);
            dv.Add("@PhoneNo", ToolVendorMaster.PhoneNo, EnumCommand.DataType.Varchar);
            dv.Add("@EmailId", ToolVendorMaster.EmailId, EnumCommand.DataType.Varchar);
            dv.Add("@StateId", ToolVendorMaster.StateId, EnumCommand.DataType.Varchar);
            dv.Add("@CityId", ToolVendorMaster.CityId, EnumCommand.DataType.Varchar);
            dv.Add("@VendorType", ToolVendorMaster.VendorType, EnumCommand.DataType.Varchar);

            dv.Add("@OrgID", ToolVendorMaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", ToolVendorMaster.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", ToolVendorMaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", ToolVendorMaster.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", ToolVendorMaster.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", ToolVendorMaster.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", ToolVendorMaster.P_KEY, EnumCommand.DataType.Varchar);
            var ToolLocationinsert = (List<ToolVendorMaster>)SQLHelper.FetchData<ToolVendorMaster>(Common.Queries.SP_VENDOR_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolLocationinsert;
        }
        #endregion

        public static List<Statemaster> ListState(Statemaster Statemaster)
        {
            DataValue dv = new DataValue();
            var liststate = (List<Statemaster>)SQLHelper.FetchData<Statemaster>(Common.Queries.SP_GET_STATELIST, EnumCommand.DataSource.list, dv).DataSource.Data;
            return liststate;
        }
        public static List<Citymaster> ListCity(ToolVendorMaster obj)
        {
            DataValue dv = new DataValue();
            dv.Add("@STATE_CODE", obj.StateId, EnumCommand.DataType.Varchar);
            var listcity = (List<Citymaster>)SQLHelper.FetchData<Citymaster>(Common.Queries.SP_GET_CITYLIST, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }


        #region PartMaster
        public static List<Partmaster> SavePartmaster(Partmaster Partmaster)
        {
            DataValue dv = new DataValue();

            dv.Add("@PartId", Partmaster.PartId, EnumCommand.DataType.Varchar);
            dv.Add("@PartNumber", Partmaster.PartNumber, EnumCommand.DataType.Varchar);
            dv.Add("@PartName", Partmaster.PartName, EnumCommand.DataType.Varchar);
            dv.Add("@PartSpecification", Partmaster.PartSpecification, EnumCommand.DataType.Varchar);
            dv.Add("@UOM", Partmaster.UOM, EnumCommand.DataType.Varchar);
            dv.Add("@CostPerUnit", Partmaster.CostPerUnit, EnumCommand.DataType.Varchar);
            dv.Add("@IsReusable", Partmaster.IsReusable, EnumCommand.DataType.Varchar);
            dv.Add("@SpareType", Partmaster.SpareType, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", Partmaster.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", Partmaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", Partmaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", Partmaster.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", Partmaster.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", Partmaster.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", Partmaster.P_KEY, EnumCommand.DataType.Varchar);
            var ToolLocationinsert = (List<Partmaster>)SQLHelper.FetchData<Partmaster>(Common.Queries.SP_PART_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolLocationinsert;
        }
        #endregion

    }
}
