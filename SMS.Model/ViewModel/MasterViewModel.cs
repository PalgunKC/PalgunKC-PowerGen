using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SMS.Model.Model;
using System.Data.OracleClient;
using System.Data.SqlClient;
using System.Data;
using SMS.DAO;
using SMS.UTILITY;
using System.Web;


namespace SMS.Model.ViewModel
{
    public class MasterViewModel
    {
        #region Properties

        public List<Shiftmaster> liShiftmaster { get; set; }
        public List<Machinemaster> liMachinemaster { get; set; }
        public List<Linemaster> liLinemaster { get; set; }
        public List<LineMachinemaster> liLinemachinemaster { get; set; }

        
        #endregion

        #region Shiftmaster
        public static List<Shiftmaster> SaveShiftMaster(Shiftmaster Shiftmaster)
        {
            DataValue dv = new DataValue();

            dv.Add("@ShiftId", Shiftmaster.ShiftId, EnumCommand.DataType.Varchar);
            dv.Add("@ShiftName", Shiftmaster.ShiftName, EnumCommand.DataType.Varchar);
            dv.Add("@Shift_StartTime", Shiftmaster.Shift_StartTime, EnumCommand.DataType.Varchar);
            dv.Add("@Shift_endTime", Shiftmaster.Shift_endTime, EnumCommand.DataType.Varchar);
            dv.Add("@IsUse", Shiftmaster.IsUse, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", Shiftmaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", Shiftmaster.CreatedBy, EnumCommand.DataType.Varchar);
            //dv.Add("@CreatedAt", Shiftmaster.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", Shiftmaster.ModifyBy, EnumCommand.DataType.Varchar);
            //dv.Add("@ModifyDate", Shiftmaster.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", Shiftmaster.IsActive, EnumCommand.DataType.Varchar);
            //dv.Add("@dummy_col2", Shiftmaster.dummy_col2, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", Shiftmaster.P_KEY, EnumCommand.DataType.Varchar);
            var ToolLocationinsert = (List<Shiftmaster>)SQLHelper.FetchData<Shiftmaster>(Common.Queries.SP_SHIFT_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolLocationinsert;
        }
        #endregion

        #region Machinemaster
        public static List<Machinemaster> SaveMachineMaster(Machinemaster Machinemaster)
        {
            DataValue dv = new DataValue();

            dv.Add("@MachineId", Machinemaster.MachineId, EnumCommand.DataType.Varchar);
            dv.Add("@Machinecode", Machinemaster.Machinecode, EnumCommand.DataType.Varchar);
            dv.Add("@MachineName", Machinemaster.MachineName, EnumCommand.DataType.Varchar);
            dv.Add("@Acquisition_date", Machinemaster.Acquisition_date, EnumCommand.DataType.Varchar);
            dv.Add("@ScrapUpdate_date", Machinemaster.ScrapUpdate_date, EnumCommand.DataType.Varchar);
            dv.Add("@Use_Status", Machinemaster.Use_Status, EnumCommand.DataType.Varchar);
            dv.Add("@Department", Machinemaster.Department, EnumCommand.DataType.Varchar);
            dv.Add("@Section", Machinemaster.Section, EnumCommand.DataType.Varchar);
            dv.Add("@Machine_Spec", Machinemaster.Machine_Spec, EnumCommand.DataType.Varchar);
            dv.Add("@Machine_Type", Machinemaster.Machine_Type, EnumCommand.DataType.Varchar);
            dv.Add("@Machinedetail_type", Machinemaster.Machinedetail_type, EnumCommand.DataType.Varchar);
            dv.Add("@Manufacturer", Machinemaster.Manufacturer, EnumCommand.DataType.Varchar);
            dv.Add("@Model_no", Machinemaster.Model_no, EnumCommand.DataType.Varchar);
            dv.Add("@Machine_rating", Machinemaster.Machine_rating, EnumCommand.DataType.Varchar);
            dv.Add("@inspec_cycle", Machinemaster.inspec_cycle, EnumCommand.DataType.Varchar);
            dv.Add("@workingvoltage_ph", Machinemaster.workingvoltage_ph, EnumCommand.DataType.Varchar);
            dv.Add("@workingvoltage_v", Machinemaster.workingvoltage_v, EnumCommand.DataType.Varchar);
            dv.Add("@Power_kva", Machinemaster.Power_kva, EnumCommand.DataType.Varchar);
            dv.Add("@Power_kw", Machinemaster.Power_kw, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", Machinemaster.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", Machinemaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", Machinemaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", Machinemaster.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", Machinemaster.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", Machinemaster.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@MachineNumber", Machinemaster.MachineNumber, EnumCommand.DataType.Varchar);

            dv.Add("@P_KEY", Machinemaster.P_KEY, EnumCommand.DataType.Varchar);
            var ToolLocationinsert = (List<Machinemaster>)SQLHelper.FetchData<Machinemaster>(Common.Queries.SP_MACHINE_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolLocationinsert;
        }
        #endregion

        #region Linemaster
        public static List<Linemaster> SaveLineMaster(Linemaster ToolLinemaster)
        {
            DataValue dv = new DataValue();

            dv.Add("@LineId", ToolLinemaster.LineId, EnumCommand.DataType.Varchar);
            dv.Add("@LineName", ToolLinemaster.LineName, EnumCommand.DataType.Varchar);

            dv.Add("@OrgID", ToolLinemaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", ToolLinemaster.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", ToolLinemaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", ToolLinemaster.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", ToolLinemaster.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", ToolLinemaster.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", ToolLinemaster.P_KEY, EnumCommand.DataType.Varchar);
            var ToolLocationinsert = (List<Linemaster>)SQLHelper.FetchData<Linemaster>(Common.Queries.SP_LINE_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolLocationinsert;
        }
        #endregion

        #region LineMachinemaster
        public static List<LineMachinemaster> SaveLinemachineMaster(LineMachinemaster LineMachinemaster)
        {
            DataValue dv = new DataValue();

            dv.Add("@LineMachine_Map_Id", LineMachinemaster.LineMachine_Map_Id, EnumCommand.DataType.Varchar);
            dv.Add("@LineMachine_Line_Code", LineMachinemaster.LineMachine_Line_Code, EnumCommand.DataType.Varchar);
            dv.Add("@LineMachine_Machine_Code", LineMachinemaster.LineMachine_Machine_Code, EnumCommand.DataType.Varchar);
            dv.Add("@IsActive", LineMachinemaster.IsActive, EnumCommand.DataType.Varchar);
            dv.Add("@OrgID", LineMachinemaster.OrgID, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedBy", LineMachinemaster.CreatedBy, EnumCommand.DataType.Varchar);
            dv.Add("@CreatedAt", LineMachinemaster.CreatedAt, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyBy", LineMachinemaster.ModifyBy, EnumCommand.DataType.Varchar);
            dv.Add("@ModifyDate", LineMachinemaster.ModifyDate, EnumCommand.DataType.Varchar);
            dv.Add("@P_KEY", LineMachinemaster.P_KEY, EnumCommand.DataType.Varchar);
            var ToolLocationinsert = (List<LineMachinemaster>)SQLHelper.FetchData<LineMachinemaster>(Common.Queries.SP_LINE_MACHINE_MAP_MASTER, EnumCommand.DataSource.list, dv).DataSource.Data;
            return ToolLocationinsert;
        }
        #endregion

        


    }
}
