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
        public List<Statemaster> liStateMaster { get; set; }
        public List<Citymaster> liCityMaster { get; set; }
        public List<ToolVendorMaster> liToolVendorMaster { get; set; }
        public List<ToolLocationmaster> liToolLocationmaster { get; set; }
        public List<Partmaster> liPartmaster { get; set; }
        public List<ToolUpload> liToolUpload { get; set; }
        public List<ToolUpdate> liToolUpdate { get; set; }
        public List<PartGroupmaster> liPartGroupmaster { get; set; }
        public List<ToolRequestReason> liToolRequestReason { get; set; }
        public List<ToolReturnReason> liToolReturnReason { get; set; }
        public List<ToolingRequest> liToolingRequest { get; set; }
        public List<ToolingIssue> liToolingIssue { get; set; }
        public List<ToolingReturn> liToolingReturn { get; set; }
        public List<QuantityReport> liToolQtyReport { get; set; }
        public List<BreakageReport> liToolBreakageReport { get; set; }
        public List<PartLifeCycleReport> liToolLifeCycleReport { get; set; }
        #endregion

        #region PartgroupMaster
        public static List<PartGroupmaster> SavePartgroupMaster(PartGroupmaster PartGroupmaster)
        {
            DataValue dv = new DataValue();

            dv.Add("@ProductID", PartGroupmaster.ProductID, EnumCommand.DataType.Varchar);
            dv.Add("@Productgroup", PartGroupmaster.Productgroup, EnumCommand.DataType.Varchar);
            dv.Add("@Productgroup_desc", PartGroupmaster.Productgroup_desc, EnumCommand.DataType.Varchar);

            dv.Add("@OrgID", PartGroupmaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@ISACTIVE", PartGroupmaster.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", PartGroupmaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", PartGroupmaster.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", PartGroupmaster.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", PartGroupmaster.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", PartGroupmaster.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@P_PAGE_INDEX", PartGroupmaster.P_PAGE_INDEX, EnumCommand.DataType.Int);
            dv.Add("@P_PAGE_SIZE", PartGroupmaster.P_PAGE_SIZE, EnumCommand.DataType.Int);
            dv.Add("@SearchField", PartGroupmaster.SearchField, EnumCommand.DataType.Varchar);
            dv.Add("@SearchData", PartGroupmaster.SearchData, EnumCommand.DataType.Varchar);
            var ToolPartGroupinsert = (List<PartGroupmaster>)SQLHelper.FetchData<PartGroupmaster>(Common.Queries.SP_PRODUCTGROUP_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolPartGroupinsert;
        }

        public static DataTable GetexcelPartgroupMaster(PartGroupmaster PartGroupmaster)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@ProductID", PartGroupmaster.ProductID, EnumCommand.DataType.Varchar);
            dv.Add("@Productgroup", PartGroupmaster.Productgroup, EnumCommand.DataType.Varchar);
            dv.Add("@Productgroup_desc", PartGroupmaster.Productgroup_desc, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", PartGroupmaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@ISACTIVE", PartGroupmaster.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", PartGroupmaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", PartGroupmaster.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", PartGroupmaster.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", PartGroupmaster.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", PartGroupmaster.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@P_PAGE_INDEX", PartGroupmaster.P_PAGE_INDEX, EnumCommand.DataType.Int);
            dv.Add("@P_PAGE_SIZE", PartGroupmaster.P_PAGE_SIZE, EnumCommand.DataType.Int);
            dv.Add("@SearchField", PartGroupmaster.SearchField, EnumCommand.DataType.Varchar);
            dv.Add("@SearchData", PartGroupmaster.SearchData, EnumCommand.DataType.Varchar);
            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_PRODUCTGROUP_MASTER, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }
        #endregion

        #region ToolVendorMaster
        public static List<ToolVendorMaster> SaveToolVendorMaster(ToolVendorMaster ToolVendorMaster)
        {
            DataValue dv = new DataValue();

            //dv.Add("@VendorId", ToolVendorMaster.VendorId, EnumCommand.DataType.Varchar);
            //dv.Add("@VendorName", ToolVendorMaster.VendorName, EnumCommand.DataType.Varchar);
            //dv.Add("@VendorCode", ToolVendorMaster.VendorCode, EnumCommand.DataType.Varchar);

            //dv.Add("@VendorAddress", ToolVendorMaster.VendorAddress, EnumCommand.DataType.Varchar);
            //dv.Add("@VendorLocation", ToolVendorMaster.VendorLocation, EnumCommand.DataType.Varchar);
            //dv.Add("@Pincode", ToolVendorMaster.Pincode, EnumCommand.DataType.Varchar);
            //dv.Add("@PhoneNo", ToolVendorMaster.PhoneNo, EnumCommand.DataType.Varchar);
            //dv.Add("@EmailId", ToolVendorMaster.EmailId, EnumCommand.DataType.Varchar);
            //dv.Add("@StateId", ToolVendorMaster.StateId, EnumCommand.DataType.Varchar);
            //dv.Add("@CityId", ToolVendorMaster.CityId, EnumCommand.DataType.Varchar);
            //dv.Add("@VendorType", ToolVendorMaster.VendorType, EnumCommand.DataType.Varchar);

            //dv.Add("@OrgID", ToolVendorMaster.OrgID, EnumCommand.DataType.Varchar);
            //dv.Add("@IsActive", ToolVendorMaster.IsActive, EnumCommand.DataType.Varchar);
            //dv.Add("@CreatedBy", ToolVendorMaster.CreatedBy, EnumCommand.DataType.Varchar);
            //dv.Add("@CreatedAt", ToolVendorMaster.CreatedAt, EnumCommand.DataType.Varchar);
            //dv.Add("@ModifyBy", ToolVendorMaster.ModifyBy, EnumCommand.DataType.Varchar);
            //dv.Add("@ModifyDate", ToolVendorMaster.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", ToolVendorMaster.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@VendorId", ToolVendorMaster.VendorId, EnumCommand.DataType.Varchar);
            dv.Add("@Type", ToolVendorMaster.Type, EnumCommand.DataType.Varchar);
            dv.Add("@Supp_No", ToolVendorMaster.VendorCode, EnumCommand.DataType.Varchar);
            dv.Add("@Department", ToolVendorMaster.Department, EnumCommand.DataType.Varchar);
            dv.Add("@VendorName", ToolVendorMaster.VendorName, EnumCommand.DataType.Varchar);
            dv.Add("@site", ToolVendorMaster.site, EnumCommand.DataType.Varchar);
            dv.Add("@VendorAddress", ToolVendorMaster.VendorAddress, EnumCommand.DataType.Varchar);
            dv.Add("@VendorLocation", ToolVendorMaster.VendorLocation, EnumCommand.DataType.Varchar);
            dv.Add("@GSTNo", ToolVendorMaster.GSTNo, EnumCommand.DataType.Varchar);
            dv.Add("@PANNo", ToolVendorMaster.PANNo, EnumCommand.DataType.Varchar);
            dv.Add("@Account_Number", ToolVendorMaster.Account_Number, EnumCommand.DataType.Varchar);
            dv.Add("@Term", ToolVendorMaster.Term, EnumCommand.DataType.Varchar);
            dv.Add("@Prepay_Description", ToolVendorMaster.Prepay_Description, EnumCommand.DataType.Varchar);
            dv.Add("@Site_Pay_Group", ToolVendorMaster.Site_Pay_Group, EnumCommand.DataType.Varchar);
            dv.Add("@Contact_name1", ToolVendorMaster.Contact_name1, EnumCommand.DataType.Varchar);
            dv.Add("@Contact_mobileno1", ToolVendorMaster.Contact_mobileno1, EnumCommand.DataType.Varchar);
            dv.Add("@Contact_emailid1", ToolVendorMaster.Contact_emailid1, EnumCommand.DataType.Varchar);
            dv.Add("@Contact_name2", ToolVendorMaster.Contact_name2, EnumCommand.DataType.Varchar);
            dv.Add("@Contact_mobileno2", ToolVendorMaster.Contact_mobileno2, EnumCommand.DataType.Varchar);
            dv.Add("@Contact_emailid2", ToolVendorMaster.Contact_emailid2, EnumCommand.DataType.Varchar);
            dv.Add("@Bank_Name", ToolVendorMaster.Bank_Name, EnumCommand.DataType.Varchar);
            dv.Add("@Account_Name", ToolVendorMaster.Account_Name, EnumCommand.DataType.Varchar);
            dv.Add("@section_code", ToolVendorMaster.section_code, EnumCommand.DataType.Varchar);
            dv.Add("@Tax_Name", ToolVendorMaster.Tax_Name, EnumCommand.DataType.Varchar);
            dv.Add("@TDS_Vendor_Type", ToolVendorMaster.TDS_Vendor_Type, EnumCommand.DataType.Varchar);
            dv.Add("@PayDateBasis", ToolVendorMaster.PayDateBasis, EnumCommand.DataType.Varchar);
            dv.Add("@VendorSiteId", ToolVendorMaster.VendorSiteId, EnumCommand.DataType.Varchar);
            dv.Add("@VendorCode", ToolVendorMaster.VendorCode, EnumCommand.DataType.Varchar);
            dv.Add("@Vend_StartDate", ToolVendorMaster.Vend_StartDate, EnumCommand.DataType.Varchar);
            if (!string.IsNullOrEmpty(ToolVendorMaster.Vend_EndDate))
            //{ 
            //dv.Add("@Vend_EndDate", ToolVendorMaster.Vend_EndDate, EnumCommand.DataType.String);
            //}
            //else
            {
                dv.Add("@Vend_EndDate", ToolVendorMaster.Vend_EndDate, EnumCommand.DataType.Varchar);

            }
            //dv.Add("@Vend_CreationDate", ToolVendorMaster.Vend_CreationDate, EnumCommand.DataType.Varchar);
            dv.Add("@PaymentCurrencyCode", ToolVendorMaster.PaymentCurrencyCode, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolVendorMaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@EmailId", ToolVendorMaster.EmailId, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", ToolVendorMaster.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", ToolVendorMaster.CreatedBy, EnumCommand.DataType.Varchar);
            //dv.Add("@CreatedAt", ToolVendorMaster.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", ToolVendorMaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@P_PAGE_INDEX", ToolVendorMaster.P_PAGE_INDEX, EnumCommand.DataType.Int);
            dv.Add("@P_PAGE_SIZE", ToolVendorMaster.P_PAGE_SIZE, EnumCommand.DataType.Int);
            dv.Add("@SearchField", ToolVendorMaster.SearchField, EnumCommand.DataType.Varchar);
            dv.Add("@SearchData", ToolVendorMaster.SearchData, EnumCommand.DataType.Varchar);
            //dv.Add("@ModifyDate", ToolVendorMaster.ModifyDate, EnumCommand.DataType.Varchar);

            var ToolLocationinsert = (List<ToolVendorMaster>)SQLHelper.FetchData<ToolVendorMaster>(Common.Queries.SP_VENDOR_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolLocationinsert;
        }

        public static DataTable GetexcelVendorMaster(ToolVendorMaster ToolVendorMaster)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@P_KEY", ToolVendorMaster.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@VendorId", ToolVendorMaster.VendorId, EnumCommand.DataType.Varchar);
            dv.Add("@Type", ToolVendorMaster.Type, EnumCommand.DataType.Varchar);
            dv.Add("@Supp_No", ToolVendorMaster.VendorCode, EnumCommand.DataType.Varchar);
            dv.Add("@Department", ToolVendorMaster.Department, EnumCommand.DataType.Varchar);
            dv.Add("@VendorName", ToolVendorMaster.VendorName, EnumCommand.DataType.Varchar);
            dv.Add("@site", ToolVendorMaster.site, EnumCommand.DataType.Varchar);
            dv.Add("@VendorAddress", ToolVendorMaster.VendorAddress, EnumCommand.DataType.Varchar);
            dv.Add("@VendorLocation", ToolVendorMaster.VendorLocation, EnumCommand.DataType.Varchar);
            dv.Add("@GSTNo", ToolVendorMaster.GSTNo, EnumCommand.DataType.Varchar);
            dv.Add("@PANNo", ToolVendorMaster.PANNo, EnumCommand.DataType.Varchar);
            dv.Add("@Account_Number", ToolVendorMaster.Account_Number, EnumCommand.DataType.Varchar);
            dv.Add("@Term", ToolVendorMaster.Term, EnumCommand.DataType.Varchar);
            dv.Add("@Prepay_Description", ToolVendorMaster.Prepay_Description, EnumCommand.DataType.Varchar);
            dv.Add("@Site_Pay_Group", ToolVendorMaster.Site_Pay_Group, EnumCommand.DataType.Varchar);
            dv.Add("@Contact_name1", ToolVendorMaster.Contact_name1, EnumCommand.DataType.Varchar);
            dv.Add("@Contact_mobileno1", ToolVendorMaster.Contact_mobileno1, EnumCommand.DataType.Varchar);
            dv.Add("@Contact_emailid1", ToolVendorMaster.Contact_emailid1, EnumCommand.DataType.Varchar);
            dv.Add("@Contact_name2", ToolVendorMaster.Contact_name2, EnumCommand.DataType.Varchar);
            dv.Add("@Contact_mobileno2", ToolVendorMaster.Contact_mobileno2, EnumCommand.DataType.Varchar);
            dv.Add("@Contact_emailid2", ToolVendorMaster.Contact_emailid2, EnumCommand.DataType.Varchar);
            dv.Add("@Bank_Name", ToolVendorMaster.Bank_Name, EnumCommand.DataType.Varchar);
            dv.Add("@Account_Name", ToolVendorMaster.Account_Name, EnumCommand.DataType.Varchar);
            dv.Add("@section_code", ToolVendorMaster.section_code, EnumCommand.DataType.Varchar);
            dv.Add("@Tax_Name", ToolVendorMaster.Tax_Name, EnumCommand.DataType.Varchar);
            dv.Add("@TDS_Vendor_Type", ToolVendorMaster.TDS_Vendor_Type, EnumCommand.DataType.Varchar);
            dv.Add("@PayDateBasis", ToolVendorMaster.PayDateBasis, EnumCommand.DataType.Varchar);
            dv.Add("@VendorSiteId", ToolVendorMaster.VendorSiteId, EnumCommand.DataType.Varchar);
            dv.Add("@VendorCode", ToolVendorMaster.VendorCode, EnumCommand.DataType.Varchar);
            dv.Add("@Vend_StartDate", ToolVendorMaster.Vend_StartDate, EnumCommand.DataType.Varchar);
            if (!string.IsNullOrEmpty(ToolVendorMaster.Vend_EndDate))
            //{ 
            //dv.Add("@Vend_EndDate", ToolVendorMaster.Vend_EndDate, EnumCommand.DataType.String);
            //}
            //else
            {
                dv.Add("@Vend_EndDate", ToolVendorMaster.Vend_EndDate, EnumCommand.DataType.Varchar);

            }
            //dv.Add("@Vend_CreationDate", ToolVendorMaster.Vend_CreationDate, EnumCommand.DataType.Varchar);
            dv.Add("@PaymentCurrencyCode", ToolVendorMaster.PaymentCurrencyCode, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolVendorMaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@EmailId", ToolVendorMaster.EmailId, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", ToolVendorMaster.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", ToolVendorMaster.CreatedBy, EnumCommand.DataType.Varchar);
            //dv.Add("@CreatedAt", ToolVendorMaster.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", ToolVendorMaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@P_PAGE_INDEX", ToolVendorMaster.P_PAGE_INDEX, EnumCommand.DataType.Int);
            dv.Add("@P_PAGE_SIZE", ToolVendorMaster.P_PAGE_SIZE, EnumCommand.DataType.Int);
            dv.Add("@SearchField", ToolVendorMaster.SearchField, EnumCommand.DataType.Varchar);
            dv.Add("@SearchData", ToolVendorMaster.SearchData, EnumCommand.DataType.Varchar);
            //dv.Add("@ModifyDate", ToolVendorMaster.ModifyDate, EnumCommand.DataType.Varchar);

            //var ToolLocationinsert = (List<ToolVendorMaster>)SQLHelper.FetchData<ToolVendorMaster>(Common.Queries.SP_VENDOR_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            //return ToolLocationinsert;

            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_VENDOR_MASTER, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }
        #endregion

        #region ToolUpdate
        public static List<ToolUpdate> SaveToolUpdate(ToolUpdate ToolUpdate)
        {
            DataValue dv = new DataValue();

            dv.Add("@ToolUpdateId", ToolUpdate.ToolUpdateId, EnumCommand.DataType.Varchar);
            dv.Add("@SubInv", ToolUpdate.SubInv, EnumCommand.DataType.Varchar);
            dv.Add("@ItemType", ToolUpdate.ItemType, EnumCommand.DataType.Varchar);
            dv.Add("@PartNumber", ToolUpdate.PartNumber, EnumCommand.DataType.Varchar);
            dv.Add("@PartName", ToolUpdate.PartName, EnumCommand.DataType.Varchar);
            dv.Add("@Quantity", ToolUpdate.Quantity, EnumCommand.DataType.Varchar);
            dv.Add("@ToolUniqueCode", ToolUpdate.ToolUniqueCode, EnumCommand.DataType.Varchar);
            dv.Add("@Min_qty", ToolUpdate.Min_qty, EnumCommand.DataType.Varchar);
            dv.Add("@Max_qty", ToolUpdate.Max_qty, EnumCommand.DataType.Varchar);
            dv.Add("@Reorder_qty", ToolUpdate.Reorder_qty, EnumCommand.DataType.Varchar);
            dv.Add("@Tool_Location", ToolUpdate.Tool_Location, EnumCommand.DataType.Varchar);
            dv.Add("@LifeTime", ToolUpdate.LifeTime, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", ToolUpdate.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolUpdate.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", ToolUpdate.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", ToolUpdate.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", ToolUpdate.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", ToolUpdate.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@ToolUploadId", ToolUpdate.ToolUploadId, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", ToolUpdate.P_KEY, EnumCommand.DataType.Varchar);
            var ToolLocationinsert = (List<ToolUpdate>)SQLHelper.FetchData<ToolUpdate>(Common.Queries.SP_TOOLMASTER_UPDATE, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolLocationinsert;
        }
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
            dv.Add("@LocationBin", ToolLocationmaster.LocationBinData, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolLocationmaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@ISACTIVE", ToolLocationmaster.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", ToolLocationmaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", ToolLocationmaster.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", ToolLocationmaster.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", ToolLocationmaster.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", ToolLocationmaster.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@P_PAGE_INDEX", ToolLocationmaster.P_PAGE_INDEX, EnumCommand.DataType.Int);
            dv.Add("@P_PAGE_SIZE", ToolLocationmaster.P_PAGE_SIZE, EnumCommand.DataType.Int);
            dv.Add("@SearchField", ToolLocationmaster.SearchField, EnumCommand.DataType.Varchar);
            dv.Add("@SearchData", ToolLocationmaster.SearchData, EnumCommand.DataType.Varchar);
            var ToolLocationinsert = (List<ToolLocationmaster>)SQLHelper.FetchData<ToolLocationmaster>(Common.Queries.SP_LOCATION_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolLocationinsert;
        }

        public static DataTable GetexcelToolLocation(ToolLocationmaster ToolLocationmaster)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@LocationID", ToolLocationmaster.LocationID, EnumCommand.DataType.Varchar);
            dv.Add("@LocationName", ToolLocationmaster.LocationName, EnumCommand.DataType.Varchar);
            dv.Add("@LocationStation", ToolLocationmaster.LocationStation, EnumCommand.DataType.Varchar);
            dv.Add("@LocationRow", ToolLocationmaster.LocationRow, EnumCommand.DataType.Varchar);
            dv.Add("@LocationColumn", ToolLocationmaster.LocationColumn, EnumCommand.DataType.Varchar);
            dv.Add("@LocationBin", ToolLocationmaster.LocationBinData, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolLocationmaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@ISACTIVE", ToolLocationmaster.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", ToolLocationmaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", ToolLocationmaster.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", ToolLocationmaster.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", ToolLocationmaster.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", ToolLocationmaster.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@P_PAGE_INDEX", ToolLocationmaster.P_PAGE_INDEX, EnumCommand.DataType.Int);
            dv.Add("@P_PAGE_SIZE", ToolLocationmaster.P_PAGE_SIZE, EnumCommand.DataType.Int);
            dv.Add("@SearchField", ToolLocationmaster.SearchField, EnumCommand.DataType.Varchar);
            dv.Add("@SearchData", ToolLocationmaster.SearchData, EnumCommand.DataType.Varchar);
            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_LOCATION_MASTER, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }
        #endregion 

        #region ToolRequestreasonMaster
        public static List<ToolRequestReason> SaveToolRequestReasonMaster(ToolRequestReason ToolRequestReason)
        {
            DataValue dv = new DataValue();

            dv.Add("@ToolReqReasonId", ToolRequestReason.ToolReqReasonId, EnumCommand.DataType.Varchar);
            dv.Add("@ReasonCode", ToolRequestReason.ReasonCode, EnumCommand.DataType.Varchar);
            dv.Add("@ReasonDetails", ToolRequestReason.ReasonDetails, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolRequestReason.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", ToolRequestReason.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", ToolRequestReason.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", ToolRequestReason.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", ToolRequestReason.P_KEY, EnumCommand.DataType.Varchar);
            var ToolReasoninsert = (List<ToolRequestReason>)SQLHelper.FetchData<ToolRequestReason>(Common.Queries.SP_TOOLREQESTREASON_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolReasoninsert;
        }

        public static DataTable GetExcelToolRequestResonData(ToolRequestReason ToolRequestReason)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();

            dv.Add("@ToolReqReasonId", ToolRequestReason.ToolReqReasonId, EnumCommand.DataType.Varchar);
            dv.Add("@ReasonCode", ToolRequestReason.ReasonCode, EnumCommand.DataType.Varchar);
            dv.Add("@ReasonDetails", ToolRequestReason.ReasonDetails, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolRequestReason.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", ToolRequestReason.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", ToolRequestReason.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", ToolRequestReason.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", ToolRequestReason.P_KEY, EnumCommand.DataType.Varchar);

            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_TOOLREQESTREASON_MASTER, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }
        #endregion

        #region ToolReturnreasonMaster
        public static List<ToolReturnReason> SaveToolReturnReasonMaster(ToolReturnReason ToolReturnReason)
        {
            DataValue dv = new DataValue();

            dv.Add("@ToolreturnReasonId", ToolReturnReason.ToolreturnReasonId, EnumCommand.DataType.Varchar);
            dv.Add("@ReasonCode", ToolReturnReason.ReasonCode, EnumCommand.DataType.Varchar);
            dv.Add("@ReasonDetails", ToolReturnReason.ReasonDetails, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolReturnReason.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", ToolReturnReason.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", ToolReturnReason.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", ToolReturnReason.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", ToolReturnReason.P_KEY, EnumCommand.DataType.Varchar);
            var ToolReturninsert = (List<ToolReturnReason>)SQLHelper.FetchData<ToolReturnReason>(Common.Queries.SP_TOOLRETURNREASON_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolReturninsert;
        }

        public static DataTable GetExcelToolReturnResonData(ToolReturnReason ToolReturnReason)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@ToolreturnReasonId", ToolReturnReason.ToolreturnReasonId, EnumCommand.DataType.Varchar);
            dv.Add("@ReasonCode", ToolReturnReason.ReasonCode, EnumCommand.DataType.Varchar);
            dv.Add("@ReasonDetails", ToolReturnReason.ReasonDetails, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolReturnReason.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", ToolReturnReason.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", ToolReturnReason.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", ToolReturnReason.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", ToolReturnReason.P_KEY, EnumCommand.DataType.Varchar);

            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_TOOLRETURNREASON_MASTER, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }
        #endregion
      
        #region PartMaster
        public static List<Partmaster> SavePartmaster(Partmaster Partmaster)
        {
            DataValue dv = new DataValue();

            dv.Add("@PartId", Partmaster.PartId, EnumCommand.DataType.Int64);
            dv.Add("@PartNumber", Partmaster.PartNumber, EnumCommand.DataType.Varchar);
            dv.Add("@PartName", Partmaster.PartName, EnumCommand.DataType.Varchar);
            dv.Add("@PartSpecification", Partmaster.PartSpecification, EnumCommand.DataType.Varchar);
            dv.Add("@UOM", Partmaster.UOM, EnumCommand.DataType.Varchar);
            dv.Add("@CostPerUnit", Partmaster.CostPerUnit, EnumCommand.DataType.Varchar);
            dv.Add("@IsReusable", Partmaster.IsReusable, EnumCommand.DataType.Varchar);
            dv.Add("@SpareType", Partmaster.SpareType, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", Partmaster.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", Partmaster.OrgID, EnumCommand.DataType.Int);
            dv.Add("@CreatedBy", Partmaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", Partmaster.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", Partmaster.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", Partmaster.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", Partmaster.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@SubInv", Partmaster.SubInv, EnumCommand.DataType.Varchar);
            dv.Add("@ItemType", Partmaster.ItemType, EnumCommand.DataType.Varchar);
            dv.Add("@Min_qty", Partmaster.Min_qty, EnumCommand.DataType.Varchar);
            dv.Add("@Max_qty", Partmaster.Max_qty, EnumCommand.DataType.Varchar);
            dv.Add("@Reorder_qty", Partmaster.Reorder_qty, EnumCommand.DataType.Varchar);
            dv.Add("@LifeTime", Partmaster.LifeTime, EnumCommand.DataType.Varchar);
            dv.Add("@Tool_Location", Partmaster.Tool_Location, EnumCommand.DataType.Varchar);
            dv.Add("@VendorCode", Partmaster.VendorCode, EnumCommand.DataType.Varchar);
            dv.Add("@ProductGroup", Partmaster.ProductGroup, EnumCommand.DataType.Varchar);
            dv.Add("@P_PAGE_INDEX", Partmaster.P_PAGE_INDEX, EnumCommand.DataType.Int);
            dv.Add("@P_PAGE_SIZE", Partmaster.P_PAGE_SIZE, EnumCommand.DataType.Int);
            dv.Add("@SearchField", Partmaster.SearchField, EnumCommand.DataType.Varchar);
            dv.Add("@SearchData", Partmaster.SearchData, EnumCommand.DataType.Varchar);

            var ToolLocationinsert = (List<Partmaster>)SQLHelper.FetchData<Partmaster>(Common.Queries.SP_PART_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolLocationinsert;
        }

        public static DataTable SavePartmasterTable(Partmaster Partmaster)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();

            dv.Add("@PartId", Partmaster.PartId, EnumCommand.DataType.Int64);
            dv.Add("@PartNumber", Partmaster.PartNumber, EnumCommand.DataType.Varchar);
            dv.Add("@PartName", Partmaster.PartName, EnumCommand.DataType.Varchar);
            dv.Add("@PartSpecification", Partmaster.PartSpecification, EnumCommand.DataType.Varchar);
            dv.Add("@UOM", Partmaster.UOM, EnumCommand.DataType.Varchar);
            dv.Add("@CostPerUnit", Partmaster.CostPerUnit, EnumCommand.DataType.Varchar);
            dv.Add("@IsReusable", Partmaster.IsReusable, EnumCommand.DataType.Varchar);
            dv.Add("@SpareType", Partmaster.SpareType, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", Partmaster.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", Partmaster.OrgID, EnumCommand.DataType.Int);
            dv.Add("@CreatedBy", Partmaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", Partmaster.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", Partmaster.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", Partmaster.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", Partmaster.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@SubInv", Partmaster.SubInv, EnumCommand.DataType.Varchar);
            dv.Add("@ItemType", Partmaster.ItemType, EnumCommand.DataType.Varchar);
            dv.Add("@Min_qty", Partmaster.Min_qty, EnumCommand.DataType.Varchar);
            dv.Add("@Max_qty", Partmaster.Max_qty, EnumCommand.DataType.Varchar);
            dv.Add("@Reorder_qty", Partmaster.Reorder_qty, EnumCommand.DataType.Varchar);
            dv.Add("@LifeTime", Partmaster.LifeTime, EnumCommand.DataType.Varchar);
            dv.Add("@Tool_Location", Partmaster.Tool_Location, EnumCommand.DataType.Varchar);
            dv.Add("@VendorCode", Partmaster.VendorCode, EnumCommand.DataType.Varchar);
            dv.Add("@ProductGroup", Partmaster.ProductGroup, EnumCommand.DataType.Varchar);
            dv.Add("@P_PAGE_INDEX", Partmaster.P_PAGE_INDEX, EnumCommand.DataType.Int);
            dv.Add("@P_PAGE_SIZE", Partmaster.P_PAGE_SIZE, EnumCommand.DataType.Int);
            dv.Add("@SearchField", Partmaster.SearchField, EnumCommand.DataType.Varchar);
            dv.Add("@SearchData", Partmaster.SearchData, EnumCommand.DataType.Varchar);

            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_PART_MASTER, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }

        #endregion

        #region Dashboard
        public static List<Dashboard> GetDashboard(Dashboard Partmaster)
        {
            DataValue dv = new DataValue();


            dv.Add("@OrgID", Partmaster.OrgID, EnumCommand.DataType.Varchar);
            //dv.Add("@CreatedBy", Partmaster.CreatedBy, EnumCommand.DataType.Varchar);

            //dv.Add("@P_KEY", Partmaster.P_KEY, EnumCommand.DataType.Varchar);


            var ToolLocationinsert = (List<Dashboard>)SQLHelper.FetchData<Dashboard>(Common.Queries.SP_TOOL_Dashboard, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolLocationinsert;
        }
        #endregion

        #region ToolUpload
        public static List<ToolUpload> SaveToolUpload(ToolUpload ToolUpload)
        {
            DataValue dv = new DataValue();

            dv.Add("@ToolUploadId", ToolUpload.ToolUploadId, EnumCommand.DataType.Varchar);
            dv.Add("@Plant", ToolUpload.Plant, EnumCommand.DataType.Varchar);
            dv.Add("@BusinessUnit", ToolUpload.BusinessUnit, EnumCommand.DataType.Varchar);
            dv.Add("@PartNumber", ToolUpload.PartNumber, EnumCommand.DataType.Varchar);
            dv.Add("@REV", ToolUpload.REV, EnumCommand.DataType.Varchar);
            dv.Add("@PartName", ToolUpload.PartName, EnumCommand.DataType.Varchar);
            dv.Add("@PartSpecification", ToolUpload.PartSpecification, EnumCommand.DataType.Varchar);
            dv.Add("@Quantity", ToolUpload.Quantity, EnumCommand.DataType.Varchar);
            dv.Add("@UOM", ToolUpload.UOM, EnumCommand.DataType.Varchar);
            dv.Add("@CostPerUnit", ToolUpload.CostPerUnit, EnumCommand.DataType.Varchar);
            dv.Add("@VendorCode", ToolUpload.VendorCode, EnumCommand.DataType.Varchar);
            dv.Add("@VendorName", ToolUpload.VendorName, EnumCommand.DataType.Varchar);
            dv.Add("@BudgetryDetails", ToolUpload.BudgetryDetails, EnumCommand.DataType.Varchar);
            dv.Add("@Tooltype", ToolUpload.Tooltype, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", ToolUpload.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolUpload.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", ToolUpload.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", ToolUpload.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", ToolUpload.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", ToolUpload.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", ToolUpload.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@Tool_Location", ToolUpload.Tool_Location, EnumCommand.DataType.Varchar);
            dv.Add("@ToolUniqueCode", ToolUpload.ToolUniqueCode, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", ToolUpload.PartId, EnumCommand.DataType.Varchar);
            dv.Add("@ToolInward_no", ToolUpload.ToolInward_no, EnumCommand.DataType.Varchar);
            dv.Add("@IsInsertEnd", ToolUpload.IsInsertEnd, EnumCommand.DataType.Varchar);
            dv.Add("@ToolInvoice_no", ToolUpload.ToolInvoice_no, EnumCommand.DataType.Varchar);
            dv.Add("@ToolInvoice_Date", ToolUpload.ToolInvoice_Date, EnumCommand.DataType.Varchar);
            dv.Add("@P_PAGE_INDEX", ToolUpload.P_PAGE_INDEX, EnumCommand.DataType.Int);
            dv.Add("@P_PAGE_SIZE", ToolUpload.P_PAGE_SIZE, EnumCommand.DataType.Int);
            dv.Add("@SearchField", ToolUpload.SearchField, EnumCommand.DataType.Varchar);
            dv.Add("@SearchData", ToolUpload.SearchData, EnumCommand.DataType.Varchar);
            // dv.Add("@InsertId", ToolUpload.InsertId, EnumCommand.DataType.Varchar);


            var ToolLocationinsert = (List<ToolUpload>)SQLHelper.FetchData<ToolUpload>(Common.Queries.SP_TOOLMASTER_UPLOAD, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolLocationinsert;
        }

        public static DataTable GetExcelToolPartUploadData(ToolUpload ToolUpload)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@ToolUploadId", ToolUpload.ToolUploadId, EnumCommand.DataType.Varchar);
            dv.Add("@Plant", ToolUpload.Plant, EnumCommand.DataType.Varchar);
            dv.Add("@BusinessUnit", ToolUpload.BusinessUnit, EnumCommand.DataType.Varchar);
            dv.Add("@PartNumber", ToolUpload.PartNumber, EnumCommand.DataType.Varchar);
            dv.Add("@REV", ToolUpload.REV, EnumCommand.DataType.Varchar);
            dv.Add("@PartName", ToolUpload.PartName, EnumCommand.DataType.Varchar);
            dv.Add("@PartSpecification", ToolUpload.PartSpecification, EnumCommand.DataType.Varchar);
            dv.Add("@Quantity", ToolUpload.Quantity, EnumCommand.DataType.Varchar);
            dv.Add("@UOM", ToolUpload.UOM, EnumCommand.DataType.Varchar);
            dv.Add("@CostPerUnit", ToolUpload.CostPerUnit, EnumCommand.DataType.Varchar);
            dv.Add("@VendorCode", ToolUpload.VendorCode, EnumCommand.DataType.Varchar);
            dv.Add("@VendorName", ToolUpload.VendorName, EnumCommand.DataType.Varchar);
            dv.Add("@BudgetryDetails", ToolUpload.BudgetryDetails, EnumCommand.DataType.Varchar);
            dv.Add("@Tooltype", ToolUpload.Tooltype, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", ToolUpload.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolUpload.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", ToolUpload.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", ToolUpload.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", ToolUpload.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", ToolUpload.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", ToolUpload.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@Tool_Location", ToolUpload.Tool_Location, EnumCommand.DataType.Varchar);
            dv.Add("@ToolUniqueCode", ToolUpload.ToolUniqueCode, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", ToolUpload.PartId, EnumCommand.DataType.Varchar);
            dv.Add("@ToolInward_no", ToolUpload.ToolInward_no, EnumCommand.DataType.Varchar);
            dv.Add("@IsInsertEnd", ToolUpload.IsInsertEnd, EnumCommand.DataType.Varchar);
            dv.Add("@ToolInvoice_no", ToolUpload.ToolInvoice_no, EnumCommand.DataType.Varchar);
            dv.Add("@ToolInvoice_Date", ToolUpload.ToolInvoice_Date, EnumCommand.DataType.Varchar);
            dv.Add("@P_PAGE_INDEX", ToolUpload.P_PAGE_INDEX, EnumCommand.DataType.Int);
            dv.Add("@P_PAGE_SIZE", ToolUpload.P_PAGE_SIZE, EnumCommand.DataType.Int);
            dv.Add("@SearchField", ToolUpload.SearchField, EnumCommand.DataType.Varchar);
            dv.Add("@SearchData", ToolUpload.SearchData, EnumCommand.DataType.Varchar);
            // dv.Add("@InsertId", ToolUpload.InsertId, EnumCommand.DataType.Varchar);

            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_TOOLMASTER_UPLOAD, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }
        #endregion

        #region ToolRequest
        public static List<ToolingRequest> SaveToolingRequest(ToolingRequest ToolingRequest)
        {
            DataValue dv = new DataValue();

            dv.Add("@ToolReq_id", ToolingRequest.ToolReq_id, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_datetime", ToolingRequest.ToolReq_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_shift", ToolingRequest.ToolReq_shift, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_no", ToolingRequest.ToolReq_no, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_plant", ToolingRequest.ToolReq_plant, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_Partno", ToolingRequest.ToolReq_Partno, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_Partname", ToolingRequest.ToolReq_Partname, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_PartSpecification", ToolingRequest.ToolReq_PartSpecification, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_uniquecode", ToolingRequest.ToolReq_uniquecode, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_Linename", ToolingRequest.ToolReq_Linename, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_MachineCode", ToolingRequest.ToolReq_MachineCode, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_TroubleReqno", ToolingRequest.ToolReq_TroubleReqno, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_Employeeno", ToolingRequest.ToolReq_Employeeno, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_Employeename", ToolingRequest.ToolReq_Employeename, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_Qty", ToolingRequest.ToolReq_Qty, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_AvailableQty", ToolingRequest.ToolReq_AvailableQty, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_Reason", ToolingRequest.ToolReq_Reason, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_Remarks", ToolingRequest.ToolReq_Remarks, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", ToolingRequest.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolingRequest.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", ToolingRequest.CreatedBy, EnumCommand.DataType.Varchar);
            //dv.Add("@CreatedAt", ToolingRequest.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", ToolingRequest.ModifyBy, EnumCommand.DataType.Varchar);
            //dv.Add("@ModifyDate", ToolingRequest.ModifyDate, EnumCommand.DataType.Varchar);

            dv.Add("@P_KEY", ToolingRequest.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@RegrainCode", ToolingRequest.RegrainCode, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", ToolingRequest.PartId, EnumCommand.DataType.Varchar);
            dv.Add("@Requested_Emp_Number", ToolingRequest.Requested_Emp_Number, EnumCommand.DataType.Varchar);
            dv.Add("@Requested_Emp_Name", ToolingRequest.Requested_Emp_Name, EnumCommand.DataType.Varchar);
            dv.Add("@P_PAGE_INDEX", ToolingRequest.P_PAGE_INDEX, EnumCommand.DataType.Int);
            dv.Add("@P_PAGE_SIZE", ToolingRequest.P_PAGE_SIZE, EnumCommand.DataType.Int);
            dv.Add("@SearchField", ToolingRequest.SearchField, EnumCommand.DataType.Varchar);
            dv.Add("@SearchData", ToolingRequest.SearchData, EnumCommand.DataType.Varchar);
            var ToolReturninsert = (List<ToolingRequest>)SQLHelper.FetchData<ToolingRequest>(Common.Queries.SP_TOOLINGREQUEST, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolReturninsert;
        }

        public static DataTable GetExcelToolPartRequestData(ToolingRequest ToolingRequest)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();

            dv.Add("@ToolReq_id", ToolingRequest.ToolReq_id, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_datetime", ToolingRequest.ToolReq_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_shift", ToolingRequest.ToolReq_shift, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_no", ToolingRequest.ToolReq_no, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_plant", ToolingRequest.ToolReq_plant, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_Partno", ToolingRequest.ToolReq_Partno, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_Partname", ToolingRequest.ToolReq_Partname, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_PartSpecification", ToolingRequest.ToolReq_PartSpecification, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_uniquecode", ToolingRequest.ToolReq_uniquecode, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_Linename", ToolingRequest.ToolReq_Linename, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_MachineCode", ToolingRequest.ToolReq_MachineCode, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_TroubleReqno", ToolingRequest.ToolReq_TroubleReqno, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_Employeeno", ToolingRequest.ToolReq_Employeeno, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_Employeename", ToolingRequest.ToolReq_Employeename, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_Qty", ToolingRequest.ToolReq_Qty, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_AvailableQty", ToolingRequest.ToolReq_AvailableQty, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_Reason", ToolingRequest.ToolReq_Reason, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_Remarks", ToolingRequest.ToolReq_Remarks, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", ToolingRequest.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolingRequest.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", ToolingRequest.CreatedBy, EnumCommand.DataType.Varchar);
            //dv.Add("@CreatedAt", ToolingRequest.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", ToolingRequest.ModifyBy, EnumCommand.DataType.Varchar);
            //dv.Add("@ModifyDate", ToolingRequest.ModifyDate, EnumCommand.DataType.Varchar);

            dv.Add("@P_KEY", ToolingRequest.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@RegrainCode", ToolingRequest.RegrainCode, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", ToolingRequest.PartId, EnumCommand.DataType.Varchar);
            dv.Add("@Requested_Emp_Number", ToolingRequest.Requested_Emp_Number, EnumCommand.DataType.Varchar);
            dv.Add("@Requested_Emp_Name", ToolingRequest.Requested_Emp_Name, EnumCommand.DataType.Varchar);
            dv.Add("@P_PAGE_INDEX", ToolingRequest.P_PAGE_INDEX, EnumCommand.DataType.Int);
            dv.Add("@P_PAGE_SIZE", ToolingRequest.P_PAGE_SIZE, EnumCommand.DataType.Int);
            dv.Add("@SearchField", ToolingRequest.SearchField, EnumCommand.DataType.Varchar);
            dv.Add("@SearchData", ToolingRequest.SearchData, EnumCommand.DataType.Varchar);
            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_TOOLINGREQUEST, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }

        public static List<ToolingRequest> SaveLinemachineMaster(ToolingRequest LineMachinemaster)
        {
            DataValue dv = new DataValue();

            dv.Add("@LineMachine_Map_Id", LineMachinemaster.LineMachine_Map_Id, EnumCommand.DataType.Varchar);
            dv.Add("@LineMachine_Line_Code", LineMachinemaster.LineMachine_Line_Code, EnumCommand.DataType.Varchar);
            dv.Add("@LineMachine_Machine_Code", LineMachinemaster.LineMachine_Machine_Code, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", LineMachinemaster.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", LineMachinemaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", LineMachinemaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", LineMachinemaster.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", LineMachinemaster.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", LineMachinemaster.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", LineMachinemaster.P_KEY, EnumCommand.DataType.Varchar);
            var ToolLocationinsert = (List<ToolingRequest>)SQLHelper.FetchData<ToolingRequest>(Common.Queries.SP_LINE_MACHINE_MAP_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolLocationinsert;
        }

        public static List<ToolingReturn> SaveLinemachineMaster(ToolingReturn LineMachinemaster)
        {
            DataValue dv = new DataValue();

            dv.Add("@LineMachine_Map_Id", LineMachinemaster.LineMachine_Map_Id, EnumCommand.DataType.Varchar);
            dv.Add("@LineMachine_Line_Code", LineMachinemaster.LineMachine_Line_Code, EnumCommand.DataType.Varchar);
            dv.Add("@LineMachine_Machine_Code", LineMachinemaster.LineMachine_Machine_Code, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", LineMachinemaster.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", LineMachinemaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", LineMachinemaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", LineMachinemaster.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", LineMachinemaster.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", LineMachinemaster.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", LineMachinemaster.P_KEY, EnumCommand.DataType.Varchar);
            var ToolLocationinsert = (List<ToolingReturn>)SQLHelper.FetchData<ToolingReturn>(Common.Queries.SP_LINE_MACHINE_MAP_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolLocationinsert;
        }


        #endregion

        #region ToolingIssue
        public static List<ToolingIssue> SaveToolingIssue(ToolingIssue ToolingIssue)
        {
            DataValue dv = new DataValue();

            dv.Add("@ToolIsu_id", ToolingIssue.ToolIsu_id, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_id", ToolingIssue.ToolReq_id, EnumCommand.DataType.Varchar);
            // dv.Add("@ToolIsu_datetime", ToolingIssue.ToolIsu_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_shift", ToolingIssue.ToolIsu_shift, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Request_no", ToolingIssue.ToolIsu_Request_no, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Partno", ToolingIssue.ToolIsu_Partno, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Partname", ToolingIssue.ToolIsu_Partname, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_MachineCode", ToolingIssue.ToolIsu_MachineCode, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_MachineName", ToolingIssue.ToolIsu_MachineName, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Linename", ToolingIssue.ToolIsu_Linename, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Req_Employeeno", ToolingIssue.ToolIsu_Req_Employeeno, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Req_Employeename", ToolingIssue.ToolIsu_Req_Employeename, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Qty", ToolingIssue.ToolIsu_Qty, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_AvailableQty", ToolingIssue.ToolIsu_AvailableQty, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_MinQty", ToolingIssue.ToolIsu_MinQty, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_MaxQty", ToolingIssue.ToolIsu_MaxQty, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_ReorderQty", ToolingIssue.ToolIsu_ReorderQty, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Location", ToolingIssue.ToolIsu_Location, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_PreUnicode", ToolingIssue.ToolIsu_PreUnicode, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_CurUnicode", ToolingIssue.ToolIsu_CurUnicode, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_NoOfUnderWent_Regriding", ToolingIssue.ToolIsu_NoOfUnderWent_Regriding, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_LifeSpan", ToolingIssue.ToolIsu_LifeSpan, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Employeeno", ToolingIssue.ToolIsu_Employeeno, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Employeename", ToolingIssue.ToolIsu_Employeename, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Cancle_Reason", ToolingIssue.ToolIsu_Cancle_Reason, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Remarks", ToolingIssue.ToolIsu_Remarks, EnumCommand.DataType.Varchar);
            //if (ToolingIssue.ToolIsu_VendorCode != null)
            //{
            //    dv.Add("@ToolIsu_VendorCode", string.Join(",", ToolingIssue.ToolIsu_VendorCode), EnumCommand.DataType.Varchar);
            //}
            //else
            dv.Add("@ToolIsu_VendorCode", ToolingIssue.ToolIsu_VendorCode, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", ToolingIssue.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@Tool_Status", ToolingIssue.Tool_Status, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolingIssue.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", ToolingIssue.CreatedBy, EnumCommand.DataType.Varchar);

            dv.Add("@ModifyBy", ToolingIssue.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@IsInsertEnd", ToolingIssue.IsInsertEnd, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", ToolingIssue.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@RegrainCode", ToolingIssue.RegrainCode, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", ToolingIssue.PartId, EnumCommand.DataType.Varchar);
            dv.Add("@Issued_Emp_Number", ToolingIssue.Issued_Emp_Number, EnumCommand.DataType.Varchar);
            dv.Add("@Issued_Emp_Name", ToolingIssue.Issued_Emp_Name, EnumCommand.DataType.Varchar);
            dv.Add("@IsInsertBegin", ToolingIssue.IsInsertBegin, EnumCommand.DataType.Varchar);

            var ToolReturninsert = (List<ToolingIssue>)SQLHelper.FetchData<ToolingIssue>(Common.Queries.SP_TOOLING_ISSUE, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolReturninsert;
        }


        public static DataTable GetExcelToolPartIssueData(ToolingIssue ToolingIssue)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();

            dv.Add("@ToolIsu_id", ToolingIssue.ToolIsu_id, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReq_id", ToolingIssue.ToolReq_id, EnumCommand.DataType.Varchar);
            // dv.Add("@ToolIsu_datetime", ToolingIssue.ToolIsu_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_shift", ToolingIssue.ToolIsu_shift, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Request_no", ToolingIssue.ToolIsu_Request_no, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Partno", ToolingIssue.ToolIsu_Partno, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Partname", ToolingIssue.ToolIsu_Partname, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_MachineCode", ToolingIssue.ToolIsu_MachineCode, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_MachineName", ToolingIssue.ToolIsu_MachineName, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Linename", ToolingIssue.ToolIsu_Linename, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Req_Employeeno", ToolingIssue.ToolIsu_Req_Employeeno, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Req_Employeename", ToolingIssue.ToolIsu_Req_Employeename, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Qty", ToolingIssue.ToolIsu_Qty, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_AvailableQty", ToolingIssue.ToolIsu_AvailableQty, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_MinQty", ToolingIssue.ToolIsu_MinQty, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_MaxQty", ToolingIssue.ToolIsu_MaxQty, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_ReorderQty", ToolingIssue.ToolIsu_ReorderQty, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Location", ToolingIssue.ToolIsu_Location, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_PreUnicode", ToolingIssue.ToolIsu_PreUnicode, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_CurUnicode", ToolingIssue.ToolIsu_CurUnicode, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_NoOfUnderWent_Regriding", ToolingIssue.ToolIsu_NoOfUnderWent_Regriding, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_LifeSpan", ToolingIssue.ToolIsu_LifeSpan, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Employeeno", ToolingIssue.ToolIsu_Employeeno, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Employeename", ToolingIssue.ToolIsu_Employeename, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Cancle_Reason", ToolingIssue.ToolIsu_Cancle_Reason, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_Remarks", ToolingIssue.ToolIsu_Remarks, EnumCommand.DataType.Varchar);
            //if (ToolingIssue.ToolIsu_VendorCode != null)
            //{
            //    dv.Add("@ToolIsu_VendorCode", string.Join(",", ToolingIssue.ToolIsu_VendorCode), EnumCommand.DataType.Varchar);
            //}
            //else
            dv.Add("@ToolIsu_VendorCode", ToolingIssue.ToolIsu_VendorCode, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", ToolingIssue.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@Tool_Status", ToolingIssue.Tool_Status, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolingIssue.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", ToolingIssue.CreatedBy, EnumCommand.DataType.Varchar);

            dv.Add("@ModifyBy", ToolingIssue.ModifyBy, EnumCommand.DataType.Varchar);

            dv.Add("@P_KEY", ToolingIssue.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@RegrainCode", ToolingIssue.RegrainCode, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", ToolingIssue.PartId, EnumCommand.DataType.Varchar);
            dv.Add("@Issued_Emp_Number", ToolingIssue.Issued_Emp_Number, EnumCommand.DataType.Varchar);
            dv.Add("@Issued_Emp_Name", ToolingIssue.Issued_Emp_Name, EnumCommand.DataType.Varchar);
            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_TOOLING_ISSUE, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }

        #endregion  

        #region ToolingReturn
        public static List<ToolingReturn> SaveToolingReturn(ToolingReturn ToolingReturn)
        {
            DataValue dv = new DataValue();
            dv.Add("@ToolRts_id", ToolingReturn.ToolRts_id, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_id", ToolingReturn.ToolIsu_id, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_no", ToolingReturn.ToolIsu_id, EnumCommand.DataType.Varchar);

            dv.Add("@ToolRts_datetime", ToolingReturn.ToolRts_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_shift", ToolingReturn.ToolRts_shift, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Return_no", ToolingReturn.ToolRts_Return_no, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Partno", ToolingReturn.ToolRts_Partno, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Partname", ToolingReturn.ToolRts_Partname, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_MachineCode", ToolingReturn.ToolRts_MachineCode, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_MachineName", ToolingReturn.ToolRts_MachineName, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Linename", ToolingReturn.ToolRts_Linename, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Unicode", ToolingReturn.ToolRts_Unicode, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRqt_datetime", ToolingReturn.ToolRqt_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_datetime", ToolingReturn.ToolIsu_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_LifeAchived", ToolingReturn.ToolRts_LifeAchived, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Model", ToolingReturn.ToolRts_Model, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Responsible_Dept", ToolingReturn.ToolRts_Responsible_Dept, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Responsible_Person", ToolingReturn.ToolRts_Responsible_Person, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Corrective_Action", ToolingReturn.ToolRts_Corrective_Action, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Reason", ToolingReturn.ToolRts_Reason, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Remarks", ToolingReturn.ToolRts_Remarks, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Qty", ToolingReturn.ToolRts_Qty, EnumCommand.DataType.Varchar);
            dv.Add("@Tool_Status", ToolingReturn.Tool_Status, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", ToolingReturn.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolingReturn.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", ToolingReturn.CreatedBy, EnumCommand.DataType.Varchar);

            dv.Add("@ModifyBy", ToolingReturn.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@IsReusable", ToolingReturn.Tooltype, EnumCommand.DataType.Varchar);
            dv.Add("@Return_Status", ToolingReturn.Return_Status, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", ToolingReturn.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@RegrainCode", ToolingReturn.RegrainCode, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", ToolingReturn.PartId, EnumCommand.DataType.Varchar);
            dv.Add("@Returned_Emp_Number", ToolingReturn.Returned_Emp_Number, EnumCommand.DataType.Varchar);
            dv.Add("@Returned_Emp_Name", ToolingReturn.Returned_Emp_Name, EnumCommand.DataType.Varchar);
            var ToolReturninsert = (List<ToolingReturn>)SQLHelper.FetchData<ToolingReturn>(Common.Queries.SP_TOOLINGRETURN, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolReturninsert;
        }

        public static DataTable GetExcelToolPartReturnData(ToolingReturn ToolingReturn)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@ToolRts_id", ToolingReturn.ToolRts_id, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_id", ToolingReturn.ToolIsu_id, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_no", ToolingReturn.ToolIsu_id, EnumCommand.DataType.Varchar);

            dv.Add("@ToolRts_datetime", ToolingReturn.ToolRts_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_shift", ToolingReturn.ToolRts_shift, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Return_no", ToolingReturn.ToolRts_Return_no, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Partno", ToolingReturn.ToolRts_Partno, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Partname", ToolingReturn.ToolRts_Partname, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_MachineCode", ToolingReturn.ToolRts_MachineCode, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_MachineName", ToolingReturn.ToolRts_MachineName, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Linename", ToolingReturn.ToolRts_Linename, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Unicode", ToolingReturn.ToolRts_Unicode, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRqt_datetime", ToolingReturn.ToolRqt_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@ToolIsu_datetime", ToolingReturn.ToolIsu_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_LifeAchived", ToolingReturn.ToolRts_LifeAchived, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Model", ToolingReturn.ToolRts_Model, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Responsible_Dept", ToolingReturn.ToolRts_Responsible_Dept, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Responsible_Person", ToolingReturn.ToolRts_Responsible_Person, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Corrective_Action", ToolingReturn.ToolRts_Corrective_Action, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Reason", ToolingReturn.ToolRts_Reason, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Remarks", ToolingReturn.ToolRts_Remarks, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_Qty", ToolingReturn.ToolRts_Qty, EnumCommand.DataType.Varchar);
            dv.Add("@Tool_Status", ToolingReturn.Tool_Status, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", ToolingReturn.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolingReturn.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", ToolingReturn.CreatedBy, EnumCommand.DataType.Varchar);

            dv.Add("@ModifyBy", ToolingReturn.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@IsReusable", ToolingReturn.Tooltype, EnumCommand.DataType.Varchar);
            dv.Add("@Return_Status", ToolingReturn.Return_Status, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", ToolingReturn.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@RegrainCode", ToolingReturn.RegrainCode, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", ToolingReturn.PartId, EnumCommand.DataType.Varchar);
            dv.Add("@Returned_Emp_Number", ToolingReturn.Returned_Emp_Number, EnumCommand.DataType.Varchar);
            dv.Add("@Returned_Emp_Name", ToolingReturn.Returned_Emp_Name, EnumCommand.DataType.Varchar);
            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_TOOLINGRETURN, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }
        #endregion

        #region ToolingRegrain
        public static List<ToolingReturn> SaveToolingRegrain(ToolingReturn ToolingRegrain)
        {
            DataValue dv = new DataValue();
            dv.Add("@ToolReg_id", ToolingRegrain.ToolReg_id, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_id", ToolingRegrain.ToolRts_id, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_datetime", ToolingRegrain.ToolReg_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_shift", ToolingRegrain.ToolReg_shift, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_Regrain_no", ToolingRegrain.ToolReg_Regrain_no, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_Unicode", ToolingRegrain.ToolReg_Unicode, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_LifeAchived", ToolingRegrain.ToolReg_LifeAchived, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_Model", ToolingRegrain.ToolReg_Model, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_Responsible_Dept", ToolingRegrain.ToolReg_Responsible_Dept, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_Responsible_Person", ToolingRegrain.ToolReg_Responsible_Person, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_Corrective_Action", ToolingRegrain.ToolReg_Corrective_Action, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_Reason", ToolingRegrain.ToolReg_Reason, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_Remarks", ToolingRegrain.ToolReg_Remarks, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_Qty", ToolingRegrain.ToolReg_Qty, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_Unit_Cost", ToolingRegrain.ToolReg_Unit_Cost, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_VendorCode", ToolingRegrain.ToolReg_VendorCode, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_RDC_Number", ToolingRegrain.ToolReg_RDC_Number, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_Vend_ExpDate", ToolingRegrain.ToolReg_Vend_ExpDate, EnumCommand.DataType.Varchar);
            dv.Add("@Return_Status", ToolingRegrain.Return_Status, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", ToolingRegrain.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolingRegrain.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", ToolingRegrain.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", ToolingRegrain.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@Tool_Location", ToolingRegrain.Tool_Location, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_RegrainPartNo", ToolingRegrain.ToolReg_RegrainPartNo, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", ToolingRegrain.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@Regrained_Emp_Number", ToolingRegrain.Regrained_Emp_Number, EnumCommand.DataType.Varchar);
            dv.Add("@Regrained_Emp_Name", ToolingRegrain.Regrained_Emp_Name, EnumCommand.DataType.Varchar);
            dv.Add("@Regrained_Emp_Number_Update", ToolingRegrain.Regrained_Emp_Number_Update, EnumCommand.DataType.Varchar);
            dv.Add("@Regrained_Emp_Name_Update", ToolingRegrain.Regrained_Emp_Name_Update, EnumCommand.DataType.Varchar);
            var ToolReturninsert = (List<ToolingReturn>)SQLHelper.FetchData<ToolingReturn>(Common.Queries.SP_TOOLING_REGRAIN, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolReturninsert;
        }

        public static DataTable GetExcelToolPartRegrindingData(ToolingReturn ToolingRegrain)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@ToolReg_id", ToolingRegrain.ToolReg_id, EnumCommand.DataType.Varchar);
            dv.Add("@ToolRts_id", ToolingRegrain.ToolRts_id, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_datetime", ToolingRegrain.ToolReg_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_shift", ToolingRegrain.ToolReg_shift, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_Regrain_no", ToolingRegrain.ToolReg_Regrain_no, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_Unicode", ToolingRegrain.ToolReg_Unicode, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_LifeAchived", ToolingRegrain.ToolReg_LifeAchived, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_Model", ToolingRegrain.ToolReg_Model, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_Responsible_Dept", ToolingRegrain.ToolReg_Responsible_Dept, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_Responsible_Person", ToolingRegrain.ToolReg_Responsible_Person, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_Corrective_Action", ToolingRegrain.ToolReg_Corrective_Action, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_Reason", ToolingRegrain.ToolReg_Reason, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_Remarks", ToolingRegrain.ToolReg_Remarks, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_Qty", ToolingRegrain.ToolReg_Qty, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_Unit_Cost", ToolingRegrain.ToolReg_Unit_Cost, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_VendorCode", ToolingRegrain.ToolReg_VendorCode, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_RDC_Number", ToolingRegrain.ToolReg_RDC_Number, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_Vend_ExpDate", ToolingRegrain.ToolReg_Vend_ExpDate, EnumCommand.DataType.Varchar);
            dv.Add("@Return_Status", ToolingRegrain.Return_Status, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", ToolingRegrain.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolingRegrain.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", ToolingRegrain.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", ToolingRegrain.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@Tool_Location", ToolingRegrain.Tool_Location, EnumCommand.DataType.Varchar);
            dv.Add("@ToolReg_RegrainPartNo", ToolingRegrain.ToolReg_RegrainPartNo, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", ToolingRegrain.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@Regrained_Emp_Number", ToolingRegrain.Regrained_Emp_Number, EnumCommand.DataType.Varchar);
            dv.Add("@Regrained_Emp_Name", ToolingRegrain.Regrained_Emp_Name, EnumCommand.DataType.Varchar);
            dv.Add("@Regrained_Emp_Number_Update", ToolingRegrain.Regrained_Emp_Number_Update, EnumCommand.DataType.Varchar);
            dv.Add("@Regrained_Emp_Name_Update", ToolingRegrain.Regrained_Emp_Name_Update, EnumCommand.DataType.Varchar);
            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_TOOLING_REGRAIN, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }
        #endregion

        #region ToolQuantityReport
        public static DataTable GetQuantityReport(QuantityReport QuantityReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@FromDate", QuantityReport.FromDate, EnumCommand.DataType.Varchar);
            dv.Add("@Todate", QuantityReport.Todate, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", QuantityReport.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@Report_Type", QuantityReport.Report_Type, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", QuantityReport.PartId, EnumCommand.DataType.Int);
            dv.Add("@Selected_Type", QuantityReport.Selected_Type, EnumCommand.DataType.Varchar);

            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_QUANTITY_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }

        public static List<QuantityReport> GetQuantityReportList(QuantityReport QuantityReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@FromDate", QuantityReport.FromDate, EnumCommand.DataType.Varchar);
            dv.Add("@Todate", QuantityReport.Todate, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", QuantityReport.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@Report_Type", QuantityReport.Report_Type, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", QuantityReport.PartId, EnumCommand.DataType.Int);
            dv.Add("@Selected_Type", QuantityReport.Selected_Type, EnumCommand.DataType.Varchar);

            //dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_QUANTITY_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            //return dt;
            var listcity = (List<QuantityReport>)SQLHelper.FetchData<QuantityReport>(Common.Queries.SP_GET_QUANTITY_REPORT, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }
        public static List<QuantityReport> GetQuantityAnalyticReport(QuantityReport QuantityReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@FromDate", QuantityReport.FromDate, EnumCommand.DataType.Varchar);
            dv.Add("@Todate", QuantityReport.Todate, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", QuantityReport.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@Report_Type", QuantityReport.Report_Type, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", QuantityReport.PartId, EnumCommand.DataType.Int);

            //dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_QUANTITY_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            //return dt;
            var listcity = (List<QuantityReport>)SQLHelper.FetchData<QuantityReport>(Common.Queries.SP_GET_QUANTITY_ANALYTIC_REPORT, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }
        public static List<QuantityReport> GetCostAnalyticReport(QuantityReport QuantityReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@FromDate", QuantityReport.FromDate, EnumCommand.DataType.Varchar);
            dv.Add("@Todate", QuantityReport.Todate, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", QuantityReport.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@Report_Type", QuantityReport.Report_Type, EnumCommand.DataType.Varchar);
            //dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_QUANTITY_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            //return dt;
            var listcity = (List<QuantityReport>)SQLHelper.FetchData<QuantityReport>(Common.Queries.SP_GET_COST_ANALYTIC_REPORT, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }
        #endregion

        #region LifeCycleReport
        public static List<PartLifeCycleReport> GetPartLifeCycleReportList(PartLifeCycleReport QuantityReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@PartNumber", QuantityReport.PartNumber, EnumCommand.DataType.Varchar);
            dv.Add("@UniqueCode", QuantityReport.UniqueCode, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", QuantityReport.OrgID, EnumCommand.DataType.Varchar);
            //dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_QUANTITY_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            //return dt;
            var listcity = (List<PartLifeCycleReport>)SQLHelper.FetchData<PartLifeCycleReport>(Common.Queries.SP_PART_LIFE_CYCLE_REPORT, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }
        #endregion

        #region ToolBreakageReport
        public static DataTable GetBreakageReport(BreakageReport BreakageReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@FromDate", BreakageReport.FromDate, EnumCommand.DataType.Varchar);
            dv.Add("@Todate", BreakageReport.Todate, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", BreakageReport.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@ReasonType", BreakageReport.ReasonType, EnumCommand.DataType.Varchar);
            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_BREAKAGE_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }

        public static List<BreakageReport> GetBreakageReportList(BreakageReport BreakageReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@FromDate", BreakageReport.FromDate, EnumCommand.DataType.Varchar);
            dv.Add("@Todate", BreakageReport.Todate, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", BreakageReport.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@ReasonType", BreakageReport.ReasonType, EnumCommand.DataType.Varchar);
            //dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_QUANTITY_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            //return dt;
            var listcity = (List<BreakageReport>)SQLHelper.FetchData<BreakageReport>(Common.Queries.SP_GET_BREAKAGE_REPORT, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }
        public static List<BreakageReport> GetReturnAnalyReport(BreakageReport BreakageReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@FromDate", BreakageReport.FromDate, EnumCommand.DataType.Varchar);
            dv.Add("@Todate", BreakageReport.Todate, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", BreakageReport.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@ReasonType", BreakageReport.ReasonType, EnumCommand.DataType.Varchar);
            dv.Add("@Report_Type", BreakageReport.Report_Type, EnumCommand.DataType.Varchar);
            //dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_QUANTITY_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            //return dt;
            var listcity = (List<BreakageReport>)SQLHelper.FetchData<BreakageReport>(Common.Queries.SP_GET_RETURN_ANALYTIC_REPORT, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }
        #endregion

        #region StockManagement
        public static List<Partmaster> SaveStockManagement(Partmaster Partmaster)
        {
            DataValue dv = new DataValue();
            dv.Add("@STK_ID", Partmaster.STK_ID, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", Partmaster.PartId, EnumCommand.DataType.Int64);
            dv.Add("@PartNumber", Partmaster.PartNumber, EnumCommand.DataType.Varchar);
            dv.Add("@SYS_QTY", Partmaster.TotalProductCount, EnumCommand.DataType.Varchar);
            dv.Add("@PHY_QTY", Partmaster.PHY_QTY, EnumCommand.DataType.Varchar);
            dv.Add("@REMARKS", Partmaster.REMARKS, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", Partmaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", Partmaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", Partmaster.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", Partmaster.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@MONYEAR", Partmaster.MONYEAR, EnumCommand.DataType.Varchar);


            var ToolLocationinsert = (List<Partmaster>)SQLHelper.FetchData<Partmaster>(Common.Queries.SP_STOCK_VERIFICATION, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolLocationinsert;
        }

        public static DataTable SaveStockManagementTable(Partmaster Partmaster)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@STK_ID", Partmaster.STK_ID, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", Partmaster.PartId, EnumCommand.DataType.Int64);
            dv.Add("@PartNumber", Partmaster.PartNumber, EnumCommand.DataType.Varchar);
            dv.Add("@SYS_QTY", Partmaster.TotalProductCount, EnumCommand.DataType.Varchar);
            dv.Add("@PHY_QTY", Partmaster.PHY_QTY, EnumCommand.DataType.Varchar);
            dv.Add("@REMARKS", Partmaster.REMARKS, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", Partmaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", Partmaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", Partmaster.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", Partmaster.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@MONYEAR", Partmaster.MONYEAR, EnumCommand.DataType.Varchar);
            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_STOCK_VERIFICATION, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }
        #endregion

        #region MachineQuantityReport
        public static List<ToolMachineQuantityReport> GetToolMachineQuantityReportList(ToolMachineQuantityReport ToolQuantityReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@FromDate", ToolQuantityReport.FromDate, EnumCommand.DataType.Varchar);
            dv.Add("@Todate", ToolQuantityReport.Todate, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolQuantityReport.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@Report_Type", ToolQuantityReport.Report_Type, EnumCommand.DataType.Varchar);
            dv.Add("@LINE_NAME", ToolQuantityReport.LineName, EnumCommand.DataType.Varchar);
            //dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_QUANTITY_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            //return dt;
            var listcity = (List<ToolMachineQuantityReport>)SQLHelper.FetchData<ToolMachineQuantityReport>(Common.Queries.SP_GET_TOOL_MACHINE_REPORT, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }

        public static List<ToolMachineQuantityReport> GetToolMachineQuantityAnalyticReport(ToolMachineQuantityReport ToolQuantityReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@FromDate", ToolQuantityReport.FromDate, EnumCommand.DataType.Varchar);
            dv.Add("@Todate", ToolQuantityReport.Todate, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolQuantityReport.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@Report_Type", ToolQuantityReport.Report_Type, EnumCommand.DataType.Varchar);
            dv.Add("@LINE_NAME", ToolQuantityReport.LineName, EnumCommand.DataType.Varchar);
            //dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_QUANTITY_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            //return dt;
            var listcity = (List<ToolMachineQuantityReport>)SQLHelper.FetchData<ToolMachineQuantityReport>(Common.Queries.SP_GET_TOOL_MACHINE_QTY_ANALYTIC_REPORT, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }

        public static List<ToolMachineQuantityReport> GetToolMachineCostAnalyticReport(ToolMachineQuantityReport ToolQuantityReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@FromDate", ToolQuantityReport.FromDate, EnumCommand.DataType.Varchar);
            dv.Add("@Todate", ToolQuantityReport.Todate, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolQuantityReport.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@Report_Type", ToolQuantityReport.Report_Type, EnumCommand.DataType.Varchar);
            dv.Add("@LINE_NAME", ToolQuantityReport.LineName, EnumCommand.DataType.Varchar);
            //dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_QUANTITY_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            //return dt;
            var listcity = (List<ToolMachineQuantityReport>)SQLHelper.FetchData<ToolMachineQuantityReport>(Common.Queries.SP_GET_TOOL_MACHINE_COST_ANALYTIC_REPORT, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }

        public static DataTable GetToolMachineQuantityReport(ToolMachineQuantityReport ToolQuantityReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@FromDate", ToolQuantityReport.FromDate, EnumCommand.DataType.Varchar);
            dv.Add("@Todate", ToolQuantityReport.Todate, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", ToolQuantityReport.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@Report_Type", ToolQuantityReport.Report_Type, EnumCommand.DataType.Varchar);
            dv.Add("@LINE_NAME", ToolQuantityReport.LineName, EnumCommand.DataType.Varchar);

            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_TOOL_MACHINE_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
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
        public static List<Partmaster> GetPartQty(Partmaster obj)
        {
            DataValue dv = new DataValue();
            dv.Add("@OrgID", obj.OrgID, EnumCommand.DataType.Int);
            var listcity = (List<Partmaster>)SQLHelper.FetchData<Partmaster>(Common.Queries.SP_GET_PARTQTY, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }
        public static List<ToolScrab> GetScrabList(ToolScrab obj)
        {
            DataValue dv = new DataValue();
            dv.Add("@OrgID", obj.OrgID, EnumCommand.DataType.Int);
            var listcity = (List<ToolScrab>)SQLHelper.FetchData<ToolScrab>(Common.Queries.SP_GET_TOOLSCRAP, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }
        public static List<EmployeeMaster> GetEmployeeMasterList(EmployeeMaster obj)
        {
            DataValue dv = new DataValue();
            dv.Add("@OrgID", obj.OrgID, EnumCommand.DataType.Int);
            var listcity = (List<EmployeeMaster>)SQLHelper.FetchData<EmployeeMaster>(Common.Queries.SP_GET_EMPOLYEE_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }

    }
}
