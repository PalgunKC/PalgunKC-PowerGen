using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMS.Model.Model
{
    public class MasterModel
    {
    }
    public class Shiftmaster
    {
        public string ShiftId { get; set; }
        public string ShiftName { get; set; }
        public string Shift_StartTime { get; set; }
        public string Shift_endTime { get; set; }
        public string IsUse { get; set; }
        public string OrgID { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedAt { get; set; }
        public string ModifyBy { get; set; }
        public string ModifyDate { get; set; }
        public string IsActive { get; set; }
        public string dummy_col2 { get; set; }
        public string P_KEY { get; set; }

        public string MSG { get; set; }

        public string dummycolumn1 { get; set; }
        public string dummycolumn2 { get; set; }


    }

    public class Machinemaster
    {
        public string MachineId { get; set; }
        public string Machinecode { get; set; }
        public string MachineName { get; set; }
        public string Acquisition_date { get; set; }
        public string ScrapUpdate_date { get; set; }
        public string Use_Status { get; set; }
        public string Department { get; set; }
        public string Section { get; set; }
        public string Machine_Spec { get; set; }
        public string Machine_Type { get; set; }
        public string Machinedetail_type { get; set; }
        public string Manufacturer { get; set; }
        public string Model_no { get; set; }
        public string Machine_rating { get; set; }
        public string inspec_cycle { get; set; }
        public string workingvoltage_ph { get; set; }
        public string workingvoltage_v { get; set; }
        public string Power_kva { get; set; }
        public string Power_kw { get; set; }
        public string IsActive { get; set; }
        public string OrgID { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedAt { get; set; }
        public string ModifyBy { get; set; }
        public string ModifyDate { get; set; }
        public string dummy_col1 { get; set; }
        public string dummy_col2 { get; set; }

        public string P_KEY { get; set; }

        public string MSG { get; set; }
        public string MachineNumber { get; set; }



    }

    public class Linemaster
    {
        public string LineId { get; set; }
        public string LineName { get; set; }

        public string IsActive { get; set; }
        public string OrgID { get; set; }

        public string CreatedBy { get; set; }
        public string CreatedAt { get; set; }
        public string ModifyBy { get; set; }
        public string ModifyDate { get; set; }
        public string P_KEY { get; set; }

        public string MSG { get; set; }

        public string dummy_col1 { get; set; }
        public string dummy_col2 { get; set; }


    }

    public class LineMachinemaster
    {
        public string LineMachine_Map_Id { get; set; }
        public string LineMachine_Line_Code { get; set; }
        public string LineMachine_Machine_Code { get; set; }
        public string IsActive { get; set; }
        public string OrgID { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedAt { get; set; }
        public string ModifyBy { get; set; }
        public string ModifyDate { get; set; }
        public string P_KEY { get; set; }

        public string MSG { get; set; }

        public string dummy_col1 { get; set; }
        public string dummy_col2 { get; set; }
        public string MachineName { get; set; }
        public List<string> Machinecode { get; set; }

        public string MachineNumber { get; set; }
        public string M_Code { get; set; }

    }

   

}
