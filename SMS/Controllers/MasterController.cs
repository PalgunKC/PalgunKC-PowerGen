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
    public class MasterController : BaseController
    {
        private MasterViewModel objViewModel;

        public MasterController()
        {
            objViewModel = new MasterViewModel();
        }

        #region ShiftMaster

        public ActionResult ShiftMaster()
        {
            return View();
        }
        public JsonResult BindListShift()
        {
            try
            {
                Shiftmaster objModel = new Shiftmaster();
                objModel.P_KEY = "L";
                objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objViewModel.liShiftmaster = MasterViewModel.SaveShiftMaster(objModel);
                //objViewModel.liCityMaster = Manage_InfoViewModel.ListCity(city);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public JsonResult SaveShiftMaster(Shiftmaster Shiftmaster)
        {
            try
            {
                Shiftmaster.P_KEY = "S";
                Shiftmaster.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                //PhysicianMaster.ORGID = "1";
                Shiftmaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                Shiftmaster.IsActive = (Shiftmaster.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liShiftmaster = MasterViewModel.SaveShiftMaster(Shiftmaster);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }


        #endregion

        #region MachineMaster

        public ActionResult MachineMaster()
        {
            return View();
        }
        public JsonResult BindListMachine()
        {
            try
            {
                Machinemaster objModel = new Machinemaster();
                objModel.P_KEY = "L";
                objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objViewModel.liMachinemaster = MasterViewModel.SaveMachineMaster(objModel);
                //objViewModel.liCityMaster = Manage_InfoViewModel.ListCity(city);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public JsonResult SaveMachineMaster(Machinemaster Machinemaster)
        {
            try
            {
                Machinemaster.P_KEY = "S";
                Machinemaster.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                //PhysicianMaster.ORGID = "1";
                Machinemaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                Machinemaster.IsActive = (Machinemaster.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liMachinemaster = MasterViewModel.SaveMachineMaster(Machinemaster);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }


        #endregion

        #region LineMaster

        public ActionResult LineMaster()
        {
            return View();
        }
        public JsonResult BindListLine()
        {
            try
            {
                Linemaster objModel = new Linemaster();
                objModel.P_KEY = "L";
                objModel.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objViewModel.liLinemaster = MasterViewModel.SaveLineMaster(objModel);
                //objViewModel.liCityMaster = Manage_InfoViewModel.ListCity(city);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public JsonResult SaveLineMaster(Linemaster Linemaster)
        {
            try
            {
                Linemaster.P_KEY = "S";
                Linemaster.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                //PhysicianMaster.ORGID = "1";
                Linemaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                Linemaster.IsActive = (Linemaster.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                objViewModel.liLinemaster = MasterViewModel.SaveLineMaster(Linemaster);
                return Json(objViewModel, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }


        #endregion

        #region LinemachineMaster

        public ActionResult LinemachineMaster()
        {
            return View();
        }
        public JsonResult BindListLinemachine()
        {
            try
            {
                Linemaster objLine = new Linemaster();
                Machinemaster objMachine = new Machinemaster();
                LineMachinemaster objLineMachine = new LineMachinemaster();

                objLineMachine.P_KEY = "L";
                objLineMachine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objMachine.P_KEY = "G";
                objMachine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objLine.P_KEY = "G";
                objLine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                // var liLineMachine = MasterViewModel.SaveLineMachineMaster(objLineMachine);
                var liLine = MasterViewModel.SaveLineMaster(objLine);
                var liMachine = MasterViewModel.SaveMachineMaster(objMachine);
                var liLineMachine = MasterViewModel.SaveLinemachineMaster(objLineMachine);
                var ddldata = new
                {
                    ddlLineMachine = liLineMachine,
                    ddlLine = liLine,
                    ddlMachine = liMachine
                };
                return Json(ddldata, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        public JsonResult GetLineDetails(LineMachinemaster Linemachinemaster)
        {
            try
            {
                //Linemaster objLine = new Linemaster();
               // Machinemaster objMachine = new Machinemaster();
                LineMachinemaster objLineMachine = new LineMachinemaster();

                Linemachinemaster.P_KEY = "G";
                Linemachinemaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                //objMachine.P_KEY = "L";
                //objMachine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                //objLine.P_KEY = "L";
                //objLine.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                //// var liLineMachine = MasterViewModel.SaveLineMachineMaster(objLineMachine);
                //var liLine = MasterViewModel.SaveLineMaster(objLine);
                //var liMachine = MasterViewModel.SaveMachineMaster(objMachine);
                var liLineMachine = MasterViewModel.SaveLinemachineMaster(Linemachinemaster);
                //liLineMachine[0].Machinecode = liLineMachine[0].LineMachine_Machine_Code;
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

        public JsonResult SaveLinemachineMaster(LineMachinemaster Linemachinemaster)
        {
            try
            {
                Linemachinemaster.P_KEY = "S";
                Linemachinemaster.CreatedBy = Session[Common.SESSION_VARIABLES.USERNAME].ToString();
                //PhysicianMaster.ORGID = "1";
                Linemachinemaster.OrgID = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                Linemachinemaster.IsActive = (Linemachinemaster.IsActive == Common.ActiveLog.Active) ? "Y" : "N";
                // for (int i = 0; i < Linemachinemaster.Machinecode.Count; i++)
                //{

                Linemachinemaster.LineMachine_Machine_Code = String.Join(",", Linemachinemaster.Machinecode.ToArray());
                objViewModel.liLinemachinemaster = MasterViewModel.SaveLinemachineMaster(Linemachinemaster);
                //}

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