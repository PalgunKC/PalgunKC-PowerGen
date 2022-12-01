using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMS.Model.Model
{
    public class ToolModel
    {

    }

    public class PartGroupmaster
    {
        public string ProductID { get; set; }
        public string Productgroup { get; set; }
        public string Productgroup_desc { get; set; }
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

        public string Row_Id { get; set; }
        public string TotalCount { get; set; }
        public string P_PAGE_INDEX { get; set; }
        public string P_PAGE_SIZE { get; set; }
        public string Row_no { get; set; }
        public string SearchField { get; set; }
        public string SearchData { get; set; }
        public List<PartGroupmaster> liPartGroupmaster { get; set; }

    }
    public class ToolLocationmaster
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
    public class ToolVendorMaster
    {
        //public string VendorId { get; set; }
        //public string VendorName { get; set; }
        //public string VendorCode { get; set; }
        //public string VendorAddress { get; set; }
        //public string VendorLocation { get; set; }
        //public string Pincode { get; set; }
        //public string PhoneNo { get; set; }
       // public string EmailId { get; set; }
        public string StateId { get; set; }
        public string CityId { get; set; }
        //public string IsActive { get; set; }
        //public string OrgID { get; set; }
        //public string CreatedBy { get; set; }
        //public string CreatedAt { get; set; }
        //public string ModifyBy { get; set; }
        //public string ModifyDate { get; set; }
        //public string dummycolumn1 { get; set; }
        public string dummycolumn2 { get; set; }
        public string dummycolumn3 { get; set; }
        //public string P_KEY { get; set; }
        //public string MSG { get; set; }
        public string VendorType { get; set; }
        public string VendorId { get; set; }
        public string Type { get; set; }
        public string Supp_No { get; set; }
        public string Department { get; set; }
        public string VendorName { get; set; }
        public string site { get; set; }
        public string VendorAddress { get; set; }
        public string VendorLocation { get; set; }
        public string GSTNo { get; set; }
        public string PANNo { get; set; }
        public string Account_Number { get; set; }
        public string Term { get; set; }
        public string Prepay_Description { get; set; }
        public string Site_Pay_Group { get; set; }
        public string Bank_Name { get; set; }
        public string Account_Name { get; set; }
        public string section_code { get; set; }
        public string Tax_Name { get; set; }
        public string TDS_Vendor_Type { get; set; }
        public string PayDateBasis { get; set; }
        public string VendorSiteId { get; set; }
        public string VendorCode { get; set; }
        public string Vend_StartDate { get; set; }
        public string Vend_EndDate { get; set; }
        public string Vend_CreationDate { get; set; }
        public string PaymentCurrencyCode { get; set; }
        public string Contact_name1 { get; set; }
        public string Contact_mobileno1 { get; set; }
        public string Contact_emailid1 { get; set; }
        public string Contact_name2 { get; set; }
        public string Contact_mobileno2 { get; set; }
        public string Contact_emailid2 { get; set; }
        public string OrgID { get; set; }
        public string EmailId { get; set; }
        public string IsActive { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedAt { get; set; }
        public string ModifyBy { get; set; }
        public string ModifyDate { get; set; }
        public string P_KEY { get; set; }
        public string KEY { get; set; }

        public string MSG { get; set; }

        public string Row_Id { get; set; }
        public string TotalCount { get; set; }
        public string P_PAGE_INDEX { get; set; }
        public string P_PAGE_SIZE { get; set; }
        public string Row_no { get; set; }
        public string SearchField { get; set; }
        public string SearchData { get; set; }
    }

    public class ToolRequestReason
    {
        public string ToolReqReasonId { get; set; }
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

    public class ToolReturnReason
    {
        public string ToolreturnReasonId { get; set; }
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

    public class Citymaster
    {
        public string CITY_CODE { get; set; }
        public string CITY_NAME { get; set; }
        public string STATE_CODE { get; set; }
    }
    public class Statemaster
    {
        public string STATE_CODE { get; set; }
        public string STATE_NAME { get; set; }
        public string COUNTRY_CODE { get; set; }
    }

    public class Partmaster
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
        public string Tool_Location { get; set; }
        public string VendorCode { get; set; }

        //Stock
        public string STK_ID { get; set; }

        public string SYS_QTY { get; set; }
        public string PHY_QTY { get; set; }
        public string Diffrence { get; set; }
        public string REMARKS { get; set; }
        public string MONYEAR { get; set; }

        public string ProductGroup { get; set; }
        public string TotalCount { get; set; }
        public string P_PAGE_INDEX { get; set; }
        public string P_PAGE_SIZE { get; set; }
        public string Row_no { get; set; }
        public string SearchField { get; set; }
        public string SearchData { get; set; }


    }
    public class Dashboard
    {
        public string OrgID { get; set; }
        public string CreatedBy { get; set; }
        public string Request_Cnt { get; set; }
        public string Return_Cnt { get; set; }
        public string Regrain_Cnt { get; set; }
        public string Regrain_Exceeds_Cnt { get; set; }
        public string PartNumber_Min_Count { get; set; }
        public string P_KEY { get; set; }

        public string MSG { get; set; }
       

    }
    public class ToolUpload
    {
        public string ToolUploadId { get; set; }
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
        public string Tooltype { get; set; }
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
        public string Tool_Location { get; set; }
        public string ToolUniqueCode { get; set; }
        public string PartSpecification { get; set; }
        public string InsertId { get; set; }
        public string PartId { get; set; }
        public string Max_ToolInward_no { get; set; }

        public string ToolInward_no { get; set; }
        public string IsInsertEnd { get; set; }
        public string ToolInvoice_no { get; set; }
        public string ToolInvoice_Date { get; set; }
        public string Row_Id { get; set; }
        public string ProductGroup { get; set; }

        public string TotalCount { get; set; }
        public string P_PAGE_INDEX { get; set; }
        public string P_PAGE_SIZE { get; set; }
        public string Row_no { get; set; }
        public string SearchField { get; set; }
        public string SearchData { get; set; }

        //List<Partmaster> liPartMaster = new List<Partmaster>();
        //List<ToolVendorMaster> liVendorMaster = new List<ToolVendorMaster>();



    }

    public class ToolUpdate
    {
        public string ToolUpdateId { get; set; }
        public string SubInv { get; set; }
        public string ItemType { get; set; }
        public string PartNumber { get; set; }
        public string PartName { get; set; }
        public string Quantity { get; set; }
        public string ToolUniqueCode { get; set; }
        public string Min_qty { get; set; }
        public string Max_qty { get; set; }
        public string Reorder_qty { get; set; }
        public string Tool_Location { get; set; }
        public string LifeTime { get; set; }
        public string IsActive { get; set; }
        public string OrgID { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedAt { get; set; }
        public string ModifyBy { get; set; }
        public string ModifyDate { get; set; }
        public string ToolUploadId { get; set; }
        public string dummycolumn2 { get; set; }
        public string P_KEY { get; set; }
        public string MSG { get; set; }

        //List<Partmaster> liPartMaster = new List<Partmaster>();
        //List<ToolVendorMaster> liVendorMaster = new List<ToolVendorMaster>();



    }

    public class ToolingRequest
    {
        public string ToolReq_id { get; set; }
        public string ToolReq_datetime { get; set; }
        public string ToolReq_shift { get; set; }
        public string ToolReq_no { get; set; }
        public string Max_ToolReq_no { get; set; }
        public string ToolReq_plant { get; set; }
        public string ToolReq_Partno { get; set; }
        public string ToolReq_Partname { get; set; }
        public string ToolReq_PartSpecification { get; set;}
        public string ToolReq_uniquecode { get; set; }
        public string ToolReq_Linename { get; set; }
        public string ToolReq_Machinename { get; set; }
        public string ToolReq_MachineCode { get; set; }
        public string ToolReq_TroubleReqno { get; set; }
        public string ToolReq_Employeeno { get; set; }
        public string ToolReq_Employeename { get; set; }
        public string ToolReq_Qty { get; set; }
        public string ToolReq_AvailableQty { get; set; }
        public string ToolReq_Reason { get; set; }
        public string ToolReq_Remarks { get; set; }
        public string IsActive { get; set; }
        public string Tool_Status { get; set; }

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
        public string ProductGroup { get; set; }
        //To do like spare

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

    public class ToolingIssue
    {
        public string ToolIsu_id { get; set; }
        public string ToolReq_id { get; set; }
        public string ToolIsu_datetime { get; set; }
        public string ToolIsu_shift { get; set; }
        public string ToolIsu_Request_no { get; set; }
        public string ToolIsu_Partno { get; set; }
        public string ToolIsu_Partname { get; set; }
        public string ToolIsu_MachineCode { get; set; }
        public string ToolIsu_MachineName { get; set; }
        public string ToolIsu_Linename { get; set; }
        public string ToolIsu_Req_Employeeno { get; set; }
        public string ToolIsu_Req_Employeename { get; set; }
        public string ToolIsu_Qty { get; set; }
        public string ToolIsu_AvailableQty { get; set; }
        public string ToolIsu_MinQty { get; set; }
        public string ToolIsu_MaxQty { get; set; }
        public string ToolIsu_ReorderQty { get; set; }
        public string ToolIsu_Location { get; set; }
        public string ToolIsu_PreUnicode { get; set; }
        public string ToolIsu_CurUnicode { get; set; }
        public string ToolIsu_NoOfUnderWent_Regriding { get; set; }
        public string ToolIsu_LifeSpan { get; set; }
        public string ToolIsu_Employeeno { get; set; }
        public string ToolIsu_Employeename { get; set; }
        public string ToolIsu_Cancle_Reason { get; set; }
        public string ToolIsu_Remarks { get; set; }
        public List<string> ToolIsu_VendorCode_list { get; set; }
        public string ToolIsu_VendorCode { get; set; }
        public string IsActive { get; set; }
        public string Tool_Status { get; set; }
        public string OrgID { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedAt { get; set; }
        public string ModifyBy { get; set; }
        public string ModifyDate { get; set; }
        public string dummy_col1 { get; set; }
        public string dummy_col2 { get; set; }
        public string P_KEY { get; set; }
        public string MSG { get; set; }
        public string ToolReq_Date { get; set; }
        public string ToolIsu_Date { get; set; }
        public string Is_Return { get; set; }
        public string RegrainCode { get; set; }
        public string PartId { get; set; }

        public string Issued_Emp_Name { get; set; }
        public string Issued_Emp_Number { get; set; }
        public string ProductGroup { get; set; }
        public string PartName { get; set; }
        public string PartSpecification { get; set; }
        public string Tooltype { get; set; }
        public string IsInsertEnd { get; set; }
        public string @IsInsertBegin { get; set; }


    }

    public class ToolScrab
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

    public class EmployeeMaster
    {
        public string Sno { get; set; }
        public string Emp_Name { get; set; }
        public string Emp_Number { get; set; }
        public string Department { get; set; }
        public string Branch { get; set; }
        public string Designation { get; set; }
        public string PhoneNo { get; set; }
        public string EmailId { get; set; }
        public string EmpAddress { get; set; }
        public string StateId { get; set; }
        public string countryId { get; set; }
        public string DOB { get; set; }
        public string Age { get; set; }
        public string OrgID { get; set; }
        public string IsActive { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedAt { get; set; }
        public string ModifyBy { get; set; }
        public string ModifyDate { get; set; }
        public string dummycolumn2 { get; set; }
        public string dummycolumn3 { get; set; }
    }

    public class QuantityReport
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
    public class ToolMachineQuantityReport
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
        public string ToolReq_Reason { get; set; }

    }
    public class BreakageReport
    {
        public string FromDate { get; set; }
        public string Todate { get; set; }
        public string OrgID { get; set; }
        public string Report_Type { get; set; }
        public string ReasonType { get; set; }
        public string CreatedAt { get; set; }
        public string ToolRts_shift { get; set; }
        public string ToolRts_Linename { get; set; }
        public string ToolRts_Model { get; set; }
        public string Machine_Code { get; set; }
        public string machine_name { get; set; }
        public string part_sepc { get; set; }
        public string ToolRts_Qty { get; set; }
        public string cost { get; set; }
        public string Total_Cost { get; set; }
        public string ToolRts_Remarks { get; set; }
        public string ToolRts_Responsible_Dept { get; set; }
        public string Root_Cause { get; set; }
        public string ToolRts_Corrective_Action { get; set; }
        public string date { get; set; }
        public string sales1 { get; set; }
    }
    public class PartLifeCycleReport
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
    public class ToolingReturn
    {
        public string ToolRts_id { get; set; }
        public string ToolIsu_id { get; set; }
        public string ToolRts_datetime { get; set; }
        public string ToolRts_shift { get; set; }
        public string ToolRts_Return_no { get; set; }
        public string ToolRts_Partno { get; set; }
        public string ToolRts_Partname { get; set; }
        public string ToolRts_MachineCode { get; set; }
        public string ToolRts_MachineName { get; set; }
        public string ToolRts_Linename { get; set; }
        public string ToolRts_Unicode { get; set; }
        public string ToolRqt_datetime { get; set; }
        public string ToolIsu_datetime { get; set; }
        public string ToolRts_LifeAchived { get; set; }
        public string ToolRts_Model { get; set; }
        public string ToolRts_Responsible_Dept { get; set; }
        public string ToolRts_Responsible_Person { get; set; }
        public string ToolRts_Corrective_Action { get; set; }
        public string ToolRts_Reason { get; set; }
        public string ToolRts_Remarks { get; set; }
        public string ToolRts_Qty { get; set; }
        public string Tool_Status { get; set; }
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
        public string ToolRts_AvailableQty { get; set; }
        public string ToolRts_PartSpecification { get; set; }
        public string ToolRts_plant { get; set; }
        public string ToolRts_no { get; set; }
        //
        public string LineMachine_Map_Id { get; set; }
        public string LineMachine_Line_Code { get; set; }
        public string LineMachine_Machine_Code { get; set; }
        public string MachineName { get; set; }
        public string Tooltype { get; set; }
        public List<string> Machinecode { get; set; }
        public string Return_Status { get; set; }
        public string RegrainCode { get; set; }
        public string PartId { get; set; }
        public string Returned_Emp_Number { get; set; }
        public string Returned_Emp_Name { get; set; }

        //Regrined
        public string ToolReg_Regrain_no { get; set; }

        public string ToolReg_Responsible_Dept { get; set; }
        public string ToolReg_LifeAchived { get; set; }
        public string ToolReg_Model { get; set; }
        public string ToolReg_Responsible_Person { get; set; }
        public string ToolReg_Corrective_Action { get; set; }
        public string ToolReg_Reason { get; set; }
        public string ToolReg_Unit_Cost { get; set; }
        public string ToolReg_VendorCode { get; set; }
        public string ToolReg_VendorName { get; set; }
        public string ToolReg_RDC_Number { get; set; }
        public string ToolReg_Vend_ExpDate { get; set; }
        public string ToolReg_Qty { get; set; }
        public string ToolReg_Remarks { get; set; }

        public string ToolReg_id { get; set; }

        public string ToolReg_datetime { get; set; }
        public string ToolReg_shift { get; set; }

        public string ToolReg_Unicode { get; set; }

        public string Previous_UniCode { get; set; }

        public string Tool_Location { get; set; }
        public string ToolReg_RegrainPartNo { get; set; }
        public string OrderCreatedAt { get; set; }
        public string Regrained_Emp_Name { get; set; }
        public string Regrained_Emp_Number { get; set; }
        public string Regrained_Emp_Number_Update { get; set; }
        public string Regrained_Emp_Name_Update { get; set; }
        public string MachineNumber { get; set; }
        public string ProductGroup { get; set; }


    }
}
