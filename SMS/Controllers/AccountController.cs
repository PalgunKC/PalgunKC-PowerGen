using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SMS.DAO;
using SMS.UTILITY;
using System.Web.Mvc;
using System.Web.Security;
using SMS.Model.ViewModel;
using System.Data.OleDb;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Net;
using Newtonsoft.Json;
using SMS.Model.Model;

namespace SMS.Controllers
{
    public class AccountController : Controller
    {
        public static string UserId = string.Empty;
        public static string UserName = string.Empty;
        public static string Companycode = string.Empty;
        //
        // GET: /Account/

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Login()
        {
            //RedirectToAction("Index","Administration");
            return View();
        }

        public ActionResult Loginauth()
        {

            return View();
        }
       
        [HttpPost]
        public ActionResult SignIn(Model.ViewModel.AccountViewModel collection)
        {
            string sUserRole = string.Empty;
            string sLastLogin = string.Empty;

            UserDetails objUserDetails = new UserDetails();
            objUserDetails.E_USER_ID = collection.objLoginViewModel.Username;
            objUserDetails.E_PASSWORD = collection.objLoginViewModel.Password;
            //objUserDetails.E_COMPANY = collection.objLoginViewModel.Companycode;
           // objUserDetails.E_COMPANY = ConfigurationManager.AppSettings["companycode"].ToString(); 
            var LiUserCredential = AccountViewModel.FetchUserDetails(objUserDetails);
            if (LiUserCredential != null && LiUserCredential.Count > 0)
            {
                Session[Common.SESSION_VARIABLES.USERNAME] = collection.objLoginViewModel.Username;
                Session[Common.SESSION_VARIABLES.PASSWORD] = collection.objLoginViewModel.Password;
                Session[Common.SESSION_VARIABLES.COMPANYCODE] = LiUserCredential[0].Companycode;
                Session[Common.SESSION_VARIABLES.ROLE_CODE] = LiUserCredential[0].ROLE_CODE;

                objUserDetails.E_COMPANY = Session[Common.SESSION_VARIABLES.COMPANYCODE].ToString();
                objUserDetails.E_ROLE_CODE = Session[Common.SESSION_VARIABLES.ROLE_CODE].ToString();
                List<SubMenuItems> LiUserMenu = AccountViewModel.FetchUserSubMenu(objUserDetails);
                if (LiUserMenu.Count > 0)
                {
                    Session[Common.SESSION_VARIABLES.MENU_ITEMS] = LiUserMenu;
                }

            }
            else
            {
                TempData["ErrorMessage"] = Common.Message.InvalidUserOrNotExist;
                return RedirectToAction("Login", "Account");
            }
            //return RedirectToAction(objUserDetails.E_ROLE_CODE, "DashBoard");
            return RedirectToAction("ADMIN", "DashBoard");




        }

        public ActionResult SignOut()
        {
            
            FormsAuthentication.SignOut();
            return RedirectToAction("Login", "Account");
        }


    }
}
