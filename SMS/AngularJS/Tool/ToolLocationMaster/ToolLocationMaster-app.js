var toollocationApp = angular.module('toollocationApp', ['datatables', 'commonApp']);

toollocationApp.service('toollocationServices', function () {

    this.toollocationData = function (toolLocationmaster) {
        debugger;
        this.LocationID = toolLocationmaster ? toolLocationmaster.LocationID : null;
        this.LocationName = toolLocationmaster ? toolLocationmaster.LocationName : null;
        this.LocationCode = toolLocationmaster ? toolLocationmaster.LocationCode : null;
        this.IsActive = toolLocationmaster ? toolLocationmaster.IsActive : null;
        this.OrgID = toolLocationmaster ? toolLocationmaster.OrgID : null;
        this.CreatedBy = toolLocationmaster ? toolLocationmaster.CreatedBy : null;
        this.CreatedAt = toolLocationmaster ? toolLocationmaster.CreatedAt : null;
        this.ModifyBy = toolLocationmaster ? toolLocationmaster.ModifyBy : null;
        this.ModifyDate = toolLocationmaster ? toolLocationmaster.ModifyDate : null;
        this.KEY = toolLocationmaster ? toolLocationmaster.KEY : null;

    };

    this.SaveToolLocationmaster = function (data) {
        debugger;
        this.url = "Tool/SaveToolLocationmaster";
        this.param = JSON.stringify(data);
    };

});
