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

    }
}
