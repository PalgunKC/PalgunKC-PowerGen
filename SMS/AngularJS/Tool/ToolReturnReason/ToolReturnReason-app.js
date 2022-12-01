var toolreturnApp = angular.module('toolreturnApp', ['datatables', 'commonApp']);

toolreturnApp.service('toolreturnServices', function () {

    this.toolreturnData = function (toolReturnmaster) {
        debugger;
        this.ToolreturnReasonId = toolReturnmaster ? toolReturnmaster.ToolreturnReasonId : null;
        this.ReasonCode = toolReturnmaster ? toolReturnmaster.ReasonCode : null;
        this.ReasonDetails = toolReturnmaster ? toolReturnmaster.ReasonDetails : null;
        this.OrgID = toolReturnmaster ? toolReturnmaster.OrgID : null;
        this.IsActive = toolReturnmaster ? toolReturnmaster.IsActive : null;
        this.CreatedBy = toolReturnmaster ? toolReturnmaster.CreatedBy : null;
        this.CreatedAt = toolReturnmaster ? toolReturnmaster.CreatedAt : null;
        this.ModifyBy = toolReturnmaster ? toolReturnmaster.ModifyBy : null;
        this.ModifyDate = toolReturnmaster ? toolReturnmaster.ModifyDate : null;
        this.KEY = toolReturnmaster ? toolReturnmaster.KEY : null;

    };

    this.SavetoolReturnmaster = function (data) {
        //debugger;
        this.url = "Tool/SavetoolReturnmaster";
        this.param = JSON.stringify(data);
    };
});
