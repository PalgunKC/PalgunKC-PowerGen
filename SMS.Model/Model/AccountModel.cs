using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace SMS.Model.Model
{
    public class AccountModel
    {
    }
    public class UserDetails
    {
        public string E_KEY { get; set; }
        public string E_USER_ID { get; set; }

        public string E_ID { get; set; }
        public string E_USER_NAME { get; set; }

        public string E_COMPANY { get; set; }
        public string E_USER_TYPE { get; set; }
        public string E_EMAIL { get; set; }
        public string E_MOBILE { get; set; }
        public string E_DESIGNATION { get; set; }
        public string E_ROLE_CODE { get; set; }
        public string E_USER_ACTIVE { get; set; }
        public string E_CREATED_BY { get; set; }
        public string E_AREA_CODE { get; set; }
        public string P_OUTTBL { get; set; }
        public string E_PASSWORD { get; set; }
    }
    public class User
    {
        public string E_KEY { get; set; }
        public string E_USER_ID { get; set; }
        public string E_USER_NAME { get; set; }
        public string E_PASSWORD { get; set; }
        public string PASSWORD { get; set; }
        public string MOBILE { get; set; }
        public string ROLE { get; set; }
        public string USER_TYPE { get; set; }
        public string NAME { get; set; }
        public string EMAIL { get; set; }
        public string LAST_LOGIN { get; set; }
        public string PHOTO { get; set; }
        public string ROLE_NAME { get; set; }
        public string USER_TYPE_NAME { get; set; }
        public string ROLE_ID { get; set; }
        public string USER_ID { get; set; }
        public string USER_NAME { get; set; }
        public string Companycode { get; set; }   
        public string DESIGNATION { get; set; }
        public string ROLE_CODE { get; set; }
        public string USER_LEVEL { get; set; }
        public string USER_ACTIVE { get; set; }
    }
    public class MenuItems
    {
        public string ROLE_CODE { get; set; }
        public string MENUID { get; set; }
        public string MENUNAME { get; set; }
    }
    public class Notifications
    {
        public string NOTIFICATION_ID { get; set; }
        public string NOTIFICATION_TYPE { get; set; }
        public string NOTIFICATION_TITLE { get; set; }
        public string NOTIFICATION_CONTENT { get; set; }
        public string USER_ID { get; set; }
        public string USER_NAME { get; set; }
        public string ROLE { get; set; }
        public string REQUESTED_BY { get; set; }
        public string REQUESTED_ON { get; set; }
        public string STATUS { get; set; }
        public string IS_BULK{get;set;}
        public string READ_USER { get; set; }
        public string CONTROLLER { get; set; }
        public string ACTION { get; set; }
    }
    public class SubMenuItems
    {
        public string MAIN_MENUID { get; set; }
        public string MAIN_MENU_TEXT { get; set; }
        public string URL { get; set; }
        public string CLASS { get; set; }
        public string ICON { get; set; }
        public string SUB_MENUID { get; set; }
        public string PROGRAM_NAME { get; set; }
        public string SUB_MENU_TEXT { get; set; }
        public string MODULE_NAME { get; set; }
        public string ACTION { get; set; }
        public string CONTROLLER { get; set; }
        public string MENU_NAME { get; set; }
        public string STYLE { get; set; }
        public string HAS_SUB { get; set; }
    }
    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Email")]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [Display(Name = "Username")]
        public string Username { get; set; }

        [Display(Name = "UserID")]
        public string UserID { get; set; }
        [Required]
        [Display(Name = "Companycode")]
        public string Companycode { get; set; }

        [Required]
        [Display(Name = "ROLE_CODE")]
        public string ROLE_CODE { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
        public string AccountNo { get; set; }
        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }
    public class Branch
    {
        public string BRANCH { get; set; }
        public string BRANCH_CODE { get; set; }
    }
}
