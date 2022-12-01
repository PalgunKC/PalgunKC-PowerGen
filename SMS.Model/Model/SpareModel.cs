using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMS.Model.Model
{
    public class SpareModel
    {
    }

    public class SpareLocationmaster
    {
        public string LocationID { get; set; }
        public string LocationName { get; set; }
        public string LocationCode { get; set; }
        public string IsActive { get; set; }
        public string OrgID { get; set; }

        public string CreatedBy { get; set; }
        public string CreatedAt { get; set; }
        public string ModifyBy { get; set; }
        public string ModifyDate { get; set; }
        public string P_KEY { get; set; }

        public string MSG { get; set; }

        public string dummycolumn1 { get; set; }
        public string dummycolumn2 { get; set; }
        //Extra
        public string KEY { get; set; }
        public string LocationStation { get; set; }
        public string LocationRow { get; set; }
        public string LocationColumn { get; set; }
        public string LocationBinData { get; set; }
        public string Row_Id { get; set; }
        public string TotalCount { get; set; }
        public string P_PAGE_INDEX { get; set; }
        public string P_PAGE_SIZE { get; set; }
        public string Row_no { get; set; }
        public string SearchField { get; set; }
        public string SearchData { get; set; }

    }

    public class SpareRequestReason
    {
        public string SpareReqReasonId { get; set; }
        public string ReasonCode { get; set; }
        public string ReasonDetails { get; set; }
        public string IsActive { get; set; }
        public string OrgID { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedAt { get; set; }
        public string ModifyBy { get; set; }
        public string ModifyDate { get; set; }
        public string dummy_col1 { get; set; }
        public string dummy_col2 { get; set; }

        public string P_KEY { get; set; }
        public string MSG { get; set; }
        public string Max_ReqReason_no { get; set; }
    }

    public class SpareReturnReason
    {
        public string SparereturnReasonId { get; set; }
        public string ReasonCode { get; set; }
        public string ReasonDetails { get; set; }
        public string IsActive { get; set; }
        public string OrgID { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedAt { get; set; }
        public string ModifyBy { get; set; }
        public string ModifyDate { get; set; }
        public string dummy_col1 { get; set; }
        public string dummy_col2 { get; set; }
        public string Max_RetReason_no { get; set; }

        public string P_KEY { get; set; }
        public string MSG { get; set; }
    }

    public class SparePartmaster
    {
        public string PartId { get; set; }
        public string PartNumber { get; set; }
        public string PartName { get; set; }
        public string PartSpecification { get; set; }
        public string UOM { get; set; }
        public string CostPerUnit { get; set; }
        public string IsReusable { get; set; }
        public string SpareType { get; set; }
        public string IsActive { get; set; }
        public string OrgID { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedAt { get; set; }
        public string ModifyBy { get; set; }
        public string ModifyDate { get; set; }
        public string dummycolumn1 { get; set; }
        public string dummycolumn2 { get; set; }
        public string P_KEY { get; set; }

        public string MSG { get; set; }
        //Part Qty

        public string PartCountId { get; set; }


        public string TotalProductCount { get; set; }
        //From Update
        public string SubInv { get; set; }
        public string ItemType { get; set; }
        public string Min_qty { get; set; }
        public string Max_qty { get; set; }
        public string Reorder_qty { get; set; }
        public string LifeTime { get; set; }
        public string Spare_Location { get; set; }
        public string VendorCode { get; set; }
        //Stock
        public string STK_ID { get; set; }

        public string SYS_QTY { get; set; }
        public string PHY_QTY { get; set; }
        public string Diffrence { get; set; }
        public string REMARKS { get; set; }
        public string MONYEAR { get; set; }
        public string TotalCount { get; set; }
        public string P_PAGE_INDEX  { get; set; }
        public string P_PAGE_SIZE { get; set; }
        public string Row_no { get; set; }
        public string SearchField { get; set; }
        public string SearchData { get; set; }

    }

    public class SpareUpload
    {
        public string SpareUploadId { get; set; }
        public string Plant { get; set; }
        public string BusinessUnit { get; set; }
        public string PartNumber { get; set; }
        public string REV { get; set; }
        public string PartName { get; set; }
        public string Quantity { get; set; }
        public string UOM { get; set; }
        public string CostPerUnit { get; set; }
        public string VendorCode { get; set; }
        public string VendorName { get; set; }
        public string BudgetryDetails { get; set; }
        public string Sparetype { get; set; }
        public string IsActive { get; set; }
        public string OrgID { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedAt { get; set; }
        public string ModifyBy { get; set; }
        public string ModifyDate { get; set; }
        public string dummycolumn1 { get; set; }
        public string dummycolumn2 { get; set; }
        public string P_KEY { get; set; }
        public string MSG { get; set; }
        public string Spare_Location { get; set; }
        public string SpareUniqueCode { get; set; }
        public string PartSpecification { get; set; }
        public string InsertId { get; set; }
        public string PartId { get; set; }
        public string Max_SpareInward_no { get; set; }
        public string SpareInward_no { get; set; }
        public string IsInsertEnd { get; set; }
        public string SpareInvoice_no { get; set; }
        public string SpareInvoice_Date { get; set; }
        public string Row_Id { get; set; }
        public string TotalCount { get; set; }
        public string P_PAGE_INDEX { get; set; }
        public string P_PAGE_SIZE { get; set; }
        public string Row_no { get; set; }
        public string SearchField { get; set; }
        public string SearchData { get; set; }
        //List<Partmaster> liPartMaster = new List<Partmaster>();
        //List<SpareVendorMaster> liVendorMaster = new List<SpareVendorMaster>();



    }
    public class SpareScrab
    {
        public string ScrapId { get; set; }
        public string ScrapedCode { get; set; }
        public string PartNumber { get; set; }
        public string Reason { get; set; }
        public string IsActive { get; set; }
        public string OrgID { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedAt { get; set; }
        public string ModifyBy { get; set; }
        public string ModifyDate { get; set; }
        public string dummy_col1 { get; set; }
        public string dummy_col2 { get; set; }
        public string Shift { get; set; }
        public string UniCode { get; set; }
    }
    public class SpareingRequest
    {
        public string SpareReq_id { get; set; }
        public string SpareReq_datetime { get; set; }
        public string SpareReq_shift { get; set; }
        public string SpareReq_no { get; set; }
        public string Max_SpareReq_no { get; set; }
        public string SpareReq_plant { get; set; }
        public string SpareReq_Partno { get; set; }
        public string SpareReq_Partname { get; set; }
        public string SpareReq_PartSpecification { get; set; }
        public string SpareReq_uniquecode { get; set; }
        public string SpareReq_Linename { get; set; }
        public string SpareReq_Machinename { get; set; }
        public string SpareReq_MachineCode { get; set; }
        public string SpareReq_TroubleReqno { get; set; }
        public string SpareReq_Employeeno { get; set; }
        public string SpareReq_Employeename { get; set; }
        public string SpareReq_Qty { get; set; }
        public string SpareReq_AvailableQty { get; set; }
        public string SpareReq_Reason { get; set; }
        public string SpareReq_Remarks { get; set; }
        public string IsActive { get; set; }
        public string Spare_Status { get; set; }

        public string OrgID { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedAt { get; set; }
        public string ModifyBy { get; set; }
        public string ModifyDate { get; set; }
        public string dummy_col1 { get; set; }
        public string dummy_col2 { get; set; }
        public string P_KEY { get; set; }
        public string MSG { get; set; }

        ////////////////////
        public string LineMachine_Map_Id { get; set; }
        public string LineMachine_Line_Code { get; set; }
        public string LineMachine_Machine_Code { get; set; }
        public string MachineName { get; set; }
        public string Previous_UniCode { get; set; }
        public List<string> Machinecode { get; set; }
        public string RegrainCode { get; set; }
        public string PartId { get; set; }
        public string Requested_Emp_Number { get; set; }
        public string Requested_Emp_Name { get; set; }
        public string MachineNumber { get; set; }
        public string OrderCreatedAt { get; set; }

        public string TotalCount { get; set; }
        public string P_PAGE_INDEX { get; set; }
        public string P_PAGE_SIZE { get; set; }
        public string Row_no { get; set; }
        public string SearchField { get; set; }
        public string SearchData { get; set; }
        public string ReasonDetails { get; set; }

        public string TotalProductCount { get; set; }
        public string Min_qty { get; set; }
        public string Max_qty { get; set; }
        public string Reorder_qty { get; set; }
        public string LifeTime { get; set; }
        public string IsReusable { get; set; }
        public string PartName { get; set; }
        public string PartSpecification { get; set; }



    }

    public class SpareingReturn
    {
        public string SpareRts_id { get; set; }
        public string SpareIsu_id { get; set; }
        public string SpareRts_datetime { get; set; }
        public string SpareRts_shift { get; set; }
        public string SpareRts_Return_no { get; set; }
        public string SpareRts_Partno { get; set; }
        public string SpareRts_Partname { get; set; }
        public string SpareRts_MachineCode { get; set; }
        public string SpareRts_MachineName { get; set; }
        public string SpareRts_Linename { get; set; }
        public string SpareRts_Unicode { get; set; }
        public string SpareRqt_datetime { get; set; }
        public string SpareIsu_datetime { get; set; }
        public string SpareRts_LifeAchived { get; set; }
        public string SpareRts_Model { get; set; }
        public string SpareRts_Responsible_Dept { get; set; }
        public string SpareRts_Responsible_Person { get; set; }
        public string SpareRts_Corrective_Action { get; set; }
        public string SpareRts_Reason { get; set; }
        public string SpareRts_Remarks { get; set; }
        public string SpareRts_Qty { get; set; }
        public string Spare_Status { get; set; }
        public string IsActive { get; set; }
        public string OrgID { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedAt { get; set; }
        public string ModifyBy { get; set; }
        public string ModifyDate { get; set; }
        public string dummy_col1 { get; set; }
        public string dummy_col2 { get; set; }
        public string P_KEY { get; set; }
        public string MSG { get; set; }
        public string SpareRts_AvailableQty { get; set; }
        public string SpareRts_PartSpecification { get; set; }
        public string SpareRts_plant { get; set; }
        public string SpareRts_no { get; set; }
        //
        public string LineMachine_Map_Id { get; set; }
        public string LineMachine_Line_Code { get; set; }
        public string LineMachine_Machine_Code { get; set; }
        public string MachineName { get; set; }
        public string Sparetype { get; set; }
        public List<string> Machinecode { get; set; }
        public string Return_Status { get; set; }
        public string RegrainCode { get; set; }
        public string PartId { get; set; }
        public string Returned_Emp_Number { get; set; }
        public string Returned_Emp_Name { get; set; }

        //Regrined
        public string SpareReg_Regrain_no { get; set; }

        public string SpareReg_Responsible_Dept { get; set; }
        public string SpareReg_LifeAchived { get; set; }
        public string SpareReg_Model { get; set; }
        public string SpareReg_Responsible_Person { get; set; }
        public string SpareReg_Corrective_Action { get; set; }
        public string SpareReg_Reason { get; set; }
        public string SpareReg_Unit_Cost { get; set; }
        public string SpareReg_VendorCode { get; set; }
        public string SpareReg_VendorName { get; set; }
        public string SpareReg_RDC_Number { get; set; }
        public string SpareReg_Vend_ExpDate { get; set; }
        public string SpareReg_Qty { get; set; }
        public string SpareReg_Remarks { get; set; }

        public string SpareReg_id { get; set; }

        public string SpareReg_datetime { get; set; }
        public string SpareReg_shift { get; set; }

        public string SpareReg_Unicode { get; set; }

        public string Previous_UniCode { get; set; }

        public string Spare_Location { get; set; }
        public string SpareReg_RegrainPartNo { get; set; }
        public string OrderCreatedAt { get; set; }
        public string Regrained_Emp_Name { get; set; }
        public string Regrained_Emp_Number { get; set; }
        public string Regrained_Emp_Number_Update { get; set; }
        public string Regrained_Emp_Name_Update { get; set; }
        public string SRNo { get; set; }
        public string MachineNumber { get; set; }

    }

    public class SpareingIssue
    {
        public string SpareIsu_id { get; set; }
        public string SpareReq_id { get; set; }
        public string SpareIsu_datetime { get; set; }
        public string SpareIsu_shift { get; set; }
        public string SpareIsu_Request_no { get; set; }
        public string SpareIsu_Partno { get; set; }
        public string SpareIsu_Partname { get; set; }
        public string SpareIsu_MachineCode { get; set; }
        public string SpareIsu_MachineName { get; set; }
        public string SpareIsu_Linename { get; set; }
        public string SpareIsu_Req_Employeeno { get; set; }
        public string SpareIsu_Req_Employeename { get; set; }
        public string SpareIsu_Qty { get; set; }
        public string SpareIsu_AvailableQty { get; set; }
        public string SpareIsu_MinQty { get; set; }
        public string SpareIsu_MaxQty { get; set; }
        public string SpareIsu_ReorderQty { get; set; }
        public string SpareIsu_Location { get; set; }
        public string SpareIsu_PreUnicode { get; set; }
        public string SpareIsu_CurUnicode { get; set; }
        public string SpareIsu_NoOfUnderWent_Regriding { get; set; }
        public string SpareIsu_LifeSpan { get; set; }
        public string SpareIsu_Employeeno { get; set; }
        public string SpareIsu_Employeename { get; set; }
        public string SpareIsu_Cancle_Reason { get; set; }
        public string SpareIsu_Remarks { get; set; }
        public List<string> SpareIsu_VendorCode_list { get; set; }
        public string SpareIsu_VendorCode { get; set; }
        public string IsActive { get; set; }
        public string Spare_Status { get; set; }
        public string OrgID { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedAt { get; set; }
        public string ModifyBy { get; set; }
        public string ModifyDate { get; set; }
        public string dummy_col1 { get; set; }
        public string dummy_col2 { get; set; }
        public string P_KEY { get; set; }
        public string MSG { get; set; }
        public string SpareReq_Date { get; set; }
        public string SpareIsu_Date { get; set; }
        public string Is_Return { get; set; }
        public string RegrainCode { get; set; }
        public string PartId { get; set; }

        public string Issued_Emp_Name { get; set; }
        public string Issued_Emp_Number { get; set; }
        public string Sparetype { get; set; }
        public string IsInsertEnd { get; set; }
        public string @IsInsertBegin { get; set; }
        public string PartName { get; set; }
        public string PartSpecification { get; set; }

    }

    public class SpareQuantityReport
    {
        public string FromDate { get; set; }
        public string Todate { get; set; }
        public string OrgID { get; set; }

        public string S_No { get; set; }
        public string SubInv { get; set; }
        public string PartNumber { get; set; }
        public string PartName { get; set; }
        public string INWARD { get; set; }
        public string AvailableQty { get; set; }
        public string Max_qty { get; set; }
        public string Min_qty { get; set; }
        public string OUTWARD { get; set; }
        public string Cost_Inward { get; set; }
        public string CostPerUnit { get; set; }

        public string Cost_Outward { get; set; }

        public string TOTAL_EXPENSE { get; set; }
        public string Stock_Value { get; set; }
        public string CreatedAt { get; set; }
        public string Return_Qty { get; set; }
        ///Analysis report
        public string year { get; set; }
        public string value { get; set; }
        public string value2 { get; set; }
        public string Report_Type { get; set; }
        public string date { get; set; }
        public string sales1 { get; set; }
        public string sales2 { get; set; }
        public string Selected_Type { get; set; }
        public string PartId { get; set; }
        public string Qty { get; set; }

    }

    public class SpareMachineQuantityReport
    {
        public string Report_Type { get; set; }

        public string FromDate { get; set; }
        public string Todate { get; set; }
        public string OrgID { get; set; }
        public string S_No { get; set; }
        public string PartNumber { get; set; }
        public string PartName { get; set; }
        public string PartSpecification { get; set; }
        public string CreatedAt { get; set; }
        public string LineName { get; set; }
        public string MachineName { get; set; }
        public string Requested_Emp_Name { get; set; }
        public string Issued_Emp_Name { get; set; }
        public string CostPerUnit { get; set; }
        public string Quantity { get; set; }
        public string SpareReq_Reason { get; set; }
        public string MachineNumber { get; set; }

    }
    public class SparePartLifeCycleReport
    {
        public string Description { get; set; }
        public string Date { get; set; }
        public string Shift { get; set; }
        public string Tool_Supplier { get; set; }
        public string Line { get; set; }
        public string Machine { get; set; }
        public string Issued_by { get; set; }
        public string Received_By { get; set; }
        public string Storage { get; set; }
        public string Life { get; set; }
        public string Cause { get; set; }
        public string Remarks { get; set; }
        public string PartNumber { get; set; }
        public string UniqueCode { get; set; }
        public string OrgID { get; set; }
    }

    public class SpareBreakageReport
    {
        public string FromDate { get; set; }
        public string Todate { get; set; }
        public string OrgID { get; set; }
        public string Report_Type { get; set; }
        public string ReasonType { get; set; }
        public string CreatedAt { get; set; }
        public string SpareRts_shift { get; set; }
        public string SpareRts_Linename { get; set; }
        public string SpareRts_Model { get; set; }
        public string Machine_Code { get; set; }
        public string machine_name { get; set; }
        public string part_sepc { get; set; }
        public string SpareRts_Qty { get; set; }
        public string cost { get; set; }
        public string Total_Cost { get; set; }
        public string SpareRts_Remarks { get; set; }
        public string SpareRts_Responsible_Dept { get; set; }
        public string Root_Cause { get; set; }
        public string SpareRts_Corrective_Action { get; set; }
        public string date { get; set; }
        public string sales1 { get; set; }
    }
}
