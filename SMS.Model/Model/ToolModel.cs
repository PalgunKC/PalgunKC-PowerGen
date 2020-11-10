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

    }
    public class ToolVendorMaster
    {
        public string VendorId { get; set; }
        public string VendorName { get; set; }
        public string VendorCode { get; set; }
        public string VendorAddress { get; set; }
        public string VendorLocation { get; set; }
        public string Pincode { get; set; }
        public string PhoneNo { get; set; }
        public string EmailId { get; set; }
        public string StateId { get; set; }
        public string CityId { get; set; }
        public string IsActive { get; set; }
        public string OrgID { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedAt { get; set; }
        public string ModifyBy { get; set; }
        public string ModifyDate { get; set; }
        public string dummycolumn1 { get; set; }
        public string dummycolumn2 { get; set; }
        public string dummycolumn3 { get; set; }
        public string P_KEY { get; set; }
        public string MSG { get; set; }
        public string VendorType { get; set; }

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


    }
}
