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
        public JsonResult BindListToolLocation()
        {
            try
            {
                ToolLocationmaster objModel = new ToolLocationmaster();
                objModel.P_KEY = "L";
                objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objViewModel.liToolLocationmaster = ToolViewModel.SaveToolLocationMaster(objModel);
                //objViewModel.liCityMaster = Manage_InfoViewModel.ListCity(city);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
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


        #endregion

        #region ToolVendorMaster

        public ActionResult ToolVendorMaster()
        {
            return View();
        }
        public JsonResult BindListToolVendor()
        {
            try
            {
                ToolVendorMaster objModel = new ToolVendorMaster();
                Statemaster obj = new Statemaster();
                Citymaster city = new Citymaster();
                objModel.P_KEY = "L";
                objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objViewModel.liToolVendorMaster = ToolViewModel.SaveToolVendorMaster(objModel);
                //objViewModel.liCityMaster = Manage_InfoViewModel.ListCity(city);
                objViewModel.liStateMaster = ToolViewModel.ListState(obj);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
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


        #endregion

        #region PartMaster

        public ActionResult PartMaster()
        {
            return View();
        }
        public JsonResult BindListPartMaster()
        {
            try
            {
                Partmaster objModel = new Partmaster();

                objModel.P_KEY = "L";
                objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objViewModel.liPartmaster = ToolViewModel.SavePartmaster(objModel);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
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


        #endregion
    }
}