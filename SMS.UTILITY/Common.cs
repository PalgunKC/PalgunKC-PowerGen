using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMS.UTILITY
{
    public class Common
    {
        #region Queries
        public class Queries
        {
            #region Login
            public const string CMS_SP_INSERT_USER_MANAGER = "CMS_SP_INSERT_USER_MANAGER";
            public const string CMS_SP_FETCH_MENUS_USER_WISE = "CMS_SP_FETCH_MENUS_USER_WISE";
            public const string SP_MENU_LIST = "SP_MENU_LIST";
            public const string SP_LOGIN_USER = "SP_LOGIN_USER";
            public const string SP_LIST_CATEGORYMASTER = "SP_LIST_CATEGORYMASTER";
            public const string SP_CATEGORYMST_ACTION = "SP_CATEGORYMST_ACTION";
            public const string SP_CMPNY_ACTION = "SP_CMPNY_ACTION";
            public const string SP_PRODUCT_ACTION = "SP_PRODUCT_ACTION";
            public const string SP_INV_DETAIL_ACTION = "SP_INV_DETAIL_ACTION";
            public const string SP_PRICE_ACTION = "SP_PRICE_ACTION";
            public const string SP_GET_CATEGORY = "SP_GET_CATEGORY";
            public const string SP_INVOICE_GEN = "SP_INVOICE_GEN";
            public const string SP_INV_CALC = "SP_INV_CALC";
            public const string SP_GET_CUSTOMERLIST = "SP_GET_CUSTOMERLIST";
            public const string SP_GET_ROLE = "SP_GET_ROLE";
            public const string SP_GET_STATELIST = "SP_GET_STATELIST";
            public const string SP_GET_LOGIN_USER = "SP_GET_LOGIN_USER";
            public const string SP_GET_DOSE = "SP_GET_DOSE";
            public const string SP_GET_CITYLIST = "SP_GET_CITYLIST";
            public const string SP_GET_PRODUCT = "SP_GET_PRODUCT";
            public const string SP_GET_COMPANY_MST = "SP_GET_COMPANY_MST";
            public const string SP_GET_COMPANY = "SP_GET_COMPANY";
            public const string SP_GET_VENDOR_LIST = "SP_GET_VENDOR_LIST";
            public const string SP_COMPANYMST_ACTION = "SP_COMPANYMST_ACTION";
            public const string SP_INVOICEMST_ACTION = "SP_INVOICEMST_ACTION";
            public const string SP_CATEGORYMST_INSERT = "SP_CATEGORYMST_INSERT";
            public const string SP_ROLEMST_ACTION = "SP_ROLEMST_ACTION";
            public const string SP_EMPMASTER_ACTION = "SP_EMPMASTER_ACTION";
            public const string SP_CUSTOMERMST_ACTION = "SP_CUSTOMERMST_ACTION";
            public const string SP_PHYMST_ACTION = "SP_PHYMST_ACTION";
            public const string SP_DRUGMST_ACTION = "SP_DRUGMST_ACTION";
            public const string SP_LOCATION_MASTER = "SP_LOCATION_MASTER";
            public const string SP_VENDOR_MASTER = "SP_VENDOR_MASTER";
            public const string SP_PART_MASTER = "SP_PART_MASTER";
            public const string SP_INVESTIGATIONMST_ACTION = "SP_INVESTIGATIONMST_ACTION";
            public const string SP_PRG_ACTION = "SP_PRG_ACTION";
            public const string SP_SAVE_CARDIOLOGYDETAILS = "SP_SAVE_CARDIOLOGYDETAILS";
            public const string SP_GET_DOSELIST = "SP_GET_DOSELIST";
            public const string SP_GET_TESTLIST = "SP_GET_TESTLIST";
            public const string SP_GET_DRUGLIST = "SP_GET_DRUGLIST";
            public const string SP_DIAGNOSIS_ACTION = "SP_DIAGNOSIS_ACTION";
            public const string SP_SAVEVITALS = "SP_SAVEVITALS";
            public const string SP_PRINT_PRESCRIPTIONDETAIL = "SP_PRINT_PRESCRIPTIONDETAIL";
            public const string SP_PatientHistory = "SP_PatientHistory";
            public const string SP_DRUGDETAIL_ACTION = "SP_DRUGDETAIL_ACTION";
            public const string SP_TESTDETAIL_ACTION = "SP_TESTDETAIL_ACTION";
            public const string SP_VENDORMST_ACTION = "SP_VENDORMST_ACTION";
            public const string SP_PRODUCT_REPORT = "SP_PRODUCT_REPORT";
            public const string SP_GET_ROLE_LIST = "SP_GET_ROLE_LIST";
            public const string SP_CATEGORYMST_DELETE = "SP_CATEGORYMST_DELETE";
            public const string CMS_SP_CHECK_EXTERNAL_USER = "CMS_SP_CHECK_EXTERNAL_USER";
            public const string POS_SP_FETCH_BRANCH = "POS_SP_FETCH_BRANCH";
            public const string POS_SP_UPDATE_LAST_LOGIN = "POS_SP_UPDATE_LAST_LOGIN";
            public const string POS_SP_ALL_NOTIFICATION = "POS_SP_ALL_NOTIFICATION";
            public const string POS_SP_OVERALL_NOTIFICATION = "POS_SP_OVERALL_NOTIFICATION";
            public const string POS_SP_UPDATE_NOTIFICATION = "POS_SP_UPDATE_NOTIFICATION";
            #endregion
            #region Dashboard
            public const string POS_SP_MONTHLY_COUNT = "POS_SP_MONTHLY_COUNT";
            public const string POS_MONTHLY_COUNT_FOR_NEW_UI = "POS_MONTHLY_COUNT_FOR_NEW_UI";
            public const string POS_SP_MONTHLY_PLAN_REPORT = "POS_SP_MONTHLY_PLAN_REPORT";
            public const string POS_SP_MONTHLY_ACTUAL_REPORT = "POS_SP_MONTHLY_ACTUAL_REPORT";
            #endregion
            #region Company Master
            public const string CMS_SP_GET_COMPANTY_MST = "CMS_SP_GET_COMPANTY_MST";
            public const string CMS_SP_INSERT_COMPANY_MST = "CMS_SP_INSERT_COMPANY_MST";
            #endregion
            #region Action Master
            public const string CMS_SP_GET_ACTION_MST = "CMS_SP_GET_ACTION_MST";
            public const string CMS_SP_INSERT_ACTION_MST = "CMS_SP_INSERT_ACTION_MST";
            #endregion
            #region Result Master
            public const string CMS_SP_GET_RESULT_MST = "CMS_SP_GET_RESULT_MST";
            public const string CMS_SP_INSERT_RESULT_MST = "CMS_SP_INSERT_RESULT_MST";
            public const string CMS_SP_GET_ACTION_LIST = "CMS_SP_GET_ACTION_LIST";
            #endregion
            #region Area Master
            public const string POS_SP_GET_AREAREGION_DTLS = "POS_SP_GET_AREAREGION_DTLS";
            #endregion
            #region Role Master
            public const string POS_SP_FETCH_ROLE_LIST = "POS_SP_FETCH_ROLE_LIST";
            public const string POS_SP_FETCH_MENU_BY_ROLE_ID = "POS_SP_FETCH_MENU_BY_ROLE_ID";
            #endregion
            #region Billing Master
            public const string CMS_SP_GET_BANKZONREG_MST = "CMS_SP_GET_BANKZONEREG_MST"; // Branch Master
            public const string POS_SP_GET_GCM_DET = "POS_SP_GET_GCM_DET";
            public const string CMS_SP_GET_PRODUCT_MST = "CMS_SP_GET_PRODUCT_MST";
            public const string POS_SP_GET_BILLING_MASTER = "POS_SP_GET_BILLING_MASTER";
            #endregion
            #region Product Master
            public const string CMS_SP_INSERT_PRODUCT_MST = "CMS_SP_INSERT_PRODUCT_MST";
            #endregion
            #region Zonal Master as Region Master
            public const string CMS_SP_REGZONCOLLECTION_LIST = "CMS_SP_REGZONCOLLECTION_LIST";
            public const string CMS_SP_REGZONCOLLECTION_MST = "CMS_SP_REGZONCOLLECTION_MST";
            #endregion
            #region User Master
            public const string CMS_SP_GET_USER_MAPPING_MST = "CMS_SP_GET_USER_MAPPING_MST";
            public const string CMS_SP_GET_AREACODE_MST = "CMS_SP_GET_AREACODE_MST";
            public const string CMS_SP_GET_ROLE_LIST = "CMS_SP_GET_ROLE_LIST";
            //public const string CMS_SP_INSERT_USER_MANAGER = "CMS_SP_INSERT_USER_MANAGER";
            #endregion
            #region Employee Master
            public const string POS_SP_GET_EMP_MAST = "POS_SP_GET_EMP_MAST";
            #endregion

            #region Bank Master
            //public const string POS_SP_GET_GCM_DET = "POS_SP_GET_GCM_DET";//Bind bank type dropdown
            public const string POS_SP_INS_BANK_MASTER = "POS_SP_INS_BANK_MASTER";//save bank details
            #endregion
            //#region Region Master
            ////public const string CMS_SP_REGZONCOLLECTION_LIST = "CMS_SP_REGZONCOLLECTION_LIST";//BIND Region master
            ////public const string CMS_SP_REGZONCOLLECTION_MST = "CMS_SP_REGZONCOLLECTION_MST";//Save region details
            //#endregion
            #region Yard Master
            public const string POS_SP_GET_YARD_CODE = "POS_SP_GET_YARD_CODE";
            #endregion
            #region Bank Branch Master
            public const string CMS_SP_GET_BANKZONEREG_MST = "CMS_SP_GET_BANKZONEREG_MST";
            public const string POS_SP_GET_BANKMAPPING_SRCH = "POS_SP_GET_BANKMAPPING_SRCH";
            public const string CMS_SP_INSERT_BANKBRANCH_MST = "CMS_SP_INSERT_BANKBRANCH_MST";
            #endregion
            #region Reports
            #region Invoice Casewise Report
            public const string POS_SP_INVOICE_CASEWISE_RPT = "POS_SP_INVOICE_CASEWISE_RPT";
            #endregion
            #endregion
            #region Transaction
            #region Collection Upload
            public const string CMS_SP_GETCOLLECTIONSCHEDULE = "CMS_SP_GETCOLLECTIONSCHEDULE";
            public const string POS_SP_GETCOLLECTIONBYBATCHNO = "POS_SP_GETCOLLECTIONBYBATCHNO";
            public const string CMS_SP_GET_BANK_LIST = "CMS_SP_GET_BANK_LIST";
            #endregion
            #region Seizure Updation
            public const string POS_SP_GET_LOAN_NUM_SEARCH = "POS_SP_GET_LOAN_NUM_SEARCH";
            public const string CMS_SP_GET_IFSC_CODE_LIST = "CMS_SP_GET_IFSC_CODE_LIST";
            public const string POS_FETCH_BANK_BY_OPTION = "POS_FETCH_BANK_BY_OPTION";
            public const string POS_SP_FETCH_SEIZURE_UPDATION = "POS_SP_FETCH_SEIZURE_UPDATION";
            public const string POS_SP_UP_SZD_UPDATION = "POS_SP_UP_SZD_UPDATION";
            public const string POS_SP_GET_COLLECTOR_DTLS = "POS_SP_GET_COLLECTOR_DTLS";
            #endregion
            #region OverAll Account Status
            public const string POS_SP_SEARCH_CUST_DTLS = "POS_SP_SEARCH_CUST_DTLS";
            public const string CMS_SP_CUSTOMERDTLS_FORVIEW = "CMS_SP_CUSTOMERDTLS_FORVIEW";
            public const string POS_SP_GET_COLLC_FOLLOWUP = "POS_SP_GET_COLLC_FOLLOWUP";
            public const string POS_SP_GET_YARD_DTLS = "POS_SP_GET_YARD_DTLS";
            public const string POS_SP_GET_SALE_OR_RELEASE = "POS_SP_GET_SALE_OR_RELEASE";
            public const string POS_SP_GET_DASHBOARD_GRID = "POS_SP_GET_DASHBOARD_GRID";
            #endregion
            #endregion
        }
        #endregion
        public static class Keys
        {
            public static string UPDATE = "U";
            public static string INTERNAL = "I";
            public static string INSERT = "I";
            public static string EXTERNAL = "E";
            public static string DELETE = "D";
            public static string GENERAL = "G";
            public static string GZonalMaster = "ZS";
            public static string IZonalMaster = "ZC";
            public static string EZonalMaster = "ZM";
            public static string RoleKey = "-1";
            
        }
        public static class GCMKeys
        {
            public static string ONE = "1";
            public static string TWELVE = "12";
        }
        public static class POSOptionCode
        {
            public static string SEIZED = "SEIZED";
            public static string TOBESEIZED = "TOBESEIZED";
        }
        public static class BankKeys
        {
            public static string SBKC = "SBKC";
            public static string SBSD = "SBSD";
            public static string SZC = "SZC";
            public static string SRC = "SRC";
            public static string SBKDESC = "SBKDESC";
            public static string SBM = "SBM";
        }
        public static class BillingMasterCode
        {
            public static string GET_MST = "GET_MST";
        }
        public static class AccountCategory
        {
            public static string SEIZURE = "SEIZURE";
            public static string COLLECTION = "COLLECTION";
            public static string ALLOCATE = "ALLOCATE";
            public static string UNALLOCATE = "UNALLOCATE";
        }
        public static class ActiveLog
        {
            public static string Active = "1";
            public static string InActive = "0";
            public static string Inverse = "-1";
            public static string Two = "2";
        }
        public static class FilePath
        {
            public static string SERVER_PATH = AppDomain.CurrentDomain.BaseDirectory;
            public static string IMPORT_DATA_PATH = @"\ImportData\";
            public static string STUDENT_IMAGE_PATH = @"\StudentImages\";
            public static string STAFF_IMAGE_PATH = @"\StaffImages\";
            public static string IMPORT_DATA = "ImportData.xls";

        }
        public static class Message
        {
            public const string PleaseConfigureMessageSetting = "Please Configure Message Setting !!!";
            public const string LowMessageLimit = "Low Message Limit !!!";
            public const string NoRecordsAvailable = "No Records Available !!!";
            public const string InvalidLoginCredential = "Invalid login credentials !!!";
            public const string RecordDeletedSuccessfully = "Record Deleted Successfully !!!";
            public const string RecordSavedSuccessfully = "Record Saved Successfully !!!";
            public const string RecordUpdatedSuccessfully = "Record Updated Successfully !!!";
            public const string FailedToDelete = "Failed To Delete !!!";
            public const string SetAcademicYear = "Academic Year is unavailable !!!";
            public const string FailedToSave = "Failed To Save !!!";
            public const string FailedToUpdate = "Failed To Update !!!";
            public const string NoMobileNumbersAvailable = "No Mobile Numbers Available !!!";
            public const string SentMessageSuccessfully = "Message(s) sent successfully !!!";
            public const string FailedToSendMessage = "Message(s) failed !!!";
            public const string PleaseWait = "Please wait for a moment !!!";
            public const string BadRequest = " Error code (400) Bad Request !!!";
            public const string QueryIsEmpty = @"Query Is Empty ...!";
            public const string SessionIsExpiredPleaseLoginAgain = @"Session Is Expired Login Again !!!";
            //public const string Absentees = "No Mobile Numbers Available !!!";          
            public const string InvalidAmount = "Invalid Amount !";
            public const string FullFeePaid = "This Student Paid All The Fee !";
            public const string ValueAlreadyExist = "Already Exist For This";
            public const string ConnectionFailed = "Connection Failed";
            public const string YourPasswordIsExpired = "Your password is Expired, Redirecting to Signon Portal";
            public const string CheckingMenuLoadPage = "Menu Checking Loading the page";
            public const string AccessDeniedPleaseContactAdmin = @"Access Denied / Please contact Administrator";
            public const string CheckInternalOrExternalUser = @"Checking the Internal/External user: ";
            public const string InvalidUserOrNotExist = @"Invalid User/User does Not Exist";
            public const string LoanAccountNoNotExist = @"Invalid Loan Account No/Loan Account No is Not Exist";
        }
        /// <summary>
        /// Class to have all the delimiters 
        /// </summary>
        public class Delimiter
        {
            public static string PLUS = "+";
            public static string QUS = "?";
            public static string COMMA = ",";
            public static string COLON = ":";
            public static string DOLLAR = "$";
            public const string DOT = ".";
            public static string EQUAL = "=";
            public static string EMPTY = " ";
            public static string SINGLEQUOTE = "'";
            public static string OPENBRACKET = "(";
            public static string CLOSEBRACKET = ")";
            public static string OPENSQUAREBRAKET = "[";
            public static string CLOSESQUAREBRAKET = "]";
            public static string GREATERTHAN = ">";
            public static string LESSTHAN = "<";
            public static string ZERO = "0";
            public static string NOTEQUAL = "<>";
            public static string STAR = "*";
            public static string HASH = "#";
            public static string AT = "@";
            public static string ONE = "1";
            public const string SINGLEQUOTEWITHCOMMA = "',";
            public const string SINGLE_SPACE = " ";
            public const string SINGLE_BAR_WITH_SPACE = " | ";
            public const string IPHEN = "-";
            public static string Hide = "Hide";
            public static string Search = "Search";
            public static string Nil = "-Nil-";

            public const string DATE_SEPARATOR = "/";
            public const string AMPRESAND = "&";
            public const string UNDERSCORE = "_";

            public const string ARROW_MARK = " -->";
            public const string SplitDelimiter = "ᴥ";
            public const string SEMICOLON = ";";
        }
        public static class SESSION_VARIABLES
        {
            public static string sFlag = "FALG";
            public static string OPERATION_PROCESS = "OperationProcess";
            public static string USER_ID = "USER_ID";
            public static string PASSWORD = "PASSWORD";
            public static string COMPANYCODE = "COMPANYCODE";
            public static string PERSON_NAME = "PERSON_NAME";
            public static string CONNECTION_STRING = "CONNECTION_STRING";
            public static string LOGO_PATH = "LOGO_PATH";
            public static string ROLE_CODE = "ROLE_CODE";
            public static string USERNAME = "USERNAME";
            public static string USER_ROLE_NAME = "USER_ROLE_NAME";
            public static string NAME = "NAME";
            public static string PHOTO = "PHOTO";
            public static string USER_TYPE_NAME = "USER_TYPE_NAME";
            public static string MENU_ITEMS = "MENU_ITEMS";
            public static string BRANCH_CODE = "BRANCH_CODE";
            public static string BRANCH = "BRANCH";
            public static string E_MAIL = "E_MAIL";
            public static string NOTIFICATION = "NOTIFICATION";
            public static string TIMELINEDET = "TIMELINEDET";
            public static string TEMP_NOTIFICATION = "TEMP_NOTIFICATION";
            public static string LAST_LOGIN = "LAST_LOGIN";
            public static string IS_AVAILABLE = "IS_AVAILABLE";
            public static string LI_CUST_OVERVIEW = "LI_CUST_OVERVIEW";
            public static string DTALLOCATION = "DTALLOCATION";
            public static string DTCOLLECTION = "DTCOLLECTION";
            public static string DTSEIZURE = "DTSEIZURE";
            public static string DTYARD = "DTYARD";
            public static string DTSALERELEASE = "DTSALERELEASE";
            public static string DTDASHBOARDGRID = "DTDASHBOARDGRID";
            public static string LI_POS_MONTHLY_PLAN = "LI_POS_MONTHLY_PLAN";
        }
        public static class CMS_SP_INSERT_USER_MANAGER
        {
            public static string E_KEY = "E_KEY";
            public static string E_USER_ID = "E_USER_ID";
            public static string E_USER_NAME = "E_USER_NAME";
            public static string E_USER_TYPE = "E_USER_TYPE";
            public static string E_EMAIL = "E_EMAIL";
            public static string E_MOBILE = "E_MOBILE";
            public static string E_DESIGNATION = "E_DESIGNATION";
            public static string E_ROLE_CODE = "E_ROLE_CODE";
            public static string E_USER_ACTIVE = "E_USER_ACTIVE";
            public static string E_CREATED_BY = "E_CREATED_BY";
            public static string E_AREA_CODE = "E_AREA_CODE";
            public static string P_OUTTBL = "P_OUTTBL";
        }
        public static class POS_SP_GET_EMP_MAST
        {
            public static string P_KEY = "P_KEY";
            public static string P_OUTTBL = "P_OUTTBL";
        }
        public static class POS_SP_FETCH_BRANCH
        {
            public static string P_USERID = "P_USERID";
            public static string P_OUTTBL = "P_OUTTBL";
        }
        public static class CMS_SP_INSERT_COMPANY_MST
        {
            public static string E_KEY = "E_KEY";
            public static string E_COMPANY_CODE = "E_COMPANY_CODE";
            public static string E_COMPANY_DESC = "E_COMPANY_DESC";
            public static string E_CREATED_BY = "E_CREATED_BY";
            public static string E_COMPANY_UPDATE_BY = "E_COMPANY_UPDATE_BY";
            public static string E_ACTIVE = "E_ACTIVE";
            public static string P_OUTTBL = "P_OUTTBL";
        }
        public static class CMS_SP_INSERT_ACTION_MST
        {
            public static string E_KEY = "E_KEY";
            public static string E_ACTION_CODE = "E_ACTION_CODE";
            public static string E_ACTION_DESC = "E_ACTION_DESC";
            public static string E_ACTIVE = "E_ACTIVE";
            public static string P_OUTTBL = "P_OUTTBL";
        }
        public static class POS_MONTHLY_COUNT
        {
            public static string P_KEY = "P_KEY";
            public static string P_USER_ROLE = "P_USER_ROLE";
            public static string P_MONTH = "P_MONTH";
            public static string P_USER_ID = "P_USER_ID";
            public static string P_OUTTBL = "P_OUTTBL";
        }
        public static class CMS_SP_INSERT_RESULT_MST
        {
            public static string E_KEY = "E_KEY";
            public static string E_ACTION_ID = "E_ACTION_ID";
            public static string E_RESULT_CODE = "E_RESULT_CODE";
            public static string E_RESULT_DESC = "E_RESULT_DESC";
            public static string E_ACTIVE = "E_ACTIVE";
            public static string P_OUTTBL = "P_OUTTBL";
        }
        public static class POS_SP_GET_AREAREGION_DTLS
        {
            public static string P_AREA_CODE = "P_AREA_CODE";
            public static string P_REGION_CODE = "P_REGION_CODE";
            public static string P_AREA_NAME = "P_AREA_NAME";
            public static string P_OUTTBL = "P_OUTTBL";
        }
        public static class POS_SP_FETCH_ROLE_LIST
        {
            public static string E_ROLE_ID = "E_ROLE_ID";
            public static string P_OUTTBL = "P_OUTTBL";
        }
        public static class POS_SP_GET_GCM_DET
        {
            public static string P_IN_CODE = "P_IN_CODE";
            public static string P_OUTTBL = "P_OUTTBL";
        }
        public static class CMS_SP_INSERT_PRODUCT_MST
        {
            public static string E_KEY = "E_KEY";
            public static string E_PRODUCT_CODE = "E_PRODUCT_CODE";
            public static string E_PRODUCT_DESC = "E_PRODUCT_DESC";
            public static string E_ACTIVE = "E_ACTIVE";
            public static string E_CREATED_BY = "E_CREATED_BY";
            public static string E_UPDATED_BY = "E_UPDATED_BY";
            public static string P_OUTTBL = "P_OUTTBL";
        }
        public static class POS_SP_GET_BILLING_MASTER
        {
            public static string P_KEY_CODE = "P_KEY_CODE";
            public static string P_BANK_ID = "P_BANK_ID";
            public static string P_CHRG_TYPE = "P_CHRG_TYPE";
            public static string P_PRODUCT = "P_PRODUCT";
            public static string P_OUT_TBL = "P_OUT_TBL";
        }
        public static class CMS_SP_REGZONCOLLECTION_MST
        {
            public static string E_KEY = "E_KEY";
            public static string E_CODE = "E_CODE";
            public static string E_CODE_DESC = "E_CODE_DESC";
            public static string E_ACTIVE = "E_ACTIVE";
            public static string E_ZONE_CODE = "E_ZONE_CODE";
            public static string E_CREATED_BY = "E_CREATED_BY";
            public static string P_OUTTBL = "P_OUTTBL";
        }
        public static class POS_SP_INS_BANK_MASTER
        {
            public static string P_KEY = "P_KEY";
            public static string P_BANK_CODE = "P_BANK_CODE";
            public static string P_BANK_NAME = "P_BANK_NAME";
            public static string P_BANK_TYPE = "P_BANK_TYPE";
            public static string P_ACTIVE = "P_ACTIVE";
            public static string P_OUT = "P_OUT";
        }
        public static class CMS_SP_REGZONCOLLECTION_LIST
        {
            public static string E_KEY = "E_KEY";
            public static string P_OUTTBL = "P_OUTTBL";
        }
        public static class POS_SP_GET_YARD_CODE
        {
            public static string P_OUTTBL = "P_OUTTBL";
        }
        public static class CMS_SP_GET_BANKZONEREG_MST
        {
            public static string P_OUTTBL = "P_OUTTBL";
            public static string E_KEY = "E_KEY";
        }
        public static class POS_SP_GET_BANKMAPPING_SRCH
        {
            public static string E_CODE = "E_CODE";
            public static string E_BANK_CODE = "E_BANK_CODE";
            public static string P_OUTTBL = "P_OUTTBL";
        }
        public static class CMS_SP_INSERT_BANKBRANCH_MST
        {
            public static string E_BRANCHID = "E_BRANCHID";
            public static string E_BRANCH_TYPE = "E_BRANCH_TYPE";
            public static string E_BANK_CODE = "E_BANK_CODE";
            public static string E_BRANCH_CODE = "E_BRANCH_CODE";
            public static string E_BRANCH_DESC = "E_BRANCH_DESC";
            public static string E_ZONE_CODE = "E_ZONE_CODE";
            public static string E_REGION_CODE = "E_REGION_CODE";
            public static string E_STATE_CODE = "E_STATE_CODE";
            public static string E_ACTIVE = "E_ACTIVE";
            public static string P_OUTTBL = "P_OUTTBL";
        }
        public static class POS_MONTHLY_COUNT_FOR_NEW_UI
        {
            public static string P_KEY = "P_KEY";
            public static string P_USER_ROLE = "P_USER_ROLE";
            public static string P_USER_ID = "P_USER_ID";
            public static string P_OUTTBL = "P_OUTTBL";
        }
        public static class POS_SP_INVOICE_CASEWISE_RPT
        {
            public static string P_INV_MONTHYR = "P_INV_MONTHYR";
            public static string P_BATCH_NO = "P_BATCH_NO";
            public static string P_BANK_CODE = "P_BANK_CODE";
            public static string P_ACCOUNT_NO = "P_ACCOUNT_NO";
            public static string P_OUTTBL = "P_OUTTBL";
            public static string P_CREATED_BY = "P_CREATED_BY";
            public static string P_RESULT = "P_RESULT";
            public static string P_OPTION_CODE = "P_OPTION_CODE";
        }
        public static class POS_SP_UP_SZD_UPDATION
        {
            public static string P_LOAN_NO = "P_LOAN_NO";
            public static string P_OTHER_EXP = "P_OTHER_EXP";
            public static string P_OTHER_EXP_DET = "P_OTHER_EXP_DET";
            public static string P_REPORTING_MONTH = "P_REPORTING_MONTH";
            public static string P_ALLOCATION_BATCH_ID = "P_ALLOCATION_BATCH_ID";
            public static string P_OUTTBL = "P_OUTTBL";
        }
        public static class CMS_SP_CUSTOMERDTLS_FORVIEW
        {
            public static string P_LOANACTNO = "P_LOANACTNO";
            public static string P_LOAN_NO = "P_LOAN_NO";
            public static string P_COLLECTOR_CODE = "P_COLLECTOR_CODE";
            public static string P_OUTTBL = "P_OUTTBL";
            public static string P_BRANCH_CODE = "P_BRANCH_CODE";
            public static string P_OUTTBL_ALLOC = "P_OUTTBL_ALLOC";
            public static string P_OUTTBL_COLLEC = "P_OUTTBL_COLLEC";
            public static string P_OUTTBL_SEIZURE = "P_OUTTBL_SEIZURE";
            public static string P_OUTTBL_YARD = "P_OUTTBL_YARD";
            public static string P_OUTTBL_SALERELEASE = "P_OUTTBL_SALERELEASE";
        }
    }
}