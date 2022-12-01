var machineApp = angular.module('machineApp', ['datatables', 'commonApp']);

machineApp.service('machineServices', function () {

    this.machineData = function (machinemaster) {
        debugger;
        this.MachineId = machinemaster ? machinemaster.MachineId : null;
        this.Machinecode = machinemaster ? machinemaster.Machinecode : null;
        this.MachineName = machinemaster ? machinemaster.MachineName : null;
        this.Acquisition_date = machinemaster ? machinemaster.Acquisition_date : null;
        this.ScrapUpdate_date = machinemaster ? machinemaster.ScrapUpdate_date : null;
        this.Use_Status = machinemaster ? machinemaster.Use_Status : null;
        this.Department = machinemaster ? machinemaster.Department : null;
        this.Section = machinemaster ? machinemaster.Section : null;
        this.Machine_Spec = machinemaster ? machinemaster.Machine_Spec : null;
        this.Machine_Type = machinemaster ? machinemaster.Machine_Type : null;
        this.Machinedetail_type = machinemaster ? machinemaster.Machinedetail_type : null;
        this.Manufacturer = machinemaster ? machinemaster.Manufacturer : null;
        this.Model_no = machinemaster ? machinemaster.Model_no : null;
        this.Machine_rating = machinemaster ? machinemaster.Machine_rating : null;
        this.inspec_cycle = machinemaster ? machinemaster.inspec_cycle : null;
        this.workingvoltage_ph = machinemaster ? machinemaster.workingvoltage_ph : null;
        this.workingvoltage_v = machinemaster ? machinemaster.workingvoltage_v : null;
        this.Power_kva = machinemaster ? machinemaster.Power_kva : null;
        this.Power_kw = machinemaster ? machinemaster.Power_kw : null;
        this.IsActive = machinemaster ? machinemaster.IsActive : null;
        this.OrgID = machinemaster ? machinemaster.OrgID : null;
        this.CreatedBy = machinemaster ? machinemaster.CreatedBy : null;
        this.CreatedAt = machinemaster ? machinemaster.CreatedAt : null;
        this.ModifyBy = machinemaster ? machinemaster.ModifyBy : null;
        this.ModifyDate = machinemaster ? machinemaster.ModifyDate : null;
      
        this.KEY = machinemaster ? machinemaster.KEY : null;
        this.MachineNumber = machinemaster ? machinemaster.MachineNumber : null;


    };

    this.Savemachinemaster = function (data) {
        debugger;
        this.url = "Master/SaveMachineMaster";
        this.param = JSON.stringify(data);
    };

});
