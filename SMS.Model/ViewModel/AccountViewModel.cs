using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SMS.Model.Model;
using System.Data.OracleClient;
using SMS.DAO;
using SMS.UTILITY;
using System.Data;
namespace SMS.Model.ViewModel
{
    public class AccountViewModel : IDisposable
    {
        public LoginViewModel objLoginViewModel { get; set; }
        public List<Notifications> liNotification { get; set; }
        public static List<User> FetchUserDetails(UserDetails objUserDetails)
        {
            DataValue dv = new DataValue();
            dv.Add("@USERNAME", objUserDetails.E_USER_ID, EnumCommand.DataType.Varchar);
            dv.Add("@PASSWORD", objUserDetails.E_PASSWORD, EnumCommand.DataType.Varchar);
            dv.Add("@ORGID", objUserDetails.E_COMPANY, EnumCommand.DataType.Int);
            //var liUserDetails = (List<User>)OracleHelper.FetchData<User>(Oraparam, Common.Queries.CMS_SP_INSERT_USER_MANAGER, EnumCommand.DataSource.list).DataSource.Data;
            //return liUserDetails;

            var liUserDetails = (List<User>)SQLHelper.FetchData<User>(Common.Queries.SP_LOGIN_USER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return liUserDetails;


        }

        public static List<SubMenuItems> FetchUserSubMenu(UserDetails objUserDetails)
        {
            DataValue dv = new DataValue();
            dv.Add("@ROLE_CODE", objUserDetails.E_ROLE_CODE, EnumCommand.DataType.Varchar);
            dv.Add("@ORGID", objUserDetails.E_COMPANY, EnumCommand.DataType.Int);
            var liSubUserMenu = (List<SubMenuItems>)SQLHelper.FetchData<SubMenuItems>(Common.Queries.SP_MENU_LIST, EnumCommand.DataSource.list, dv).DataSource.Data;
            return liSubUserMenu;
        }
       
        #region IDisposeMethod
        public void Dispose()
        {
            GC.Collect();
        }
        #endregion
    }
}
