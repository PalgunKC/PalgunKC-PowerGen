var lineApp = angular.module('lineApp', ['datatables', 'commonApp']);

lineApp.service('lineServices', function () {

    this.lineData = function (linemaster) {
        debugger;
        this.LineId = linemaster ? linemaster.LineId : null;
        this.LineName = linemaster ? linemaster.LineName : null;
        this.IsActive = linemaster ? linemaster.IsActive : null;
        this.OrgID = linemaster ? linemaster.OrgID : null;
        this.CreatedBy = linemaster ? linemaster.CreatedBy : null;
        this.CreatedAt = linemaster ? linemaster.CreatedAt : null;
        this.ModifyBy = linemaster ? linemaster.ModifyBy : null;
        this.ModifyDate = linemaster ? linemaster.ModifyDate : null;
        this.KEY = linemaster ? linemaster.KEY : null;

    };

    this.Savelinemaster = function (data) {
        debugger;
        this.url = "Master/SaveLineMaster";
        this.param = JSON.stringify(data);
    };

});
