using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SMS.DAO;
using SMS.UTILITY;
using System.Web.Security;
using SMS.Model.ViewModel;
using System.Web.Mvc;
using System.Data.OleDb;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Net;
using Newtonsoft.Json;
using SMS.Model.Model;
namespace SMS.Controllers
{
    public class SpareController : BaseController
    {
        private SpareViewModel objViewModel;

        public SpareController()
        {
            objViewModel = new SpareViewModel();
        }

        #region SpareLocationMaster

        public ActionResult SpareLocationMaster()
        {
            return View();
        }
        public JsonResult BindListSpareLocation(SpareLocationmaster objModel)
        {
            try
            {
                //SpareLocationmaster objModel = new SpareLocationmaster();
                JsonResult result = Json("", JsonRequestBehavior.AllowGet);
                if (objModel.P_KEY == "Location")
                {
                    objModel.P_KEY = "GRID";
                    objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    objViewModel.liSpareLocationmaster = SpareViewModel.SaveSpareLocationMaster(objModel);
                    result = Json(objViewModel, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    //return Json(objViewModel, JsonRequestBehavior.AllowGet);
                    return result;
                }
                else if (objModel.P_KEY == "Search")
                {
                    objModel.P_KEY = "Search";
                    objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    objViewModel.liSpareLocationmaster = SpareViewModel.SaveSpareLocationMaster(objModel);
                    result = Json(objViewModel, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    //return Json(objViewModel, JsonRequestBehavior.AllowGet);
                    return result;
                }
                return result;
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        public JsonResult SaveSpareLocationMaster(SpareLocationmaster SpareLocationmaster)
        {
            try
            {
                SpareLocationmaster.P_KEY = "S";
                SpareLocationmaster.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                //PhysicianMaster.ORGID = "1";
                SpareLocationmaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                SpareLocationmaster.IsActive = (SpareLocationmaster.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liSpareLocationmaster = SpareViewModel.SaveSpareLocationMaster(SpareLocationmaster);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        public ActionResult GetexcelSpareLocation(SpareLocationmaster objLocationmst)
        {
            objLocationmst.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            objLocationmst.KEY = "L";
            DataTable dt = new DataTable();
            dt = SpareViewModel.GetexcelSpareLocation(objLocationmst);
            byte[] data = dt.ToExcel();
            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("SpareLocationmaster_List" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
        }



        #endregion

        #region Dashboard
        public ActionResult SpareDashboard()
        {
            return View();
        }
        public JsonResult GetDashboard()
        {
            Dashboard objModel = new Dashboard();

            objModel.P_KEY = "G";
            objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            var liToolPartmaster = SpareViewModel.GetDashboard(objModel);
            var ddldata = new
            {
                ddlDashboard = liToolPartmaster


            };
            JsonResult result = Json(ddldata, JsonRequestBehavior.AllowGet);
            result.MaxJsonLength = 8675309;
            return result;
        }
        #endregion



        #region SparePartMaster

        public ActionResult SparePartMaster()
        {
            return View();
        }
        public JsonResult BindListSparePartMaster(SparePartmaster ObjSparePartmaster)
        {
            try
            {
                JsonResult result = Json("", JsonRequestBehavior.AllowGet);
                SparePartmaster objModel = new SparePartmaster();
                SpareLocationmaster objSpareLocation = new SpareLocationmaster();
                ToolVendorMaster objVendor = new ToolVendorMaster();

                if (ObjSparePartmaster.P_KEY == "Part")
                {
                    ObjSparePartmaster.P_KEY = "GRID";
                    ObjSparePartmaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSparePartmaster = SpareViewModel.SaveSparePartmaster(ObjSparePartmaster);
                    var ddldata = new
                    {
                        ddlSparePartmaster = liSparePartmaster
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSparePartmaster.P_KEY == "Search")
                {
                    ObjSparePartmaster.P_KEY = "Search";
                    ObjSparePartmaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSparePartmaster = SpareViewModel.SaveSparePartmaster(ObjSparePartmaster);
                    var ddldata = new
                    {
                        ddlSparePartmaster = liSparePartmaster
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSparePartmaster.P_KEY == "Location")
                {
                    objSpareLocation.P_KEY = "L";
                    objSpareLocation.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSpareLocation = SpareViewModel.SaveSpareLocationMaster(objSpareLocation);
                    var ddldata = new
                    {
                        ddlSpareLocation = liSpareLocation
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSparePartmaster.P_KEY == "Vendor")
                {
                    objVendor.P_KEY = "L";
                    objVendor.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liVendormaster = ToolViewModel.SaveToolVendorMaster(objVendor);
                    var ddldata = new
                    {
                        ddlVendormaster = liVendormaster
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                return result;
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }


        public JsonResult SaveSparePartMaster(SparePartmaster SparePartmaster)
        {
            try
            {
                SparePartmaster.P_KEY = "S";
                SparePartmaster.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                //PhysicianMaster.ORGID = "1";
                SparePartmaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                SparePartmaster.IsActive = (SparePartmaster.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liSparePartmaster = SpareViewModel.SaveSparePartmaster(SparePartmaster);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public ActionResult GetExcelPartData(SparePartmaster objSpareUpload)
        {
            objSpareUpload.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();

            //objSpareUpload.P_KEY = "L";


            DataTable dt = new DataTable();
            dt = SpareViewModel.SaveSparePartmasterTable(objSpareUpload);




            byte[] data = dt.ToExcel();



            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("PartDetails" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
            // var fileDetails = "";
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
            //}
            // return File(data, "application/vnd.ms-excel", "TCM_INCENTIVE_SUMMARY");




        }
        #endregion

        #region SpareUpload

        public ActionResult MasterSpareUpload()
        {
            return View();
        }
        public ActionResult GetExcelInwardData(SpareUpload objSpareUpload)
        {
            objSpareUpload.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            objSpareUpload.P_KEY = "L";
            DataTable dt = new DataTable();
            dt = SpareViewModel.SaveSpareUploadTable(objSpareUpload);
            byte[] data = dt.ToExcel();
            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("InwardDetails" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BindListSpareUpload(SpareUpload objSpareUpload)
        {
            try
            {
                JsonResult result = Json("", JsonRequestBehavior.AllowGet);
                SpareUpload objSpare = new SpareUpload();
                //SpareUpload objSpareUpload = new SpareUpload();
                SparePartmaster objPart = new SparePartmaster();
                SpareLocationmaster objSpareLocation = new SpareLocationmaster();
                ToolVendorMaster objVendor = new ToolVendorMaster();
                if (objSpareUpload.P_KEY == "CL" && objSpareUpload.dummycolumn1 == "Inward")
                {
                    objSpareUpload.P_KEY = "CL"; //"CL";
                    objSpareUpload.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSpareUpload = SpareViewModel.SaveSpareUpload(objSpareUpload);
                    liSpareUpload[0].OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();

                    var ddldata = new
                    {
                        ddlSpareUpload = liSpareUpload
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objSpareUpload.P_KEY == "Search")
                {

                    objSpareUpload.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSpareUpload = SpareViewModel.SaveSpareUpload(objSpareUpload);
                    var ddldata = new
                    {
                        ddlSpareUpload = liSpareUpload
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objSpareUpload.P_KEY == "L" && objSpareUpload.dummycolumn1 == "Inward")
                {
                    objSpare.P_KEY = "L"; //"L";
                    objSpare.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSpareUpload = SpareViewModel.SaveSpareUpload(objSpare);
                    var ddldata = new
                    {
                        ddlSpareUploadList = liSpareUpload
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objSpareUpload.P_KEY == "L" && objSpareUpload.dummycolumn1 == "Part")
                {
                    objPart.P_KEY = "L"; //"L";
                    objPart.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liPartmaster = SpareViewModel.SaveSparePartmaster(objPart);
                    var ddldata = new
                    {
                        ddlPartmaster = liPartmaster
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objSpareUpload.P_KEY == "L" && objSpareUpload.dummycolumn1 == "Location")
                {
                    objSpareLocation.P_KEY = "L";
                    objSpareLocation.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSpareLocation = SpareViewModel.SaveSpareLocationMaster(objSpareLocation);
                    var ddldata = new
                    {
                        ddlSpareLocation = liSpareLocation
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objSpareUpload.P_KEY == "L" && objSpareUpload.dummycolumn1 == "Vendor")
                {
                    objVendor.P_KEY = "L";
                    objVendor.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liVendormaster = ToolViewModel.SaveToolVendorMaster(objVendor);
                    var ddldata = new
                    {
                        ddlVendormaster = liVendormaster
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                return result;
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        public JsonResult SaveSpareUpload(SpareUpload SpareUpload)
        {
            try
            {
                if (String.IsNullOrEmpty(SpareUpload.P_KEY))
                {
                    SpareUpload.P_KEY = "S";

                }
                if (SpareUpload.P_KEY == "S")//SpareUpload.SpareUniqueCode != null)
                {
                    if (SpareUpload.SpareUniqueCode != null)
                    {
                        string[] values = SpareUpload.SpareUniqueCode.Split(',');
                        string isactive = SpareUpload.IsActive;
                        int cnt = values.Length;
                        int i = 1;
                        foreach (string strunicode in values)
                        {
                            if (i == cnt)
                            {
                                SpareUpload.IsInsertEnd = "Y";
                            }
                            SpareUpload.SpareUniqueCode = strunicode;
                            //SpareUpload.P_KEY = "S";
                            SpareUpload.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                            //PhysicianMaster.ORGID = "1";
                            SpareUpload.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                            SpareUpload.IsActive = (isactive == Common.ActiveLog.Active) ? "Y" : "N";
                            objViewModel.liSpareUpload = SpareViewModel.SaveSpareUpload(SpareUpload);
                            i = i + 1;
                        }
                    }
                    else
                    {
                        SpareUpload.IsInsertEnd = "Y";
                        //SpareUpload.P_KEY = "S";
                        SpareUpload.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                        //PhysicianMaster.ORGID = "1";
                        SpareUpload.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                        SpareUpload.IsActive = (SpareUpload.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                        objViewModel.liSpareUpload = SpareViewModel.SaveSpareUpload(SpareUpload);
                    }
                }
                else
                {
                    //SpareUpload.P_KEY = "S";
                    SpareUpload.IsInsertEnd = "Y";
                    SpareUpload.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                    //PhysicianMaster.ORGID = "1";
                    SpareUpload.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    SpareUpload.IsActive = (SpareUpload.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                    objViewModel.liSpareUpload = SpareViewModel.SaveSpareUpload(SpareUpload);
                }
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public JsonResult GetInwardDetails(SpareUpload SpareUpload)
        {
            try
            {
                SpareUpload.P_KEY = "INW_DTL";
                SpareUpload.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                //PhysicianMaster.ORGID = "1";
                SpareUpload.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                SpareUpload.IsActive = (SpareUpload.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liSpareUpload = SpareViewModel.SaveSpareUpload(SpareUpload);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        #endregion

        #region SpareRequestReason
        public ActionResult SpareRequestReason()
        {
            return View();
        }

        public JsonResult BindListSpareRequest()
        {
            try
            {
                SpareRequestReason objModel = new SpareRequestReason();
                objModel.P_KEY = "L";
                objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objViewModel.liSpareRequestReason = SpareViewModel.SaveSpareRequestReasonMaster(objModel);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public JsonResult SaveSpareRequestmaster(SpareRequestReason SpareRequestReason)
        {
            try
            {
                SpareRequestReason.P_KEY = "S";
                SpareRequestReason.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                SpareRequestReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                SpareRequestReason.IsActive = (SpareRequestReason.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liSpareRequestReason = SpareViewModel.SaveSpareRequestReasonMaster(SpareRequestReason);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public ActionResult GetExcelSpareRequestResonData(SpareRequestReason objSpareRequestReason)
        {
            objSpareRequestReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            DataTable dt = new DataTable();
            dt = SpareViewModel.GetExcelSpareRequestResonData(objSpareRequestReason);
            byte[] data = dt.ToExcel();
            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("Spare_Request_Reason" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
        }


        #endregion

        #region SpareReturnReason
        public ActionResult SpareReturnReason()
        {
            return View();
        }

        public JsonResult BindListSpareReturn()
        {
            try
            {
                SpareReturnReason objModel = new SpareReturnReason();
                objModel.P_KEY = "L";
                objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objViewModel.liSpareReturnReason = SpareViewModel.SaveSpareReturnReasonMaster(objModel);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public JsonResult SaveSpareReturnmaster(SpareReturnReason SpareReturnReason)
        {
            try
            {
                SpareReturnReason.P_KEY = "S";
                SpareReturnReason.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                SpareReturnReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                SpareReturnReason.IsActive = (SpareReturnReason.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liSpareReturnReason = SpareViewModel.SaveSpareReturnReasonMaster(SpareReturnReason);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }


        public ActionResult GetExcelSpareReturnReasonData(SpareReturnReason objSpareReturnReason)
        {
            objSpareReturnReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            DataTable dt = new DataTable();
            dt = SpareViewModel.GetExcelSpareReturnReasonData(objSpareReturnReason);
            byte[] data = dt.ToExcel();
            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("Spare_Return_Reason" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region SpareRequest
        public ActionResult SpareingRequest()
        {
            return View();
        }
        public JsonResult BindListSpareingRequest(SpareingRequest objSpareUpload)
        {
            try
            {
                JsonResult result = Json("", JsonRequestBehavior.AllowGet);
                SpareUpload objSpare = new SpareUpload();
                SparePartmaster objPart = new SparePartmaster();
                SpareRequestReason objRequestReason = new SpareRequestReason();
                Shiftmaster objShiftmaster = new Shiftmaster();
                LineMachinemaster objLineMachine = new LineMachinemaster();
                Linemaster objLine = new Linemaster();
                Machinemaster objMachine = new Machinemaster();
                SpareingReturn objRegrain = new SpareingReturn();
                EmployeeMaster objEmpMaster = new EmployeeMaster();

                //FUTURE

                if (objSpareUpload.P_KEY == "L" && objSpareUpload.dummy_col1 == "Request")
                {
                    objSpareUpload.P_KEY = "GRID";//"L"
                    objSpareUpload.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSpareingRequest = SpareViewModel.SaveSpareingRequest(objSpareUpload);
                    var ddldata = new
                    {
                        ddSpareingRequest = liSpareingRequest,
                        ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objSpareUpload.P_KEY == "L" && objSpareUpload.dummy_col1 == "MachineMaster")
                {
                    objMachine.P_KEY = "L";
                    objMachine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liMachine = MasterViewModel.SaveMachineMaster(objMachine);
                    var ddldata = new
                    {
                        ddlMachine = liMachine,
                        ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objSpareUpload.P_KEY == "L" && objSpareUpload.dummy_col1 == "LineMaster")
                {
                    objLine.P_KEY = "L";
                    objLine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liLine = MasterViewModel.SaveLineMaster(objLine);
                    var ddldata = new
                    {
                        ddlLine = liLine,
                        ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objSpareUpload.P_KEY == "L" && objSpareUpload.dummy_col1 == "LineMachine")
                {
                    objLineMachine.P_KEY = "L";
                    objLineMachine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liLineMachine = MasterViewModel.SaveLinemachineMaster(objLineMachine);
                    var ddldata = new
                    {
                        ddlLineMachine = liLineMachine,
                        ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objSpareUpload.P_KEY == "L" && objSpareUpload.dummy_col1 == "Upload")
                {
                    objSpare.P_KEY = "L";
                    objSpare.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSpareUpload = SpareViewModel.SaveSpareUpload(objSpare);
                    var ddldata = new
                    {
                        ddlSpareUpload = liSpareUpload,
                        ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objSpareUpload.P_KEY == "G" && objSpareUpload.dummy_col1 == "Part")
                {
                    objPart.P_KEY = "G";
                    objPart.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liPartmaster = SpareViewModel.SaveSparePartmaster(objPart);
                    var ddldata = new
                    {
                        ddlPartmaster = liPartmaster,
                        ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objSpareUpload.P_KEY == "L" && objSpareUpload.dummy_col1 == "RequestReason")
                {
                    objRequestReason.P_KEY = "L";
                    objRequestReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liRequestReason = SpareViewModel.SaveSpareRequestReasonMaster(objRequestReason);
                    var ddldata = new
                    {
                        ddlRequestReason = liRequestReason
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objSpareUpload.P_KEY == "L" && objSpareUpload.dummy_col1 == "ShiftMaster")
                {
                    objShiftmaster.P_KEY = "L";
                    objShiftmaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liShiftmaster = MasterViewModel.SaveShiftMaster(objShiftmaster);
                    var ddldata = new
                    {
                        ddlShiftmaster = liShiftmaster,
                        ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()

                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                //Not in use
                if (objSpareUpload.P_KEY == "L" && objSpareUpload.dummy_col1 == "Regraind")
                {
                    objRegrain.P_KEY = "L";
                    objRegrain.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSpareingRegrain = SpareViewModel.SaveSpareingRegrain(objRegrain);
                    var ddldata = new
                    {
                        ddlSpareingRegrain = liSpareingRegrain,
                        ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }

                if (objSpareUpload.P_KEY == "Search")
                {
                    objSpareUpload.P_KEY = "Search";//"L"
                    objSpareUpload.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSpareingRequest = SpareViewModel.SaveSpareingRequest(objSpareUpload);
                    var ddldata = new
                    {
                        ddSpareingRequest = liSpareingRequest,
                        ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                return result;
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public JsonResult SaveSpareingRequest(SpareingRequest SpareReturnReason)
        {
            try
            {
                SpareReturnReason.P_KEY = "S";
                SpareReturnReason.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                SpareReturnReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                SpareReturnReason.IsActive = (SpareReturnReason.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liSpareingRequest = SpareViewModel.SaveSpareingRequest(SpareReturnReason);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }



        public JsonResult GetLineDetailsReturn(SpareingRequest Linemachinemaster)
        {
            try
            {
                //Linemaster objLine = new Linemaster();
                // Machinemaster objMachine = new Machinemaster();
                SpareingRequest objLineMachine = new SpareingRequest();

                Linemachinemaster.P_KEY = "G";
                Linemachinemaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();

                var liLineMachine = SpareViewModel.SaveLinemachineMaster(Linemachinemaster);

                var ddldata = new
                {
                    ddlLineMachine = liLineMachine
                    //ddlLine = liLine,
                    //ddlMachine = liMachine
                };
                return Json(ddldata, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public JsonResult GetLineDetails(SpareingReturn Linemachinemaster)
        {
            try
            {
                //Linemaster objLine = new Linemaster();
                // Machinemaster objMachine = new Machinemaster();
                SpareingRequest objLineMachine = new SpareingRequest();

                Linemachinemaster.P_KEY = "G";
                Linemachinemaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();

                var liLineMachine = SpareViewModel.SaveLinemachineMaster(Linemachinemaster);

                var ddldata = new
                {
                    ddlLineMachine = liLineMachine
                    //ddlLine = liLine,
                    //ddlMachine = liMachine
                };
                return Json(ddldata, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public ActionResult GetExcelSpareRequestData(SpareingRequest objSpareingRequest)
        {
            objSpareingRequest.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            DataTable dt = new DataTable();
            dt = SpareViewModel.GetExcelSpareRequestData(objSpareingRequest);
            byte[] data = dt.ToExcel();
            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("Spare_Request_Data" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region SpareIssue
        public ActionResult SpareingIssue()
        {
            return View();
        }
        public JsonResult BindListSpareingIssue(SpareingIssue objSpareingIssue)
        {
            try
            {
                JsonResult result = Json("", JsonRequestBehavior.AllowGet);

                if (objSpareingIssue.P_KEY == "G" && objSpareingIssue.dummy_col1 == "Request")
                {
                    SpareingRequest objModel = new SpareingRequest();
                    objModel.P_KEY = "G";
                    objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSpareingRequest = SpareViewModel.SaveSpareingRequest(objModel);

                    var ddldata = new
                    {
                        ddSpareingRequest = liSpareingRequest
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;

                }
                if (objSpareingIssue.P_KEY == "L" && objSpareingIssue.dummy_col1 == "Issue")
                {
                    SpareingIssue objIssue = new SpareingIssue();
                    objIssue.P_KEY = "L";
                    objIssue.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSpareingIssue = SpareViewModel.SaveSpareingIssue(objIssue);
                    var ddldata = new
                    {
                        ddlSpareingIssue = liSpareingIssue
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objSpareingIssue.P_KEY == "G" && objSpareingIssue.dummy_col1 == "Regrain")
                {
                    SpareingReturn objRegrain = new SpareingReturn();
                    objRegrain.P_KEY = "G";
                    objRegrain.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSpareingRegrain = SpareViewModel.SaveSpareingRegrain(objRegrain);//FUTURE
                    var ddldata = new
                    {
                        ddlSpareingRegrain = liSpareingRegrain
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objSpareingIssue.P_KEY == "G" && objSpareingIssue.dummy_col1 == "Upload")
                {
                    SpareUpload objSpare = new SpareUpload();
                    objSpare.P_KEY = "G";
                    objSpare.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSpareUpload = SpareViewModel.SaveSpareUpload(objSpare);
                    var ddldata = new
                    {
                        ddlSpareUpload = liSpareUpload
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objSpareingIssue.P_KEY == "L" && objSpareingIssue.dummy_col1 == "Upload")
                {
                    SpareUpload objSpareUpload = new SpareUpload();
                    objSpareUpload.P_KEY = "L";
                    objSpareUpload.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSpareUploadList = SpareViewModel.SaveSpareUpload(objSpareUpload);
                    var ddldata = new
                    {
                        ddlSpareUploadList = liSpareUploadList
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objSpareingIssue.P_KEY == "G" && objSpareingIssue.dummy_col1 == "Part")
                {
                    SparePartmaster objPart = new SparePartmaster();
                    objPart.P_KEY = "G";
                    objPart.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liPartmaster = SpareViewModel.SaveSparePartmaster(objPart);
                    var ddldata = new
                    {
                        ddlPartmaster = liPartmaster
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objSpareingIssue.P_KEY == "L" && objSpareingIssue.dummy_col1 == "Vendor")
                {
                    ToolVendorMaster objVendor = new ToolVendorMaster();
                    objVendor.P_KEY = "L";
                    objVendor.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liVendormaster = ToolViewModel.SaveToolVendorMaster(objVendor);

                    var ddldata = new
                    {
                        ddlVendormaster = liVendormaster
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objSpareingIssue.P_KEY == "L" && objSpareingIssue.dummy_col1 == "Machine")
                {
                    Machinemaster objMachine = new Machinemaster();
                    objMachine.P_KEY = "L";
                    objMachine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liMachine = MasterViewModel.SaveMachineMaster(objMachine);
                    var ddldata = new
                    {
                        ddlMachine = liMachine
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objSpareingIssue.P_KEY == "L" && objSpareingIssue.dummy_col1 == "Scrab")
                {
                    SpareScrab objSpareScrab = new SpareScrab();
                    objSpareScrab.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liScrab = SpareViewModel.GetScrabList(objSpareScrab);
                    var ddldata = new
                    {
                        ddlScrab = liScrab
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }

                return result;
                // return Json(ddldata, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public JsonResult SaveSpareingIssue(SpareingIssue SpareingIssue)
        {
            try
            {
                SpareingIssue.P_KEY = "S";
                SpareingIssue.SpareIsu_VendorCode = string.Join(",", SpareingIssue.SpareIsu_VendorCode_list);
                SpareingIssue.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                SpareingIssue.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                SpareingIssue.IsActive = (SpareingIssue.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                SpareingIssue.@IsInsertBegin = "Y";
               
                    if (SpareingIssue.Sparetype == "Y")
                    {
                    if (SpareingIssue.Spare_Status == "I")
                    {
                        string[] Unicode = SpareingIssue.SpareIsu_CurUnicode.Split(',').Select(sValue => sValue.Trim()).ToArray();
                        int cnt = Unicode.Length;
                        int i = 1;
                        foreach (string a in Unicode)
                        {
                            if (i == cnt)
                            {
                                SpareingIssue.IsInsertEnd = "Y";
                            }
                            if (i > 1)
                            {
                                SpareingIssue.@IsInsertBegin = "N";
                            }
                            SpareingIssue.SpareIsu_CurUnicode = a;
                            SpareingIssue.SpareIsu_Qty = "1";
                            objViewModel.liSpareingIssue = SpareViewModel.SaveSpareingIssue(SpareingIssue);
                            i = i + 1;
                        }
                    }
                    else
                    {
                        SpareingIssue.IsInsertEnd = "Y";
                        objViewModel.liSpareingIssue = SpareViewModel.SaveSpareingIssue(SpareingIssue);
                    }
                }
                else
                {
                    SpareingIssue.IsInsertEnd = "Y";
                    objViewModel.liSpareingIssue = SpareViewModel.SaveSpareingIssue(SpareingIssue);
                }
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public ActionResult GetExcelSpareIssueData(SpareingIssue objSpareingIssue)
        {
            objSpareingIssue.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            DataTable dt = new DataTable();
            dt = SpareViewModel.GetExcelSpareIssueData(objSpareingIssue);
            byte[] data = dt.ToExcel();
            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("Spare_Issue_Data" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region SpareReturn
        public ActionResult SpareingReturn()
        {
            return View();
        }
        public JsonResult BindListSpareingReturn(SpareingReturn ObjSpareingReturn)
        {
            try
            {
                JsonResult result = Json("", JsonRequestBehavior.AllowGet);

                SpareingReturn objModel = new SpareingReturn();
                SpareingIssue objIssue = new SpareingIssue();
                SpareUpload objSpare = new SpareUpload();
                SparePartmaster objPart = new SparePartmaster();
                SpareReturnReason objSpareReturnReason = new SpareReturnReason();
                Shiftmaster objShiftmaster = new Shiftmaster();
                LineMachinemaster objLineMachine = new LineMachinemaster();
                Linemaster objLine = new Linemaster();
                Machinemaster objMachine = new Machinemaster();
                EmployeeMaster objEmpMaster = new EmployeeMaster();



                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Return")
                {
                    objModel.P_KEY = "L";
                    objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSpareingReturn = SpareViewModel.SaveSpareingReturn(objModel);

                    var ddldata = new
                    {
                        ddSpareingReturn = liSpareingReturn
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Issue")
                {
                    objIssue.P_KEY = "L";
                    objIssue.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    objIssue.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                    var liSpareingIssue = SpareViewModel.SaveSpareingIssue(objIssue);
                    var ddldata = new
                    {
                        ddlSpareingIssue = liSpareingIssue
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Regrain")
                {
                    objIssue.P_KEY = "Regrain";
                    objIssue.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    objIssue.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                    var liSpareingIssue = SpareViewModel.SaveSpareingIssue(objIssue);
                    var ddldata = new
                    {
                        ddlSpareingIssue = liSpareingIssue
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Employee")
                {

                    objEmpMaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liEmployeeMaster = ToolViewModel.GetEmployeeMasterList(objEmpMaster);
                    var ddldata = new
                    {
                        ddlEmployeeMaster = liEmployeeMaster
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }

                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Machine")
                {

                    objMachine.P_KEY = "L";
                    objMachine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liMachine = MasterViewModel.SaveMachineMaster(objMachine);
                    var ddldata = new
                    {
                        ddlMachine = liMachine
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Line")
                {
                    objLine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    objLine.P_KEY = "L";
                    var liLine = MasterViewModel.SaveLineMaster(objLine);
                    var ddldata = new
                    {
                        ddlLine = liLine
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "LineMachine")
                {
                    objLineMachine.P_KEY = "L";
                    objLineMachine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liLineMachine = MasterViewModel.SaveLinemachineMaster(objLineMachine);
                    var ddldata = new
                    {
                        ddlLineMachine = liLineMachine
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }



                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Part")
                {
                    objPart.P_KEY = "G";
                    objPart.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liPartmaster = SpareViewModel.SaveSparePartmaster(objPart);
                    var ddldata = new
                    {
                        ddlPartmaster = liPartmaster
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Reason")
                {
                    objSpareReturnReason.P_KEY = "L";
                    objSpareReturnReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liReturnReason = SpareViewModel.SaveSpareReturnReasonMaster(objSpareReturnReason);
                    var ddldata = new
                    {
                        ddlReturnReason = liReturnReason
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Shift")
                {
                    objShiftmaster.P_KEY = "L";
                    objShiftmaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liShiftmaster = MasterViewModel.SaveShiftMaster(objShiftmaster);
                    var ddldata = new
                    {
                        ddlShiftmaster = liShiftmaster,
                        ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }

                return result;

            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public JsonResult SaveSpareingReturn(SpareingReturn SpareingReturn)
        {
            try
            {
                SpareingReturn.P_KEY = "S";
                SpareingReturn.Spare_Status = "RT";
                SpareingReturn.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                SpareingReturn.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                SpareingReturn.IsActive = (SpareingReturn.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liSpareingReturn = SpareViewModel.SaveSpareingReturn(SpareingReturn);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public ActionResult GetExcelSpareReturnData(SpareingReturn objSpareingReturn)
        {
            objSpareingReturn.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            DataTable dt = new DataTable();
            dt = SpareViewModel.GetExcelSpareReturnData(objSpareingReturn);
            byte[] data = dt.ToExcel();
            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = "";
            if (objSpareingReturn.P_KEY == "EXCEL")
            { filename = ("Spare_Return_Data" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " "); }
            else if (objSpareingReturn.P_KEY == "EXCEL_RC")
            { filename = ("Spare_Return_Check_Data" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " "); }
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region SpareingReturnCheck
        public ActionResult SpareingReturnCheck()
        {
            return View();
        }

        #endregion

        #region SpareRegrinding
        public ActionResult SpareingRegrinding()
        {
            return View();
        }

        public JsonResult BindListRegrinding(SpareingReturn ObjSpareingReturn)
        {
            try
            {
                JsonResult result = Json("", JsonRequestBehavior.AllowGet);


                SpareingReturn objModel = new SpareingReturn();
                SpareingIssue objIssue = new SpareingIssue();
                SpareUpload objSpare = new SpareUpload();
                SparePartmaster objPart = new SparePartmaster();
                SpareRequestReason objRequestReason = new SpareRequestReason();
                Shiftmaster objShiftmaster = new Shiftmaster();
                LineMachinemaster objLineMachine = new LineMachinemaster();
                Linemaster objLine = new Linemaster();
                Machinemaster objMachine = new Machinemaster();
                ToolVendorMaster objVendor = new ToolVendorMaster();

                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Return")
                {
                    objModel.P_KEY = "G";
                    objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSpareingReturn = SpareViewModel.SaveSpareingReturn(objModel);

                    var ddldata = new
                    {
                        ddSpareingReturn = liSpareingReturn
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }

                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Issue")
                {
                    objIssue.P_KEY = "G";
                    objIssue.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    objIssue.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                    var liSpareingIssue = SpareViewModel.SaveSpareingIssue(objIssue);
                    var ddldata = new
                    {
                        ddlSpareingIssue = liSpareingIssue
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }

                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Machine")
                {

                    objMachine.P_KEY = "L";
                    objMachine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liMachine = MasterViewModel.SaveMachineMaster(objMachine);
                    var ddldata = new
                    {
                        ddlMachine = liMachine
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }

                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Line")
                {
                    objLine.P_KEY = "L";
                    objLine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liLine = MasterViewModel.SaveLineMaster(objLine);
                    var ddldata = new
                    {
                        ddlLine = liLine
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "LineMachine")
                {
                    objLineMachine.P_KEY = "L";
                    objLineMachine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liLineMachine = MasterViewModel.SaveLinemachineMaster(objLineMachine);
                    var ddldata = new
                    {
                        ddlLineMachine = liLineMachine
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }

                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Upload")
                {
                    objSpare.P_KEY = "H";
                    objSpare.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSpareUpload = SpareViewModel.SaveSpareUpload(objSpare);
                    var ddldata = new
                    {
                        ddlSpareUpload = liSpareUpload
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }

                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Part")
                {
                    objPart.P_KEY = "G";
                    objPart.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liPartmaster = SpareViewModel.SaveSparePartmaster(objPart);
                    var ddldata = new
                    {
                        ddlPartmaster = liPartmaster
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }

                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Reason")
                {
                    objRequestReason.P_KEY = "L";
                    objRequestReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liRequestReason = SpareViewModel.SaveSpareRequestReasonMaster(objRequestReason);
                    var ddldata = new
                    {
                        ddlRequestReason = liRequestReason
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }



                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Shift")
                {
                    objShiftmaster.P_KEY = "L";
                    objShiftmaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liShiftmaster = MasterViewModel.SaveShiftMaster(objShiftmaster);
                    var ddldata = new
                    {
                        ddlShiftmaster = liShiftmaster,
                        ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Vendor")
                {
                    objVendor.P_KEY = "L";
                    objVendor.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liVendormaster = ToolViewModel.SaveToolVendorMaster(objVendor);
                    var ddldata = new
                    {
                        ddlVendormaster = liVendormaster
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }



                return result;
                //return Json(ddldata, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public JsonResult SaveRegrinding(SpareingReturn SpareingReturn)
        {
            try
            {
                SpareingReturn.P_KEY = "S";
                SpareingReturn.Spare_Status = "RT";
                SpareingReturn.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                SpareingReturn.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                SpareingReturn.IsActive = (SpareingReturn.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liSpareingReturn = SpareViewModel.SaveSpareingRegrain(SpareingReturn);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        public ActionResult GetExcelSpareRegrindingData(SpareingReturn objSpareingReturn)
        {
            objSpareingReturn.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            DataTable dt = new DataTable();
            dt = SpareViewModel.GetExcelSpareRegrindingData(objSpareingReturn);
            byte[] data = dt.ToExcel();
            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = "";
            if (objSpareingReturn.P_KEY == "EXCEL")
            { filename = ("Spare_Regrinding_Data" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " "); }
            else if (objSpareingReturn.P_KEY == "EXCEL_RC")
            { filename = ("Spare_Regrainding_Check_Data" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " "); }
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region SpareRegrindingWithParameter

        public ActionResult SpareingRegrindingWithParameter(string SRNo)
        {
            ViewBag.SRNo = SRNo;
            return View();
        }
        public JsonResult BindListRegrindingWithParameter(SpareingReturn ObjSpareingReturn)
        {
            try
            {
                JsonResult result = Json("", JsonRequestBehavior.AllowGet);

                SpareingReturn objModel = new SpareingReturn();
                SpareingIssue objIssue = new SpareingIssue();
                SpareUpload objSpare = new SpareUpload();
                SparePartmaster objPart = new SparePartmaster();
                SpareRequestReason objRequestReason = new SpareRequestReason();
                Shiftmaster objShiftmaster = new Shiftmaster();
                LineMachinemaster objLineMachine = new LineMachinemaster();
                Linemaster objLine = new Linemaster();
                Machinemaster objMachine = new Machinemaster();
                ToolVendorMaster objVendor = new ToolVendorMaster();


                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Return")
                {
                    objModel.P_KEY = "WITH_PARA";
                    objModel.SpareRts_Return_no = ObjSpareingReturn.SRNo;
                    objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    objModel.SpareRts_id = "-1";
                    var liSpareingReturn = SpareViewModel.SaveSpareingReturn(objModel);
                    var ddldata = new
                    {
                        ddSpareingReturn = liSpareingReturn
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Issue")
                {
                    objIssue.P_KEY = "G";
                    objIssue.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    objIssue.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                    var liSpareingIssue = SpareViewModel.SaveSpareingIssue(objIssue);
                    var ddldata = new
                    {
                        ddlSpareingIssue = liSpareingIssue
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }

                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Machine")
                {

                    objMachine.P_KEY = "L";
                    objMachine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liMachine = MasterViewModel.SaveMachineMaster(objMachine);
                    var ddldata = new
                    {
                        ddlMachine = liMachine
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }

                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Line")
                {
                    objLine.P_KEY = "L";
                    objLine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liLine = MasterViewModel.SaveLineMaster(objLine);
                    var ddldata = new
                    {
                        ddlLine = liLine
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "LineMachine")
                {
                    objLineMachine.P_KEY = "L";
                    objLineMachine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liLineMachine = MasterViewModel.SaveLinemachineMaster(objLineMachine);
                    var ddldata = new
                    {
                        ddlLineMachine = liLineMachine
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }

                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Upload")
                {
                    objSpare.P_KEY = "H";
                    objSpare.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSpareUpload = SpareViewModel.SaveSpareUpload(objSpare);
                    var ddldata = new
                    {
                        ddlSpareUpload = liSpareUpload
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }

                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Part")
                {
                    objPart.P_KEY = "G";
                    objPart.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liPartmaster = SpareViewModel.SaveSparePartmaster(objPart);
                    var ddldata = new
                    {
                        ddlPartmaster = liPartmaster
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }

                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Reason")
                {
                    objRequestReason.P_KEY = "L";
                    objRequestReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liRequestReason = SpareViewModel.SaveSpareRequestReasonMaster(objRequestReason);
                    var ddldata = new
                    {
                        ddlRequestReason = liRequestReason
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }



                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Shift")
                {
                    objShiftmaster.P_KEY = "L";
                    objShiftmaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liShiftmaster = MasterViewModel.SaveShiftMaster(objShiftmaster);
                    var ddldata = new
                    {
                        ddlShiftmaster = liShiftmaster,
                        ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Vendor")
                {
                    objVendor.P_KEY = "L";
                    objVendor.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liVendormaster = ToolViewModel.SaveToolVendorMaster(objVendor);
                    var ddldata = new
                    {
                        ddlVendormaster = liVendormaster
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                return result;
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        #endregion

        #region SpareRegrindingCheck
        public ActionResult SpareingRegrindCheck()
        {
            return View();
        }

        public JsonResult BindListRegrindCheck(SpareingReturn ObjSpareingReturn)
        {
            try
            {


                JsonResult result = Json("", JsonRequestBehavior.AllowGet);

                SpareingReturn objModel = new SpareingReturn();
                SpareingReturn objRegrain = new SpareingReturn();
                SpareingIssue objIssue = new SpareingIssue();
                SpareLocationmaster objSpareLocation = new SpareLocationmaster();
                SpareUpload objSpare = new SpareUpload();
                SparePartmaster objPart = new SparePartmaster();
                SpareRequestReason objRequestReason = new SpareRequestReason();
                Shiftmaster objShiftmaster = new Shiftmaster();
                LineMachinemaster objLineMachine = new LineMachinemaster();
                Linemaster objLine = new Linemaster();
                Machinemaster objMachine = new Machinemaster();
                ToolVendorMaster objVendor = new ToolVendorMaster();

                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Return")
                {
                    objModel.P_KEY = "L";
                    objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSpareingReturn = SpareViewModel.SaveSpareingReturn(objModel);

                    var ddldata = new
                    {
                        ddSpareingReturn = liSpareingReturn
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Regrain")
                {
                    objRegrain.P_KEY = "L";
                    objRegrain.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSpareingRegrain = SpareViewModel.SaveSpareingRegrain(objRegrain);

                    var ddldata = new
                    {
                        ddlSpareingRegrain = liSpareingRegrain
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Issue")
                {
                    objIssue.P_KEY = "G";
                    objIssue.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    objIssue.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                    var liSpareingIssue = SpareViewModel.SaveSpareingIssue(objIssue);
                    var ddldata = new
                    {
                        ddlSpareingIssue = liSpareingIssue
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Location")
                {
                    objSpareLocation.P_KEY = "L";
                    objSpareLocation.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSpareLocation = SpareViewModel.SaveSpareLocationMaster(objSpareLocation);
                    var ddldata = new
                    {
                        ddlSpareLocation = liSpareLocation
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }


                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Machine")
                {

                    objMachine.P_KEY = "L";
                    objMachine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liMachine = MasterViewModel.SaveMachineMaster(objMachine);
                    var ddldata = new
                    {
                        ddlMachine = liMachine
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Line")
                {
                    objLine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    objLine.P_KEY = "L";
                    var liLine = MasterViewModel.SaveLineMaster(objLine);
                    var ddldata = new
                    {
                        ddlLine = liLine
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "LineMachine")
                {
                    objLineMachine.P_KEY = "L";
                    objLineMachine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liLineMachine = MasterViewModel.SaveLinemachineMaster(objLineMachine);
                    var ddldata = new
                    {
                        ddlLineMachine = liLineMachine
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Upload")
                {
                    objSpare.P_KEY = "H";
                    objSpare.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liSpareUpload = SpareViewModel.SaveSpareUpload(objSpare);
                    var ddldata = new
                    {
                        ddlSpareUpload = liSpareUpload
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Part")
                {
                    objPart.P_KEY = "G";
                    objPart.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liPartmaster = SpareViewModel.SaveSparePartmaster(objPart);
                    var ddldata = new
                    {
                        ddlPartmaster = liPartmaster
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Reason")
                {
                    objRequestReason.P_KEY = "L";
                    objRequestReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liRequestReason = SpareViewModel.SaveSpareRequestReasonMaster(objRequestReason);
                    var ddldata = new
                    {
                        ddlRequestReason = liRequestReason
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Shift")
                {
                    objShiftmaster.P_KEY = "L";
                    objShiftmaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liShiftmaster = MasterViewModel.SaveShiftMaster(objShiftmaster);
                    var ddldata = new
                    {
                        ddlShiftmaster = liShiftmaster,
                        ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjSpareingReturn.P_KEY == "L" && ObjSpareingReturn.dummy_col1 == "Vendor")
                {
                    objVendor.P_KEY = "L";
                    objVendor.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liVendormaster = ToolViewModel.SaveToolVendorMaster(objVendor);
                    var ddldata = new
                    {
                        ddlVendormaster = liVendormaster
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }


                //var liPartmaster = SpareViewModel.GetPartQty(objPart);


                return result;
                //return Json(ddldata, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }



        public JsonResult SaveRegrindCheck(SpareingReturn SpareingReturn)
        {
            try
            {
                SpareingReturn.P_KEY = "S";
                // SpareingReturn.Spare_Status = "RT";
                SpareingReturn.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                SpareingReturn.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                SpareingReturn.IsActive = (SpareingReturn.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liSpareingReturn = SpareViewModel.SaveSpareingRegrain(SpareingReturn);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        #endregion

        #region SpareRegrindingCheckWithParameter
        public ActionResult SpareingRegrindCheckWithParameter()
        {
            return View();
        }



        public JsonResult BindListRegrindCheckWithParameter()
        {
            try
            {



                SpareingReturn objModel = new SpareingReturn();
                objModel.P_KEY = "L";
                objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                var liSpareingReturn = SpareViewModel.SaveSpareingReturn(objModel);

                SpareingReturn objRegrain = new SpareingReturn();
                objRegrain.P_KEY = "DASHBORAD";
                objRegrain.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                var liSpareingRegrain = SpareViewModel.SaveSpareingRegrain(objRegrain);
                // return Json(objViewModel, JsonRequestBehavior.AllowGet);



                SpareingIssue objIssue = new SpareingIssue();
                objIssue.P_KEY = "G";
                objIssue.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objIssue.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                var liSpareingIssue = SpareViewModel.SaveSpareingIssue(objIssue);

                SpareLocationmaster objSpareLocation = new SpareLocationmaster();
                objSpareLocation.P_KEY = "L";
                objSpareLocation.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                var liSpareLocation = SpareViewModel.SaveSpareLocationMaster(objSpareLocation);

                SpareUpload objSpare = new SpareUpload();
                SparePartmaster objPart = new SparePartmaster();
                SpareRequestReason objRequestReason = new SpareRequestReason();
                Shiftmaster objShiftmaster = new Shiftmaster();
                LineMachinemaster objLineMachine = new LineMachinemaster();
                Linemaster objLine = new Linemaster();
                Machinemaster objMachine = new Machinemaster();
                ToolVendorMaster objVendor = new ToolVendorMaster();



                objMachine.P_KEY = "L";
                objLine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objMachine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objLine.P_KEY = "L";
                objLineMachine.P_KEY = "L";
                objLineMachine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objSpare.P_KEY = "H";
                objSpare.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objPart.P_KEY = "G";
                objPart.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objRequestReason.P_KEY = "L";
                objRequestReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objShiftmaster.P_KEY = "L";
                objShiftmaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objVendor.P_KEY = "L";
                objVendor.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();



                //var liPartmaster = SpareViewModel.GetPartQty(objPart);
                var liPartmaster = SpareViewModel.SaveSparePartmaster(objPart);
                var liSpareUpload = SpareViewModel.SaveSpareUpload(objSpare);
                var liRequestReason = SpareViewModel.SaveSpareRequestReasonMaster(objRequestReason);
                var liShiftmaster = MasterViewModel.SaveShiftMaster(objShiftmaster);
                var liLineMachine = MasterViewModel.SaveLinemachineMaster(objLineMachine);
                var liLine = MasterViewModel.SaveLineMaster(objLine);
                var liMachine = MasterViewModel.SaveMachineMaster(objMachine);
                var liVendormaster = ToolViewModel.SaveToolVendorMaster(objVendor);
                var ddldata = new
                {
                    ddlLine = liLine,
                    ddlMachine = liMachine,
                    ddlLineMachine = liLineMachine,
                    ddSpareingReturn = liSpareingReturn,
                    ddlPartmaster = liPartmaster,
                    //ddlVendormaster = liVendormaster,
                    ddlSpareLocation = liSpareLocation,
                    ddlSpareUpload = liSpareUpload,
                    ddlVendormaster = liVendormaster,
                    //ddlRequestReason = liRequestReason,
                    ddlShiftmaster = liShiftmaster,
                    ddlSpareingIssue = liSpareingIssue,
                    ddlSpareingRegrain = liSpareingRegrain,
                    ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()
                };
                JsonResult result = Json(ddldata, JsonRequestBehavior.AllowGet);
                result.MaxJsonLength = 8675309;
                return result;
                //return Json(ddldata, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        #endregion

        #region SpareQuantityReport
        public ActionResult SpareQuantityReport()
        {
            return View();
        }
        public JsonResult FetchSpareProductReport(SpareQuantityReport SpareQuantityReport)
        {


            SpareQuantityReport.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            var liToolQtyReport = SpareViewModel.GetSpareQuantityReportList(SpareQuantityReport);
            SpareQuantityReport.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            var liToolQtyAnalyReport = SpareViewModel.GetSpareQuantityAnalyticReport(SpareQuantityReport);
            var liToolCostAnalyReport = SpareViewModel.GetSpareCostAnalyticReport(SpareQuantityReport);

            var ddldata = new
            {
                ddlToolQtyReport = liToolQtyReport,
                ddlToolQtyAnalyReport = liToolQtyAnalyReport,
                ddlToolCostAnalyReport = liToolCostAnalyReport
            };
            JsonResult result = Json(ddldata, JsonRequestBehavior.AllowGet);
            result.MaxJsonLength = 8675309;
            return result;
        }


        public ActionResult GetSpareQuantityReport(SpareQuantityReport entity)
        {
            entity.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();



            DataTable dt = new DataTable();
            dt = SpareViewModel.GetSpareQuantityReport(entity);




            byte[] data = dt.ToExcel();



            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("SpareQuantityReport" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
            // var fileDetails = "";
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
            //}
            // return File(data, "application/vnd.ms-excel", "TCM_INCENTIVE_SUMMARY");




        }
        public ActionResult Download(string id, string Name)
        {
            if (TempData[id] != null)
            {
                byte[] data = TempData[id] as byte[];
                return File(data, "application/vnd.ms-excel", Name);
            }
            else
            {
                return new EmptyResult();
            }
        }
        #endregion

        #region SparePartLifeCycleReport
        public ActionResult SparePartLifeCycleReport()
        {
            return View();
        }
        public JsonResult FetchPartLifeCycleReport(SparePartLifeCycleReport PartLifeCycleReport)
        {
            PartLifeCycleReport.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            objViewModel.liSpareLifeCycleReport = SpareViewModel.GetPartLifeCycleReportList(PartLifeCycleReport);
            return Json(objViewModel, JsonRequestBehavior.AllowGet);
        }



        //public ActionResult GetPartLifeCycleReport(QuantityReport entity)
        //{
        //    entity.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();



        //    DataTable dt = new DataTable();
        //    dt = ToolViewModel.GetQuantityReport(entity);




        //    byte[] data = dt.ToExcel();



        //    string handle = Guid.NewGuid().ToString();
        //    TempData[handle] = data;
        //    string filename = ("ToolQuantityReport" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
        //    // var fileDetails = "";
        //    var fileDetails = new { ID = handle, FileName = filename };
        //    return Json(fileDetails, JsonRequestBehavior.AllowGet);
        //    //}
        //    // return File(data, "application/vnd.ms-excel", "TCM_INCENTIVE_SUMMARY");




        //}
        //public ActionResult Download(string id, string Name)
        //{
        //    if (TempData[id] != null)
        //    {
        //        byte[] data = TempData[id] as byte[];
        //        return File(data, "application/vnd.ms-excel", Name);
        //    }
        //    else
        //    {
        //        return new EmptyResult();
        //    }
        //}
        #endregion

        #region SpareBreakageReport
        public ActionResult SpareBreakageReport()
        {
            return View();
        }
        public JsonResult FetchBreakageReport(SpareBreakageReport BreakageReport)
        {
            BreakageReport.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            var liSpareBreakageReport = SpareViewModel.GetBreakageReportList(BreakageReport);
            var liSpareReturnAnalyReport = SpareViewModel.GetReturnAnalyReport(BreakageReport);
            var ddldata = new
            {

                ddlSpareBreakageReport = liSpareBreakageReport,
                ddlSpareReturnAnalyReport = liSpareReturnAnalyReport
            };
            JsonResult result = Json(ddldata, JsonRequestBehavior.AllowGet);
            result.MaxJsonLength = 8675309;
            return result;
            //return Json(objViewModel, JsonRequestBehavior.AllowGet);
        }


        public JsonResult BindReturnReason()
        {
            try
            {
                //SpareRequestReason SpareRequestReason = new SpareRequestReason();
                SpareReturnReason SpareReturnReason = new SpareReturnReason();

                SpareReturnReason.P_KEY = "L";
                SpareReturnReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                var liRequestReason = SpareViewModel.SaveSpareReturnReasonMaster(SpareReturnReason);
                var ddldata = new
                {
                    ddlRequestReason = liRequestReason
                };
                JsonResult result = Json(ddldata, JsonRequestBehavior.AllowGet);
                result = Json(ddldata, JsonRequestBehavior.AllowGet);
                result.MaxJsonLength = 8675309;
                return result;

            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public ActionResult GetBreakageReport(SpareBreakageReport entity)
        {
            entity.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();



            DataTable dt = new DataTable();
            dt = SpareViewModel.GetBreakageReport(entity);




            byte[] data = dt.ToExcel();



            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("SpareBreakageReport" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
            // var fileDetails = "";
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
            //}
            // return File(data, "application/vnd.ms-excel", "TCM_INCENTIVE_SUMMARY");




        }

        #endregion

        #region SpareStockVerification

        public ActionResult SpareStockVerification()
        {
            return View();
        }

        public JsonResult BindListPartMasterStock(SparePartmaster objModel)
        {
            try
            {
                JsonResult result = Json("", JsonRequestBehavior.AllowGet);

                //SparePartmaster objModel = new SparePartmaster();
                if (objModel.P_KEY == "Part")
                {
                    objModel.P_KEY = "H";
                    objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    objViewModel.liSparePartmaster = SpareViewModel.SaveSparePartmaster(objModel);
                    //return Json(objViewModel, JsonRequestBehavior.AllowGet);
                    result = Json(objViewModel, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                else if (objModel.P_KEY == "Search")
                {
                    objModel.P_KEY = "SearchVerification";
                    objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    objViewModel.liSparePartmaster = SpareViewModel.SaveSparePartmaster(objModel);
                    //return Json(objViewModel, JsonRequestBehavior.AllowGet);
                    result = Json(objViewModel, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                return result;
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        public JsonResult SaveStockVerification(SparePartmaster ToolVendorMaster)
        {
            try
            {
                ToolVendorMaster.P_KEY = "S";
                ToolVendorMaster.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                //PhysicianMaster.ORGID = "1";
                ToolVendorMaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                //ToolVendorMaster.IsActive = (ToolVendorMaster.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liSparePartmaster = SpareViewModel.SaveStockManagement(ToolVendorMaster);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        #endregion

        #region SpareMonthlyStockReport
        public ActionResult SpareMonthlyStockReport()
        {
            return View();
        }
        public JsonResult FetchMonthlyStockReport(SparePartmaster QuantityReport)
        {
            QuantityReport.P_KEY = "L";
            QuantityReport.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            objViewModel.liSparePartmaster = SpareViewModel.SaveStockManagement(QuantityReport);
            return Json(objViewModel, JsonRequestBehavior.AllowGet);
        }



        public ActionResult GetMonthlyStockReport(SparePartmaster entity)
        {
            entity.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            entity.P_KEY = "L";


            DataTable dt = new DataTable();
            dt = SpareViewModel.SaveStockManagementTable(entity);




            byte[] data = dt.ToExcel();



            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("MonthlyStockReport" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
            // var fileDetails = "";
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
            //}
            // return File(data, "application/vnd.ms-excel", "TCM_INCENTIVE_SUMMARY");




        }

        #endregion

        #region SpareMachineQuantityReport
        public ActionResult SpareMachineQuantityReport()
        {
            return View();
        }
        public JsonResult FetchSpareMachineQuantityReport(SpareMachineQuantityReport SpareQuantityReport)
        {


            SpareQuantityReport.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            var liToolQtyReport = SpareViewModel.GetSpareMachineQuantityReportList(SpareQuantityReport);

            Linemaster objLine = new Linemaster();

            objLine.P_KEY = "G";
            objLine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            var liLine = MasterViewModel.SaveLineMaster(objLine);

            //SpareQuantityReport.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            var liToolQtyAnalyReport = SpareViewModel.GetSpareMachineQuantityAnalyticReport(SpareQuantityReport);
            var liToolCostAnalyReport = SpareViewModel.GetSpareMachineCostAnalyticReport(SpareQuantityReport);

            var ddldata = new
            {
                ddlLine = liLine,
                ddlToolQtyReport = liToolQtyReport,
                ddlToolQtyAnalyReport = liToolQtyAnalyReport,
                ddlToolCostAnalyReport = liToolCostAnalyReport
            };
            JsonResult result = Json(ddldata, JsonRequestBehavior.AllowGet);
            result.MaxJsonLength = 8675309;
            return result;
        }

        //public JsonResult FetchProductAnalyticReport(QuantityReport QuantityReport)
        //{
        //    QuantityReport.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
        //    objViewModel.liToolQtyReport = ToolViewModel.GetQuantityAnalyticReport(QuantityReport);
        //    return Json(objViewModel, JsonRequestBehavior.AllowGet);
        //}

        public ActionResult GetSpareMachineQuantityReport(SpareMachineQuantityReport entity)
        {
            entity.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();



            DataTable dt = new DataTable();
            dt = SpareViewModel.GetSpareMachineQuantityReport(entity);




            byte[] data = dt.ToExcel();



            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("SpareQuantityReport" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
            // var fileDetails = "";
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
            //}
            // return File(data, "application/vnd.ms-excel", "TCM_INCENTIVE_SUMMARY");




        }

        #endregion

        #region SparePartMasterWithParameter

        public ActionResult SparePartMasterWithParameter()
        {
            return View();
        }
        public JsonResult BindListSparePartMasterWithParameter()
        {
            try
            {
                SparePartmaster objModel = new SparePartmaster();

                objModel.P_KEY = "Dashboard";
                objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                var liSparePartmaster = SpareViewModel.SaveSparePartmaster(objModel);

                SpareLocationmaster objSpareLocation = new SpareLocationmaster();
                objSpareLocation.P_KEY = "L";
                objSpareLocation.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                var liSpareLocation = SpareViewModel.SaveSpareLocationMaster(objSpareLocation);


                ToolVendorMaster objVendor = new ToolVendorMaster();
                objVendor.P_KEY = "L";
                objVendor.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                var liVendormaster = ToolViewModel.SaveToolVendorMaster(objVendor);
                //return Json(objViewModel, JsonRequestBehavior.AllowGet);
                var ddldata = new
                {
                    ddlSpareLocation = liSpareLocation,
                    ddlSparePartmaster = liSparePartmaster,
                    ddlVendormaster = liVendormaster


                };
                JsonResult result = Json(ddldata, JsonRequestBehavior.AllowGet);
                result.MaxJsonLength = 8675309;
                return result;
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }



        #endregion


    }
}
