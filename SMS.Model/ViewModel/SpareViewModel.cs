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
    public class SpareViewModel
    {
        #region Properties
        public List<SpareLocationmaster> liSpareLocationmaster { get; set; }
        public List<SparePartmaster> liSparePartmaster { get; set; }
        public List<SpareUpload> liSpareUpload { get; set; }
        public List<SpareRequestReason> liSpareRequestReason { get; set; }
        public List<SpareReturnReason> liSpareReturnReason { get; set; }
        public List<SpareingRequest> liSpareingRequest { get; set; }
        public List<SpareingIssue> liSpareingIssue { get; set; }
        public List<SpareingReturn> liSpareingReturn { get; set; }
        public List<SparePartLifeCycleReport> liSpareLifeCycleReport { get; set; }
        #endregion

        #region SpareLocationmaster
        public static List<SpareLocationmaster> SaveSpareLocationMaster(SpareLocationmaster SpareLocationmaster)
        {
            DataValue dv = new DataValue();

            dv.Add("@LocationID", SpareLocationmaster.LocationID, EnumCommand.DataType.Varchar);
            dv.Add("@LocationName", SpareLocationmaster.LocationName, EnumCommand.DataType.Varchar);
            dv.Add("@LocationStation", SpareLocationmaster.LocationStation, EnumCommand.DataType.Varchar);
            dv.Add("@LocationRow", SpareLocationmaster.LocationRow, EnumCommand.DataType.Varchar);
            dv.Add("@LocationColumn", SpareLocationmaster.LocationColumn, EnumCommand.DataType.Varchar);
            dv.Add("@LocationBin", SpareLocationmaster.LocationBinData, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareLocationmaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@ISACTIVE", SpareLocationmaster.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", SpareLocationmaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", SpareLocationmaster.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", SpareLocationmaster.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", SpareLocationmaster.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", SpareLocationmaster.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@P_PAGE_INDEX", SpareLocationmaster.P_PAGE_INDEX, EnumCommand.DataType.Int);
            dv.Add("@P_PAGE_SIZE", SpareLocationmaster.P_PAGE_SIZE, EnumCommand.DataType.Int);
            dv.Add("@SearchField", SpareLocationmaster.SearchField, EnumCommand.DataType.Varchar);
            dv.Add("@SearchData", SpareLocationmaster.SearchData, EnumCommand.DataType.Varchar);
            var SpareLocationinsert = (List<SpareLocationmaster>)SQLHelper.FetchData<SpareLocationmaster>(Common.Queries.SP_SPARELOCATION_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return SpareLocationinsert;
        }

        public static DataTable GetexcelSpareLocation(SpareLocationmaster SpareLocationmaster)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@LocationID", SpareLocationmaster.LocationID, EnumCommand.DataType.Varchar);
            dv.Add("@LocationName", SpareLocationmaster.LocationName, EnumCommand.DataType.Varchar);
            dv.Add("@LocationStation", SpareLocationmaster.LocationStation, EnumCommand.DataType.Varchar);
            dv.Add("@LocationRow", SpareLocationmaster.LocationRow, EnumCommand.DataType.Varchar);
            dv.Add("@LocationColumn", SpareLocationmaster.LocationColumn, EnumCommand.DataType.Varchar);
            dv.Add("@LocationBin", SpareLocationmaster.LocationBinData, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareLocationmaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@ISACTIVE", SpareLocationmaster.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", SpareLocationmaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", SpareLocationmaster.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", SpareLocationmaster.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", SpareLocationmaster.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", SpareLocationmaster.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@P_PAGE_INDEX", SpareLocationmaster.P_PAGE_INDEX, EnumCommand.DataType.Int);
            dv.Add("@P_PAGE_SIZE", SpareLocationmaster.P_PAGE_SIZE, EnumCommand.DataType.Int);
            dv.Add("@SearchField", SpareLocationmaster.SearchField, EnumCommand.DataType.Varchar);
            dv.Add("@SearchData", SpareLocationmaster.SearchData, EnumCommand.DataType.Varchar);
            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_SPARELOCATION_MASTER, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;

        }
        #endregion

        #region SpareRequestreasonMaster
        public static List<SpareRequestReason> SaveSpareRequestReasonMaster(SpareRequestReason SpareRequestReason)
        {
            DataValue dv = new DataValue();

            dv.Add("@SpareReqReasonId", SpareRequestReason.SpareReqReasonId, EnumCommand.DataType.Varchar);
            dv.Add("@ReasonCode", SpareRequestReason.ReasonCode, EnumCommand.DataType.Varchar);
            dv.Add("@ReasonDetails", SpareRequestReason.ReasonDetails, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareRequestReason.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", SpareRequestReason.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", SpareRequestReason.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", SpareRequestReason.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", SpareRequestReason.P_KEY, EnumCommand.DataType.Varchar);
            var SpareReasoninsert = (List<SpareRequestReason>)SQLHelper.FetchData<SpareRequestReason>(Common.Queries.SP_SPAREREQESTREASON_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return SpareReasoninsert;
        }

        public static DataTable GetExcelSpareRequestResonData(SpareRequestReason SpareRequestReason)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();

            dv.Add("@SpareReqReasonId", SpareRequestReason.SpareReqReasonId, EnumCommand.DataType.Varchar);
            dv.Add("@ReasonCode", SpareRequestReason.ReasonCode, EnumCommand.DataType.Varchar);
            dv.Add("@ReasonDetails", SpareRequestReason.ReasonDetails, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareRequestReason.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", SpareRequestReason.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", SpareRequestReason.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", SpareRequestReason.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", SpareRequestReason.P_KEY, EnumCommand.DataType.Varchar);

            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_SPAREREQESTREASON_MASTER, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }
        #endregion

        #region SpareReturnreasonMaster
        public static List<SpareReturnReason> SaveSpareReturnReasonMaster(SpareReturnReason SpareReturnReason)
        {
            DataValue dv = new DataValue();

            dv.Add("@SparereturnReasonId", SpareReturnReason.SparereturnReasonId, EnumCommand.DataType.Varchar);
            dv.Add("@ReasonCode", SpareReturnReason.ReasonCode, EnumCommand.DataType.Varchar);
            dv.Add("@ReasonDetails", SpareReturnReason.ReasonDetails, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareReturnReason.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", SpareReturnReason.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", SpareReturnReason.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", SpareReturnReason.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", SpareReturnReason.P_KEY, EnumCommand.DataType.Varchar);
            var SpareReturninsert = (List<SpareReturnReason>)SQLHelper.FetchData<SpareReturnReason>(Common.Queries.SP_SPARERETURNREASON_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return SpareReturninsert;
        }

        public static DataTable GetExcelSpareReturnReasonData(SpareReturnReason SpareReturnReason)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();

            dv.Add("@SparereturnReasonId", SpareReturnReason.SparereturnReasonId, EnumCommand.DataType.Varchar);
            dv.Add("@ReasonCode", SpareReturnReason.ReasonCode, EnumCommand.DataType.Varchar);
            dv.Add("@ReasonDetails", SpareReturnReason.ReasonDetails, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareReturnReason.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", SpareReturnReason.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", SpareReturnReason.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", SpareReturnReason.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", SpareReturnReason.P_KEY, EnumCommand.DataType.Varchar);
            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_SPARERETURNREASON_MASTER, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;

        }
        #endregion

        #region SparePartMaster
        public static List<SparePartmaster> SaveSparePartmaster(SparePartmaster SparePartmaster)
        {
            DataValue dv = new DataValue();

            dv.Add("@PartId", SparePartmaster.PartId, EnumCommand.DataType.Varchar);
            dv.Add("@PartNumber", SparePartmaster.PartNumber, EnumCommand.DataType.Varchar);
            dv.Add("@PartName", SparePartmaster.PartName, EnumCommand.DataType.Varchar);
            dv.Add("@PartSpecification", SparePartmaster.PartSpecification, EnumCommand.DataType.Varchar);
            dv.Add("@UOM", SparePartmaster.UOM, EnumCommand.DataType.Varchar);
            dv.Add("@CostPerUnit", SparePartmaster.CostPerUnit, EnumCommand.DataType.Varchar);
            dv.Add("@IsReusable", SparePartmaster.IsReusable, EnumCommand.DataType.Varchar);
            dv.Add("@SpareType", SparePartmaster.SpareType, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", SparePartmaster.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SparePartmaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", SparePartmaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", SparePartmaster.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", SparePartmaster.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", SparePartmaster.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", SparePartmaster.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@SubInv", SparePartmaster.SubInv, EnumCommand.DataType.Varchar);
            dv.Add("@ItemType", SparePartmaster.ItemType, EnumCommand.DataType.Varchar);
            dv.Add("@Min_qty", SparePartmaster.Min_qty, EnumCommand.DataType.Varchar);
            dv.Add("@Max_qty", SparePartmaster.Max_qty, EnumCommand.DataType.Varchar);
            dv.Add("@Reorder_qty", SparePartmaster.Reorder_qty, EnumCommand.DataType.Varchar);
            dv.Add("@LifeTime", SparePartmaster.LifeTime, EnumCommand.DataType.Varchar);
            dv.Add("@Spare_Location", SparePartmaster.Spare_Location, EnumCommand.DataType.Varchar);
            dv.Add("@VendorCode", SparePartmaster.VendorCode, EnumCommand.DataType.Varchar);
            dv.Add("@P_PAGE_INDEX", SparePartmaster.P_PAGE_INDEX, EnumCommand.DataType.Int);
            dv.Add("@P_PAGE_SIZE", SparePartmaster.P_PAGE_SIZE, EnumCommand.DataType.Int);
            dv.Add("@SearchField", SparePartmaster.SearchField, EnumCommand.DataType.Varchar);
            dv.Add("@SearchData", SparePartmaster.SearchData, EnumCommand.DataType.Varchar);
            var Sparepartinsert = (List<SparePartmaster>)SQLHelper.FetchData<SparePartmaster>(Common.Queries.SP_SPAREPART_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return Sparepartinsert;
        }

        public static DataTable SaveSparePartmasterTable(SparePartmaster SparePartmaster)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();

            dv.Add("@PartId", SparePartmaster.PartId, EnumCommand.DataType.Varchar);
            dv.Add("@PartNumber", SparePartmaster.PartNumber, EnumCommand.DataType.Varchar);
            dv.Add("@PartName", SparePartmaster.PartName, EnumCommand.DataType.Varchar);
            dv.Add("@PartSpecification", SparePartmaster.PartSpecification, EnumCommand.DataType.Varchar);
            dv.Add("@UOM", SparePartmaster.UOM, EnumCommand.DataType.Varchar);
            dv.Add("@CostPerUnit", SparePartmaster.CostPerUnit, EnumCommand.DataType.Varchar);
            dv.Add("@IsReusable", SparePartmaster.IsReusable, EnumCommand.DataType.Varchar);
            dv.Add("@SpareType", SparePartmaster.SpareType, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", SparePartmaster.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SparePartmaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", SparePartmaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", SparePartmaster.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", SparePartmaster.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", SparePartmaster.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", SparePartmaster.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@SubInv", SparePartmaster.SubInv, EnumCommand.DataType.Varchar);
            dv.Add("@ItemType", SparePartmaster.ItemType, EnumCommand.DataType.Varchar);
            dv.Add("@Min_qty", SparePartmaster.Min_qty, EnumCommand.DataType.Varchar);
            dv.Add("@Max_qty", SparePartmaster.Max_qty, EnumCommand.DataType.Varchar);
            dv.Add("@Reorder_qty", SparePartmaster.Reorder_qty, EnumCommand.DataType.Varchar);
            dv.Add("@LifeTime", SparePartmaster.LifeTime, EnumCommand.DataType.Varchar);
            dv.Add("@Spare_Location", SparePartmaster.Spare_Location, EnumCommand.DataType.Varchar);
            dv.Add("@VendorCode", SparePartmaster.VendorCode, EnumCommand.DataType.Varchar);
            dv.Add("@P_PAGE_INDEX", SparePartmaster.P_PAGE_INDEX, EnumCommand.DataType.Int);
            dv.Add("@P_PAGE_SIZE", SparePartmaster.P_PAGE_SIZE, EnumCommand.DataType.Int);
            dv.Add("@SearchField", SparePartmaster.SearchField, EnumCommand.DataType.Varchar);
            dv.Add("@SearchData", SparePartmaster.SearchData, EnumCommand.DataType.Varchar);


            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_SPAREPART_MASTER, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
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


            var ToolLocationinsert = (List<Dashboard>)SQLHelper.FetchData<Dashboard>(Common.Queries.SP_SPARE_Dashboard, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolLocationinsert;
        }
        #endregion

        #region SpareUpload
        public static List<SpareUpload> SaveSpareUpload(SpareUpload SpareUpload)
        {
            DataValue dv = new DataValue();

            dv.Add("@SpareUploadId", SpareUpload.SpareUploadId, EnumCommand.DataType.Varchar);
            dv.Add("@Plant", SpareUpload.Plant, EnumCommand.DataType.Varchar);
            dv.Add("@BusinessUnit", SpareUpload.BusinessUnit, EnumCommand.DataType.Varchar);
            dv.Add("@PartNumber", SpareUpload.PartNumber, EnumCommand.DataType.Varchar);
            dv.Add("@REV", SpareUpload.REV, EnumCommand.DataType.Varchar);
            dv.Add("@PartName", SpareUpload.PartName, EnumCommand.DataType.Varchar);
            dv.Add("@PartSpecification", SpareUpload.PartSpecification, EnumCommand.DataType.Varchar);
            dv.Add("@Quantity", SpareUpload.Quantity, EnumCommand.DataType.Varchar);
            dv.Add("@UOM", SpareUpload.UOM, EnumCommand.DataType.Varchar);
            dv.Add("@CostPerUnit", SpareUpload.CostPerUnit, EnumCommand.DataType.Varchar);
            dv.Add("@VendorCode", SpareUpload.VendorCode, EnumCommand.DataType.Varchar);
            dv.Add("@VendorName", SpareUpload.VendorName, EnumCommand.DataType.Varchar);
            dv.Add("@BudgetryDetails", SpareUpload.BudgetryDetails, EnumCommand.DataType.Varchar);
            dv.Add("@Sparetype", SpareUpload.Sparetype, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", SpareUpload.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareUpload.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", SpareUpload.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", SpareUpload.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", SpareUpload.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", SpareUpload.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", SpareUpload.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@Spare_Location", SpareUpload.Spare_Location, EnumCommand.DataType.Varchar);
            dv.Add("@SpareUniqueCode", SpareUpload.SpareUniqueCode, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", SpareUpload.PartId, EnumCommand.DataType.Varchar);
            dv.Add("@SpareInward_no", SpareUpload.SpareInward_no, EnumCommand.DataType.Varchar);
            dv.Add("@IsInsertEnd", SpareUpload.IsInsertEnd, EnumCommand.DataType.Varchar);
            dv.Add("@SpareInvoice_no", SpareUpload.SpareInvoice_no, EnumCommand.DataType.Varchar);
            dv.Add("@SpareInvoice_Date", SpareUpload.SpareInvoice_Date, EnumCommand.DataType.Varchar);
            dv.Add("@P_PAGE_INDEX", SpareUpload.P_PAGE_INDEX, EnumCommand.DataType.Int);
            dv.Add("@P_PAGE_SIZE", SpareUpload.P_PAGE_SIZE, EnumCommand.DataType.Int);
            dv.Add("@SearchField", SpareUpload.SearchField, EnumCommand.DataType.Varchar);
            dv.Add("@SearchData", SpareUpload.SearchData, EnumCommand.DataType.Varchar);
            // dv.Add("@InsertId", SpareUpload.InsertId, EnumCommand.DataType.Varchar);


            var SpareLocationinsert = (List<SpareUpload>)SQLHelper.FetchData<SpareUpload>(Common.Queries.SP_SPAREMASTER_UPLOAD, EnumCommand.DataSource.list, dv).DataSource.Data;
            return SpareLocationinsert;
        }

        public static DataTable SaveSpareUploadTable(SpareUpload SpareUpload)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@SpareUploadId", SpareUpload.SpareUploadId, EnumCommand.DataType.Varchar);
            dv.Add("@Plant", SpareUpload.Plant, EnumCommand.DataType.Varchar);
            dv.Add("@BusinessUnit", SpareUpload.BusinessUnit, EnumCommand.DataType.Varchar);
            dv.Add("@PartNumber", SpareUpload.PartNumber, EnumCommand.DataType.Varchar);
            dv.Add("@REV", SpareUpload.REV, EnumCommand.DataType.Varchar);
            dv.Add("@PartName", SpareUpload.PartName, EnumCommand.DataType.Varchar);
            dv.Add("@PartSpecification", SpareUpload.PartSpecification, EnumCommand.DataType.Varchar);
            dv.Add("@Quantity", SpareUpload.Quantity, EnumCommand.DataType.Varchar);
            dv.Add("@UOM", SpareUpload.UOM, EnumCommand.DataType.Varchar);
            dv.Add("@CostPerUnit", SpareUpload.CostPerUnit, EnumCommand.DataType.Varchar);
            dv.Add("@VendorCode", SpareUpload.VendorCode, EnumCommand.DataType.Varchar);
            dv.Add("@VendorName", SpareUpload.VendorName, EnumCommand.DataType.Varchar);
            dv.Add("@BudgetryDetails", SpareUpload.BudgetryDetails, EnumCommand.DataType.Varchar);
            dv.Add("@Sparetype", SpareUpload.Sparetype, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", SpareUpload.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareUpload.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", SpareUpload.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", SpareUpload.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", SpareUpload.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", SpareUpload.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", SpareUpload.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@Spare_Location", SpareUpload.Spare_Location, EnumCommand.DataType.Varchar);
            dv.Add("@SpareUniqueCode", SpareUpload.SpareUniqueCode, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", SpareUpload.PartId, EnumCommand.DataType.Varchar);
            dv.Add("@SpareInward_no", SpareUpload.SpareInward_no, EnumCommand.DataType.Varchar);
            dv.Add("@IsInsertEnd", SpareUpload.IsInsertEnd, EnumCommand.DataType.Varchar);
            dv.Add("@SpareInvoice_no", SpareUpload.SpareInvoice_no, EnumCommand.DataType.Varchar);
            dv.Add("@SpareInvoice_Date", SpareUpload.SpareInvoice_Date, EnumCommand.DataType.Varchar);
            dv.Add("@P_PAGE_INDEX", SpareUpload.P_PAGE_INDEX, EnumCommand.DataType.Int);
            dv.Add("@P_PAGE_SIZE", SpareUpload.P_PAGE_SIZE, EnumCommand.DataType.Int);
            dv.Add("@SearchField", SpareUpload.SearchField, EnumCommand.DataType.Varchar);
            dv.Add("@SearchData", SpareUpload.SearchData, EnumCommand.DataType.Varchar);
            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_SPAREMASTER_UPLOAD, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }
        #endregion

        #region SpareRequest
        public static List<SpareingRequest> SaveSpareingRequest(SpareingRequest SpareingRequest)
        {
            DataValue dv = new DataValue();

            dv.Add("@SpareReq_id", SpareingRequest.SpareReq_id, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_datetime", SpareingRequest.SpareReq_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_shift", SpareingRequest.SpareReq_shift, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_no", SpareingRequest.SpareReq_no, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_plant", SpareingRequest.SpareReq_plant, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_Partno", SpareingRequest.SpareReq_Partno, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_Partname", SpareingRequest.SpareReq_Partname, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_PartSpecification", SpareingRequest.SpareReq_PartSpecification, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_uniquecode", SpareingRequest.SpareReq_uniquecode, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_Linename", SpareingRequest.SpareReq_Linename, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_MachineCode", SpareingRequest.SpareReq_MachineCode, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_TroubleReqno", SpareingRequest.SpareReq_TroubleReqno, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_Employeeno", SpareingRequest.SpareReq_Employeeno, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_Employeename", SpareingRequest.SpareReq_Employeename, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_Qty", SpareingRequest.SpareReq_Qty, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_AvailableQty", SpareingRequest.SpareReq_AvailableQty, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_Reason", SpareingRequest.SpareReq_Reason, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_Remarks", SpareingRequest.SpareReq_Remarks, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", SpareingRequest.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareingRequest.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", SpareingRequest.CreatedBy, EnumCommand.DataType.Varchar);
            //dv.Add("@CreatedAt", SpareingRequest.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", SpareingRequest.ModifyBy, EnumCommand.DataType.Varchar);
            //dv.Add("@ModifyDate", SpareingRequest.ModifyDate, EnumCommand.DataType.Varchar);

            dv.Add("@P_KEY", SpareingRequest.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@RegrainCode", SpareingRequest.RegrainCode, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", SpareingRequest.PartId, EnumCommand.DataType.Varchar);
            dv.Add("@Requested_Emp_Number", SpareingRequest.Requested_Emp_Number, EnumCommand.DataType.Varchar);
            dv.Add("@Requested_Emp_Name", SpareingRequest.Requested_Emp_Name, EnumCommand.DataType.Varchar);
            dv.Add("@P_PAGE_INDEX", SpareingRequest.P_PAGE_INDEX, EnumCommand.DataType.Int);
            dv.Add("@P_PAGE_SIZE", SpareingRequest.P_PAGE_SIZE, EnumCommand.DataType.Int);
            dv.Add("@SearchField", SpareingRequest.SearchField, EnumCommand.DataType.Varchar);
            dv.Add("@SearchData", SpareingRequest.SearchData, EnumCommand.DataType.Varchar);

            var SpareReturninsert = (List<SpareingRequest>)SQLHelper.FetchData<SpareingRequest>(Common.Queries.SP_SPAREINGREQUEST, EnumCommand.DataSource.list, dv).DataSource.Data;
            return SpareReturninsert;
        }

        public static DataTable GetExcelSpareRequestData(SpareingRequest SpareingRequest)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@SpareReq_id", SpareingRequest.SpareReq_id, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_datetime", SpareingRequest.SpareReq_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_shift", SpareingRequest.SpareReq_shift, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_no", SpareingRequest.SpareReq_no, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_plant", SpareingRequest.SpareReq_plant, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_Partno", SpareingRequest.SpareReq_Partno, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_Partname", SpareingRequest.SpareReq_Partname, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_PartSpecification", SpareingRequest.SpareReq_PartSpecification, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_uniquecode", SpareingRequest.SpareReq_uniquecode, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_Linename", SpareingRequest.SpareReq_Linename, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_MachineCode", SpareingRequest.SpareReq_MachineCode, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_TroubleReqno", SpareingRequest.SpareReq_TroubleReqno, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_Employeeno", SpareingRequest.SpareReq_Employeeno, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_Employeename", SpareingRequest.SpareReq_Employeename, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_Qty", SpareingRequest.SpareReq_Qty, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_AvailableQty", SpareingRequest.SpareReq_AvailableQty, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_Reason", SpareingRequest.SpareReq_Reason, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_Remarks", SpareingRequest.SpareReq_Remarks, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", SpareingRequest.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareingRequest.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", SpareingRequest.CreatedBy, EnumCommand.DataType.Varchar);
            //dv.Add("@CreatedAt", SpareingRequest.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", SpareingRequest.ModifyBy, EnumCommand.DataType.Varchar);
            //dv.Add("@ModifyDate", SpareingRequest.ModifyDate, EnumCommand.DataType.Varchar);

            dv.Add("@P_KEY", SpareingRequest.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@RegrainCode", SpareingRequest.RegrainCode, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", SpareingRequest.PartId, EnumCommand.DataType.Varchar);
            dv.Add("@Requested_Emp_Number", SpareingRequest.Requested_Emp_Number, EnumCommand.DataType.Varchar);
            dv.Add("@Requested_Emp_Name", SpareingRequest.Requested_Emp_Name, EnumCommand.DataType.Varchar);
            dv.Add("@P_PAGE_INDEX", SpareingRequest.P_PAGE_INDEX, EnumCommand.DataType.Int);
            dv.Add("@P_PAGE_SIZE", SpareingRequest.P_PAGE_SIZE, EnumCommand.DataType.Int);
            dv.Add("@SearchField", SpareingRequest.SearchField, EnumCommand.DataType.Varchar);
            dv.Add("@SearchData", SpareingRequest.SearchData, EnumCommand.DataType.Varchar);
            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_SPAREINGREQUEST, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }


        public static List<SpareingRequest> SaveLinemachineMaster(SpareingRequest LineMachinemaster)
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
            var SpareLocationinsert = (List<SpareingRequest>)SQLHelper.FetchData<SpareingRequest>(Common.Queries.SP_LINE_MACHINE_MAP_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return SpareLocationinsert;
        }

        public static List<SpareingReturn> SaveLinemachineMaster(SpareingReturn LineMachinemaster)
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
            var SpareLocationinsert = (List<SpareingReturn>)SQLHelper.FetchData<SpareingReturn>(Common.Queries.SP_LINE_MACHINE_MAP_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return SpareLocationinsert;
        }


        #endregion

        #region SpareingIssue
        public static List<SpareingIssue> SaveSpareingIssue(SpareingIssue SpareingIssue)
        {
            DataValue dv = new DataValue();

            dv.Add("@SpareIsu_id", SpareingIssue.SpareIsu_id, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_id", SpareingIssue.SpareReq_id, EnumCommand.DataType.Varchar);
            // dv.Add("@SpareIsu_datetime", SpareingIssue.SpareIsu_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_shift", SpareingIssue.SpareIsu_shift, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Request_no", SpareingIssue.SpareIsu_Request_no, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Partno", SpareingIssue.SpareIsu_Partno, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Partname", SpareingIssue.SpareIsu_Partname, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_MachineCode", SpareingIssue.SpareIsu_MachineCode, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_MachineName", SpareingIssue.SpareIsu_MachineName, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Linename", SpareingIssue.SpareIsu_Linename, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Req_Employeeno", SpareingIssue.SpareIsu_Req_Employeeno, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Req_Employeename", SpareingIssue.SpareIsu_Req_Employeename, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Qty", SpareingIssue.SpareIsu_Qty, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_AvailableQty", SpareingIssue.SpareIsu_AvailableQty, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_MinQty", SpareingIssue.SpareIsu_MinQty, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_MaxQty", SpareingIssue.SpareIsu_MaxQty, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_ReorderQty", SpareingIssue.SpareIsu_ReorderQty, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Location", SpareingIssue.SpareIsu_Location, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_PreUnicode", SpareingIssue.SpareIsu_PreUnicode, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_CurUnicode", SpareingIssue.SpareIsu_CurUnicode, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_NoOfUnderWent_Regriding", SpareingIssue.SpareIsu_NoOfUnderWent_Regriding, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_LifeSpan", SpareingIssue.SpareIsu_LifeSpan, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Employeeno", SpareingIssue.SpareIsu_Employeeno, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Employeename", SpareingIssue.SpareIsu_Employeename, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Cancle_Reason", SpareingIssue.SpareIsu_Cancle_Reason, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Remarks", SpareingIssue.SpareIsu_Remarks, EnumCommand.DataType.Varchar);
            //if (SpareingIssue.SpareIsu_VendorCode != null)
            //{
            //    dv.Add("@SpareIsu_VendorCode", string.Join(",", SpareingIssue.SpareIsu_VendorCode), EnumCommand.DataType.Varchar);
            //}
            //else
            dv.Add("@SpareIsu_VendorCode", SpareingIssue.SpareIsu_VendorCode, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", SpareingIssue.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@Spare_Status", SpareingIssue.Spare_Status, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareingIssue.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", SpareingIssue.CreatedBy, EnumCommand.DataType.Varchar);

            dv.Add("@ModifyBy", SpareingIssue.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@IsInsertEnd", SpareingIssue.IsInsertEnd, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", SpareingIssue.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@RegrainCode", SpareingIssue.RegrainCode, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", SpareingIssue.PartId, EnumCommand.DataType.Varchar);
            dv.Add("@Issued_Emp_Number", SpareingIssue.Issued_Emp_Number, EnumCommand.DataType.Varchar);
            dv.Add("@Issued_Emp_Name", SpareingIssue.Issued_Emp_Name, EnumCommand.DataType.Varchar);
            dv.Add("@IsInsertBegin", SpareingIssue.IsInsertBegin, EnumCommand.DataType.Varchar);
            

            var SpareReturninsert = (List<SpareingIssue>)SQLHelper.FetchData<SpareingIssue>(Common.Queries.SP_SPAREING_ISSUE, EnumCommand.DataSource.list, dv).DataSource.Data;
            return SpareReturninsert;
        }

        public static DataTable GetExcelSpareIssueData(SpareingIssue SpareingIssue)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@SpareIsu_id", SpareingIssue.SpareIsu_id, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReq_id", SpareingIssue.SpareReq_id, EnumCommand.DataType.Varchar);
            // dv.Add("@SpareIsu_datetime", SpareingIssue.SpareIsu_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_shift", SpareingIssue.SpareIsu_shift, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Request_no", SpareingIssue.SpareIsu_Request_no, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Partno", SpareingIssue.SpareIsu_Partno, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Partname", SpareingIssue.SpareIsu_Partname, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_MachineCode", SpareingIssue.SpareIsu_MachineCode, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_MachineName", SpareingIssue.SpareIsu_MachineName, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Linename", SpareingIssue.SpareIsu_Linename, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Req_Employeeno", SpareingIssue.SpareIsu_Req_Employeeno, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Req_Employeename", SpareingIssue.SpareIsu_Req_Employeename, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Qty", SpareingIssue.SpareIsu_Qty, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_AvailableQty", SpareingIssue.SpareIsu_AvailableQty, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_MinQty", SpareingIssue.SpareIsu_MinQty, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_MaxQty", SpareingIssue.SpareIsu_MaxQty, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_ReorderQty", SpareingIssue.SpareIsu_ReorderQty, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Location", SpareingIssue.SpareIsu_Location, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_PreUnicode", SpareingIssue.SpareIsu_PreUnicode, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_CurUnicode", SpareingIssue.SpareIsu_CurUnicode, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_NoOfUnderWent_Regriding", SpareingIssue.SpareIsu_NoOfUnderWent_Regriding, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_LifeSpan", SpareingIssue.SpareIsu_LifeSpan, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Employeeno", SpareingIssue.SpareIsu_Employeeno, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Employeename", SpareingIssue.SpareIsu_Employeename, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Cancle_Reason", SpareingIssue.SpareIsu_Cancle_Reason, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_Remarks", SpareingIssue.SpareIsu_Remarks, EnumCommand.DataType.Varchar);
            //if (SpareingIssue.SpareIsu_VendorCode != null)
            //{
            //    dv.Add("@SpareIsu_VendorCode", string.Join(",", SpareingIssue.SpareIsu_VendorCode), EnumCommand.DataType.Varchar);
            //}
            //else
            dv.Add("@SpareIsu_VendorCode", SpareingIssue.SpareIsu_VendorCode, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", SpareingIssue.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@Spare_Status", SpareingIssue.Spare_Status, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareingIssue.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", SpareingIssue.CreatedBy, EnumCommand.DataType.Varchar);

            dv.Add("@ModifyBy", SpareingIssue.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", SpareingIssue.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@RegrainCode", SpareingIssue.RegrainCode, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", SpareingIssue.PartId, EnumCommand.DataType.Varchar);
            dv.Add("@Issued_Emp_Number", SpareingIssue.Issued_Emp_Number, EnumCommand.DataType.Varchar);
            dv.Add("@Issued_Emp_Name", SpareingIssue.Issued_Emp_Name, EnumCommand.DataType.Varchar);
            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_SPAREING_ISSUE, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }

        #endregion

        #region SpareingReturn
        public static List<SpareingReturn> SaveSpareingReturn(SpareingReturn SpareingReturn)
        {
            DataValue dv = new DataValue();
            dv.Add("@SpareRts_id", SpareingReturn.SpareRts_id, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_id", SpareingReturn.SpareIsu_id, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_no", SpareingReturn.SpareIsu_id, EnumCommand.DataType.Varchar);

            dv.Add("@SpareRts_datetime", SpareingReturn.SpareRts_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_shift", SpareingReturn.SpareRts_shift, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Return_no", SpareingReturn.SpareRts_Return_no, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Partno", SpareingReturn.SpareRts_Partno, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Partname", SpareingReturn.SpareRts_Partname, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_MachineCode", SpareingReturn.SpareRts_MachineCode, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_MachineName", SpareingReturn.SpareRts_MachineName, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Linename", SpareingReturn.SpareRts_Linename, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Unicode", SpareingReturn.SpareRts_Unicode, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRqt_datetime", SpareingReturn.SpareRqt_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_datetime", SpareingReturn.SpareIsu_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_LifeAchived", SpareingReturn.SpareRts_LifeAchived, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Model", SpareingReturn.SpareRts_Model, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Responsible_Dept", SpareingReturn.SpareRts_Responsible_Dept, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Responsible_Person", SpareingReturn.SpareRts_Responsible_Person, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Corrective_Action", SpareingReturn.SpareRts_Corrective_Action, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Reason", SpareingReturn.SpareRts_Reason, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Remarks", SpareingReturn.SpareRts_Remarks, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Qty", SpareingReturn.SpareRts_Qty, EnumCommand.DataType.Varchar);
            dv.Add("@Spare_Status", SpareingReturn.Spare_Status, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", SpareingReturn.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareingReturn.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", SpareingReturn.CreatedBy, EnumCommand.DataType.Varchar);

            dv.Add("@ModifyBy", SpareingReturn.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@IsReusable", SpareingReturn.Sparetype, EnumCommand.DataType.Varchar);
            dv.Add("@Return_Status", SpareingReturn.Return_Status, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", SpareingReturn.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@RegrainCode", SpareingReturn.RegrainCode, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", SpareingReturn.PartId, EnumCommand.DataType.Varchar);
            dv.Add("@Returned_Emp_Number", SpareingReturn.Returned_Emp_Number, EnumCommand.DataType.Varchar);
            dv.Add("@Returned_Emp_Name", SpareingReturn.Returned_Emp_Name, EnumCommand.DataType.Varchar);

            var SpareReturninsert = (List<SpareingReturn>)SQLHelper.FetchData<SpareingReturn>(Common.Queries.SP_SPAREINGRETURN, EnumCommand.DataSource.list, dv).DataSource.Data;
            return SpareReturninsert;
        }

        public static DataTable GetExcelSpareReturnData(SpareingReturn SpareingReturn)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@SpareRts_id", SpareingReturn.SpareRts_id, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_id", SpareingReturn.SpareIsu_id, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_no", SpareingReturn.SpareIsu_id, EnumCommand.DataType.Varchar);

            dv.Add("@SpareRts_datetime", SpareingReturn.SpareRts_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_shift", SpareingReturn.SpareRts_shift, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Return_no", SpareingReturn.SpareRts_Return_no, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Partno", SpareingReturn.SpareRts_Partno, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Partname", SpareingReturn.SpareRts_Partname, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_MachineCode", SpareingReturn.SpareRts_MachineCode, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_MachineName", SpareingReturn.SpareRts_MachineName, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Linename", SpareingReturn.SpareRts_Linename, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Unicode", SpareingReturn.SpareRts_Unicode, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRqt_datetime", SpareingReturn.SpareRqt_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@SpareIsu_datetime", SpareingReturn.SpareIsu_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_LifeAchived", SpareingReturn.SpareRts_LifeAchived, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Model", SpareingReturn.SpareRts_Model, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Responsible_Dept", SpareingReturn.SpareRts_Responsible_Dept, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Responsible_Person", SpareingReturn.SpareRts_Responsible_Person, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Corrective_Action", SpareingReturn.SpareRts_Corrective_Action, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Reason", SpareingReturn.SpareRts_Reason, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Remarks", SpareingReturn.SpareRts_Remarks, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_Qty", SpareingReturn.SpareRts_Qty, EnumCommand.DataType.Varchar);
            dv.Add("@Spare_Status", SpareingReturn.Spare_Status, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", SpareingReturn.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareingReturn.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", SpareingReturn.CreatedBy, EnumCommand.DataType.Varchar);

            dv.Add("@ModifyBy", SpareingReturn.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@IsReusable", SpareingReturn.Sparetype, EnumCommand.DataType.Varchar);
            dv.Add("@Return_Status", SpareingReturn.Return_Status, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", SpareingReturn.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@RegrainCode", SpareingReturn.RegrainCode, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", SpareingReturn.PartId, EnumCommand.DataType.Varchar);
            dv.Add("@Returned_Emp_Number", SpareingReturn.Returned_Emp_Number, EnumCommand.DataType.Varchar);
            dv.Add("@Returned_Emp_Name", SpareingReturn.Returned_Emp_Name, EnumCommand.DataType.Varchar);
            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_SPAREINGRETURN, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }
        #endregion

        #region SpareingRegrain
        public static List<SpareingReturn> SaveSpareingRegrain(SpareingReturn SpareingRegrain)
        {
            DataValue dv = new DataValue();
            dv.Add("@SpareReg_id", SpareingRegrain.SpareReg_id, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_id", SpareingRegrain.SpareRts_id, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_datetime", SpareingRegrain.SpareReg_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_shift", SpareingRegrain.SpareReg_shift, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_Regrain_no", SpareingRegrain.SpareReg_Regrain_no, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_Unicode", SpareingRegrain.SpareReg_Unicode, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_LifeAchived", SpareingRegrain.SpareReg_LifeAchived, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_Model", SpareingRegrain.SpareReg_Model, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_Responsible_Dept", SpareingRegrain.SpareReg_Responsible_Dept, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_Responsible_Person", SpareingRegrain.SpareReg_Responsible_Person, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_Corrective_Action", SpareingRegrain.SpareReg_Corrective_Action, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_Reason", SpareingRegrain.SpareReg_Reason, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_Remarks", SpareingRegrain.SpareReg_Remarks, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_Qty", SpareingRegrain.SpareReg_Qty, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_Unit_Cost", SpareingRegrain.SpareReg_Unit_Cost, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_VendorCode", SpareingRegrain.SpareReg_VendorCode, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_RDC_Number", SpareingRegrain.SpareReg_RDC_Number, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_Vend_ExpDate", SpareingRegrain.SpareReg_Vend_ExpDate, EnumCommand.DataType.Varchar);
            dv.Add("@Return_Status", SpareingRegrain.Return_Status, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", SpareingRegrain.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareingRegrain.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", SpareingRegrain.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", SpareingRegrain.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@Spare_Location", SpareingRegrain.Spare_Location, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_RegrainPartNo", SpareingRegrain.SpareReg_RegrainPartNo, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", SpareingRegrain.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@Regrained_Emp_Number", SpareingRegrain.Regrained_Emp_Number, EnumCommand.DataType.Varchar);
            dv.Add("@Regrained_Emp_Name", SpareingRegrain.Regrained_Emp_Name, EnumCommand.DataType.Varchar);
            dv.Add("@Regrained_Emp_Number_Update", SpareingRegrain.Regrained_Emp_Number_Update, EnumCommand.DataType.Varchar);
            dv.Add("@Regrained_Emp_Name_Update", SpareingRegrain.Regrained_Emp_Name_Update, EnumCommand.DataType.Varchar);
            var SpareReturninsert = (List<SpareingReturn>)SQLHelper.FetchData<SpareingReturn>(Common.Queries.SP_SPAREING_REGRAIN, EnumCommand.DataSource.list, dv).DataSource.Data;
            return SpareReturninsert;
        }

        public static DataTable GetExcelSpareRegrindingData(SpareingReturn SpareingRegrain)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@SpareReg_id", SpareingRegrain.SpareReg_id, EnumCommand.DataType.Varchar);
            dv.Add("@SpareRts_id", SpareingRegrain.SpareRts_id, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_datetime", SpareingRegrain.SpareReg_datetime, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_shift", SpareingRegrain.SpareReg_shift, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_Regrain_no", SpareingRegrain.SpareReg_Regrain_no, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_Unicode", SpareingRegrain.SpareReg_Unicode, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_LifeAchived", SpareingRegrain.SpareReg_LifeAchived, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_Model", SpareingRegrain.SpareReg_Model, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_Responsible_Dept", SpareingRegrain.SpareReg_Responsible_Dept, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_Responsible_Person", SpareingRegrain.SpareReg_Responsible_Person, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_Corrective_Action", SpareingRegrain.SpareReg_Corrective_Action, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_Reason", SpareingRegrain.SpareReg_Reason, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_Remarks", SpareingRegrain.SpareReg_Remarks, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_Qty", SpareingRegrain.SpareReg_Qty, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_Unit_Cost", SpareingRegrain.SpareReg_Unit_Cost, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_VendorCode", SpareingRegrain.SpareReg_VendorCode, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_RDC_Number", SpareingRegrain.SpareReg_RDC_Number, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_Vend_ExpDate", SpareingRegrain.SpareReg_Vend_ExpDate, EnumCommand.DataType.Varchar);
            dv.Add("@Return_Status", SpareingRegrain.Return_Status, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", SpareingRegrain.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareingRegrain.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", SpareingRegrain.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", SpareingRegrain.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@Spare_Location", SpareingRegrain.Spare_Location, EnumCommand.DataType.Varchar);
            dv.Add("@SpareReg_RegrainPartNo", SpareingRegrain.SpareReg_RegrainPartNo, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", SpareingRegrain.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@Regrained_Emp_Number", SpareingRegrain.Regrained_Emp_Number, EnumCommand.DataType.Varchar);
            dv.Add("@Regrained_Emp_Name", SpareingRegrain.Regrained_Emp_Name, EnumCommand.DataType.Varchar);
            dv.Add("@Regrained_Emp_Number_Update", SpareingRegrain.Regrained_Emp_Number_Update, EnumCommand.DataType.Varchar);
            dv.Add("@Regrained_Emp_Name_Update", SpareingRegrain.Regrained_Emp_Name_Update, EnumCommand.DataType.Varchar);
            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_SPAREING_REGRAIN, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }
        #endregion

        #region SpareQuantityReport
        public static DataTable GetSpareQuantityReport(SpareQuantityReport SpareQuantityReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@FromDate", SpareQuantityReport.FromDate, EnumCommand.DataType.Varchar);
            dv.Add("@Todate", SpareQuantityReport.Todate, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareQuantityReport.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@Report_Type", SpareQuantityReport.Report_Type, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", SpareQuantityReport.PartId, EnumCommand.DataType.Int);
            dv.Add("@Selected_Type", SpareQuantityReport.Selected_Type, EnumCommand.DataType.Varchar);
            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_SPARE_QUANTITY_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }
        public static List<SpareQuantityReport> GetSpareQuantityReportList(SpareQuantityReport SpareQuantityReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@FromDate", SpareQuantityReport.FromDate, EnumCommand.DataType.Varchar);
            dv.Add("@Todate", SpareQuantityReport.Todate, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareQuantityReport.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@Report_Type", SpareQuantityReport.Report_Type, EnumCommand.DataType.Varchar);
            //dv.Add("@PartNumber", SpareQuantityReport.PartNumber, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", SpareQuantityReport.PartId, EnumCommand.DataType.Int);
            dv.Add("@Selected_Type", SpareQuantityReport.Selected_Type, EnumCommand.DataType.Varchar);
            //dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_QUANTITY_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            //return dt;
            var listcity = (List<SpareQuantityReport>)SQLHelper.FetchData<SpareQuantityReport>(Common.Queries.SP_GET_SPARE_QUANTITY_REPORT, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }
        public static List<SpareQuantityReport> GetSpareQuantityAnalyticReport(SpareQuantityReport SpareQuantityReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@FromDate", SpareQuantityReport.FromDate, EnumCommand.DataType.Varchar);
            dv.Add("@Todate", SpareQuantityReport.Todate, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareQuantityReport.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@Report_Type", SpareQuantityReport.Report_Type, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", SpareQuantityReport.PartId, EnumCommand.DataType.Int);


            //dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_QUANTITY_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            //return dt;
            var listcity = (List<SpareQuantityReport>)SQLHelper.FetchData<SpareQuantityReport>(Common.Queries.SP_GET_SPARE_QUANTITY_ANALYTIC_REPORT, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }
        public static List<SpareQuantityReport> GetSpareCostAnalyticReport(SpareQuantityReport SpareQuantityReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@FromDate", SpareQuantityReport.FromDate, EnumCommand.DataType.Varchar);
            dv.Add("@Todate", SpareQuantityReport.Todate, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareQuantityReport.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@Report_Type", SpareQuantityReport.Report_Type, EnumCommand.DataType.Varchar);
            //dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_QUANTITY_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            //return dt;
            var listcity = (List<SpareQuantityReport>)SQLHelper.FetchData<SpareQuantityReport>(Common.Queries.SP_GET_SPARE_COST_ANALYTIC_REPORT, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }
        #endregion

        #region LifeCycleReport
        public static List<SparePartLifeCycleReport> GetPartLifeCycleReportList(SparePartLifeCycleReport QuantityReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@PartNumber", QuantityReport.PartNumber, EnumCommand.DataType.Varchar);
            dv.Add("@UniqueCode", QuantityReport.UniqueCode, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", QuantityReport.OrgID, EnumCommand.DataType.Varchar);
            //dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_QUANTITY_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            //return dt;
            var listcity = (List<SparePartLifeCycleReport>)SQLHelper.FetchData<SparePartLifeCycleReport>(Common.Queries.SP_SPARE_PART_LIFE_CYCLE_REPORT, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }
        #endregion

        #region SpareBreakageReport
        public static DataTable GetBreakageReport(SpareBreakageReport BreakageReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@FromDate", BreakageReport.FromDate, EnumCommand.DataType.Varchar);
            dv.Add("@Todate", BreakageReport.Todate, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", BreakageReport.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@ReasonType", BreakageReport.ReasonType, EnumCommand.DataType.Varchar);
            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_SPARE_BREAKAGE_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }

        public static List<SpareBreakageReport> GetBreakageReportList(SpareBreakageReport BreakageReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@FromDate", BreakageReport.FromDate, EnumCommand.DataType.Varchar);
            dv.Add("@Todate", BreakageReport.Todate, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", BreakageReport.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@ReasonType", BreakageReport.ReasonType, EnumCommand.DataType.Varchar);
            //dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_QUANTITY_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            //return dt;
            var listcity = (List<SpareBreakageReport>)SQLHelper.FetchData<SpareBreakageReport>(Common.Queries.SP_GET_SPARE_BREAKAGE_REPORT, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }
        public static List<SpareBreakageReport> GetReturnAnalyReport(SpareBreakageReport BreakageReport)
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
            var listcity = (List<SpareBreakageReport>)SQLHelper.FetchData<SpareBreakageReport>(Common.Queries.SP_GET_SPARE_RETURN_ANALYTIC_REPORT, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }
        #endregion

        #region SpareStockManagement
        public static List<SparePartmaster> SaveStockManagement(SparePartmaster Partmaster)
        {
            DataValue dv = new DataValue();
            dv.Add("@STK_ID", Partmaster.STK_ID, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", Partmaster.PartId, EnumCommand.DataType.Varchar);
            dv.Add("@PartNumber", Partmaster.PartNumber, EnumCommand.DataType.Varchar);
            dv.Add("@SYS_QTY", Partmaster.TotalProductCount, EnumCommand.DataType.Varchar);
            dv.Add("@PHY_QTY", Partmaster.PHY_QTY, EnumCommand.DataType.Varchar);
            dv.Add("@REMARKS", Partmaster.REMARKS, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", Partmaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", Partmaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", Partmaster.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", Partmaster.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@MONYEAR", Partmaster.MONYEAR, EnumCommand.DataType.Varchar);


            var ToolLocationinsert = (List<SparePartmaster>)SQLHelper.FetchData<SparePartmaster>(Common.Queries.SP_SPARE_STOCK_VERIFICATION, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolLocationinsert;
        }

        public static DataTable SaveStockManagementTable(SparePartmaster Partmaster)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@STK_ID", Partmaster.STK_ID, EnumCommand.DataType.Varchar);
            dv.Add("@PartId", Partmaster.PartId, EnumCommand.DataType.Varchar);
            dv.Add("@PartNumber", Partmaster.PartNumber, EnumCommand.DataType.Varchar);
            dv.Add("@SYS_QTY", Partmaster.TotalProductCount, EnumCommand.DataType.Varchar);
            dv.Add("@PHY_QTY", Partmaster.PHY_QTY, EnumCommand.DataType.Varchar);
            dv.Add("@REMARKS", Partmaster.REMARKS, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", Partmaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", Partmaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", Partmaster.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", Partmaster.P_KEY, EnumCommand.DataType.Varchar);
            dv.Add("@MONYEAR", Partmaster.MONYEAR, EnumCommand.DataType.Varchar);
            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_SPARE_STOCK_VERIFICATION, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }
        #endregion

        #region MachineQuantityReport
        public static List<SpareMachineQuantityReport> GetSpareMachineQuantityReportList(SpareMachineQuantityReport SpareQuantityReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@FromDate", SpareQuantityReport.FromDate, EnumCommand.DataType.Varchar);
            dv.Add("@Todate", SpareQuantityReport.Todate, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareQuantityReport.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@Report_Type", SpareQuantityReport.Report_Type, EnumCommand.DataType.Varchar);
            dv.Add("@LINE_NAME", SpareQuantityReport.LineName, EnumCommand.DataType.Varchar);
            //dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_QUANTITY_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            //return dt;
            var listcity = (List<SpareMachineQuantityReport>)SQLHelper.FetchData<SpareMachineQuantityReport>(Common.Queries.SP_GET_SPARE_MACHINE_REPORT, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }

        public static List<SpareMachineQuantityReport> GetSpareMachineQuantityAnalyticReport(SpareMachineQuantityReport SpareQuantityReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@FromDate", SpareQuantityReport.FromDate, EnumCommand.DataType.Varchar);
            dv.Add("@Todate", SpareQuantityReport.Todate, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareQuantityReport.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@Report_Type", SpareQuantityReport.Report_Type, EnumCommand.DataType.Varchar);
            dv.Add("@LINE_NAME", SpareQuantityReport.LineName, EnumCommand.DataType.Varchar);
            //dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_QUANTITY_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            //return dt;
            var listcity = (List<SpareMachineQuantityReport>)SQLHelper.FetchData<SpareMachineQuantityReport>(Common.Queries.SP_GET_SPARE_MACHINE_QTY_ANALYTIC_REPORT, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }

        public static List<SpareMachineQuantityReport> GetSpareMachineCostAnalyticReport(SpareMachineQuantityReport SpareQuantityReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@FromDate", SpareQuantityReport.FromDate, EnumCommand.DataType.Varchar);
            dv.Add("@Todate", SpareQuantityReport.Todate, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareQuantityReport.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@Report_Type", SpareQuantityReport.Report_Type, EnumCommand.DataType.Varchar);
            dv.Add("@LINE_NAME", SpareQuantityReport.LineName, EnumCommand.DataType.Varchar);
            //dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_QUANTITY_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            //return dt;
            var listcity = (List<SpareMachineQuantityReport>)SQLHelper.FetchData<SpareMachineQuantityReport>(Common.Queries.SP_GET_SPARE_MACHINE_COST_ANALYTIC_REPORT, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }

        public static DataTable GetSpareMachineQuantityReport(SpareMachineQuantityReport SpareQuantityReport)
        {
            DataValue dv = new DataValue();
            DataTable dt = new DataTable();
            dv.Add("@FromDate", SpareQuantityReport.FromDate, EnumCommand.DataType.Varchar);
            dv.Add("@Todate", SpareQuantityReport.Todate, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", SpareQuantityReport.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@Report_Type", SpareQuantityReport.Report_Type, EnumCommand.DataType.Varchar);
            dv.Add("@LINE_NAME", SpareQuantityReport.LineName, EnumCommand.DataType.Varchar);

            dt = (DataTable)SQLHelper.FetchData<DataTable>(Common.Queries.SP_GET_SPARE_MACHINE_REPORT, EnumCommand.DataSource.DataTable, dv).DataSource.Data;
            return dt;
        }
        #endregion       
       
        public static List<SpareScrab> GetScrabList(SpareScrab obj)
        {
            DataValue dv = new DataValue();
            dv.Add("@OrgID", obj.OrgID, EnumCommand.DataType.Int);
            var listcity = (List<SpareScrab>)SQLHelper.FetchData<SpareScrab>(Common.Queries.SP_GET_SPARESCRAP, EnumCommand.DataSource.list, dv).DataSource.Data;
            return listcity;
        }
    }
}
