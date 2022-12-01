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
    public class ToolController : BaseController
    {
        private ToolViewModel objViewModel;

        public ToolController()
        {
            objViewModel = new ToolViewModel();
        }

        #region ToolLocation

        public ActionResult ToolLocationMaster()
        {
            return View();
        }

        public JsonResult BindListToolLocation(ToolLocationmaster objModel)
        {
            try
            {
                // ToolLocationmaster objModel = new ToolLocationmaster();
                JsonResult result = Json("", JsonRequestBehavior.AllowGet);
                if (objModel.P_KEY == "Location")
                {
                    objModel.P_KEY = "GRID";
                    objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    objViewModel.liToolLocationmaster = ToolViewModel.SaveToolLocationMaster(objModel);
                    result = Json(objViewModel, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    //return Json(objViewModel, JsonRequestBehavior.AllowGet);
                    return result;
                }
                else if (objModel.P_KEY == "Search")
                {
                    objModel.P_KEY = "Search";
                    objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    objViewModel.liToolLocationmaster = ToolViewModel.SaveToolLocationMaster(objModel);
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

        public JsonResult SaveToolLocationmaster(ToolLocationmaster ToolLocationmaster)
        {
            try
            {
                ToolLocationmaster.P_KEY = "S";
                ToolLocationmaster.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                //PhysicianMaster.ORGID = "1";
                ToolLocationmaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                ToolLocationmaster.IsActive = (ToolLocationmaster.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liToolLocationmaster = ToolViewModel.SaveToolLocationMaster(ToolLocationmaster);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public ActionResult GetexcelToolLocation(ToolLocationmaster objLocationmst)
        {
            objLocationmst.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            objLocationmst.KEY = "L";
            DataTable dt = new DataTable();
            dt = ToolViewModel.GetexcelToolLocation(objLocationmst);
            byte[] data = dt.ToExcel();
            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("ToolLocationmaster_List" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
        }


        #endregion

        #region PartGroupMaster

        public ActionResult PartGroupMaster()
        {
            return View();
        }

        public JsonResult BindListPartgroupMst(PartGroupmaster objModel)
        {
            try
            {
                // ToolLocationmaster objModel = new ToolLocationmaster();
                JsonResult result = Json("", JsonRequestBehavior.AllowGet);
                if (objModel.P_KEY == "Location")
                {
                    objModel.P_KEY = "GRID";
                    objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    objViewModel.liPartGroupmaster = ToolViewModel.SavePartgroupMaster(objModel);
                    result = Json(objViewModel, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    //return Json(objViewModel, JsonRequestBehavior.AllowGet);
                    return result;
                }
                else if (objModel.P_KEY == "Search")
                {
                    objModel.P_KEY = "Search";
                    objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    objViewModel.liPartGroupmaster = ToolViewModel.SavePartgroupMaster(objModel);
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

        public JsonResult SavePartgroupMaster(PartGroupmaster PartGroupmaster)
        {
            try
            {
                PartGroupmaster.P_KEY = "S";
                PartGroupmaster.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                //PhysicianMaster.ORGID = "1";
                PartGroupmaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                PartGroupmaster.IsActive = (PartGroupmaster.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liPartGroupmaster = ToolViewModel.SavePartgroupMaster(PartGroupmaster);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public ActionResult GetexcelPartgroupMaster(PartGroupmaster objLocationmst)
        {
            objLocationmst.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            objLocationmst.KEY = "L";
            DataTable dt = new DataTable();
            dt = ToolViewModel.GetexcelPartgroupMaster(objLocationmst);
            byte[] data = dt.ToExcel();
            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("PartGroupMst_List" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
        }

        #endregion
        #region ToolVendorMaster

        public ActionResult ToolVendorMaster()
        {
            return View();
        }
        public JsonResult BindListToolVendor(ToolVendorMaster objVendor)
        {
            try
            {
                JsonResult result = Json("", JsonRequestBehavior.AllowGet);
                if (objVendor.P_KEY == "Vendor")
                {
                    objVendor.P_KEY = "GRID";
                    objVendor.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    objViewModel.liToolVendorMaster = ToolViewModel.SaveToolVendorMaster(objVendor);
                    result = Json(objViewModel, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    //return Json(objViewModel, JsonRequestBehavior.AllowGet);
                    return result;
                }
                else if (objVendor.P_KEY == "Search")
                {
                    objVendor.P_KEY = "Search";
                    objVendor.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    objViewModel.liToolVendorMaster = ToolViewModel.SaveToolVendorMaster(objVendor);
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


        public JsonResult BindCity(ToolVendorMaster obj)
        {
            objViewModel.liCityMaster = ToolViewModel.ListCity(obj);
            return Json(objViewModel, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveToolVendormaster(ToolVendorMaster ToolVendorMaster)
        {
            try
            {
                ToolVendorMaster.P_KEY = "S";
                ToolVendorMaster.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                //PhysicianMaster.ORGID = "1";
                ToolVendorMaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                ToolVendorMaster.IsActive = (ToolVendorMaster.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liToolVendorMaster = ToolViewModel.SaveToolVendorMaster(ToolVendorMaster);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public ActionResult GetexcelVendorMaster(ToolVendorMaster objToolingRequest)
        {
            objToolingRequest.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            objToolingRequest.KEY = "L";
            DataTable dt = new DataTable();
            dt = ToolViewModel.GetexcelVendorMaster(objToolingRequest);
            byte[] data = dt.ToExcel();
            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("Vendormaster_List" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
        }


        #endregion
        #region Dashboard

        public ActionResult ToolDashboard()
        {
            return View();
        }
        public JsonResult GetDashboard()
        {
            Dashboard objModel = new Dashboard();

            objModel.P_KEY = "G";
            objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            var liToolPartmaster = ToolViewModel.GetDashboard(objModel);
            var ddldata = new
            {
                ddlDashboard = liToolPartmaster


            };
            JsonResult result = Json(ddldata, JsonRequestBehavior.AllowGet);
            result.MaxJsonLength = 8675309;
            return result;
        }
        #endregion




        #region PartMaster

        public ActionResult PartMaster()
        {
            return View();
        }
        public JsonResult BindListPartMaster(Partmaster ObjPartmaster)
        {
            try
            {
                JsonResult result = Json("", JsonRequestBehavior.AllowGet);
                Partmaster objModel = new Partmaster();
                ToolLocationmaster objToolLocation = new ToolLocationmaster();
                ToolVendorMaster objVendor = new ToolVendorMaster();
                PartGroupmaster objPartGroupmaster = new PartGroupmaster();


                if (ObjPartmaster.P_KEY == "ProductGroup")
                {
                    objPartGroupmaster.P_KEY = "L";
                    objPartGroupmaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolPartGroup = ToolViewModel.SavePartgroupMaster(objPartGroupmaster);
                    var ddldata = new
                    {
                        ddlToolPartGroup = liToolPartGroup,
                        ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjPartmaster.P_KEY == "Part")
                {
                    ObjPartmaster.P_KEY = "GRID";
                    ObjPartmaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolPartmaster = ToolViewModel.SavePartmaster(ObjPartmaster);
                    var ddldata = new
                    {
                        ddlToolPartmaster = liToolPartmaster,
                        ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjPartmaster.P_KEY == "Search")
                {
                    ObjPartmaster.P_KEY = "Search";
                    ObjPartmaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolPartmaster = ToolViewModel.SavePartmaster(ObjPartmaster);
                    var ddldata = new
                    {
                        ddlToolPartmaster = liToolPartmaster,
                        ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()

                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjPartmaster.P_KEY == "Location")
                {
                    objToolLocation.P_KEY = "L";
                    objToolLocation.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolLocation = ToolViewModel.SaveToolLocationMaster(objToolLocation);
                    var ddldata = new
                    {
                        ddlToolLocation = liToolLocation
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjPartmaster.P_KEY == "Vendor")
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


        public JsonResult SavePartMaster(Partmaster ToolVendorMaster)
        {
            try
            {
                ToolVendorMaster.P_KEY = "S";
                ToolVendorMaster.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                //PhysicianMaster.ORGID = "1";
                ToolVendorMaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                ToolVendorMaster.IsActive = (ToolVendorMaster.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liPartmaster = ToolViewModel.SavePartmaster(ToolVendorMaster);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public ActionResult GetExcelPartData(Partmaster objPartmaster)
        {
            objPartmaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            DataTable dt = new DataTable();
            dt = ToolViewModel.SavePartmasterTable(objPartmaster);
            byte[] data = dt.ToExcel();
            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("PartDetails" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
        }


        #endregion

        #region ToolUpdate

        public ActionResult MasterToolUpdate()
        {
            return View();
        }
        public JsonResult BindListToolUpdate()
        {
            try
            {
                ToolUpdate objToolUpdate = new ToolUpdate();
                ToolUpload objToolUpload = new ToolUpload();
                ToolLocationmaster objToolLocation = new ToolLocationmaster();
                //ToolVendorMaster objVendor = new ToolVendorMaster();
                objToolUpdate.P_KEY = "L";
                objToolUpdate.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objToolUpload.P_KEY = "L";
                objToolUpload.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objToolLocation.P_KEY = "L";
                objToolLocation.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                var liToolLocation = ToolViewModel.SaveToolLocationMaster(objToolLocation);
                var liToolUpload = ToolViewModel.SaveToolUpload(objToolUpload);
                var liToolUpdate = ToolViewModel.SaveToolUpdate(objToolUpdate);

                var ddldata = new
                {
                    ddlToolLocation = liToolLocation,
                    ddlToolUpload = liToolUpload,
                    ddlToolUpdate = liToolUpdate
                };
                return Json(ddldata, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        public JsonResult SaveToolUpdate(ToolUpdate ToolUpdate)
        {
            try
            {
                ToolUpdate.P_KEY = "S";
                ToolUpdate.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                //PhysicianMaster.ORGID = "1";
                ToolUpdate.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                ToolUpdate.IsActive = (ToolUpdate.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liToolUpdate = ToolViewModel.SaveToolUpdate(ToolUpdate);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        #endregion
        //toolupload changed as spare
        #region ToolUpload

        public ActionResult MasterToolUpload()
        {
            return View();
        }
        public ActionResult GetExcelToolPartUploadData(ToolUpload objToolUpload)
        {
            objToolUpload.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            DataTable dt = new DataTable();
            dt = ToolViewModel.GetExcelToolPartUploadData(objToolUpload);
            byte[] data = dt.ToExcel();
            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("Tool_Part_Upload_List" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult BindListToolUpload(ToolUpload objToolUpload)
        {
            try
            {
                JsonResult result = Json("", JsonRequestBehavior.AllowGet);
                ToolUpload objTool = new ToolUpload();
                //ToolUpload objToolUpload = new ToolUpload();
                Partmaster objPart = new Partmaster();
                ToolLocationmaster objToolLocation = new ToolLocationmaster();
                ToolVendorMaster objVendor = new ToolVendorMaster();
                PartGroupmaster objPartGroupmaster = new PartGroupmaster();

                if (objToolUpload.P_KEY == "CL" && objToolUpload.dummycolumn1 == "Inward")
                {
                    objToolUpload.P_KEY = "CL"; //"CL";
                    objToolUpload.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolUpload = ToolViewModel.SaveToolUpload(objToolUpload);
                    liToolUpload[0].OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();

                    var ddldata = new
                    {
                        ddlToolUpload = liToolUpload
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objToolUpload.P_KEY == "Search")
                {

                    objToolUpload.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolUpload = ToolViewModel.SaveToolUpload(objToolUpload);
                    var ddldata = new
                    {
                        ddlToolUpload = liToolUpload
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objToolUpload.P_KEY == "L" && objToolUpload.dummycolumn1 == "Inward")
                {
                    objTool.P_KEY = "L"; //"L";
                    objTool.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolUpload = ToolViewModel.SaveToolUpload(objTool);
                    var ddldata = new
                    {
                        ddlToolUploadList = liToolUpload
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objToolUpload.P_KEY == "L" && objToolUpload.dummycolumn1 == "Part")
                {
                    objPart.P_KEY = "L"; //"L";
                    objPart.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liPartmaster = ToolViewModel.SavePartmaster(objPart);
                    var ddldata = new
                    {
                        ddlPartmaster = liPartmaster
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objToolUpload.P_KEY == "L" && objToolUpload.dummycolumn1 == "Location")
                {
                    objToolLocation.P_KEY = "L";
                    objToolLocation.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolLocation = ToolViewModel.SaveToolLocationMaster(objToolLocation);
                    var ddldata = new
                    {
                        ddlToolLocation = liToolLocation
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objToolUpload.P_KEY == "L" && objToolUpload.dummycolumn1 == "Vendor")
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
                if (objToolUpload.P_KEY == "L" && objToolUpload.dummycolumn1 == "ProductGroup")
                {
                    objPartGroupmaster.P_KEY = "L";
                    objPartGroupmaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolPartGroup = ToolViewModel.SavePartgroupMaster(objPartGroupmaster);
                    var ddldata = new
                    {
                        ddlToolPartGroup = liToolPartGroup,
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
        public JsonResult SaveToolUpload(ToolUpload ToolUpload)
        {
            try
            {
                if (String.IsNullOrEmpty(ToolUpload.P_KEY))
                {
                    ToolUpload.P_KEY = "S";

                }
                if (ToolUpload.P_KEY == "S")//ToolUpload.ToolUniqueCode != null)
                {
                    if (ToolUpload.ToolUniqueCode != null)
                    {
                        string[] values = ToolUpload.ToolUniqueCode.Split(',');
                        string isactive = ToolUpload.IsActive;
                        int cnt = values.Length;
                        int i = 1;
                        foreach (string strunicode in values)
                        {
                            if (i == cnt)
                            {
                                ToolUpload.IsInsertEnd = "Y";
                            }
                            ToolUpload.ToolUniqueCode = strunicode;
                            //ToolUpload.P_KEY = "S";
                            ToolUpload.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                            //PhysicianMaster.ORGID = "1";
                            ToolUpload.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                            ToolUpload.IsActive = (isactive == Common.ActiveLog.Active) ? "Y" : "N";
                            objViewModel.liToolUpload = ToolViewModel.SaveToolUpload(ToolUpload);
                            i = i + 1;
                        }
                    }
                    else
                    {
                        ToolUpload.IsInsertEnd = "Y";
                        //ToolUpload.P_KEY = "S";
                        ToolUpload.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                        //PhysicianMaster.ORGID = "1";
                        ToolUpload.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                        ToolUpload.IsActive = (ToolUpload.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                        objViewModel.liToolUpload = ToolViewModel.SaveToolUpload(ToolUpload);
                    }
                }
                else
                {
                    //ToolUpload.P_KEY = "S";
                    ToolUpload.IsInsertEnd = "Y";
                    ToolUpload.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                    //PhysicianMaster.ORGID = "1";
                    ToolUpload.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    ToolUpload.IsActive = (ToolUpload.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                    objViewModel.liToolUpload = ToolViewModel.SaveToolUpload(ToolUpload);
                }
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public JsonResult GetInwardDetails(ToolUpload ToolUpload)
        {
            try
            {
                ToolUpload.P_KEY = "INW_DTL";
                ToolUpload.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                //PhysicianMaster.ORGID = "1";
                ToolUpload.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                ToolUpload.IsActive = (ToolUpload.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liToolUpload = ToolViewModel.SaveToolUpload(ToolUpload);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }


        #endregion

        #region ToolRequestReason
        public ActionResult ToolRequestReason()
        {
            return View();
        }

        public JsonResult BindListToolRequest()
        {
            try
            {
                ToolRequestReason objModel = new ToolRequestReason();
                objModel.P_KEY = "L";
                objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objViewModel.liToolRequestReason = ToolViewModel.SaveToolRequestReasonMaster(objModel);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public JsonResult SaveToolRequestmaster(ToolRequestReason ToolRequestReason)
        {
            try
            {
                ToolRequestReason.P_KEY = "S";
                ToolRequestReason.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                ToolRequestReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                ToolRequestReason.IsActive = (ToolRequestReason.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liToolRequestReason = ToolViewModel.SaveToolRequestReasonMaster(ToolRequestReason);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public ActionResult GetExcelToolRequestResonData(ToolRequestReason objToolRequestReason)
        {
            objToolRequestReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            DataTable dt = new DataTable();
            dt = ToolViewModel.GetExcelToolRequestResonData(objToolRequestReason);
            byte[] data = dt.ToExcel();
            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("Tool_Request_Reason" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region ToolReturnReason
        public ActionResult ToolReturnReason()
        {
            return View();
        }

        public JsonResult BindListToolReturn()
        {
            try
            {
                ToolReturnReason objModel = new ToolReturnReason();
                objModel.P_KEY = "L";
                objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objViewModel.liToolReturnReason = ToolViewModel.SaveToolReturnReasonMaster(objModel);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public JsonResult SavetoolReturnmaster(ToolReturnReason ToolReturnReason)
        {
            try
            {
                ToolReturnReason.P_KEY = "S";
                ToolReturnReason.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                ToolReturnReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                ToolReturnReason.IsActive = (ToolReturnReason.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liToolReturnReason = ToolViewModel.SaveToolReturnReasonMaster(ToolReturnReason);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public ActionResult GetExcelToolReturnResonData(ToolReturnReason objToolRequestReason)
        {
            objToolRequestReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            DataTable dt = new DataTable();
            dt = ToolViewModel.GetExcelToolReturnResonData(objToolRequestReason);
            byte[] data = dt.ToExcel();
            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("Tool_Return_Reason" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region ToolRequest
        public ActionResult ToolingRequest()
        {
            return View();
        }
        public JsonResult BindListToolingRequest(ToolingRequest objToolingRequest)
        {
            try
            {
                JsonResult result = Json("", JsonRequestBehavior.AllowGet);
                ToolUpload objTool = new ToolUpload();
                Partmaster objPart = new Partmaster();
                ToolRequestReason objRequestReason = new ToolRequestReason();
                Shiftmaster objShiftmaster = new Shiftmaster();
                LineMachinemaster objLineMachine = new LineMachinemaster();
                Linemaster objLine = new Linemaster();
                Machinemaster objMachine = new Machinemaster();
                ToolingReturn objRegrain = new ToolingReturn();
                EmployeeMaster objEmpMaster = new EmployeeMaster();
                PartGroupmaster objPartGroupmaster = new PartGroupmaster();


                if (objToolingRequest.P_KEY == "L" && objToolingRequest.dummy_col1 == "Request")
                {
                    objToolingRequest.P_KEY = "GRID";//"L"
                    objToolingRequest.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolingRequest = ToolViewModel.SaveToolingRequest(objToolingRequest);
                    var ddldata = new
                    {
                        ddToolingRequest = liToolingRequest,
                        ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }

                if (objToolingRequest.P_KEY == "L" && objToolingRequest.dummy_col1 == "MachineMaster")
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
                if (objToolingRequest.P_KEY == "L" && objToolingRequest.dummy_col1 == "LineMaster")
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

                if (objToolingRequest.P_KEY == "L" && objToolingRequest.dummy_col1 == "LineMachine")
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

                if (objToolingRequest.P_KEY == "L" && objToolingRequest.dummy_col1 == "Upload")
                {
                    objTool.P_KEY = "L";
                    objTool.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolUpload = ToolViewModel.SaveToolUpload(objTool);
                    var ddldata = new
                    {
                        ddlToolUpload = liToolUpload,
                        ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objToolingRequest.P_KEY == "G" && objToolingRequest.dummy_col1 == "Part")
                {
                    objPart.P_KEY = "G";// changed for don't show 'S' Part
                                        //objPart.P_KEY = "L";
                    objPart.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liPartmaster = ToolViewModel.SavePartmaster(objPart);
                    var ddldata = new
                    {
                        ddlPartmaster = liPartmaster,
                        ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objToolingRequest.P_KEY == "L" && objToolingRequest.dummy_col1 == "RequestReason")
                {
                    objRequestReason.P_KEY = "L";
                    objRequestReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liRequestReason = ToolViewModel.SaveToolRequestReasonMaster(objRequestReason);
                    var ddldata = new
                    {
                        ddlRequestReason = liRequestReason,
                        ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }

                if (objToolingRequest.P_KEY == "L" && objToolingRequest.dummy_col1 == "ShiftMaster")
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
                if (objToolingRequest.P_KEY == "L" && objToolingRequest.dummy_col1 == "Regrain")
                {
                    objRegrain.P_KEY = "L";
                    objRegrain.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolingRegrain = ToolViewModel.SaveToolingRegrain(objRegrain);
                    var ddldata = new
                    {
                        ddlToolingRegrain = liToolingRegrain,
                        ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objToolingRequest.P_KEY == "L" && objToolingRequest.dummy_col1 == "Employee")
                {

                    objEmpMaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liEmployeeMaster = ToolViewModel.GetEmployeeMasterList(objEmpMaster);
                    var ddldata = new
                    {
                        ddlEmployeeMaster = liEmployeeMaster,
                        ddlOrgId = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString()
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objToolingRequest.P_KEY == "L" && objToolingRequest.dummy_col1 == "ProductGroup")
                {
                    objPartGroupmaster.P_KEY = "L";
                    objPartGroupmaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolPartGroup = ToolViewModel.SavePartgroupMaster(objPartGroupmaster);
                    var ddldata = new
                    {
                        ddlToolPartGroup = liToolPartGroup,
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

        public JsonResult SaveToolingRequest(ToolingRequest ToolReturnReason)
        {
            try
            {
                ToolReturnReason.P_KEY = "S";
                ToolReturnReason.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                ToolReturnReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                ToolReturnReason.IsActive = (ToolReturnReason.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liToolingRequest = ToolViewModel.SaveToolingRequest(ToolReturnReason);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public JsonResult GetLineDetailsReturn(ToolingRequest Linemachinemaster)
        {
            try
            {
                //Linemaster objLine = new Linemaster();
                // Machinemaster objMachine = new Machinemaster();
                ToolingRequest objLineMachine = new ToolingRequest();

                Linemachinemaster.P_KEY = "G";
                Linemachinemaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();

                var liLineMachine = ToolViewModel.SaveLinemachineMaster(Linemachinemaster);

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

        public JsonResult GetLineDetails(ToolingReturn Linemachinemaster)
        {
            try
            {
                //Linemaster objLine = new Linemaster();
                // Machinemaster objMachine = new Machinemaster();
                ToolingRequest objLineMachine = new ToolingRequest();

                Linemachinemaster.P_KEY = "G";
                Linemachinemaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();

                var liLineMachine = ToolViewModel.SaveLinemachineMaster(Linemachinemaster);

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

        public ActionResult GetExcelToolPartRequestData(ToolingRequest objToolingRequest)
        {
            objToolingRequest.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            DataTable dt = new DataTable();
            dt = ToolViewModel.GetExcelToolPartRequestData(objToolingRequest);
            byte[] data = dt.ToExcel();
            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("Tool_Part_Request_List" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region ToolIssue
        public ActionResult ToolingIssue()
        {
            return View();
        }
        public JsonResult BindListToolingIssue(ToolingIssue objToolingIssue)
        {
            try
            {
                JsonResult result = Json("", JsonRequestBehavior.AllowGet);

                if (objToolingIssue.P_KEY == "G" && objToolingIssue.dummy_col1 == "Request")
                {
                    ToolingRequest objModel = new ToolingRequest();
                    objModel.P_KEY = "G";
                    objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolingRequest = ToolViewModel.SaveToolingRequest(objModel);

                    var ddldata = new
                    {
                        ddToolingRequest = liToolingRequest
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;

                }
                if (objToolingIssue.P_KEY == "L" && objToolingIssue.dummy_col1 == "Issue")
                {
                    ToolingIssue objIssue = new ToolingIssue();
                    objIssue.P_KEY = "L";
                    objIssue.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolingIssue = ToolViewModel.SaveToolingIssue(objIssue);
                    var ddldata = new
                    {
                        ddlToolingIssue = liToolingIssue
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objToolingIssue.P_KEY == "G" && objToolingIssue.dummy_col1 == "Regrain")
                {
                    ToolingReturn objRegrain = new ToolingReturn();
                    objRegrain.P_KEY = "G";
                    objRegrain.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolingRegrain = ToolViewModel.SaveToolingRegrain(objRegrain);//FUTURE
                    var ddldata = new
                    {
                        ddlToolingRegrain = liToolingRegrain
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objToolingIssue.P_KEY == "G" && objToolingIssue.dummy_col1 == "Upload")
                {
                    ToolUpload objTool = new ToolUpload();
                    objTool.P_KEY = "G";
                    objTool.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolUpload = ToolViewModel.SaveToolUpload(objTool);
                    var ddldata = new
                    {
                        ddlToolUpload = liToolUpload
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objToolingIssue.P_KEY == "L" && objToolingIssue.dummy_col1 == "Upload")
                {
                    ToolUpload objToolUpload = new ToolUpload();
                    objToolUpload.P_KEY = "L";
                    objToolUpload.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolUploadList = ToolViewModel.SaveToolUpload(objToolUpload);
                    var ddldata = new
                    {
                        ddlToolUploadList = liToolUploadList
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objToolingIssue.P_KEY == "G" && objToolingIssue.dummy_col1 == "Part")
                {
                    Partmaster objPart = new Partmaster();
                    objPart.P_KEY = "G";
                    objPart.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liPartmaster = ToolViewModel.SavePartmaster(objPart);
                    var ddldata = new
                    {
                        ddlPartmaster = liPartmaster
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objToolingIssue.P_KEY == "L" && objToolingIssue.dummy_col1 == "Vendor")
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
                if (objToolingIssue.P_KEY == "L" && objToolingIssue.dummy_col1 == "Machine")
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
                if (objToolingIssue.P_KEY == "L" && objToolingIssue.dummy_col1 == "Scrab")
                {
                    ToolScrab objToolScrab = new ToolScrab();
                    objToolScrab.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liScrab = ToolViewModel.GetScrabList(objToolScrab);
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

        public JsonResult SaveToolingIssue(ToolingIssue ToolingIssue)
        {
            try
            {
                ToolingIssue.P_KEY = "S";
                ToolingIssue.ToolIsu_VendorCode = string.Join(",", ToolingIssue.ToolIsu_VendorCode_list);
                ToolingIssue.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                ToolingIssue.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                ToolingIssue.IsActive = (ToolingIssue.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                ToolingIssue.@IsInsertBegin = "Y";

                if (ToolingIssue.Tooltype == "Y")
                {
                    if (ToolingIssue.Tool_Status == "I")
                    {
                        string[] Unicode = ToolingIssue.ToolIsu_CurUnicode.Split(',').Select(sValue => sValue.Trim()).ToArray();
                        int cnt = Unicode.Length;
                        int i = 1;
                        foreach (string a in Unicode)
                        {
                            if (i == cnt)
                            {
                                ToolingIssue.IsInsertEnd = "Y";
                            }
                            if (i > 1)
                            {
                                ToolingIssue.@IsInsertBegin = "N";
                            }
                            ToolingIssue.ToolIsu_CurUnicode = a;
                            ToolingIssue.ToolIsu_Qty = "1";
                            objViewModel.liToolingIssue = ToolViewModel.SaveToolingIssue(ToolingIssue);
                            i = i + 1;
                        }
                    }
                    else
                    {
                        ToolingIssue.IsInsertEnd = "Y";
                        objViewModel.liToolingIssue = ToolViewModel.SaveToolingIssue(ToolingIssue);
                    }
                }
                else
                {
                    ToolingIssue.IsInsertEnd = "Y";
                    objViewModel.liToolingIssue = ToolViewModel.SaveToolingIssue(ToolingIssue);
                }
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public ActionResult GetExcelToolPartIssueData(ToolingIssue objToolingIssue)
        {
            objToolingIssue.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            DataTable dt = new DataTable();
            dt = ToolViewModel.GetExcelToolPartIssueData(objToolingIssue);
            byte[] data = dt.ToExcel();
            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("Tool_Part_Issue_List" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region ToolReturn
        public ActionResult ToolingReturn()
        {
            return View();
        }
        public JsonResult BindListToolingReturn(ToolingReturn ObjToolingReturn)
        {
            try
            {
                JsonResult result = Json("", JsonRequestBehavior.AllowGet);

                ToolingReturn objModel = new ToolingReturn();
                ToolingIssue objIssue = new ToolingIssue();
                ToolUpload objTool = new ToolUpload();
                Partmaster objPart = new Partmaster();
                ToolReturnReason objToolReturnReason = new ToolReturnReason();
                Shiftmaster objShiftmaster = new Shiftmaster();
                LineMachinemaster objLineMachine = new LineMachinemaster();
                Linemaster objLine = new Linemaster();
                Machinemaster objMachine = new Machinemaster();
                EmployeeMaster objEmpMaster = new EmployeeMaster();
                PartGroupmaster objPartGroupmaster = new PartGroupmaster();


                if (ObjToolingReturn.P_KEY == "L" && ObjToolingReturn.dummy_col1 == "Return")
                {
                    objModel.P_KEY = "L";
                    objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolingReturn = ToolViewModel.SaveToolingReturn(objModel);

                    var ddldata = new
                    {
                        ddToolingReturn = liToolingReturn
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjToolingReturn.P_KEY == "L" && ObjToolingReturn.dummy_col1 == "Issue")
                {
                    objIssue.P_KEY = "L";
                    objIssue.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    objIssue.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                    var liToolingIssue = ToolViewModel.SaveToolingIssue(objIssue);
                    var ddldata = new
                    {
                        ddlToolingIssue = liToolingIssue
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjToolingReturn.P_KEY == "L" && ObjToolingReturn.dummy_col1 == "Regrain")
                {
                    objIssue.P_KEY = "Regrain";
                    objIssue.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    objIssue.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                    var liToolingIssue = ToolViewModel.SaveToolingIssue(objIssue);
                    var ddldata = new
                    {
                        ddlToolingIssue = liToolingIssue
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }

                if (ObjToolingReturn.P_KEY == "L" && ObjToolingReturn.dummy_col1 == "Employee")
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

                if (ObjToolingReturn.P_KEY == "L" && ObjToolingReturn.dummy_col1 == "Machine")
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
                if (ObjToolingReturn.P_KEY == "L" && ObjToolingReturn.dummy_col1 == "Line")
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
                if (ObjToolingReturn.P_KEY == "L" && ObjToolingReturn.dummy_col1 == "LineMachine")
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



                if (ObjToolingReturn.P_KEY == "L" && ObjToolingReturn.dummy_col1 == "Part")
                {
                    objPart.P_KEY = "G";
                    objPart.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liPartmaster = ToolViewModel.SavePartmaster(objPart);
                    var ddldata = new
                    {
                        ddlPartmaster = liPartmaster
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjToolingReturn.P_KEY == "L" && ObjToolingReturn.dummy_col1 == "Reason")
                {
                    objToolReturnReason.P_KEY = "L";
                    objToolReturnReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liReturnReason = ToolViewModel.SaveToolReturnReasonMaster(objToolReturnReason);
                    var ddldata = new
                    {
                        ddlReturnReason = liReturnReason
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (ObjToolingReturn.P_KEY == "L" && ObjToolingReturn.dummy_col1 == "Shift")
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

                if (ObjToolingReturn.P_KEY == "L" && ObjToolingReturn.dummy_col1 == "ProductGroup")
                {
                    objPartGroupmaster.P_KEY = "L";
                    objPartGroupmaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolPartGroup = ToolViewModel.SavePartgroupMaster(objPartGroupmaster);
                    var ddldata = new
                    {
                        ddlToolPartGroup = liToolPartGroup,
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

        public JsonResult SaveToolingReturn(ToolingReturn ToolingReturn)
        {
            try
            {
                ToolingReturn.P_KEY = "S";
                ToolingReturn.Tool_Status = "RT";
                ToolingReturn.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                ToolingReturn.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                ToolingReturn.IsActive = (ToolingReturn.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liToolingReturn = ToolViewModel.SaveToolingReturn(ToolingReturn);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public ActionResult GetExcelToolPartReturnData(ToolingReturn objToolingReturn)
        {
            objToolingReturn.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            DataTable dt = new DataTable();
            dt = ToolViewModel.GetExcelToolPartReturnData(objToolingReturn);
            byte[] data = dt.ToExcel();
            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = "";
            if (objToolingReturn.P_KEY == "EXCEL")
            { filename = ("Tool_Part_Return_List" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " "); }
            else if (objToolingReturn.P_KEY == "EXCEL_RC")
            { filename = ("Tool_Part_Return_Check_List" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " "); }
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
        }


        #endregion

        #region ToolingReturnCheck
        public ActionResult ToolingReturnCheck()
        {
            return View();
        }

        #endregion

        #region ToolRegrinding
        public ActionResult ToolingRegrinding()
        {
            return View();
        }

        public JsonResult BindListRegrinding(ToolingReturn ObjToolingReturn)
        {
            try
            {
                JsonResult result = Json("", JsonRequestBehavior.AllowGet);


                ToolingReturn objModel = new ToolingReturn();
                ToolingIssue objIssue = new ToolingIssue();
                ToolUpload objTool = new ToolUpload();
                Partmaster objPart = new Partmaster();
                ToolRequestReason objRequestReason = new ToolRequestReason();
                Shiftmaster objShiftmaster = new Shiftmaster();
                LineMachinemaster objLineMachine = new LineMachinemaster();
                Linemaster objLine = new Linemaster();
                Machinemaster objMachine = new Machinemaster();
                ToolVendorMaster objVendor = new ToolVendorMaster();


                if (ObjToolingReturn.P_KEY == "L" && ObjToolingReturn.dummy_col1 == "Return")
                {
                    objModel.P_KEY = "G";
                    objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolingReturn = ToolViewModel.SaveToolingReturn(objModel);

                    var ddldata = new
                    {
                        ddToolingReturn = liToolingReturn
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }

                if (ObjToolingReturn.P_KEY == "L" && ObjToolingReturn.dummy_col1 == "Issue")
                {
                    objIssue.P_KEY = "G";
                    objIssue.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    objIssue.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                    var liToolingIssue = ToolViewModel.SaveToolingIssue(objIssue);
                    var ddldata = new
                    {
                        ddlToolingIssue = liToolingIssue
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }

                if (ObjToolingReturn.P_KEY == "L" && ObjToolingReturn.dummy_col1 == "Machine")
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

                if (ObjToolingReturn.P_KEY == "L" && ObjToolingReturn.dummy_col1 == "Line")
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
                if (ObjToolingReturn.P_KEY == "L" && ObjToolingReturn.dummy_col1 == "LineMachine")
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

                if (ObjToolingReturn.P_KEY == "L" && ObjToolingReturn.dummy_col1 == "Upload")
                {
                    objTool.P_KEY = "H";
                    objTool.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolUpload = ToolViewModel.SaveToolUpload(objTool);
                    var ddldata = new
                    {
                        ddlToolUpload = liToolUpload
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }

                if (ObjToolingReturn.P_KEY == "L" && ObjToolingReturn.dummy_col1 == "Part")
                {
                    objPart.P_KEY = "G";
                    objPart.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liPartmaster = ToolViewModel.SavePartmaster(objPart);
                    var ddldata = new
                    {
                        ddlPartmaster = liPartmaster
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }

                if (ObjToolingReturn.P_KEY == "L" && ObjToolingReturn.dummy_col1 == "Reason")
                {
                    objRequestReason.P_KEY = "L";
                    objRequestReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liRequestReason = ToolViewModel.SaveToolRequestReasonMaster(objRequestReason);
                    var ddldata = new
                    {
                        ddlRequestReason = liRequestReason
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }



                if (ObjToolingReturn.P_KEY == "L" && ObjToolingReturn.dummy_col1 == "Shift")
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
                if (ObjToolingReturn.P_KEY == "L" && ObjToolingReturn.dummy_col1 == "Vendor")
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

        public JsonResult SaveRegrinding(ToolingReturn ToolingReturn)
        {
            try
            {
                ToolingReturn.P_KEY = "S";
                ToolingReturn.Tool_Status = "RT";
                ToolingReturn.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                ToolingReturn.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                ToolingReturn.IsActive = (ToolingReturn.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liToolingReturn = ToolViewModel.SaveToolingRegrain(ToolingReturn);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public ActionResult GetExcelToolPartRegrindingData(ToolingReturn objToolingReturn)
        {
            objToolingReturn.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            DataTable dt = new DataTable();
            dt = ToolViewModel.GetExcelToolPartRegrindingData(objToolingReturn);
            byte[] data = dt.ToExcel();
            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = "";
            if (objToolingReturn.P_KEY == "EXCEL")
            { filename = ("Tool_Part_Regrinding_List" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " "); }
            else if (objToolingReturn.P_KEY == "EXCEL_RC")
            { filename = ("Tool_Part_Regrinding_Check_List" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " "); }
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region ToolRegrindingWithParameter

        public ActionResult ToolingRegrindingWithParameter(string SRNo)
        {
            ViewBag.SRNo = SRNo;
            return View();
        }
        public JsonResult BindListRegrindingWithParameter(List<string> SRNo)
        {
            try
            {

                ToolingReturn objModel = new ToolingReturn();
                objModel.P_KEY = "WITH_PARA";
                objModel.ToolRts_Return_no = SRNo[0].ToString();
                objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objModel.ToolRts_id = "-1";
                var liToolingReturn = ToolViewModel.SaveToolingReturn(objModel);
                // return Json(objViewModel, JsonRequestBehavior.AllowGet);

                ToolingIssue objIssue = new ToolingIssue();
                objIssue.P_KEY = "G";
                objIssue.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objIssue.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                var liToolingIssue = ToolViewModel.SaveToolingIssue(objIssue);

                ToolUpload objTool = new ToolUpload();
                Partmaster objPart = new Partmaster();
                ToolRequestReason objRequestReason = new ToolRequestReason();
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
                objTool.P_KEY = "H";
                objTool.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objPart.P_KEY = "G";
                objPart.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objRequestReason.P_KEY = "L";
                objRequestReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objShiftmaster.P_KEY = "L";
                objShiftmaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objVendor.P_KEY = "L";
                objVendor.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();

                //var liPartmaster = ToolViewModel.GetPartQty(objPart);
                var liPartmaster = ToolViewModel.SavePartmaster(objPart);
                var liToolUpload = ToolViewModel.SaveToolUpload(objTool);
                var liRequestReason = ToolViewModel.SaveToolRequestReasonMaster(objRequestReason);
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
                    ddToolingReturn = liToolingReturn,
                    ddlPartmaster = liPartmaster,
                    //ddlVendormaster = liVendormaster,
                    ddlToolUpload = liToolUpload,
                    ddlVendormaster = liVendormaster,
                    //ddlRequestReason = liRequestReason,
                    ddlShiftmaster = liShiftmaster,
                    ddlToolingIssue = liToolingIssue,
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

        #region ToolRegrindingCheck
        public ActionResult ToolingRegrindCheck()
        {
            return View();
        }
        public JsonResult BindListRegrindCheck(ToolingReturn objToolingReturn)
        {
            try
            {
                JsonResult result = Json("", JsonRequestBehavior.AllowGet);

                ToolingReturn objModel = new ToolingReturn();
                ToolingReturn objRegrain = new ToolingReturn();
                ToolingIssue objIssue = new ToolingIssue();
                ToolLocationmaster objToolLocation = new ToolLocationmaster();
                ToolUpload objTool = new ToolUpload();
                Partmaster objPart = new Partmaster();
                ToolRequestReason objRequestReason = new ToolRequestReason();
                Shiftmaster objShiftmaster = new Shiftmaster();
                LineMachinemaster objLineMachine = new LineMachinemaster();
                Linemaster objLine = new Linemaster();
                Machinemaster objMachine = new Machinemaster();
                ToolVendorMaster objVendor = new ToolVendorMaster();


                if (objToolingReturn.P_KEY == "L" && objToolingReturn.dummy_col1 == "Return")
                {
                    objModel.P_KEY = "L";
                    objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolingReturn = ToolViewModel.SaveToolingReturn(objModel);
                    var ddldata = new
                    {
                        ddToolingReturn = liToolingReturn
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objToolingReturn.P_KEY == "L" && objToolingReturn.dummy_col1 == "Regrain")
                {
                    objRegrain.P_KEY = "L";
                    objRegrain.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolingRegrain = ToolViewModel.SaveToolingRegrain(objRegrain);
                    var ddldata = new
                    {
                        ddlToolingRegrain = liToolingRegrain
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objToolingReturn.P_KEY == "L" && objToolingReturn.dummy_col1 == "Issue")
                {
                    objIssue.P_KEY = "G";
                    objIssue.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolingIssue = ToolViewModel.SaveToolingIssue(objIssue);
                    var ddldata = new
                    {
                        ddlToolingIssue = liToolingIssue
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objToolingReturn.P_KEY == "L" && objToolingReturn.dummy_col1 == "Location")
                {
                    objToolLocation.P_KEY = "L";
                    objToolLocation.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolLocation = ToolViewModel.SaveToolLocationMaster(objToolLocation);
                    var ddldata = new
                    {
                        ddlToolLocation = liToolLocation
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objToolingReturn.P_KEY == "L" && objToolingReturn.dummy_col1 == "Machine")
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
                if (objToolingReturn.P_KEY == "L" && objToolingReturn.dummy_col1 == "Line")
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
                if (objToolingReturn.P_KEY == "L" && objToolingReturn.dummy_col1 == "LineMachine")
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
                if (objToolingReturn.P_KEY == "L" && objToolingReturn.dummy_col1 == "Upload")
                {
                    objTool.P_KEY = "H";
                    objTool.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liToolUpload = ToolViewModel.SaveToolUpload(objTool);
                    var ddldata = new
                    {
                        ddlToolUpload = liToolUpload
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objToolingReturn.P_KEY == "L" && objToolingReturn.dummy_col1 == "Part")
                {
                    objPart.P_KEY = "G";
                    objPart.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liPartmaster = ToolViewModel.SavePartmaster(objPart);
                    var ddldata = new
                    {
                        ddlPartmaster = liPartmaster
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objToolingReturn.P_KEY == "L" && objToolingReturn.dummy_col1 == "Reason")
                {
                    objRequestReason.P_KEY = "L";
                    objRequestReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                    var liRequestReason = ToolViewModel.SaveToolRequestReasonMaster(objRequestReason);
                    var ddldata = new
                    {
                        ddSpareingReturn = liRequestReason
                    };
                    result = Json(ddldata, JsonRequestBehavior.AllowGet);
                    result.MaxJsonLength = 8675309;
                    return result;
                }
                if (objToolingReturn.P_KEY == "L" && objToolingReturn.dummy_col1 == "Shift")
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
                if (objToolingReturn.P_KEY == "L" && objToolingReturn.dummy_col1 == "Vendor")
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
        public JsonResult SaveRegrindCheck(ToolingReturn ToolingReturn)
        {
            try
            {
                ToolingReturn.P_KEY = "S";
                // ToolingReturn.Tool_Status = "RT";
                ToolingReturn.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                ToolingReturn.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                ToolingReturn.IsActive = (ToolingReturn.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liToolingReturn = ToolViewModel.SaveToolingRegrain(ToolingReturn);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        #endregion

        #region ToolRegrindingCheckWithParameter
        public ActionResult ToolingRegrindCheckWithParameter()
        {
            return View();
        }



        public JsonResult BindListRegrindCheckWithParameter()
        {
            try
            {



                ToolingReturn objModel = new ToolingReturn();
                objModel.P_KEY = "L";
                objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                var liToolingReturn = ToolViewModel.SaveToolingReturn(objModel);

                ToolingReturn objRegrain = new ToolingReturn();
                objRegrain.P_KEY = "Dashboard";
                objRegrain.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                var liToolingRegrain = ToolViewModel.SaveToolingRegrain(objRegrain);
                // return Json(objViewModel, JsonRequestBehavior.AllowGet);



                ToolingIssue objIssue = new ToolingIssue();
                objIssue.P_KEY = "G";
                objIssue.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objIssue.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                var liToolingIssue = ToolViewModel.SaveToolingIssue(objIssue);

                ToolLocationmaster objToolLocation = new ToolLocationmaster();
                objToolLocation.P_KEY = "L";
                objToolLocation.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                var liToolLocation = ToolViewModel.SaveToolLocationMaster(objToolLocation);

                ToolUpload objTool = new ToolUpload();
                Partmaster objPart = new Partmaster();
                ToolRequestReason objRequestReason = new ToolRequestReason();
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
                objTool.P_KEY = "H";
                objTool.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objPart.P_KEY = "G";
                objPart.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objRequestReason.P_KEY = "L";
                objRequestReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objShiftmaster.P_KEY = "L";
                objShiftmaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objVendor.P_KEY = "L";
                objVendor.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();



                //var liPartmaster = ToolViewModel.GetPartQty(objPart);
                var liPartmaster = ToolViewModel.SavePartmaster(objPart);
                var liToolUpload = ToolViewModel.SaveToolUpload(objTool);
                var liRequestReason = ToolViewModel.SaveToolRequestReasonMaster(objRequestReason);
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
                    ddToolingReturn = liToolingReturn,
                    ddlPartmaster = liPartmaster,
                    //ddlVendormaster = liVendormaster,
                    ddlToolLocation = liToolLocation,
                    ddlToolUpload = liToolUpload,
                    ddlVendormaster = liVendormaster,
                    //ddlRequestReason = liRequestReason,
                    ddlShiftmaster = liShiftmaster,
                    ddlToolingIssue = liToolingIssue,
                    ddlToolingRegrain = liToolingRegrain,
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

        #region QuantityReport
        public ActionResult QuantityReport()
        {
            return View();
        }
        public JsonResult FetchProductReport(QuantityReport QuantityReport)
        {


            QuantityReport.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            var liToolQtyReport = ToolViewModel.GetQuantityReportList(QuantityReport);
            QuantityReport.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            var liToolQtyAnalyReport = ToolViewModel.GetQuantityAnalyticReport(QuantityReport);
            var liToolCostAnalyReport = ToolViewModel.GetCostAnalyticReport(QuantityReport);

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


        public ActionResult GetQuantityReport(QuantityReport entity)
        {
            entity.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();



            DataTable dt = new DataTable();
            dt = ToolViewModel.GetQuantityReport(entity);




            byte[] data = dt.ToExcel();



            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("ToolQuantityReport" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
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

        #region PartLifeCycleReport
        public ActionResult PartLifeCycleReport()
        {
            return View();
        }
        public JsonResult FetchPartLifeCycleReport(PartLifeCycleReport PartLifeCycleReport)
        {
            PartLifeCycleReport.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            objViewModel.liToolLifeCycleReport = ToolViewModel.GetPartLifeCycleReportList(PartLifeCycleReport);
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

        #region BreakageReport
        public ActionResult BreakageReport()
        {
            return View();
        }
        public JsonResult FetchBreakageReport(BreakageReport BreakageReport)
        {
            BreakageReport.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            var liToolBreakageReport = ToolViewModel.GetBreakageReportList(BreakageReport);
            var liToolReturnAnalyReport = ToolViewModel.GetReturnAnalyReport(BreakageReport);
            var ddldata = new
            {

                ddlToolBreakageReport = liToolBreakageReport,
                ddlToolReturnAnalyReport = liToolReturnAnalyReport
            };
            JsonResult result = Json(ddldata, JsonRequestBehavior.AllowGet);
            result.MaxJsonLength = 8675309;
            return result;
        }

        public JsonResult BindReturnReason()
        {
            try
            {
               // ToolRequestReason ToolRequestReason = new ToolRequestReason();
                ToolReturnReason ToolReturnReason = new ToolReturnReason();

                ToolReturnReason.P_KEY = "L";
                ToolReturnReason.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                var liRequestReason = ToolViewModel.SaveToolReturnReasonMaster(ToolReturnReason);
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

        public ActionResult GetBreakageReport(BreakageReport entity)
        {
            entity.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();



            DataTable dt = new DataTable();
            dt = ToolViewModel.GetBreakageReport(entity);




            byte[] data = dt.ToExcel();



            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("ToolBreakageReport" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
            // var fileDetails = "";
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
            //}
            // return File(data, "application/vnd.ms-excel", "TCM_INCENTIVE_SUMMARY");




        }

        #endregion

        #region StockVerification

        public ActionResult StockVerification()
        {
            return View();
        }

        public JsonResult BindListPartMasterStock(Partmaster objModel)
        {
            try
            {
                JsonResult result = Json("", JsonRequestBehavior.AllowGet);
                // Partmaster objModel = new Partmaster();

                objModel.P_KEY = "H";
                objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objViewModel.liPartmaster = ToolViewModel.SavePartmaster(objModel);
                //return Json(objViewModel, JsonRequestBehavior.AllowGet);
                result = Json(objViewModel, JsonRequestBehavior.AllowGet);
                result.MaxJsonLength = 8675309;
                return result;
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        public JsonResult SaveStockVerification(Partmaster ToolVendorMaster)
        {
            try
            {
                ToolVendorMaster.P_KEY = "S";
                ToolVendorMaster.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                //PhysicianMaster.ORGID = "1";
                ToolVendorMaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                //ToolVendorMaster.IsActive = (ToolVendorMaster.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liPartmaster = ToolViewModel.SaveStockManagement(ToolVendorMaster);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        #endregion

        #region MonthlyStockReport
        public ActionResult MonthlyStockReport()
        {
            return View();
        }
        public JsonResult FetchMonthlyStockReport(Partmaster QuantityReport)
        {
            QuantityReport.P_KEY = "L";
            QuantityReport.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            objViewModel.liPartmaster = ToolViewModel.SaveStockManagement(QuantityReport);
            return Json(objViewModel, JsonRequestBehavior.AllowGet);
        }



        public ActionResult GetMonthlyStockReport(Partmaster entity)
        {
            entity.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            entity.P_KEY = "L";


            DataTable dt = new DataTable();
            dt = ToolViewModel.SaveStockManagementTable(entity);




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

        #region ToolMachineQuantityReport
        public ActionResult ToolMachineQuantityReport()
        {
            return View();
        }
        public JsonResult FetchToolMachineQuantityReport(ToolMachineQuantityReport ToolQuantityReport)
        {


            ToolQuantityReport.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            var liToolQtyReport = ToolViewModel.GetToolMachineQuantityReportList(ToolQuantityReport);

            Linemaster objLine = new Linemaster();

            objLine.P_KEY = "G";
            objLine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            var liLine = MasterViewModel.SaveLineMaster(objLine);

            //ToolQuantityReport.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
            var liToolQtyAnalyReport = ToolViewModel.GetToolMachineQuantityAnalyticReport(ToolQuantityReport);
            var liToolCostAnalyReport = ToolViewModel.GetToolMachineCostAnalyticReport(ToolQuantityReport);

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

        public ActionResult GetToolMachineQuantityReport(ToolMachineQuantityReport entity)
        {
            entity.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();



            DataTable dt = new DataTable();
            dt = ToolViewModel.GetToolMachineQuantityReport(entity);




            byte[] data = dt.ToExcel();



            string handle = Guid.NewGuid().ToString();
            TempData[handle] = data;
            string filename = ("ToolQuantityReport" + DateTime.Now.ToLongDateString() + "_" + DateTime.Now.ToShortTimeString() + ".xlsx").Replace(":", " ");
            // var fileDetails = "";
            var fileDetails = new { ID = handle, FileName = filename };
            return Json(fileDetails, JsonRequestBehavior.AllowGet);
            //}
            // return File(data, "application/vnd.ms-excel", "TCM_INCENTIVE_SUMMARY");




        }

        #endregion

        #region PartMasterWithParameter

        public ActionResult PartMasterWithParameter()
        {
            return View();
        }
        public JsonResult BindListPartMasterWithParameter()
        {
            try
            {

                Partmaster objModel = new Partmaster();

                objModel.P_KEY = "Dashboard";
                objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                var liToolPartmaster = ToolViewModel.SavePartmaster(objModel);

                ToolLocationmaster objToolLocation = new ToolLocationmaster();
                objToolLocation.P_KEY = "L";
                objToolLocation.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                var liToolLocation = ToolViewModel.SaveToolLocationMaster(objToolLocation);

                ToolVendorMaster objVendor = new ToolVendorMaster();
                objVendor.P_KEY = "L";
                objVendor.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                var liVendormaster = ToolViewModel.SaveToolVendorMaster(objVendor);

                //return Json(objViewModel, JsonRequestBehavior.AllowGet);
                var ddldata = new
                {
                    ddlToolLocation = liToolLocation,
                    ddlToolPartmaster = liToolPartmaster,
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
