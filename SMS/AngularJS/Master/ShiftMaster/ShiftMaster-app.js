var shiftApp = angular.module('shiftApp', ['datatables', 'commonApp']);

shiftApp.service('shiftServices', function () {

    this.shiftData = function (shiftmaster) {
        debugger;
        this.ShiftId = shiftmaster ? shiftmaster.ShiftId : null;
        this.ShiftName = shiftmaster ? shiftmaster.ShiftName : null;
        this.Shift_StartTime = shiftmaster ? shiftmaster.Shift_StartTime : null;
        this.Shift_endTime = shiftmaster ? shiftmaster.Shift_endTime : null;
        this.IsUse = shiftmaster ? shiftmaster.IsUse : null;
        this.OrgID = shiftmaster ? shiftmaster.OrgID : null;
        this.CreatedBy = shiftmaster ? shiftmaster.CreatedBy : null;
        this.CreatedAt = shiftmaster ? shiftmaster.CreatedAt : null;
        this.ModifyBy = shiftmaster ? shiftmaster.ModifyBy : null;
        this.ModifyDate = shiftmaster ? shiftmaster.ModifyDate : null;
        this.IsActive = shiftmaster ? shiftmaster.IsActive : null;
        this.dummy_col2 = shiftmaster ? shiftmaster.dummy_col2 : null;
        this.KEY = shiftmaster ? shiftmaster.KEY : null;

    };

    this.Saveshiftmaster = function (data) {
        debugger;
        this.url = "Master/SaveShiftMaster";
        this.param = JSON.stringify(data);
    };

});
